import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output, Input,ViewChild } from '@angular/core';
import { AppComponent } from '../../../app';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-floating-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
  imports:[CommonModule,FormsModule],
  standalone:true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FloatingBotComponent {
  @Output() botClicked = new EventEmitter<void>();
 @Input()isShowBotBubble:boolean|undefined;
  onBotClick() {
    this.botClicked.emit();
  }
}
