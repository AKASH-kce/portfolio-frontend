import { AfterViewChecked, Component, ElementRef, EventEmitter, Output, ViewChild, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../../app';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  messages: { sender: 'user' | 'bot'; text: string }[] = [];
  userMessage = '';
  @ViewChild('chatMessages') chatMessagesRef!: ElementRef;
  @Output() close = new EventEmitter<void>();
  isTyping: boolean = false;

  constructor(private http: HttpClient) { }
  ngAfterViewChecked(): void {
    // this.scrollToBottom();
  }
  ngOnInit(): void {
    this.messages.push({
      sender: 'bot',
      text: "Hello! My name is Angel. I'm Akash's Assistant. Ask me anything about him — I'm here to help!"
    });
  }
  scrollToBottom(): void {
    try {
      this.chatMessagesRef.nativeElement.scrollTop =
        this.chatMessagesRef.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.messages.push({ sender: 'user', text: this.userMessage });
    this.isTyping = true;
    const payload = { question: this.userMessage };
    this.userMessage = '';
    this.scrollToBottom();
    this.http.post<any>('POST https://akash-chatbot-python.onrender.com/chat/ask', payload).subscribe(res => {
      this.isTyping = false;
      this.scrollToBottom();
      this.messages.push({ sender: 'bot', text: res.response });
    });
    this.scrollToBottom();
  }

  closeWindow() {
    this.close.emit();
  }
}
