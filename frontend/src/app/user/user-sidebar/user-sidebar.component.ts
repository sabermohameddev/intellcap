import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/services/auth.service';
import { NewProjectComponent } from '../projects/new-project/new-project.component';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent {
  currentUser = this.authService.getCurrentUser();

  constructor(private authService: AuthService, private dialogService: DialogService) {}

  logout(): void {
    this.authService.logout();
    // Perform any additional logout actions if needed
}

  isSubMenuOpen = false;

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  openNewProjectDialog() {
    const ref = this.dialogService.open(NewProjectComponent, {
      header: 'New Project',
      width: '70%',
    });
  }
}
