import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/apiService/api-service.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CodingComponent implements OnInit {
  IdProject: string = '';
  htmlCode: string = '';
  cssCode: string = '';
  jsCode: string = '';
  name: string = '';
  description: string = '';
  outputRun = '';
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
  </html>`;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    let idProject = this.route.snapshot.paramMap.get('idProject');
    // console.log('idProject', idProject);
    if (idProject) {
      this.IdProject = idProject;
      this.api.getProjectById(idProject).then((response) => {
        const { data } = response;
        const { HtmlFile, CssFile, JsFile } = data;
        this.htmlCode = HtmlFile.FileData;
        this.cssCode = CssFile.FileData;
        this.jsCode = JsFile.FileData;
      });
    }

    // Ahora puedes usar this.id en tu componente
  }

  getIframeContent(): SafeHtml {
    const html = this.outputRun;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  Run() {
    this.outputRun = `<html><head><style>${this.cssCode}</style></head><body>${this.htmlCode}<script>${this.jsCode}</script></body></html>`;
  }

  Save() {
    // Validate User
    this.saveProject();
  }

  private saveProject = async () => {
    try {
      const Userlogged = await this.authService.userLoggued();
      if (!Userlogged) this.router.navigate(['/login']);
      const { user } = Userlogged.multiFactor;

      if (this.IdProject) {
        // Update
        const data = {
          idProject: this.IdProject,
          UserId: user.uid,
          ProjectName: this.name,
          ProjectDescription: '',
          HtmlFile: this.htmlCode,
          CssFile: this.cssCode,
          JsFile: this.jsCode,
        };
        this.api.updateProject(data).then((result) => {
          if (result.data) alert('Códigos guardados exitosamente.');
        });
      } else {
        // Create
        const data = {
          UserId: user.uid,
          UserEmail: '',
          ProjectName: this.name,
          HtmlFile: this.htmlCode,
          CssFile: this.cssCode,
          JsFile: this.jsCode,
        };
        this.api.createProject(data).then((result) => {
          if (result.data) {
            const { _id } = result.data;
            this.IdProject = _id;
            alert('Códigos guardados exitosamente.');
          }
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  ViewProjects() {
    this.router.navigate(['/manager']);
  }
}
