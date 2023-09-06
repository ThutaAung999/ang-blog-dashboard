import { Injectable } from '@angular/core';

//Angular 14
import {AngularFirestore,AngularFirestoreCollection} from "@angular/fire/compat/firestore";

//Angular 15
import {Firestore,collection,addDoc,doc,collectionData} from "@angular/fire/firestore";
import {Category} from "../models/category";
import {ToastrService} from "ngx-toastr";
import {map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

//  private categoryCollection!:  AngularFirestoreCollection<Category>


  constructor(
    //Angular 14
    private afs:AngularFirestore,
    //Angular 15
    private firestore:Firestore,

    private toastr:ToastrService,
  ) {

  //  this.categoryCollection=this.afs.collection<Category>('categories')
  }


  saveData(data:any){
    //saveData(data:Category){
    /*
        let subCategoryData={//ဒါက sub category
          subCategory:'subCategory1'
        }

        let subSubCategoryData={//ဒါက sub category ရဲ့ sub category
          subCategory:'subSubCategory2'
        }
    */

    //Angular 14
return     this.afs.collection('categories')
          .add(data).then(docRef=>{
          console.log('Docref:',docRef)
          this.toastr.success('Data insert successfully')

            return docRef;

      /*      //sub collection test
                        this.afs.collection('categories')
                          .doc(docRef.id)
                          .collection('subCategories')
                          .add(subCategoryData)
                          .then(docRef1=>{
                              console.log(docRef1)
                            this.afs.collection('categories')
                              .doc(docRef.id)
                              .collection('subCategories')
                              .doc(docRef1.id)
                              .collection('subSubCategories')
                              .add(subSubCategoryData)
                              .then(docRef2=>{
                                console.log(docRef2)
                              }).catch(err2=>{console.log(err2)})
                          }).catch(err1=>{console.log(err1)})
      */
    }).catch(err=>{console.log(err)})

    /*
    အဆင်မပြေတော့ဘူး
        //Angular 15
        const collectionInstance=collection(this.firestore,'categories');
        addDoc(collectionInstance,formData.value).then(docRef=>{
          console.log('Data save successfully', docRef);
        })
    */

  }

 //Angular 14
  loadData():Observable<Category[]>{
   return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
              //const category=a.payload.doc.data() as Category; အဆင်မပြေဘူး

          //const category=a.payload.doc.data() as Category;

                  const category=a.payload.doc.data()  as Category

                  const id=a.payload.doc.id;
                  category.id = id;

              //return  {id,category} //as Category;

          return  category
        })
      })
    )
  }

  //ဒါကတော့  Angular 15
  /*loadData(): Observable<Category[]> {
    const collectionInstance = collection(this.firestore, 'categories');
    return collectionData(collectionInstance, { idField: 'id' }) as Observable<Category[]>;
  }*/


  updateData(id:string,editedData:string){
    /*this.afs.collection ('categories').doc(id).update(editedData)*/
    this.afs.doc(`categories/${id}`).update(editedData)
        .then(docRef=>{
          console.log(docRef);
          this.toastr.success('Data update successfully')
        })
  }

  deleteData( id:string) {
    /*this.afs.collection('categories').doc(id).delete()*/
    this.afs.doc(`categories/${id}`).delete()
      .then(()=>{
        this.toastr.success('Data deleted successfully')
      })
  }



}
