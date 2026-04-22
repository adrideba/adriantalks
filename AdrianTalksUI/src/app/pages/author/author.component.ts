import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Blog } from '../../models/blog';
import { Observable } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { UnsubscriberService } from '../../services/unsubscriber.service';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss',
  providers: [UnsubscriberService]
})
export class AuthorComponent {
  blogs$: Observable<Blog[]>
  constructor(
    private blogService: BlogService,
    private unsubscriberService: UnsubscriberService
  ) {
    this.blogs$ = this.blogService.getBlogs(1000, 0).pipe(this.unsubscriberService.takeUntilDestroy);
  }
}
