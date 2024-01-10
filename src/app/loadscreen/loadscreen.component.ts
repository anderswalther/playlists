import { Component } from '@angular/core';

@Component({
  selector: 'app-loadscreen',
  standalone: true,
  imports: [],
  template: `
    <p>Din playliste klargøres!!</p>
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
