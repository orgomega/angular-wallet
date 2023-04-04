import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Depense } from 'app/depense';
import { DepensesServicesService } from 'app/depenses-services.service';

@Component({
  selector: 'update-depense',
  templateUrl: './update-depense.component.html',
  styleUrls: ['./update-depense.component.css']
})
export class UpdateDepenseComponent implements OnInit {
  id:number;
  depense:Depense=new Depense();
  constructor(private depenseservice:DepensesServicesService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.depenseservice.getDepenseById(this.id).subscribe(data =>{
     this.depense =data;
    },
    error =>console.log(error)
    );
  }
  onSubmit(){ 
    this.depenseservice.updateDepense(this.id,this.depense).subscribe(data=>{
      this.router.navigate(['table-list']);
    },error =>console.log(error)
    );
  }
  GoToProductList(){
    this.router.navigate(['table-list']);
  }

}
