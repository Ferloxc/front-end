import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface Snippet {
  language: string;
  code: string;
}

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent {
  selectedLanguage: string = 'html';
  snippetCode: string = '';
  snippets: Snippet[] = [];


  constructor(private router: Router) {}


  addSnippet() {
    if (this.snippetCode) {
      const newSnippet: Snippet = {
        language: this.selectedLanguage,
        code: this.snippetCode
      };
      this.snippets.push(newSnippet);
      this.snippetCode = '';
    }
  }
  saveSnippets() {
    // Aquí puedes implementar la lógica para guardar los snippets en algún servicio o backend
    console.log('Guardando los snippets:', this.snippets);
    alert('Snippets guardados exitosamente.');
  }

  viewProjects() {
    // Navegar a la página de proyectos guardados
    this.router.navigate(['/manager']);
  }


}
