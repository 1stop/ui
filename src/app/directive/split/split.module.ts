import { NgModule } from '@angular/core';
import { SplitDirective } from './split.directive';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandlerDirective } from './split-handler.directive';

@NgModule({
    declarations: [
        SplitDirective,
        SplitAreaDirective,
        SplitHandlerDirective
    ],
    exports: [
        SplitDirective,
        SplitAreaDirective,
        SplitHandlerDirective
    ]
})
export class SplitModule {}
