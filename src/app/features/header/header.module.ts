import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { CoreModule } from '@core/core.module';
import { HeaderProfileComponent } from './features/header-profile/header-profile.component';

@NgModule({
  declarations: [HeaderComponent, HeaderProfileComponent],
  imports: [CommonModule, CoreModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
