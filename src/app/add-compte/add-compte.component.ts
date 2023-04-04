import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compte } from 'app/compte';
import { CompteServiceService } from 'app/compte-service.service';
import { User } from 'app/user';

@Component({
  selector: 'add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.css']
})
export class AddCompteComponent implements OnInit {
  user_id:number ;
  compte:Compte=new Compte();
  user:User=new User();
  constructor(private route:ActivatedRoute,private compteService:CompteServiceService,
    private router:Router) { }

  ngOnInit(): void {
    this.user_id=this.route.snapshot.params['user_id'];
  }
  saveCompte(){
    this.user_id=this.route.snapshot.params['user_id'];
    this.compte.user=this.user;
    this.compte.user.id=this.user_id;
    this.compteService.addCompte(this.compte).subscribe(data =>{
     console.log(data);
     this.GoToCompteList();
    },
     error=>console.log(error));
  }
  GoToCompteList(){
    this.router.navigate(['comptes'])
  }
  onSubmit(){
    this.saveCompte();
  }

}
