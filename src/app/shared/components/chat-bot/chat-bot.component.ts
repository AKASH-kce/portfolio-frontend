import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output, ViewChild } from '@angular/core';
import { AppComponent } from '../../../app';

@Component({
  selector: 'app-floating-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
  standalone:true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FloatingBotComponent {
  @Output() botClicked = new EventEmitter<void>();

  onBotClick() {
    this.botClicked.emit();
  }
}
