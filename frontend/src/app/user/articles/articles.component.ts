import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  newsList: News[] = [];

  constructor(private newsService: NewsService) { }

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

  newsDetails(news: News) {

  }
}
