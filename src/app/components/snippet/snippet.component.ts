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
  language: string = ''; 
  code: string = ''; 
  snippets: Snippet[] = []; 

  constructor(private router: Router) {}

  addSnippet() {
    if (this.code && this.language) {
      const newSnippet: Snippet = {
        language: this.language,
        code: this.code
      };
      this.snippets.push(newSnippet);
      this.language = ''; 
      this.code = '';
    }
  }
  
  viewProjects() {
    this.router.navigate(['/manager']);
  }
}
