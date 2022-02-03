import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap, scan, startWith, map } from 'rxjs/operators';
import { parseISO } from 'date-fns';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  startDate$ = new BehaviorSubject<Date>(new Date());
  date: Observable<Date> = this.startDate$.pipe(
    switchMap((startDate) =>
      this.dateOffsets.pipe(
        scan((acc, curr) => acc + curr, 0),
        startWith(0),
        map((offset) => {
          const tempDate = new Date(startDate);
          return new Date(tempDate.setDate(tempDate.getDate() + offset));
        })
      )
    )
  );
  dateOffsets = new Subject<number>();

  offsetDate(offset: number) {
    this.dateOffsets.next(offset);
  }
  setDate(datePicker: any): void {
    const selectedDate = parseISO(datePicker.value);
    datePicker.cancel(true);
    this.startDate$.next(selectedDate);
  }
  constructor() {}
}
