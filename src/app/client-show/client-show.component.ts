import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Client } from '../model/client';
import { AccountService } from '../services/account.service';
import { Account } from '../model/account';

@Component({
    selector: 'app-client-show',
    templateUrl: './client-show.component.html',
    styleUrls: ['./client-show.component.css']
})
export class ClientShowComponent implements OnInit {


    id: number;
    clientDetails: Client;
    accounts: Account[];
    showDetail: boolean;
    update: boolean = true;
    date: Date = new Date();

    constructor(private service: ClientService, private activatedRoute: ActivatedRoute, private router: Router, private accountService: AccountService) {
        this.id = this.activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.params['id'];
        this.service.getClient(this.id).subscribe((data: Client) => {
            this.clientDetails = data;
        })
    }

    gotoList() {
        this.router.navigate(['/clients-list']);
        return false;
    }
    getCustomerAcount(id: number) {
        this.accountService.getCustomerAccount(id).subscribe(
            (data: Account[]) => {
                this.accounts = data;
                console.log(this.accounts);
                this.showDetail = this.showDetail ? false : true;
            }
        );
    }

    saveUpdatedCustomer(customer: Client) {
        this.update = true;
        console.log(customer);
        this.service.updateClient(customer).subscribe(
            (data: any )=> {
                console.log(data);
            }
        );
    }


}
