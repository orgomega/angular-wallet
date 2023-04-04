import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Revenue } from 'app/revenue';
import { RevenuesServicesService } from 'app/revenues-services.service';

@Component({
  selector: 'update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id:number;
  revenue:Revenue=new Revenue();
  constructor(private revenueservice:RevenuesServicesService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.revenueservice.getRevenueById(this.id).subscribe(data =>{
     this.revenue =data;
    },
    error =>console.log(error)
    );
  }
  onSubmit(){ 
    this.revenueservice.updateRevenue(this.id,this.revenue).subscribe(data=>{
      this.router.navigate(['table-list']);
    },error =>console.log(error)
    );
  }
  GoToProductList(){
    this.router.navigate(['table-list']);
  }

}
