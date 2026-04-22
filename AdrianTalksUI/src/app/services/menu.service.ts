import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  private menuStateSource = new BehaviorSubject<boolean>(false);
  menuState$ = this.menuStateSource.asObservable();

  toggleMenu(state: boolean): void {
    this.menuStateSource.next(state);
  }
}
