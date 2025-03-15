import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const RequestInterceptor: HttpInterceptorFn = (req, next) => {
  const request = req.clone({
    setHeaders:
      req.method !== 'GET' ? { 'Content-Type': 'application/json' } : {},
  });

  return next(request).pipe(
    catchError((error) => {
      let errorMessage = 'Ocurrió un error inesperado.';
      
      if (error.status === 400) {
        errorMessage = 'Solicitud incorrecta. Verifica los datos.';
      } else if (error.status === 404) {
        errorMessage = 'Recurso no encontrado.';
      } else if (error.status === 500) {
        errorMessage = 'Error en el servidor. Inténtalo más tarde.';
      }
      return throwError(() => new Error(errorMessage));
    })
  );
};
