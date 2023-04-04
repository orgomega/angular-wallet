import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Revenue } from 'app/revenue';
import { RevenuesServicesService } from 'app/revenues-services.service';

@Component({
  selector: 'view-revenue',
  templateUrl: './view-revenue.component.html',
  styleUrls: ['./view-revenue.component.css']
})
export class ViewRevenueComponent implements OnInit {
  id:number;
  revenue:Revenue;
  constructor(private route:ActivatedRoute,private depenseservice:RevenuesServicesService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.revenue=new Revenue();
    this.depenseservice.getRevenueById(this.id).subscribe(data=>{
      this.revenue=data;
    })
  }

}
