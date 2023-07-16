import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';
import { DeleteAnnouncementComponent } from './delete-announcement/delete-announcement.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { User } from 'src/app/models/user.model';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];
  showMenu: boolean[] = [];
  currentUser = this.authService.getCurrentUser();

  constructor( private announcementService: AnnouncementService, private authService: AuthService, public dialogService: DialogService) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  triggerMenu(i: number) {
    this.showMenu[i] = !this.showMenu[i]
  }

  loadAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe(
      (announcements: Announcement[]) => {
        this.announcements = announcements.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );
  }


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
    this.announcementService.deleteAnnouncement(announcement.id!).subscribe(
      () => {
        this.announcements = this.announcements.filter(a => a.id !== announcement.id);
      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );
  }

  addModal(): void {
    const dialogRef = this.dialogService.open(AddAnnouncementComponent, {
      header: 'New Announcement',
      width: '50%',
      contentStyle: { 'min-height': '200px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    dialogRef.onClose.subscribe((data) => {
      if (data) {
        this.addAnnouncement(data);
      }
    });
  }

  addAnnouncement(data: string) {
    const announcement = {
      content: data,
      createdAt: new Date(),
      author: this.currentUser!
    }
    this.announcementService.createAnnouncement(announcement).subscribe(
      (announcement: Announcement) => {
              this.announcements.unshift(announcement); // Add the new announcement at the beginning of the array
            },
            (error: any) => {
              console.error('An error occurred:', error);
            }
    )
  }

  updateModal(announcement: Announcement): void {
    const dialogRef = this.dialogService.open(UpdateAnnouncementComponent, {
      header: 'Edit Announcement',
      width: '50%',
      contentStyle: { 'min-height': '200px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        content: announcement.content
      }
    });

    dialogRef.onClose.subscribe((data) => {
      if (data) {
        announcement.content = data
        this.updateAnnouncement(announcement);
      }
    });
  }

  updateAnnouncement(announcement: Announcement) {
    this.announcementService.updateAnnouncement(announcement).subscribe((res) => {
      console.log("Announcement Updated");
    })
  }

}
