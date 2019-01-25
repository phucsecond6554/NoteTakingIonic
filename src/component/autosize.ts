// Cam on Ramon tại 'https://forum.ionicframework.com/t/autosize-ion-textarea/123708/7'
// và Demo tại 'https://stackblitz.com/edit/expandable-input-nsxshd?file=components%2Fautosize.ts'
// Phần autosize cho text area này là của bạn Ramon

import { ElementRef, HostListener, Directive, OnInit } from '@angular/core';

@Directive({
  selector: 'ion-textarea[autosize]'
})

export class Autosize implements OnInit {
  @HostListener('input', ['$event.target'])
  onInput(textArea:HTMLTextAreaElement):void {
    this.adjust();
  }

  constructor(public element:ElementRef) {
  }

  ngOnInit():void {
    setTimeout(() => this.adjust(), 0);
  }

  adjust():void {
    const textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}