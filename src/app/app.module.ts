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

import {AngularFireStorageModule} from "@angular/fire/compat/storage";

//Angular 15
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

//import { provideAuth,getAuth } from '@angular/fire/auth';
//import { provideStorage,getStorage } from '@angular/fire/storage';

import {AngularFireAuthModule} from "@angular/fire/compat/auth";

import {ToastrModule} from "ngx-toastr";

import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NewPostComponent } from './posts/new-post/new-post.component';
import { AllPostComponent } from './posts/all-post/all-post.component';


import {AngularEditorModule} from "@kolkov/angular-editor";
import {HttpClientModule} from "@angular/common/http";

import {ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent,
    NewPostComponent,
    AllPostComponent,
    LoginComponent
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
    AngularEditorModule,
    HttpClientModule,

    ReactiveFormsModule,

    AngularFireStorageModule,
    AngularFireAuthModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
