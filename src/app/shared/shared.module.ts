import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const sameIE = [CommonModule, FormsModule, MaterialModule, FlexLayoutModule ];
@NgModule({
  declarations: [],
  imports: [...sameIE],
  exports:[...sameIE]
})
export class SharedModule {}
