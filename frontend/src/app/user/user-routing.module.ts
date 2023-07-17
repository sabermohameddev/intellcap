import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ArticlesComponent } from './articles/articles.component';
import { GlobalChatComponent } from './global-chat/global-chat.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'calendar', component: CalendarComponent},
      { path: 'news', component: ArticlesComponent},
      { path: 'global', component: GlobalChatComponent},
      { path: 'profile', component: UserProfileComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
