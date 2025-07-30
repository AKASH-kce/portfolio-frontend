import { Component, EventEmitter, Output, ViewChild, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../../app';
  import {  OnInit } from '@angular/core';
@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  imports:[CommonModule,FormsModule],
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit{
  messages: { sender: 'user' | 'bot'; text: string }[] = [];
  userMessage = '';
  
  @Output() close = new EventEmitter<void>();
    isTyping: boolean=false;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
  this.messages.push({
    sender: 'bot',
    text: "Hello! My name is Angel. I'm Akash's Assistant. Ask me anything about him — I'm here to help!"
  });
}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.messages.push({ sender: 'user', text: this.userMessage });
this.isTyping = true;  
    const payload = { question: this.userMessage };
    this.userMessage = '';

    this.http.post<any>('https://portfolio-backend-docker-isvl.onrender.com/api/Chat/ask', payload).subscribe(res => {
         this.isTyping = false; 
      this.messages.push({ sender: 'bot', text: res.response });
    });
  }

  closeWindow() {
    this.close.emit();
  }
}