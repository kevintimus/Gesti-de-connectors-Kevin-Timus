import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConectorBD {

  constructor(private http: HttpClient) {}

  getEmpleats() {
    return this.http.get('http://localhost:3000/empleats')
  }

  getDepartements() {
    return this.http.get('http://localhost:3000/departaments')
  }

  crearTaula() {
    return this.http.post<any>('http://localhost:3000/crearTaula', {});
  }

  /*inserirDepartamento(nom: string, ubicacio: string) {
    return this.http.post<any>('http://localhost:3000/crearDepartamento', {nom,ubicacio });
  }

  inserirEmpleado(nom: string, cognom: string, salari: number, id_departament: number) {
    return this.http.post<any>('http://localhost:3000/crearEmpleados', { nom, cognom, salari, id_departament });
  }

  */

  modificarEmpleat(id_empleat: number, nom: string, salari: number) {
    return this.http.put('http://localhost:3000/cambiarDatos', { id_empleat, nom, salari }, { responseType: 'text' });
  }

  empleadoPorDepartamento(id: number) {
   return this.http.get(`http://localhost:3000/EmpleadosPorDepartamento/${id}`);
  }

  eliminarEmpleats(id_departament: number) {
    return this.http.delete('http://localhost:3000/eliminarEmpleats', { body: { id_departament }, responseType: 'text' });
  }
}
