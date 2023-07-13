import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import { HomeComponent } from "./home/home.component";
import { UserManagementComponent } from './user-management/user-management.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { NewsComponent } from './news/news.component';
import { AnnouncementComponent } from './announcement/announcement.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'users', component: UserManagementComponent},
      { path: 'profile', component: ProfileContentComponent},
      { path: 'news', component: NewsComponent},
      { path: 'announcements', component: AnnouncementComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
