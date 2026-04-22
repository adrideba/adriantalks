import { BlogViewCount } from "./blog-view-count";
import { Category } from "./category";

export interface Blog {
  id: number;
  title: string;
  description: string;
  author: string;
  mainImage: string;
  createdAt: Date;
  updateAt?: Date;
  category?: Category;
  blogViewCount?: BlogViewCount;

  shortDescription?: string;
  slug?: string;
}
