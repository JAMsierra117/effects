import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import * as fromUsuarioActions from '../actions';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';


@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ) {}

    @Effect()
    cargarUsuario$ = this.actions$.
        pipe(
            ofType(fromUsuarioActions.CARGAR_USUARIO),
            mergeMap((action: any) => {
                return this.usuarioService.getUser(action.id)
                    .pipe(
                        map( usuario => new fromUsuarioActions.CargarUsuarioSuccess(usuario)),
                        catchError((error) => of( new fromUsuarioActions.CargarUsuarioFail(error)))
                    );
                })
            );

}

