import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_modules/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { NiftyohlcComponent } from './_modules/niftyohlc/niftyohlc.component';
import { MenuComponent } from './_modules/menu/menu.component';
import { StrategyComponent } from './_modules/strategy/strategy.component';

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: '', component: MenuComponent, canActivate: [AuthGuard]},
  { path: 'niftyohlc', component: NiftyohlcComponent, canActivate: [AuthGuard]},
  { path: 'strategy', component: StrategyComponent, canActivate: [AuthGuard]},
  // otherwise redirect to default page
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
