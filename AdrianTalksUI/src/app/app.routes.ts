import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('../app/pages/home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'home', loadComponent: () => import('../app/pages/home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'blog/:id/:title', loadComponent: () => import('../app/pages/blog-details/blog-details.component').then(c => c.BlogDetailsComponent),
  },
  {
    path: 'blogs', loadComponent: () => import('../app/pages/blogs/blogs.component').then(c => c.BlogsComponent),
  },
  {
    path: 'blogs/:categoryId/:categorySlug', loadComponent: () => import('../app/pages/blogs/blogs.component').then(c => c.BlogsComponent),
  },
  {
    path: 'contact', loadComponent: () => import('../app/pages/contact/contact.component').then(c => c.ContactComponent),
  },
  {
    path: 'about', loadComponent: () => import('../app/pages/about/about.component').then(c => c.AboutComponent),
  },
  {
    path: 'author/:authorName', loadComponent: () => import('../app/pages/author/author.component').then(c => c.AuthorComponent),
  },
  {
    path: '**', loadComponent: () => import('../app/pages/error/error.component').then(c => c.ErrorComponent),
  },
];
