import { Component,ViewEncapsulation  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CodingComponent {
  htmlCode: string = '';
  cssCode: string = '';
  jsCode: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  getIframeContent(): SafeHtml {
    const html = `<html><head><style>${this.cssCode}</style></head><body>${this.htmlCode}<script>${this.jsCode}</script></body></html>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }


}
