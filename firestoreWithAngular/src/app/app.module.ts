import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { AccountsComponent } from './accounts/accounts.component';

const firebaseConfig = {
  apiKey: "AIzaSyAHkhkd_RHNnCAUP8Eb-rSCimAk0dDSDrI",
  authDomain: "xenonchex-firetest.firebaseapp.com",
  projectId: "xenonchex-firetest",
  storageBucket: "xenonchex-firetest.appspot.com",
  messagingSenderId: "554021081657",
  appId: "1:554021081657:web:65780e5a2129871876b3e8",
  measurementId: "G-VSB69H70KG"
};

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
