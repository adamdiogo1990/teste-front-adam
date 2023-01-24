import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/Contact';
import { Error } from 'src/app/models/Error';
import { ContactListService } from 'src/app/services/contact-list.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  contact:Contact = { name: '', phone: '' };
  error:Error = { error: false, message: '' };
  loading: boolean = false;
  action: string = "";
  title: string = "";

  constructor(private route: ActivatedRoute,private contactListService: ContactListService, private router: Router){
    
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {

      this.contact.id = params['id'];
      this.action = params['action'];
      if(this.action === 'add'){
        this.title =  'Register Form';
        this.loading = false;
      }else if(this.action === 'edit'){
        this.title =  'Edit Form';
        this.contactListService.getContact(this.contact.id)
        .then((data: any) => {
          this.loading = false;
          this.contact = data;
        });
      }else{
        this.router.navigate(['/contact-list']);
      }
      
    })
    
  }

  submit(){
    this.action === 'add' ? this.addForm()  : this.editForm()
  }

  addForm(){
    this.loading = true;
    this.contactListService.addContact(this.contact)
    .then(() => {
      this.contact = { name: '', phone: '' };
      Swal.fire({
        title: 'Success',
        heightAuto: false
      })
      this.router.navigate(['/contact-list']);
    }).catch((error:any) => {
      this.error.error = true;
      this.error.message = error.message;
      this.loading = false;
      console.warn('from component:', error);
      // this console warn never gets logged out
    });
  }

  editForm(){
    this.loading = true;
    this.contactListService.updateContact(this.contact)
    .then(() => {
      this.contact = { name: '', phone: '' };
      Swal.fire({
        title: 'Success',
        heightAuto: false
      })
      this.router.navigate(['/contact-list']);
    }).catch((error:any) => {
      this.error.error = true;
      this.error.message = error.message;
      this.loading = false;
      console.warn('from component:', error);
      // this console warn never gets logged out
    });
  }
}
