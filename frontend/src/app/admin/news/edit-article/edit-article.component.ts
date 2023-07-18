import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent {
  news!: Partial<News>;
  content!: string;
  imgUrl!: string;
  title!: string;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { 
    this.content = config.data.news.content;
    this.title = config.data.news.title;
    this.imgUrl = config.data.news.imgUrl;
  }


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
