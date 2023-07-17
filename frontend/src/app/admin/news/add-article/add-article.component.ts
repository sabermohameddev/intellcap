import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {
  news!: Partial<News>;
  content!: string;
  imgUrl!: string;
  title!: string;
  constructor(public ref: DynamicDialogRef) { }


  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Read the file using FileReader
      const reader = new FileReader();
      reader.onload = () => {
        // Set the base64-encoded image data to the newNews object
        this.imgUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  confirm(): void {
    this.news = {
      title: this.title,
      content: this.content,
      imgUrl: this.imgUrl,
    }
    this.ref.close(this.news);
  }

  cancel(): void {
    this.ref.close(null);
  }
}
