import { Component } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';
import { Empleado, EmpleadoCreate } from '../../interfaces/empleado';
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
  newEmpleado: EmpleadoCreate = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    idPuesto: 0,
    idGenero: 0,
    alias: '',
    password: '',
    salario: 0,
    idTipoPago: 0,
  };

  puestos: Puesto[] = [];
  generos: Genero[] = [];
  tipoPago: TipoPago[] = [];
  formValido = true;
  newPassword: string = '';

  visibleModalNuevoEmpleado = true;

  aliasEmpleadoBuscado = '';

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
      if (this.empleado) {
        this.buscarEmpleado();
      }
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
    if (!this.empleado) return false;

    if (
      this.empleado.nombre &&
      this.empleado.apellido &&
      this.empleado.email &&
      this.empleado.telefono &&
      this.empleado.alias &&
      this.empleado.salario &&
      this.empleado.observaciones &&
      this.empleado.puesto.id &&
      this.empleado.genero.id &&
      this.empleado.tipoPago.id
    ) {
      return true;
    }
    this.formValido = false;
    this.alerta.showWarn('Por favor, llene todos los campos');
    return false;
  }

  marcarComoDirtyNuevoEmpleado(): boolean {
    if (
      this.newEmpleado.nombre &&
      this.newEmpleado.apellido &&
      this.newEmpleado.email &&
      this.newEmpleado.telefono &&
      this.newEmpleado.alias &&
      this.newEmpleado.salario &&
      this.newEmpleado.password &&
      this.newEmpleado.idPuesto &&
      this.newEmpleado.idGenero &&
      this.newEmpleado.idTipoPago
    ) {
      return true;
    }
    this.formValido = false;
    this.alerta.showWarn('Por favor, llene todos los campos');
    return false;
  }

  crearEmpleado() {
    if (!this.marcarComoDirtyNuevoEmpleado()) {
      return this.alerta.showWarn('Por favor, llene todos los campos');
    }
    this.proySrv.EMPLEADOS.crearEmpleado(this.newEmpleado).subscribe(() => {
      this.alerta.showSuccess('Empleado creado!');
      this.formValido = true;
      this.obtenerEmpleados();
    });
  }

  buscarEmpleado() {
    if (!this.aliasEmpleadoBuscado.trim()) {
      return;
    }

    const empleadoEncontrado = this.empleados.find(
      (p) => p.alias === this.aliasEmpleadoBuscado
    );

    if (!empleadoEncontrado) return;

    this.empleado = structuredClone(empleadoEncontrado);
    this.newPassword = '';
  }

  handleClickInhabilitado() {
    if (!this.empleado) return this.alerta.showWarn('Seleccione un empleado');

    this.empleado.inhabilitado = this.empleado.inhabilitado;
    this.updateEmpleados();
  }

  updateEmpleados() {
    if (!this.empleado) return this.alerta.showWarn('Seleccione un empleado');

    const {
      nombre,
      apellido,
      email,
      telefono,
      puesto: { id: idPuesto },
      genero: { id: idGenero },
      alias,
      salario,
      tipoPago: { id: idTipoPago },
      id,
    } = this.empleado;

    const updatedEmpleado: EmpleadoCreate = {
      nombre,
      apellido,
      email,
      telefono,
      idPuesto,
      idGenero,
      alias,
      salario,
      idTipoPago,
      password: this.newPassword,
    };
    this.proySrv.EMPLEADOS.updateEmpleado({
      id,
      updatedEmpleado: updatedEmpleado,
    }).subscribe(() => {
      if (this.marcarComoDirty()) {
        this.formValido = true;
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
