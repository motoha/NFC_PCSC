import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
 
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { AuthService } from '../core/services/auth.service'
import { AuthGuard } from '../core/guards/auth.guard';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
@NgModule({
  imports: [AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
     ],
    providers: [  AuthService, AuthGuard,
      Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
})
export class AuthModule {}
