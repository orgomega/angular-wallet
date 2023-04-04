import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { UpdateComponent } from 'app/update/update.component';
import { UpdateDepenseComponent } from 'app/update-depense/update-depense.component';
import { ViewDepenseComponent } from 'app/view-depense/view-depense.component';
import { ViewRevenueComponent } from 'app/view-revenue/view-revenue.component';
import { AddDepenseComponent } from 'app/add-depense/add-depense.component';
import { AddRevenueComponent } from 'app/add-revenue/add-revenue.component';
import { DatePipe } from '@angular/common'
import { ComptesComponent } from 'app/comptes/comptes.component';
import { BudgetsComponent } from 'app/budgets/budgets.component';
import { CartesComponent } from 'app/cartes/cartes.component';
import { DettesComponent } from 'app/dettes/dettes.component';
import { AddCarteComponent } from 'app/add-carte/add-carte.component';
import { AddCompteComponent } from 'app/add-compte/add-compte.component';
import { AddBudgetComponent } from 'app/add-budget/add-budget.component';
import { AddDetteComponent } from 'app/add-dette/add-dette.component';
import { UpdateBudgetComponent } from 'app/update-budget/update-budget.component';
import { UpdateCarteComponent } from 'app/update-carte/update-carte.component';
import { UpdateCompteComponent } from 'app/update-compte/update-compte.component';
import { UpdateDetteComponent } from 'app/update-dette/update-dette.component';
import { RevenueDonutComponent } from 'app/revenue-donut/revenue-donut.component';
import { DepenseDonutComponent } from 'app/depense-donut/depense-donut.component';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgChartsModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    UpdateComponent,
    ViewRevenueComponent,
    ViewDepenseComponent,
    UpdateDepenseComponent,
    AddRevenueComponent,
    AddDepenseComponent,
    ComptesComponent,
    CartesComponent,
    BudgetsComponent,
    DettesComponent,
    AddBudgetComponent,
    AddCarteComponent,
    AddCompteComponent,
    AddDetteComponent,
    UpdateBudgetComponent,
    UpdateCarteComponent,
    UpdateCompteComponent,
    UpdateDetteComponent,
    RevenueDonutComponent,
    DepenseDonutComponent,
  ],  
  providers: [DatePipe]
})

export class AdminLayoutModule {}
