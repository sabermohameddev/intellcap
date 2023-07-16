import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {
  content!: string;
  title!: string;
  
  constructor(public ref: DynamicDialogRef) { }

  confirm(): void {
    this.ref.close(this.content);
  }

  cancel(): void {
    this.ref.close(null);
  }
}
