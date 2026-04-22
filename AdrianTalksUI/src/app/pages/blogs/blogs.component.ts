import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { UnsubscriberService } from '../../services/unsubscriber.service';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  providers: [UnsubscriberService]
})
export class BlogsComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  blogCategory: string;
  blogCategoryName: string;
  blogCategoryId: number;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private unsubscriberService: UnsubscriberService
  ) {
  }

  ngOnInit(): void {
    this.blogCategoryName = "";

    this.router.events
      .pipe(this.unsubscriberService.takeUntilDestroy)
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.populateBlogs();
        }
      });

    this.populateBlogs();
  }

  populateBlogs() {
    this.blogCategory = this.route.snapshot.paramMap.get('categoryId') as string;
    this.blogCategoryName = this.route.snapshot.paramMap.get('categorySlug') as string;

    if (this.blogCategoryName) {
      this.blogCategoryName = this.blogCategoryName.replace(/-/g, ' ');
    }
    if (this.blogCategory) {
      this.blogCategoryId = Number(this.blogCategory);
      this.blogs$ = this.blogService.getBlogs(1000, this.blogCategoryId).pipe(this.unsubscriberService.takeUntilDestroy);
    } else {
      this.blogs$ = this.blogService.getBlogs(1000, 0).pipe(this.unsubscriberService.takeUntilDestroy);
    }
  }
}
