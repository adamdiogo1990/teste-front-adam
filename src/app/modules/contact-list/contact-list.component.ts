import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/Contact';
import { ContactListService } from 'src/app/services/contact-list.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit{

  contacts:Contact[] = [];
  loading: boolean = false;
  contact: Contact = { name: '', phone: '' };
  

  constructor(private contactListService: ContactListService, private router: Router) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.loading = true;
    this.contactListService.getContacts()
      .then((data: any) => {
        this.loading = false;
        this.contacts = data;
      });
  }

  editContact(id: any) {
    this.router.navigate([`/contact-form/edit/${id}`]);
  }

  deleteContact(id: any) {

    Swal.fire({
      title: 'Do you want delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactListService.deleteContact(id)
        .then(() => {
          Swal.fire({
            title: 'Deleted',
            heightAuto: false
          })
          this.getContacts();
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

    
  }
  

}
