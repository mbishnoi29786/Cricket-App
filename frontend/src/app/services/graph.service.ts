import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class GraphService {
    graphChanged:EventEmitter<boolean>=new EventEmitter<boolean>;
    emitSignal() {
        this.graphChanged.emit(true);
    }
}