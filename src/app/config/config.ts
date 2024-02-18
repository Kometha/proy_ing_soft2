import { environment } from "../environments/environment";

export const Header = {
  //Autorization: --> Se asigna a cada peticion desde un interceptor
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
export const WEB_SERVICE = environment.host;
