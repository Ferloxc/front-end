import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent {
  name: string;
  code: string;


  constructor(private router: Router) {}

  saveSnippets() {
    if(this.name && this.code){
      console.log('Guardando los snippets:', this.name, this.code);
    }    
  }

  viewProjects() {
    // Navegar a la página de proyectos guardados
    this.router.navigate(['/manager']);
  }


}
