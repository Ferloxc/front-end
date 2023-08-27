import { Component,ViewEncapsulation  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

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

   output = `<html>
                    <style>
                    .body {
                      background-color: #000;
                    }
                    </style>
                    <body>
                      <h1 style="color: white;"></h1>
                    <script type="text/javascript">
                    </script>
                    </body>
                  </html>`

  outputRun = "";

  constructor(private sanitizer: DomSanitizer, private router: Router) {}


  getIframeContent(): SafeHtml {
    const html = this.outputRun;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  Run() {
    this.outputRun = `<html><head><style>${this.cssCode}</style></head><body>${this.htmlCode}<script>${this.jsCode}</script></body></html>`;
  }

  Save() {
    console.log('HTML Code:', this.htmlCode);
    console.log('CSS Code:', this.cssCode);
    console.log('JavaScript Code:', this.jsCode);

    alert('Códigos guardados exitosamente.');
  }

  ViewProjects() {
    this.router.navigate(['/manager']); 
  }

}