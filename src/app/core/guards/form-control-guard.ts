import {CanDeactivateFn} from '@angular/router';
import {ConfirmDialog} from '../../shared/components/confirm-dialog/confirm-dialog';
import {map} from 'rxjs';
import {inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const formControlGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {

  if (!component?.canDeactivate?.()) {
    const dialog = inject(MatDialog);

    return dialog.open(ConfirmDialog, {
      data: {
        title: 'შეცვლილი მონაცემები არ არის შენახული',
        message: 'ნამდვილად გსურთ გვერდის დატოვება?',
        confirmText: 'დიახ',
        cancelText: 'არა'
      },

    }).afterClosed()
      .pipe(map(result => !!result));
  }

  return true;
};
