import { Component } from "@angular/core";

@Component({
    template: '<ng-content></ng-content>'
})
export abstract class BaseComponent {
    // Common functionality for all components
}