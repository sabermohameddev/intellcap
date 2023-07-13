import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent {
  currentPassword!: String;
  newPassword!: String;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  confirm(): void {

    const data = [this.currentPassword, this.newPassword]
    console.log(data)
    this.ref.close(data);
  }

  cancel(): void {
    this.ref.close(null);
  }
}

