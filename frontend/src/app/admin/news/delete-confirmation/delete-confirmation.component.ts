import { Component, Inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {
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
