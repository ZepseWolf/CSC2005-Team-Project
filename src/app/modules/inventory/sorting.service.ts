import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  sortByNameAlphebeticallyAscending(cards) {
    cards.sort(
      (a, b) => a.id - b.id);
    return cards;
  }

  sortByDate(cards) {
    
    return cards.sort((a, b) => {
      return <any>new Date(b.samplingDate) - <any>new Date(a.samplingDate);
    });
  }

}