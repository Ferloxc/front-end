import { Component } from '@angular/core';

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
}
