import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Contact } from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactListService {

  constructor(private http: HttpClient) { }

  getContacts() {
    return firstValueFrom(this.http.get('http://localhost:1000/contacts'))
  }

  getContact(id: any) {
    return firstValueFrom(this.http.get(`http://localhost:1000/contact/${id}`))
  }

  addContact(newContact: Contact) {
    return firstValueFrom(this.http.post(`http://localhost:1000/contacts`, { name: newContact.name, phone: newContact.phone }));
  }

  updateContact(contact: Contact) {
    return firstValueFrom(this.http.put(`http://localhost:1000/contacts/${contact.id}`, contact))
  }

  deleteContact(id: any) {
    return firstValueFrom(this.http.delete(`http://localhost:1000/contacts/${id}`))
  }
}
