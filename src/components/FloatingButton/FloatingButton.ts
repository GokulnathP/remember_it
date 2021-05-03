import Component from "../Component/Component";
import template from "./floatingButton.template";

import "./floatingButton.scss";

class FloatingButton extends Component<HTMLDivElement, HTMLButtonElement> {

    constructor(hostId: string, private onAdd: () => void) {
        super(hostId, 'button');

        this.renderContent();
        this.configure();
    }

    configure(): void {
        this.element.addEventListener('click', this.onAdd);
    }

    renderContent(): void {
        this.element.id = "add-reminder-btn";
        this.element.innerHTML = template;
    }

}

export default FloatingButton;