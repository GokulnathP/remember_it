abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    hostElement: T;
    element: U;

    protected constructor(hostId: string, elementTag: string, insertAtFirst: boolean = false) {
        this.hostElement = document.getElementById(hostId) as T;
        this.element = document.createElement(elementTag) as U;

        this.attach(insertAtFirst);
    }

    abstract configure(): void;

    abstract renderContent(): void;

    private attach(insertAtFirst: boolean) {
        this.hostElement.insertAdjacentElement(insertAtFirst ? "afterbegin" : "beforeend", this.element);
    }
}

export default Component;