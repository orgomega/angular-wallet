import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carte } from 'app/carte';
import { CarteServiceService } from 'app/carte-service.service';

@Component({
  selector: 'update-carte',
  templateUrl: './update-carte.component.html',
  styleUrls: ['./update-carte.component.css']
})
export class UpdateCarteComponent implements OnInit {
  id:number;
  carte:Carte=new Carte();
  constructor(private carteservice:CarteServiceService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.carteservice.getCarteById(this.id).subscribe(data =>{
     this.carte =data;
    },
    error =>console.log(error)
    );
  }
  onSubmit(){ 
    this.carteservice.updateCarte(this.id,this.carte).subscribe(data=>{
      this.router.navigate(['cartes']);
    },error =>console.log(error)
    );
  }

}
