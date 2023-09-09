import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Post} from "../models/post";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastrService} from "ngx-toastr";
import {Category} from "../models/category";
import {Observable,map} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage:AngularFireStorage,private afs:AngularFirestore,
              private toastr:ToastrService,private router:Router) {}


    uploadImage(selectedImage:any,postData:Post,formStatus:string,id:string) {
      const filePath=`postIMG/${Date.now()}`;
      console.log(filePath)

      this.storage.upload(filePath,selectedImage).then(()=>{
        console.log("post image loaded  successfully");

        this.storage.ref(filePath).getDownloadURL().subscribe(URL=>{
          //console.log('Post Image URL :',URL)
          postData.postImgPath=URL
          console.log(postData)

          if(formStatus=='Edit'){
            this.updateData(id,postData )
          }else{
            this.saveData(postData);
          }
        })
      })
    }

  private saveData(postData: Post) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success("Data insert perfectly.")
      this.router.navigate(['/posts'])
    })
  }

  //Angular 14
  loadData():Observable<Post[]>{
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{

          const post=a.payload.doc.data()  as Post
          const id=a.payload.doc.id;
          post.id = id;

          return  post

          /*
          const post=a.payload.doc.data()
          const id=a.payload.doc.id;
          return {id,post} as Post
           */
        })
      })
    )
  }

  loadOneData(id:string){

    //return this.afs.collection('posts').doc(id).valueChanges();
    return this.afs.doc(`posts/${id}`).valueChanges();

  }

  updateData(id :string , postData:Post){
    this.afs.doc(`posts/${id}`).update(postData).then(()=>{
      this.toastr.success('Data  updated successfully')
      this.router.navigate(['/posts'])
    })
  }


  deleteImage(postImgPath:string,id:string){
    this.storage.storage.refFromURL(postImgPath).delete().then(()=>{
      this.deleteData(id)
    });
  }

  deleteData(id:string){
    this.afs.doc(`posts/${id}`).delete().then(()=>{
      this.toastr.warning('Data Deleted successfully ')
    })
  }

}
