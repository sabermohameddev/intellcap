import { Component } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';
import { User } from 'src/app/models/user.model';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentDate = new Date();
  currentUser: User | null = this.authService.getCurrentUser();
  announcements: Announcement[] = [];


  constructor(private authService: AuthService, private announcementService: AnnouncementService) {
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
  
}
