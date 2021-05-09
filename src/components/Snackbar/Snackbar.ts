import Component from "../Component/Component";
import AutoBind from "../../decorators/AutoBind";

import "./snackbar.scss";

class Snackbar extends Component<HTMLDivElement, HTMLDivElement> {

    constructor(hostId: string, private content: string) {
        super(hostId, "div");
        this.element.id = "snackbar";

        this.renderContent();
        this.configure();
    }

    configure(): void {
        setTimeout(this.destroy, 2000);
    }

    renderContent(): void {
        this.element.textContent = this.content;
    }

    @AutoBind
    destroy() {
        this.element.style.opacity = "0";
    }
}

export default Snackbar;