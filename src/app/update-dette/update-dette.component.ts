import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dette } from 'app/dette';
import { DetteServiceService } from 'app/dette-service.service';

@Component({
  selector: 'update-dette',
  templateUrl: './update-dette.component.html',
  styleUrls: ['./update-dette.component.css']
})
export class UpdateDetteComponent implements OnInit {
  id:number;
  dette:Dette=new Dette();
  constructor(private detteservice:DetteServiceService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.detteservice.getDetteById(this.id).subscribe(data =>{
     this.dette =data;
    },
    error =>console.log(error)
    );
  }
  onSubmit(){ 
    this.detteservice.updateDette(this.id,this.dette).subscribe(data=>{
      this.router.navigate(['dettes']);
    },error =>console.log(error)
    );
  }

}
