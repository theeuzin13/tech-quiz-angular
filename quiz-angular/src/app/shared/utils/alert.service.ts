import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: message,
      confirmButtonColor: '#d33'
    });
  }

  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: message,
      confirmButtonColor: '#3085d6'
    });
  }

  confirm(message: string) {
    return Swal.fire({
      icon: 'warning',
      title: 'Tem certeza?',
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    });
  }
}
