import { Component } from '@angular/core';

interface Project {
  name: string;
  // Add more properties as needed
}

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent {

  projects: Project[] = [
    { name: 'Project 1 asdasdasd' },
    { name: 'Project 2' },
    { name: 'Project 3 asd asd asd a' },
    { name: 'Project 3' },
    { name: 'Project 3' },
    { name: 'Project 3' },
    { name: 'Project 3' },
    { name: 'Project 3' },
    { name: 'Project 1 asdasdasd' },
    { name: 'Project 2' },
    { name: 'Project 3' },
    { name: 'Project 3' },
    { name: 'Project 3' },
    { name: 'Project 3' },
    { name: 'Project 3' },
    { name: 'Project 3' },


    // Add more projects here
  ];

  openProject(project: Project) {
    // Add logic to open the selected project
    console.log(`Opening project: ${project.name}`);
  }

}
