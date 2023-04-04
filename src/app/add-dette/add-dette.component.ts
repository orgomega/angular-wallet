import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compte } from 'app/compte';
import { CompteServiceService } from 'app/compte-service.service';
import { Dette } from 'app/dette';
import { DetteServiceService } from 'app/dette-service.service';
import { User } from 'app/user';

@Component({
  selector: 'add-dette',
  templateUrl: './add-dette.component.html',
  styleUrls: ['./add-dette.component.css']
})
export class AddDetteComponent implements OnInit {
  user_id:number ;
  name:string;
  dette:Dette=new Dette();
  user:User=new User();
  compte:Compte=new Compte();
  comptes:Compte[] ;
  constructor(private route:ActivatedRoute,private detteService:DetteServiceService,private compteService:CompteServiceService,
    private router:Router) { }
  ngOnInit(): void {
    this.user_id=this.route.snapshot.params['user_id'];
    this.getComptes();
  }
  saveDette(){
    this.user_id=this.route.snapshot.params['user_id'];
    this.dette.user=this.user;
    this.dette.user.id=this.user_id;
    for (const i of this.comptes) {
      if (i.name==this.name){
        this.dette.compte=i;
      }
    }
    this.detteService.addDette(this.dette).subscribe(data =>{
     console.log(data);
     this.GoToDetteList();
    },
     error=>console.log(error));
  }
  GoToDetteList(){
    this.router.navigate(['dettes'])
  }
  getComptes(){
    this.compteService.getCompteList(this.user_id).subscribe(data =>{this.comptes=data;
      console.log(data);
      });
  }
  onSubmit(){
    this.saveDette();
  }

}
