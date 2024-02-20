import { Component } from '@angular/core';
import { ProyIngSoftService } from '../../services/proy-ing-soft.service';
import { Empleado } from '../../interfaces/empleado';
import { Genero, Puesto, TipoPago } from '../../interfaces/misc-types';
import { URL_BASE, IMAGES_FOLDERS } from '../../../../config/config';

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

  nombreEmpleadoBuscado = '';

  newEmpleado: Empleado = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
    alias: '',
    salario: 9000,
    observaciones: '',
    idPuesto: 0, // Inicializar como necesario
  } as Empleado;




  constructor(private proySrv: ProyIngSoftService) {
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

  obtenerGeneros(){
    this.proySrv.EMPLEADOS.getGeneros().subscribe((res) => {
      this.generos = res;
    });
  }

  obtenerTiposPago(){
    this.proySrv.TIPOS_O_FORMAS.getTiposPago().subscribe((res) => {
      this.tipoPago = res;
    });
  }

  guardarEmpleado() {
    this.proySrv.EMPLEADOS.crearEmpleado(this.newEmpleado).subscribe((res) => {
    });
  }

  buscarEmpleado() {
    if (!this.nombreEmpleadoBuscado.trim()) {
      return;
    }

    this.empleado = this.empleados.find((p) => p.nombre === this.nombreEmpleadoBuscado);

    if (this.empleado) {
      this.newEmpleado = structuredClone(this.empleado);
      this.nombreCompleto = this.newEmpleado.nombre + ' ' + this.newEmpleado.apellido;
    }
    console.log(this.empleado);
  }

  getUrlImageEmpleado(empleado: Empleado) {
    return `${IMAGENES_EMPLEADO_URL_BASE}${
      empleado.id
    }.jpeg?pseudo=${Date.now()}`;
  }
}
