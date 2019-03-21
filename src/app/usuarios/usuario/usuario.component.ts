import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as fromUsuarioActions from '../../store/actions/usuario.actions';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit, OnDestroy {

  subscriptio: Subscription = new Subscription();

  usuario: Usuario = null;
  loading: boolean;
  constructor(private router: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.router.params
      .subscribe( params => {
        const id = params.id;
        this.store.dispatch(new fromUsuarioActions.CargarUsuario(id));
      });

    this.store.select('usuario')
      .subscribe(usuario => {
        this.usuario = usuario.usuario;
        this.loading = usuario.loading;
      });
  }

  ngOnDestroy() {
    this.subscriptio.unsubscribe();
  }

}
