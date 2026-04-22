import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { UnsubscriberService } from '../../services/unsubscriber.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [UnsubscriberService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isOpen: boolean = false;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private unsubscriberService: UnsubscriberService
  ) {
  }

  ngOnInit(): void {
    this.menuService.menuState$.pipe(this.unsubscriberService.takeUntilDestroy).subscribe(state => this.isOpen = state);

    this.router.events.pipe(this.unsubscriberService.takeUntilDestroy).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuService.toggleMenu(false);
      };
    });
  }

}
