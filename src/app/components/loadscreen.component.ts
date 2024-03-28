import { Component } from '@angular/core';
import { SpinnerComponent } from '../shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-loadscreen',
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <p>Preparing your playlist!!</p>
    <app-spinner></app-spinner>
  `,
  styles: `

    :host {
      background-color: black;
      width: 100%;
      height: 100vh;
      padding-top: 60px;
      display: block;
    }

    p {
      font-size: 50px;
      color: #D53349;
      font-weight: bold;
      font-family: dkaurevoir;
      text-align: center;
      margin-top: 20vh;
    }

  `,
})
export class LoadscreenComponent {}
