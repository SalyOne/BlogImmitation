import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {NotificationService} from '../services/notification.service';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message =
        error.error?.message ||
        error.statusText ||
        'შეიქმნა პრობლემა, გჰთხოვთ სცადეთ თავიდან.';

      snackBar.message(message, 'error');

      return throwError(() => error);
    })
  );
};
