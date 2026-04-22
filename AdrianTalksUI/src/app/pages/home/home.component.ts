import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  popularBlogs$: Observable<Blog[]>;
  randomBlogs: Blog[] = [];
  randomBlogs2: Blog[] = [];
  featuredBlog: Blog | undefined;
  blogOfTheWeek: Blog | undefined;
  categories$: Observable<Category[]> = new Observable<Category[]>();
  isMenuOpened: boolean = false;

  constructor
    (
      private blogService: BlogService,
      private categoryService: CategoryService,
      private menuService: MenuService
    ) {
  }

  ngOnInit(): void {
    this.blogs$ = this.blogService.getBlogs(4);

    this.popularBlogs$ = this.blogService.getPopularBlogs(4, 0);

    this.blogService.getRandomBlogs(6, 0).subscribe(blogs => {
      this.randomBlogs = [blogs[0], blogs[1]];
      this.randomBlogs2 = [blogs[2], blogs[3]];
      this.featuredBlog = blogs[4];
      this.blogOfTheWeek = blogs[5];
    });

    this.categories$ = this.categoryService.getCategory();
  }

  openMenu() {
    if (this.isMenuOpened) {
      this.menuService.toggleMenu(false);
      this.isMenuOpened = false;
    }
    else {
      this.menuService.toggleMenu(true);
      this.isMenuOpened = true;
    }

  }
}
