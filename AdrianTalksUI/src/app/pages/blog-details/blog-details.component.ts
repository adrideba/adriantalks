import { Component } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Blog } from '../../models/blog';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { UnsubscriberService } from '../../services/unsubscriber.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
  providers: [UnsubscriberService]
})
export class BlogDetailsComponent {
  blog$: Observable<Blog> = new Observable<Blog>();
  suggestedBlogs$: Observable<Blog[]> = new Observable<Blog[]>();
  dynamicContent: SafeHtml = '';
  descriptionToRead: string = '';
  speaking: boolean = false;
  alreadySpoke: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private sanitizer: DomSanitizer,
    private unsubscriberService: UnsubscriberService,
    private meta: Meta,
    private titleService: Title
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.route.params.subscribe(params => {
          this.populateBlog(params['id']);
        });

        this.route.queryParams.subscribe(params => {
          this.populateBlog(params['id']);
        });
      });
  }

  populateBlog(blogId: string) {
    if (blogId === undefined) return;

    this.blog$ = this.blogService.getBlog(Number(blogId)).pipe(
      map((blog) => {
        this.applySeo(blog);

        this.suggestedBlogs$ = this.blogService.getRandomBlogs(3, blog.category?.id, blog.id);

        this.dynamicContent = this.sanitizer.bypassSecurityTrustHtml(
          blog.description
        );

        this.descriptionToRead = blog.description.toString().replace(/<\/?[^>]+(>|$)/g, "");

        return blog;
      }),
      this.unsubscriberService.takeUntilDestroy
    );
  }

  applySeo(blog: Blog) {
    this.titleService.setTitle(blog.title);
    this.meta.updateTag({ name: 'description', content: blog.shortDescription ?? blog.description.substring(0, 100) });
    this.meta.updateTag({ property: 'og:title', content: blog.title });
    this.meta.updateTag({ property: 'og:description', content: blog.shortDescription ?? blog.description.substring(0, 100) });
    this.meta.updateTag({ property: 'og:image', content: `https://tasteimages.blob.core.windows.net/adriantalks/${blog.id}.jpg` });
  }
}
