import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from "../../service/contacts.service";

import { Contact } from "../../interface/contact";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contactsObject: any = {}
  contacts: Contact[] = []
  amount: number = 0;

  contact: Contact = {
    id: 0,
    title: "",
    phone: "",
    created: new Date()
  }

  constructor(private contactService: ContactsService, private router: Router) { }

  ngOnInit(): void {
    this.contactsLoad()
  }

  contactsLoad() {
    this.contactService.contacts().subscribe(
      res => {
        this.contactsObject = res
        this.contacts = this.contactsObject.contacts
        this.amount = this.contactsObject.count
      },
      err => {
        console.error(err)
      }
    )
  }

  uploadContact() {
    delete this.contact.id;
    delete this.contact.created;
    parseInt(this.contact.phone);

    this.contactService.createContacts(this.contact).subscribe(
      res => {
        this.contactsLoad()
        this.contact.title = "";
        this.contact.phone = "";
      },
      err => {
        console.error(err)
      }
    )
  }

  getContacts(id: number) {
    this.router.navigate([`/${id}`])
  }

}
