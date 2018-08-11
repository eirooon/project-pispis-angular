import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ATestbackendComponent } from './a-testbackend.component';
import { AuthGuard } from '../../shared/service/auth-guard.service';

const routes: Routes = [
  {
    path: 'test',
    component: ATestbackendComponent,
    canActivate:[AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
