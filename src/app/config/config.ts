import { environment } from '../environments/environment';

export const Header = {
  //Autorization: --> Se asigna a cada peticion desde un interceptor
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const WEB_SERVICE = environment.host;

export const DATA_USER_KEY = 'usuario';
export const PERMISOS_KEY = 'permisos';

export const PERMISOS_MODULOS = {
  dashboard: null,
  recursosHumanos: [1, 5, 6],
  mercadeo: [1, 2, 6],
  compras: [1, 3, 6],
  ventas: [1, 4, 6],
};

export const IMAGES_DOMAIN = 'https://sclhbbqnazoerbywpwrw.supabase.co';
export const STORAGE_ROUTE = 'storage/v1/object/public';
export const PROJECT_BUCKET = 'is_documents_and_files';

export const URL_BASE = `${IMAGES_DOMAIN}/${STORAGE_ROUTE}/${PROJECT_BUCKET}`;
export const IMAGES_FOLDERS = {
  empleados: 'empleados',
  productos: 'productos',
};
