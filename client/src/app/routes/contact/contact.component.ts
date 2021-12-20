import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContactsService } from "../../service/contacts.service";

import { Contact } from "../../interface/contact";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: Contact = {
    id: 0,
    title: "",
    phone: "",
    created: new Date()
  }

  constructor(private contactService: ContactsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params.id) {
      delete this.contact.id

      this.contactService.getContact(params.id).subscribe(
        res => {
          this.contact.title = res.title
          this.contact.phone = res.phone
          this.contact.created = res.created
        },
        err => {
          console.error(err)
        }
      )
    }
  }

  remove() {
    const params = this.activatedRoute.snapshot.params;
    if(params.id) {
      this.contactService.removeContacts(params.id).subscribe(
        res => {
          this.router.navigate(["/"])
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
      this.router.navigate([`/update/${params.id}`])
    }
  }

}
