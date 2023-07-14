import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';
import { DeleteAnnouncementComponent } from './delete-announcement/delete-announcement.component';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];
  showMenu: boolean[] = [];

  constructor(private announcementService: AnnouncementService, private authService: AuthService, public dialogService: DialogService) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  triggerMenu(i: number) {
    this.showMenu[i] = !this.showMenu[i]
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

  confirmDelete(announcement: Announcement): void {
    const dialogRef = this.dialogService.open(DeleteAnnouncementComponent, {
      header: 'Confirmation',
      width: '400px',
      contentStyle: { 'max-height': '200px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        message: `Are you sure you want to delete this announcement?`
      }
    });

    dialogRef.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteAnnouncement(announcement);
      }
    });
  }

  deleteAnnouncement(announcement: Announcement): void {
    this.announcementService.deleteAnnouncement(announcement.id).subscribe(
      () => {
        this.announcements = this.announcements.filter(a => a.id !== announcement.id);
      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );
  }

  addAnnouncement() {
    
  }

}
