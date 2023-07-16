import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Poster } from 'src/app/models/poster';
import { PosterService } from 'src/app/services/poster.service';
import { AddArticleComponent } from '../news/add-article/add-article.component';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent implements OnInit {
  posters: Poster[] = [];
  ref!: DynamicDialogRef;

  constructor(private posterService: PosterService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.loadPosters();
  }

  loadPosters(): void {
    this.posterService.getAllPosters().subscribe(
      (posters: Poster[]) => {
        this.posters = posters;
      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );
  }

  addNewPoster(): void {
    this.ref = this.dialogService.open(AddArticleComponent, {
      header: 'Add New Poster',
      width: '50%',
      contentStyle: { 'max-height': '350px', 'overflow': 'auto' },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((poster: Poster) => {
      if (poster) {
        this.posters.push(poster);
      }
    });
  }
}
