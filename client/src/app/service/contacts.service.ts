import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Contact } from "../interface/contact";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  public API: string = "http://localhost:4300"

  constructor(private httpService: HttpClient) { }

  contacts() {
    return this.httpService.get<Contact[]>(`${this.API}/contacts`)
  }
  getContact(id: number) {
    return this.httpService.get<Contact>(`${this.API}/contacts/${id}`)
  }
  createContacts(contactData: Contact) {
    return this.httpService.post(`${this.API}/createcontacts`, contactData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
  removeContacts(id: number) {
    return this.httpService.delete(`${this.API}/removecontacts/${id}`)
  }
  updateContacts(id: number, contactData: Contact) {
    return this.httpService.put(`${this.API}/updatecontacts/${id}`, contactData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }

}
