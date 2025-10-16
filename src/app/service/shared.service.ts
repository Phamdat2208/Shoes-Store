import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private dataSource = new BehaviorSubject<any[]>(this.loadFromLocalStorage());
  data$ = this.dataSource.asObservable();

  // private itemCart = new Set<any>(this.loadFromLocalStorage());
  private itemCart = new Map<number, any>(this.loadFromLocalStorage());

  addItemCart(data: any) {
    if (![...this.itemCart].some((item: any) => item.id === data.id)) {
      this.itemCart.set(data.id, data);
      this.sync();
    }
  }

  removeItemCart(data: any) {
    this.itemCart.delete(data.id);
    this.sync();
  }

  private loadFromLocalStorage(): any[] {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }

  private sync() {
    const sentData = Array.from(this.itemCart);
    localStorage.setItem('cart', JSON.stringify(sentData));
    this.dataSource.next(sentData);
  }
}
