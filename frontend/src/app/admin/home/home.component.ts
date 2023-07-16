import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent {

  currentDate = new Date();
  users!: User[];
  currentUser: User | null = this.authService.getCurrentUser();
  announcements: Announcement[] = [];


  constructor(private userService: UserService, private authService: AuthService, private announcementService: AnnouncementService) {
    this.loadUsers();
    this.loadAnnouncements();
  }


  loadAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe(
      (announcements: Announcement[]) => {
        this.announcements = announcements
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 2);
      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );
  }
  
  
  loadUsers(): void {
    this.userService.getAllUsers()
      .subscribe(
        users => {
          // Sort the users based on the created date in descending order
          users.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());
          
          // Take the first 3 users
          this.users = users.slice(0, 3);
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
  }
  


}
