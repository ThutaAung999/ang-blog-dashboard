import {Component, OnInit} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {Post} from "../../models/post";

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit{

  postArray : Array<Post>=[];

  constructor(private postService:PostsService) {}

  ngOnInit() {
    this.postService.loadData().subscribe(val=>{
      console.log('All post documents')
      console.log(val)

      this.postArray=<Array<Post>>val

    })
  }
}
