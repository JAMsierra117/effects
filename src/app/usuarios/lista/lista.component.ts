import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

import * as fromUsuariosActions from '../../store/actions';
import { Observable, Subscription } from 'rxjs';
import { UsuariosState } from '../../store/reducers';




@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  loading: boolean;

  subscription: Subscription = new Subscription();


  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.subscription = this.store.select('usuarios')
      .subscribe(usuarios => {
        this.usuarios = usuarios.usuarios;
        this.loading = usuarios.loading;
      });


    this.store.dispatch(new fromUsuariosActions.CargarUsuarios());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
