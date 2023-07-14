import { Component, Inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete-announcement',
  templateUrl: './delete-announcement.component.html',
  styleUrls: ['./delete-announcement.component.scss']
})
export class DeleteAnnouncementComponent {
  message: string;

  constructor(
    public ref: DynamicDialogRef,
    @Inject(DynamicDialogConfig) private config: DynamicDialogConfig
  ) {
    this.message = this.config.data.message;
  }

  confirm(): void {
    this.ref.close(true);
  }

  cancel(): void {
    this.ref.close(false);
  }
}
