import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContactsService } from "../../service/contacts.service";

import { Contact } from "../../interface/contact";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  contact: Contact = {
    id: 0,
    title: "",
    phone: "",
    created: new Date()
  }

  constructor(private contactsService: ContactsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params.id) {
      this.contactsService.getContact(params.id).subscribe(
        res => {
          this.contact.title = res.title
          this.contact.phone = res.phone
        },
        err => {
          console.error(err)
        }
      )
    }
  }

  update() {
    const params = this.activatedRoute.snapshot.params;
    if(params.id) {
      delete this.contact.id;
      delete this.contact.created;

      this.contactsService.updateContacts(params.id, this.contact).subscribe(
        res => {
          this.router.navigate(["/"])
        },
        err => {
          console.error(err)
        }
      )
    }
  }

}
