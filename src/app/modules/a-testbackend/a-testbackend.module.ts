import { NgModule } from '@angular/core';
import { TestRoutingModule } from './a-testbackend-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ATestbackendComponent } from './a-testbackend.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
    declarations: [
        ATestbackendComponent
    ],
    imports: [
        TestRoutingModule,
        SharedModule,
        FormsModule
    ]
})

export class TestBackendModule{}