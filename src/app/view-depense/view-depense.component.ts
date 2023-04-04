import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Depense } from 'app/depense';
import { DepensesServicesService } from 'app/depenses-services.service';

@Component({
  selector: 'view-depense',
  templateUrl: './view-depense.component.html',
  styleUrls: ['./view-depense.component.css']
})
export class ViewDepenseComponent implements OnInit {
  id:number;
  depense:Depense;
  constructor(private route:ActivatedRoute,private depenseservice:DepensesServicesService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.depense=new Depense();
    this.depenseservice.getDepenseById(this.id).subscribe(data=>{
      this.depense=data;
    })
  }

}
