import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';


//Angular 14
import {AngularFireModule} from "@angular/fire/compat";
import { environment } from '../environments/environment.prod';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { CategoriesComponent } from './categories/categories.component';

//Angular 15
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

//import { provideAuth,getAuth } from '@angular/fire/auth';
//import { provideStorage,getStorage } from '@angular/fire/storage';

import {ToastrModule} from "ngx-toastr";

import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent
  ],
  imports: [


    BrowserModule,
    AppRoutingModule,

    //Angular 15
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    /*provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
*/
    AngularFirestoreModule,
    //Angular 14
    AngularFireModule.initializeApp(environment.firebaseConfig),

    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
