import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoriesService} from "../services/categories.service";
import {Category} from "../models/category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  /*categoryArray!: Array<Category>;*/

  categoryArray!: Array<Category>;

  formCategory!:string
  formStatus:string='Add';
  categoryId:string='';


  ngOnInit() {
    this.categoryService.loadData().subscribe(val=>{
      console.log(val)

      this.categoryArray=val as Array<Category>
      //this.categoryArray=val
    })
  }

  constructor(private categoryService:CategoriesService) { }

  onSubmit(formData: NgForm) {

    let categoryData:Category= {
      category : formData.value.category,
    }//category    ဆိုတဲ့  field တစ်ခုထဲပါတဲ့ object ကို  Category လို့ သတ်မှတ်ပြီးတော့  categoryData ဆိုတဲ့ Category typeထဲထည့်

  if(this.formStatus=='Add'){
    //Send the categoryData as Object type
    this.categoryService.saveData(categoryData).then(()=>{formData.reset()})
    }
  else if(this.formStatus=='Edit'){

    this.categoryService.updateData(this.categoryId,formData.value)
    formData.reset()
    this.formStatus='Add';
  }


  }

  onEdit(category:any){
      console.log(category);
        this.formCategory=(category['category']);//React လို့ထွက်လာ

        //this.formCategory=(JSON.stringify(category?.['category'])); // "React" လို့ထွက်လာ

        this.formStatus='Edit'

        this.categoryId=category.id as string

  }

  onDelete(category:Category){
    this.categoryService.deleteData(category.id as string)
  }

}
