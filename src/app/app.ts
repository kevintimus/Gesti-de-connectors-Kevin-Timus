import {Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConectorBD } from './Connectors/conector-bd';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('GestorConectorsKevinTimus');
  empleats: any[] = [];


  constructor(private connector: ConectorBD) {}

  ngOnInit() {
    this.connector.getEmpleats().subscribe(empleats => {
      console.log(empleats);
    })

    this.connector.getDepartements().subscribe(departaments => {
      console.log(departaments);
    })

    this.connector.crearTaula().subscribe({
      next: (data) => {
        console.log(data.missatge);
      },
      error: (err) => {
        console.error(err.error);
      }
    });

    /*
    this.connector.inserirDepartamento('Ventas', 'Planta 4').subscribe({
      next: (data: any) => console.log(data),
      error: (err: any) => console.error(err)
    });

    this.connector.inserirEmpleado('Eric', 'Malo', 1234, 4).subscribe({
      next: (data: any) => console.log(data),
      error: (err: any) => console.error(err)
    });
     */

    this.connector.modificarEmpleat(5, 'Eric Modificat', 9999).subscribe({
      next: (data: any) => console.log(data),
      error: (err: any) => console.error(err)
    });

    this.connector.empleadoPorDepartamento(1 ).subscribe({
      next: (data: any) => {
        this.empleats = data
        console.log(data);
      },
      error: (err: any) => console.error(err)
    });

    this.connector.eliminarEmpleats(4).subscribe({
      next: (data: any) => console.log(data),
      error: (err: any) => console.error(err)
    });






  }

}
