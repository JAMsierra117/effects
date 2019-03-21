import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import * as fromUsuariosActions from '../actions';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';


@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ) {}

    @Effect()
    cargarUsuarios$ = this.actions$.
        pipe(
            ofType(fromUsuariosActions.CARGAR_USUARIOS),
            mergeMap(() => this.usuarioService.getUsers()
            .pipe(
                map( usuarios => new fromUsuariosActions.CargarUsuariosSuccess(usuarios)),
                catchError((error) => of(
                    new fromUsuariosActions.CargarUsuariosFail(error))
                )
            ))
        );

}

