import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../models/category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../models/post";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{

  permalink:string='';
  imgSrc:string='./assets/placeholder-image.jpg';
  selectedImage :any;

  categories: Array<Category>=[];

  postForm!:FormGroup;
//    postForm!:any;

  constructor(private categoryService:CategoriesService,
              private fb:FormBuilder, private postService:PostsService) {
    this.postForm=this.fb.group(
      {
        title:['',[Validators.required,Validators.minLength(10)]],
        permalink:['',Validators.required],
        excerpt:['',[Validators.required,Validators.minLength(50)]],
        category:['',Validators.required],
        postImg:['',Validators.required],
        content:['',Validators.required]

      })
    this.postForm.controls['permalink'].disable();

  }

  ngOnInit() {
    this.categoryService.loadData( ).subscribe((val)=>{
      this.categories=val
    })
  }

  onTitleChanged($event:Event){
    //console.log(($event.target as HTMLInputElement).value);
    const title=($event.target as HTMLInputElement).value;
    this.permalink=title.replace(/\s/g,'-');

    console.log(this.permalink)
  }


  showPreview($event:Event){
      const reader=new FileReader();

      reader.onload=(e)=>{
        this.imgSrc=e.target?.result as string
      }
      reader.readAsDataURL(<Blob>($event.target  as HTMLInputElement).files?.[0])
      this.selectedImage=  (<HTMLInputElement> $event.target ).files?.[0];

  }

  get  fc( ) { //this is a getter method returned  form controls
    return this.postForm.controls;
  }


  onSubmit(){

    console.log(this.postForm.value)

    //ဒါက Category model ထဲက category ကို ရွေးထုတ်တာ။
    console.log((this.postForm.controls?.['category'])?.value)// id ပါ တွဲထွက်နေတယ်

    let splitted=this.postForm.controls['category'].value.split("-")
    console.log(splitted)

    const postData: Post={
      title:this.postForm.controls['title'].value ,
      permalink:this.permalink,
      category:{
        id:splitted[0],
        category:splitted[1]
      },
      postImgPath:'',
      excerpt:this.postForm.controls['excerpt'].value,
      content:this.postForm.controls['content'].value,
      isFeatured:false,
      views:0,
      status:'new',
      createdAt :new Date()
    }
    console.log(postData)
    this.postService.uploadImage(this.selectedImage,postData)

    this.postForm.reset()
    this.imgSrc='./assets/placeholder-image.jpg';
  }

}

