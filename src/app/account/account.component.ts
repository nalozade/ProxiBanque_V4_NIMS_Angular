import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../model/client';
import { AccountService } from '../services/account.service';
import { Account } from '../model/account';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {


    id: number;
    clientDetails: Client;
    accounts: Account[];
    crediteur: Account = new Account();
    debiteur: Account = new Account();
    montant: number;


    constructor(private service: ClientService, private activatedRoute: ActivatedRoute, private router: Router, private accountService: AccountService) {
        this.id = this.activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.params['id'];
        this.service.getClient(this.id).subscribe((data: Client) => {
            this.clientDetails = data;

            this.accountService.getCustomerAccount(this.id).subscribe(
                (data: Account[]) => {
                    this.accounts = data;

                }
            );
        })
    }

    validateTransfer(form: FormGroup) {
        
        this.crediteur.balance += +this.montant;
        this.debiteur.balance -= +this.montant;
        console.log(this.crediteur);
        console.log(this.debiteur);
        this.accountService.updateAccount(this.crediteur).subscribe(
            (data: Account)=>{
                this.crediteur=data;
            }
        );
        this.accountService.updateAccount(this.debiteur).subscribe(
            (data: Account) => {
                this.debiteur=data;
            }
        );
        // this.router.navigate(['client-show'], { queryParams: { id: this.clientDetails.id } });
        this.router.navigate(['/clients-list']);
    }

}
