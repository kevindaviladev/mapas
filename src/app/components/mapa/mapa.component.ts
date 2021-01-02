import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;

  marcadores: Marcador[] = [];


  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { 
    if(localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
  }

  agregarMarcador(evento:any){
    // console.log(evento);
    const coords:{ lat:number,lng:number } = evento.coords;
    // console.log(coords)  ;
    const nuevoMarcador = new Marcador(coords.lat,coords.lng);
    this.marcadores.push(nuevoMarcador);

    this.guardarEnStorage();
    this.editarMarcador(nuevoMarcador);
  }

  guardarEnStorage(){
    localStorage.setItem('marcadores',JSON.stringify(this.marcadores));
  }

  borrarMarcador(index: number){
    this.marcadores.splice(index,1);
    this.guardarEnStorage();
    this.openSnackBar('Marcador borrado', 'Éxito');
  }

  openSnackBar(mensaje:string, accion:string) {
    this._snackBar.open(mensaje, accion, {
      duration: 2000,
    });
  }

  editarMarcador(marcador: Marcador){
    const dialogRef = this.dialog.open( MapaEditarComponent, {
      width: '250px',
      data: { titulo:marcador.titulo, descripcion: marcador.descripcion }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if(!result) return;
      marcador.titulo = result.titulo;
      marcador.descripcion = result.descripcion;

      this.guardarEnStorage();
      this.openSnackBar('Marcador actualizado','Exito');
    });

  }

}
