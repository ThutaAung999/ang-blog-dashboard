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

    }

    //Send the categoryData as Object type
    this.categoryService.saveData(categoryData).then(()=>{formData.reset()})
  }

  onEdit(category:any){
      console.log(category);
        this.formCategory=(category['category']);//React လို့ထွက်လာ

        //this.formCategory=(JSON.stringify(category?.['category'])); // "React" လို့ထွက်လာ

        this.formStatus='Edit'
  }
}
