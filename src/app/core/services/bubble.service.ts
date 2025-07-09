import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BubbleService {
  private bubbleSubject = new Subject<string>();
  bubble$ = this.bubbleSubject.asObservable();

  show(message: string) {
    this.bubbleSubject.next(message);
  }
} 