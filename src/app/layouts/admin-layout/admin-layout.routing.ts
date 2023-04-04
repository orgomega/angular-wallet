import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { UpdateComponent } from 'app/update/update.component';
import { UpdateDepenseComponent } from 'app/update-depense/update-depense.component';
import { ViewRevenueComponent } from 'app/view-revenue/view-revenue.component';
import { ViewDepenseComponent } from 'app/view-depense/view-depense.component';
import { AddDepenseComponent } from 'app/add-depense/add-depense.component';
import { AddRevenueComponent } from 'app/add-revenue/add-revenue.component';
import { ComptesComponent } from 'app/comptes/comptes.component';
import { CartesComponent } from 'app/cartes/cartes.component';
import { BudgetsComponent } from 'app/budgets/budgets.component';
import { DettesComponent } from 'app/dettes/dettes.component';
import { AddBudgetComponent } from 'app/add-budget/add-budget.component';
import { AddCarteComponent } from 'app/add-carte/add-carte.component';
import { AddCompteComponent } from 'app/add-compte/add-compte.component';
import { AddDetteComponent } from 'app/add-dette/add-dette.component';
import { UpdateBudgetComponent } from 'app/update-budget/update-budget.component';
import { UpdateCarteComponent } from 'app/update-carte/update-carte.component';
import { UpdateCompteComponent } from 'app/update-compte/update-compte.component';
import { UpdateDetteComponent } from 'app/update-dette/update-dette.component';
export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent  },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'update/:id',     component: UpdateComponent  },
    { path: 'update-depense/:id',component:UpdateDepenseComponent },
    { path: 'view-revenue/:id',component:ViewRevenueComponent },
    { path: 'view-depense/:id',component:ViewDepenseComponent },
    { path: 'add-depense/:user_id',component:AddDepenseComponent },
    { path: 'add-revenue/:user_id',component:AddRevenueComponent },
    { path: 'comptes',component:ComptesComponent },
    { path: 'cartes',component:CartesComponent },
    { path: 'budget',component:BudgetsComponent },
    { path: 'dettes',component:DettesComponent },
    { path: 'add-compte/:user_id',component:AddCompteComponent },
    { path: 'add-carte/:user_id',component:AddCarteComponent },
    { path: 'add-budget/:user_id',component:AddBudgetComponent },
    { path: 'add-dette/:user_id',component:AddDetteComponent },
    { path: 'update-compte/:id',component:UpdateCompteComponent },
    { path: 'update-carte/:id',component:UpdateCarteComponent },
    { path: 'update-budget/:id',component:UpdateBudgetComponent },
    { path: 'update-dette/:id',component:UpdateDetteComponent },



];
