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
    puesto: {},
    genero: {},
    tipoPago: {},
    idPuesto: 0, // Inicializar como necesario
    idGenero: 0, // Inicializar como necesario
    idTipoPago: 0, // Inicializar como necesario
  } as Empleado;




  constructor(private proySrv: ProyIngSoftService, private alerta: AlertaService) {
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
    if (!this.aliasEmpleadoBuscado.trim()) {
      return;
    }

    this.empleado = this.empleados.find((p) => p.alias === this.aliasEmpleadoBuscado);

    if (this.empleado) {
      this.newEmpleado = structuredClone(this.empleado);
      this.nombreCompleto = this.newEmpleado.nombre + ' ' + this.newEmpleado.apellido;
    }
    console.log(this.empleado);
    if( this.empleado?.puesto){
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
    this.proySrv.EMPLEADOS.updateEmpleado(this.newEmpleado!).subscribe(
      () => {
        this.alerta.showSuccess('Empleado actualizado!');
        this.obtenerEmpleados();

      }
    );
  }

  getUrlImageEmpleado(empleado: Empleado) {
    return `${IMAGENES_EMPLEADO_URL_BASE}${
      empleado.id
    }.jpeg?pseudo=${Date.now()}`;
  }
}
