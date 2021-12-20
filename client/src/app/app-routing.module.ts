import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent } from "../app/routes/contacts/contacts.component";
import { ContactComponent } from "../app/routes/contact/contact.component";
import { UpdateComponent } from "../app/routes/update/update.component";

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent
  },
  {
    path: ':id',
    component: ContactComponent
  },
  {
    path: 'update/:id',
    component: UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
