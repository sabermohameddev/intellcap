import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  selectedRole!: string;
  phone!: string;
  address!: string;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.selectedRole = this.config.data.currentProffesion;
    this.phone = this.config.data.currentPhone;
    this.address = this.config.data.currentAddress;
  }

  

  confirm(): void {
    const data: Partial<User> = {
      address: this.address,
      phoneNumber: this.phone,
      profession: this.selectedRole
    }
    this.ref.close(data);
  }

  cancel(): void {
    this.ref.close(null);
  }
}