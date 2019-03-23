import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule, MatIconModule, MatToolbarModule,
  MatButtonModule, MatChipsModule,
  MatFormFieldModule, MatSnackBarModule,
  MatProgressSpinnerModule, MatSidenavModule, MatInputModule } from '@angular/material';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LoginDialogComponent } from './login.component';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    LoginDialogComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule, MatChipsModule,
  MatFormFieldModule, MatSnackBarModule,
  MatProgressSpinnerModule, MatSidenavModule, MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  MatTabsModule,
  FlexLayoutModule
  ],
  entryComponents: [
    LoginDialogComponent
  ]
})
export class LoginDialogModule { }
