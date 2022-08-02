import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[AppPlaceholder]'
})
export class PlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}