import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apiService/api-service.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RenderProject } from 'src/models/projectRender';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private api: ApiService,
    private router: Router
  ) {}

  projects: RenderProject[] = [];

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((res) => {
      if (res && res.uid) {
        this.api.getUserProjects(res.uid).then((result) => {
          // console.log(result);
          // console.log(result.data);
          this.projects = result.data;
        });
      }
    });
  }

  openProject(project: RenderProject) {
    // Add logic to open the selected project
    console.log(`Opening project: ${project.Name}`);
    const id = project._id;
    this.router.navigate(['/code', id]);
  }
}
