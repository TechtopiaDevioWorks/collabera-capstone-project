import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderModule } from '@features/header/header.module';
import { FooterModule } from '@features/footer/footer.module';
import { CoreModule } from '@core/core.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    CoreModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
