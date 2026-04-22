import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { UnsubscriberService } from '../../services/unsubscriber.service';

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [RouterModule],
  providers: [UnsubscriberService],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.scss'
})
export class Header2Component {
  isMenuOpened: boolean = false;

  constructor(
    unsubscriberService: UnsubscriberService,
    private menuService: MenuService) {

    this.menuService.menuState$.pipe(unsubscriberService.takeUntilDestroy).subscribe(state => {
      this.isMenuOpened = state;
    });
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
