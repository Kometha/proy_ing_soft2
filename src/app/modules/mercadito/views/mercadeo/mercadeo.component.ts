import { Component, HostListener } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';
import { Producto } from '../../interfaces/producto';
import { AlertaService } from '../../../../services/alertas/alerta.service';
import {
  Categoria,
  Familia,
  Marca,
  Subclase,
  TipoUnidad,
} from '../../interfaces/misc-types';
import { IMAGES_FOLDERS, URL_BASE } from '../../../../config/config';

const IMAGENES_PRODUCTO_URL_BASE = `${URL_BASE}/${IMAGES_FOLDERS.productos}/`;

@Component({
  selector: 'mercadeo-view',
  templateUrl: './mercadeo.component.html',
})
export class MercadeoView {
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const isF2 = event.key === 'F2';
    const isF8 = event.key === 'F8';
    if (isF2) {
      this.toggleModalBuscarProducto();
    }
    if (isF8) {
      this.toggleModalCrearProducto();
    }
  }

  IMAGENES_PRODUCTO_URL_BASE = IMAGENES_PRODUCTO_URL_BASE;

  productos: Producto[] = [];
  producto?: Producto;
  newProducto?: Producto;

  nuevoPrecio: {
    tipoUnidad?: TipoUnidad | null;
    precio: number;
  } = {
    tipoUnidad: null,
    precio: 0,
  };

  codigoProductoBuscado = '';

  marcas: Marca[] = [];
  tipoUnidades: TipoUnidad[] = [];
  familias: Familia[] = [];
  categorias: Categoria[] = [];
  subclases: Subclase[] = [];

  searchOrNewProductProps: {
    familia: Familia | null;
    categoria: Categoria | null;
    subclase: Subclase | null;
  } = {
    familia: null,
    categoria: null,
    subclase: null,
  };

  crearProductoProps: {
    descripcion: string;
    marca: Marca | null;
  } = {
    descripcion: '',
    marca: null,
  };

  visibleModalBuscarProducto = false;
  visibleModalNuevoProducto = false;
  constructor(
    private pryService: ProyIngSoftService,
    private alerta: AlertaService
  ) {
    this.getFamiliasCategoriasSubclases();
    this.getProductos();
    this.getMarcas();
    this.getTipoUnidades();
  }

  toggleModalBuscarProducto() {
    this.visibleModalBuscarProducto = !this.visibleModalBuscarProducto;
  }

  toggleModalCrearProducto() {
    this.visibleModalNuevoProducto = !this.visibleModalNuevoProducto;
  }

  getProductos() {
    this.pryService.PRODUCTOS.getProductos().subscribe((res) => {
      this.productos = res;
      this.searchProducto();
    });
  }

  getMarcas() {
    this.pryService.MARCAS.getMarcas().subscribe((res) => {
      this.marcas = res;
    });
  }

  getTipoUnidades() {
    this.pryService.TIPOS_O_FORMAS.getTiposUnidades().subscribe((res) => {
      this.tipoUnidades = res;
    });
  }

  getFamiliasCategoriasSubclases() {
    this.pryService.PRODUCTOS.getFamilias().subscribe((res) => {
      this.familias = res;
    });
    this.pryService.PRODUCTOS.getCategorias().subscribe((res) => {
      this.categorias = res;
    });
    this.pryService.PRODUCTOS.getSubclases().subscribe((res) => {
      this.subclases = res;
    });
  }

  getInventarioTotal(inv: number) {
    const constante = 1.3;
    return Math.floor(inv * constante);
  }

  getFechaVencimientoSegunInventario(inv: number) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + inv);
    return fecha;
  }

  crearProducto() {
    const { descripcion, marca } = this.crearProductoProps;
    if (!marca) {
      this.alerta.showWarn('Seleccione una marca');
      return;
    }
    if (descripcion === '') {
      this.alerta.showWarn('Ingrese una descripción');
      return;
    }
    if (!this.searchOrNewProductProps.subclase) {
      this.alerta.showWarn('Seleccione una subclase');
      return;
    }
    this.pryService.PRODUCTOS.crearProducto({
      descripcion,
      idSubclase: this.searchOrNewProductProps.subclase!.id,
      idMarca: marca.id,
    }).subscribe((res) => {
      if (!res) return;
      this.codigoProductoBuscado = res.codigoProducto;
      this.producto = res;
      this.getProductos();
      this.alerta.showSuccess('Producto creado');
    });
  }

  resetSearchProps() {
    const categoriaIsInsideFamilia = this.categorias.find(
      (c) => c.familia.id === this.searchOrNewProductProps.familia?.id
    );
    const subclaseIsInsideCategoria = this.subclases.find(
      (s) => s.categoria.id === this.searchOrNewProductProps.categoria?.id
    );
    if (!categoriaIsInsideFamilia) {
      this.searchOrNewProductProps.categoria = null;
    }

    if (!subclaseIsInsideCategoria) {
      this.searchOrNewProductProps.subclase = null;
    }
  }

  getCategoriasByFamilia() {
    if (!this.searchOrNewProductProps.familia) {
      this.alerta.showWarn('Seleccione una familia');
      return;
    }
    return this.categorias.filter(
      (c) => c.familia.id === this.searchOrNewProductProps.familia!.id
    );
  }

  getSubclasesByCategoria() {
    if (!this.searchOrNewProductProps.categoria) {
      this.alerta.showWarn('Seleccione una categoría');
      return;
    }
    return this.subclases.filter(
      (s) => s.categoria.id === this.searchOrNewProductProps.categoria!.id
    );
  }

  getProductosBySubClase() {
    if (!this.searchOrNewProductProps.subclase) {
      this.alerta.showWarn('Seleccione una subclase');
      return;
    }
    return this.productos.filter(
      (p) => p.subclase.id === this.searchOrNewProductProps.subclase!.id
    );
  }

  handleClickProductoInSearch(producto: Producto) {
    this.codigoProductoBuscado = producto.codigoProducto;
    this.visibleModalBuscarProducto = false;
    this.selectProducto(producto);
  }

  selectProducto(producto: Producto) {
    this.producto = producto;
    this.newProducto = structuredClone(producto);
  }

  nuevoPrecioProducto() {
    const { precio, tipoUnidad } = this.nuevoPrecio;
    if (!tipoUnidad) {
      this.alerta.showWarn('Seleccione un tipo de unidad');
      return;
    }

    this.setPrecioProducto(tipoUnidad, precio);
  }

  setPrecioProducto(tipoUnidad: TipoUnidad, precio: number) {
    {
      if (precio < 0) {
        this.alerta.showWarn('Ingrese un precio válido');
        return;
      }
      this.pryService.PRECIOS.setPrecioProducto(
        this.producto!.id,
        tipoUnidad.id,
        precio
      ).subscribe(() => {
        this.getProductos();
        this.alerta.showSuccess('Precio actualizado');
      });
    }
  }

  deletePrecio(precioId: number) {
    this.pryService.PRECIOS.deletePrecio(precioId).subscribe(() => {
      this.getProductos();
      this.alerta.showSuccess('Precio eliminado');
    });
  }

  updateProducto() {
    this.pryService.PRODUCTOS.updateProducto(this.newProducto!).subscribe(
      () => {
        this.getProductos();
        this.alerta.showSuccess('Producto actualizado');
      }
    );
  }

  handleClickOferta() {
    this.newProducto!.oferta = !this.newProducto!.oferta;
    this.updateProducto();
  }

  handleClickInhabilitado() {
    this.newProducto!.inhabilitado = !this.newProducto!.inhabilitado;
    this.updateProducto();
  }

  handleClickSave() {
    this.updateProducto();
  }

  searchProducto() {
    if (!this.codigoProductoBuscado.trim()) {
      return;
    }
    this.producto = this.productos.find(
      (p) => p.codigoProducto === this.codigoProductoBuscado
    );
    this.newProducto = structuredClone(this.producto);
  }

  getFirstNameOfFile(fileList: FileList | null) {
    if (!fileList) return '';

    const hasFiles = fileList.length > 0;
    if (!hasFiles) return '';

    const firstFile = fileList[0];
    return firstFile?.name ?? 'N/A';
  }

  getPreviewImageFile(file?: File) {
    if (!file) return '';
    return URL.createObjectURL(file);
  }

  async updateImageProducto(file?: File) {
    if (!file) return this.alerta.showWarn('Seleccione una imagen');
    if (!this.producto) return this.alerta.showWarn('Seleccione un producto');

    const FORMATOS_VALIDOS = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!FORMATOS_VALIDOS.includes(file.type)) {
      this.alerta.showWarn('Formato de imagen no válido');
      return;
    }

    const fileAsBase64 = await this.fileToBase64(file);

    if (!fileAsBase64 || typeof fileAsBase64 !== 'string') {
      this.alerta.showWarn('Error al cargar la imagen');
      return;
    }

    this.pryService.PRODUCTOS.updateImageProducto(
      this.producto.id,
      fileAsBase64
    ).subscribe(() => {
      this.alerta.showSuccess('Imagen actualizada');
    });
  }

  async fileToBase64(file: File) {
    return new Promise<string | ArrayBuffer | null>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }

  getUrlImageProducto(producto: Producto) {
    return `${IMAGENES_PRODUCTO_URL_BASE}${
      producto.id
    }.jpeg?pseudo=${Date.now()}`;
  }
}
