import Component from "../Component/Component";
import AutoBind from "../../decorators/AutoBind";

import "./backdrop.scss";

class Backdrop extends Component<HTMLDivElement, HTMLDivElement> {

    constructor(hostId: string, private onHide: () => void) {
        super(hostId, "div");

        this.renderContent();
        this.configure();
    }

    @AutoBind
    private hideBackdrop() {
        this.onHide();
    }

    configure(): void {
        this.element.addEventListener('click', this.hideBackdrop);
    }

    renderContent(): void {
        this.element.id = 'backdrop';
    }

    @AutoBind
    destroy() {
        this.element.removeEventListener('click', this.hideBackdrop);
        this.element.style.display = 'none';
    }
}

export default Backdrop;