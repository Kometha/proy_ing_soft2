import { Component } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';
import { Empleado } from '../../interfaces/empleado';
import { Genero, Puesto, TipoPago } from '../../interfaces/misc-types';
import { URL_BASE, IMAGES_FOLDERS } from '../../../../config/config';
import { AlertaService } from '../../../../services/alertas/alerta.service';

const IMAGENES_EMPLEADO_URL_BASE = `${URL_BASE}/${IMAGES_FOLDERS.empleados}/`;

@Component({
  selector: 'recursos-humanos-view',
  templateUrl: './recursos-humanos.component.html',
})
export class RecursosHumanosView {
  IMAGENES_EMPLEADO_URL_BASE = IMAGENES_EMPLEADO_URL_BASE;

  empleados: Empleado[] = [];
  empleado?: Empleado;
  puestos: Puesto[] = [];
  generos: Genero[] = [];
  tipoPago: TipoPago[] = [];
  nombreCompleto!: string;
  formValido = true;
  busquedaEmpleado: boolean = false;

  aliasEmpleadoBuscado = '';

  newEmpleado: Empleado = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    alias: '',
    salario: 9000,
    observaciones: '',
  } as Empleado;

  constructor(
    private proySrv: ProyIngSoftService,
    private alerta: AlertaService
  ) {
    this.obtenerEmpleados();
    this.obtenerPuestos();
    this.obtenerGeneros();
    this.obtenerTiposPago();
  }

  obtenerEmpleados() {
    this.proySrv.EMPLEADOS.getEmpleados().subscribe((res) => {
      this.empleados = res;
    });
  }

  obtenerPuestos() {
    this.proySrv.PUESTOS.getPuestos().subscribe((res) => {
      this.puestos = res;
    });
  }

  obtenerGeneros() {
    this.proySrv.EMPLEADOS.getGeneros().subscribe((res) => {
      this.generos = res;
    });
  }

  obtenerTiposPago() {
    this.proySrv.TIPOS_O_FORMAS.getTiposPago().subscribe((res) => {
      this.tipoPago = res;
    });
  }

  marcarComoDirty(): boolean {
    if (
      this.newEmpleado.nombre &&
      this.newEmpleado.apellido &&
      this.newEmpleado.email &&
      this.newEmpleado.telefono &&
      this.newEmpleado.alias &&
      this.newEmpleado.salario &&
      this.newEmpleado.observaciones &&
      this.newEmpleado.puesto.id &&
      this.newEmpleado.genero.id &&
      this.newEmpleado.tipoPago.id
    ) {
      return true;
    }
    this.formValido = false;
    this.alerta.showWarn('Por favor, llene todos los campos');
    return false;
  }

  guardarEmpleado() {
    this.proySrv.EMPLEADOS.crearEmpleado(this.newEmpleado).subscribe(
      (res) => {
        if (this.marcarComoDirty()) {
          this.alerta.showSuccess('Empleado creado!');
        }
        this.obtenerEmpleados();
      },
      (err) => {
        this.alerta.showError(`Error al crear el empleado ${err}`);
      }
    );
  }

  buscarEmpleado() {
    if (!this.aliasEmpleadoBuscado.trim()) {
      return;
    }

    this.empleado = this.empleados.find(
      (p) => p.alias === this.aliasEmpleadoBuscado
    );

    if (this.empleado) {
      this.newEmpleado = structuredClone(this.empleado);
      this.nombreCompleto =
        this.newEmpleado.nombre + ' ' + this.newEmpleado.apellido;
    }
    console.log(this.empleado);
    if (this.empleado?.puesto) {
      this.newEmpleado.tipoPago.id = this.empleado?.tipoPago.id;
      this.newEmpleado.puesto.id = this.empleado?.puesto.id;
      this.newEmpleado.genero.id = this.empleado?.genero.id;
    }
  }

  handleClickInhabilitado() {
    this.newEmpleado!.inhabilitado = !this.newEmpleado!.inhabilitado;
    this.updateEmpleados();
  }

  updateEmpleados() {
    this.proySrv.EMPLEADOS.updateEmpleado(this.newEmpleado!).subscribe(() => {
      if (this.marcarComoDirty()) {
        this.alerta.showSuccess('Empleado actualizado!');
      }
      this.obtenerEmpleados();
    });
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

  async updateImageEmpleado(file?: File) {
    if (!file) return this.alerta.showWarn('Seleccione una imagen');
    if (!this.empleado) return this.alerta.showWarn('Seleccione un empleado');

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

    this.proySrv.EMPLEADOS.updateImageEmpleado(
      this.empleado.id,
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

  getUrlImageEmpleado(empleado: Empleado) {
    return `${IMAGENES_EMPLEADO_URL_BASE}${
      empleado.id
    }.jpeg?pseudo=${Date.now()}`;
  }
}
