import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent {
  content!: String;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  confirm(): void {
    this.ref.close(this.content);
  }

  cancel(): void {
    this.ref.close(null);
  }
}
