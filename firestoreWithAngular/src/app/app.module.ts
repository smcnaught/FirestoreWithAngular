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
import { FormsComponent } from './forms/forms.component';

const firebaseConfig = {
  apiKey: "AIzaSyB9gaStgWvn_R_vC3AUdmgSgx68pZ35xYE",
  authDomain: "hip-polymer-291803.firebaseapp.com",
  projectId: "hip-polymer-291803",
  storageBucket: "hip-polymer-291803.appspot.com",
  messagingSenderId: "135609114254",
  appId: "1:135609114254:web:d34da7ccef1a40018b73df",
  measurementId: "G-X6TJLDDMYB"
};

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    AccountsComponent,
    FormsComponent
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
