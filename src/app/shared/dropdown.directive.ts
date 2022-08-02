import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
// This will open and close only on the btn
  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }

  // constructor() { }
// To close tapping everywhere
@HostListener('document:click', ['$event']) toggleOpen(event: Event) {
  this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
}

constructor(private elRef: ElementRef) {}
}


