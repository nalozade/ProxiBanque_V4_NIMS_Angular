import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { Client } from '../model/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  client: Client[]= [] ;

  constructor(
    public service: ClientService, private router: Router
  ) {   }

  ngOnInit() {
     this.loadClients()
  }

  
  loadClients() {
    return this.service.getClients().subscribe((data: Client[]) => { console.log(data);
      this.client = data; 
    })
  }

  deleteClient(id) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.service.deleteClient(id).subscribe(data => {
        this.loadClients()
      })
    }
  }  

  clientSelected(clientId: number) {
    this.router.navigate(['/client-show'], { queryParams: { id: clientId } });
  }

}