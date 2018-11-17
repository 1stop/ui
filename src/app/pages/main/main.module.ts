import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { DialogComponent } from './dialog/dialog.component';
import { RouterModule } from '@angular/router';
import { SearchBarModule } from '../../element/search-bar/search-bar.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatCardModule,
         MatIconModule, MatButtonModule, MatFormFieldModule,
         MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { ExcerptPipe } from '../../pipe/excerpt.pipe';
import { StoreModule } from '@ngrx/store';
import { namespaceReducer } from '../../state/reducer/namespace';
import { EffectsModule } from '@ngrx/effects';
import { NamespaceEffects } from '../../state/effects/namespace';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseInterceptor } from '../../services/http-interceptor.service';

@NgModule({
    declarations: [
        MainComponent,
        DialogComponent,
        ExcerptPipe
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: MainComponent }
        ]),
        SearchBarModule,
        FlexLayoutModule,
        CommonModule,
        MatCardModule,
        MatIconModule,
        StoreModule.forFeature('namespace', namespaceReducer),
        EffectsModule.forFeature([NamespaceEffects]),
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatProgressSpinnerModule
    ],
    providers: [],
    entryComponents: [
        DialogComponent
    ]
})
export class MainModule {}
