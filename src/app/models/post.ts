import {Category} from "./category";

export interface Post {
  id?:string,
  title?: string ,
  permalink?: string,
  category?: Category,
  postImgPath?: string,
  excerpt?: string,
  content?: string,
  isFeatured?: boolean,
  views?:number,
  status?:string,
  createdAt?:any
}
