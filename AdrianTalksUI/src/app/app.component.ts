import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { Header2Component } from "./shared/header2/header2.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, Header2Component, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isOpen: boolean = false;
  isHomeOrEmpty: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        const currentRoute = this.router.url;
        this.isHomeOrEmpty = currentRoute === '/home' || currentRoute === '/';
      });
  }
}
