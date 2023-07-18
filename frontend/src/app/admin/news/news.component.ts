import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { AuthService } from 'src/app/services/auth.service';
import { AddArticleComponent } from './add-article/add-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsList: News[] = [];
  currentUser = this.authService.getCurrentUser();

  constructor(private newsService: NewsService, public dialogService: DialogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    this.newsService.getNews()
      .subscribe(
        newsList => {
          this.newsList = newsList;
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
  }

  editModal(news: News) {
    const dialogRef = this.dialogService.open(EditArticleComponent, {
      header: 'Edit Article',
      width: '70%',
      contentStyle: { 'min-height': '200px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        news: news
      }
    });

    dialogRef.onClose.subscribe((data: News) => {
      if (data) {
        data.author = this.currentUser!;
        data.createdAt = new Date(); 
        console.log(data);
        // this.addAnnouncement(data);
      }
    });
  }

  addModal(): void {
    const dialogRef = this.dialogService.open(AddArticleComponent, {
      header: 'New Article',
      width: '70%',
      contentStyle: { 'min-height': '200px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    dialogRef.onClose.subscribe((data: News) => {
      if (data) {
        data.author = this.currentUser!;
        data.createdAt = new Date(); 
        // console.log(data);
        this.addAnnouncement(data);
      }
    });
  }

  addAnnouncement(data: News) {
    this.newsService.saveNews(data).subscribe(
      (news: News) => {
              this.newsList.unshift(news); // Add the new announcement at the beginning of the array
            },
            (error: any) => {
              console.error('An error occurred:', error);
            }
    )
  }

  confirmDeleteNews(news: News): void {
    const dialogRef = this.dialogService.open(DeleteConfirmationComponent, {
      header: 'Confirmation',
      width: '400px',
      contentStyle: { 'max-height': '200px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        message: `Are you sure you want to delete the article "${news.title}"?`
      }
    });

    dialogRef.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteNews(news);
      }
    });
  }

  deleteNews(news: News): void {
    this.newsService.deleteNews(news.id!).subscribe(() => {
      // Remove the deleted news from the list
      this.newsList = this.newsList.filter(item => item.id !== news.id);
    });
  }
}