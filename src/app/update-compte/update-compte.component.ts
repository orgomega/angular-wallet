import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compte } from 'app/compte';
import { CompteServiceService } from 'app/compte-service.service';

@Component({
  selector: 'update-compte',
  templateUrl: './update-compte.component.html',
  styleUrls: ['./update-compte.component.css']
})
export class UpdateCompteComponent implements OnInit {
  id:number;
  compte:Compte=new Compte();
  constructor(private compteservice:CompteServiceService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.compteservice.getCompteById(this.id).subscribe(data =>{
     this.compte =data;
    },
    error =>console.log(error)
    );
  }
  onSubmit(){ 
    this.compteservice.updateCompte(this.id,this.compte).subscribe(data=>{
      this.router.navigate(['comptes']);
    },error =>console.log(error)
    );
  }
  GoToComptesList(){
    this.router.navigate(['comptes']);
  }

}
