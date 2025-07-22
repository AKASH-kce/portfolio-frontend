import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-resume',
  imports: [CommonModule],
  templateUrl: './resume.html',
  styleUrl: './resume.scss'
})
export class Resume {
 @Input() visible=false;
 @Output() close=new EventEmitter<void>();
 
 onClose(){
  this.close.emit();
 }
}
