import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent {
  article: News | undefined;

  constructor(private newsService: NewsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.getArticleDetails(+articleId);
    }
  }

  getArticleDetails(id: number): void {
    this.newsService.getNewsById(id)
      .subscribe(
        article => {
          this.article = article;
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
  }
}
