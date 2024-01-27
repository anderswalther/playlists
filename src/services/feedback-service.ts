import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string): void {
    this.toastr.success('message');
  }

  showWarning(message: string): void {
    this.toastr.warning(message);
  }
}
