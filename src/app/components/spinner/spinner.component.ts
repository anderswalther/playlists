import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  `,
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {}
