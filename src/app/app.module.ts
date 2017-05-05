import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { TodoStore } from '../service/todo.store.service';
import { TodoComponent } from './app.component';

@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    TodoStore
  ],
  bootstrap: [TodoComponent]
})

export class AppModule {}
