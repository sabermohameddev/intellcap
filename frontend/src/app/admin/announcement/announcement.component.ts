import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];

  constructor(private announcementService: AnnouncementService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe(
      (announcements: Announcement[]) => {
        this.announcements = announcements;
      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );
  }

  // createAnnouncement(content: string): void {
  //   const currentUser = this.authService.getCurrentUser();
  //   if (!currentUser) {
  //     // Handle the case when the current user is not available
  //     return;
  //   }
  //   const newAnnouncement: Announcement = {
      
  //     content,
  //     createdAt: new Date(),
  //     author: currentUser
  //   };

  //   this.announcementService.createAnnouncement(newAnnouncement).subscribe(
  //     (announcement: Announcement) => {
  //       this.announcements.unshift(announcement); // Add the new announcement at the beginning of the array
  //     },
  //     (error: any) => {
  //       console.error('An error occurred:', error);
  //     }
  //   );
  // }

  deleteAnnouncement(announcement: Announcement): void {
    if (confirm('Are you sure you want to delete this announcement?')) {
      this.announcementService.deleteAnnouncement(announcement.id).subscribe(
        () => {
          this.announcements = this.announcements.filter(a => a.id !== announcement.id);
        },
        (error: any) => {
          console.error('An error occurred:', error);
        }
      );
    }
  }

  addAnnouncement() {
    
  }
}
