import Listener from "../models/Listener";

abstract class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }

    protected abstract notify(): void;
}

export default State;