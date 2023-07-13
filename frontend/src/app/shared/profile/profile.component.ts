import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { UserService } from 'src/app/services/user.service';
import { PasswordUpdateComponent } from './password-update/password-update.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  currentUser: User | null = this.authService.getCurrentUser();
  user!: User;
  ref!: DynamicDialogRef;

  constructor(private authService: AuthService, public dialogService: DialogService, private userService: UserService) {}

  showUpdateProfile(user: User): void {
    const professions = ['Fullstack Developer', 'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'Game Developer', 'Movile Developer'];
    this.ref = this.dialogService.open(ProfileUpdateComponent, {
      header: 'Update User',
      width: '50%',
      contentStyle: { 'max-height': '350px', 'overflow': 'auto' },
      baseZIndex: 10000,
      data: {
        currentProffesion: user.profession,
        currentAddress: user.address,
        currentPhone: user.phoneNumber,
        professions: professions
      }
    });

    this.ref.onClose.subscribe((data: Partial<User>) => {
      if (data) {
        this.userService.updateProfile(data).subscribe((res) => {
          this.currentUser = res;
          console.log("Profile Updated")
        });
      }
    });
  }


  showUpdatePassword(): void {
    this.ref = this.dialogService.open(PasswordUpdateComponent, {
      header: 'Update Password',
      width: '50%',
      contentStyle: { 'max-height': '350px', 'overflow': 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((data: string[]) => {
      if (data) {
        const currentPassword = data[0];
        const newPassword = data[1];
        this.userService.updatePassword(this.currentUser!.id, currentPassword, newPassword).subscribe((res) => {
          this.currentUser = res;
          console.log("Password Updated")
        });
      }
    });
  }


}
