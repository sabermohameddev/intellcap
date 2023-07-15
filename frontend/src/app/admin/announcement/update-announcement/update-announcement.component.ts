import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-update-announcement',
  templateUrl: './update-announcement.component.html',
  styleUrls: ['./update-announcement.component.scss']
})
export class UpdateAnnouncementComponent {
  content: String = this.config.data.content;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  confirm(): void {
    this.ref.close(this.content);
  }

  cancel(): void {
    this.ref.close(null);
  }
}
