import Component from "../Component/Component";
import AutoBind from "../../decorators/AutoBind";

import "./backdrop.scss";

class Backdrop extends Component<HTMLDivElement, HTMLDivElement> {

    constructor(hostId: string, private onClickHandler = () => {}) {
        super(hostId, "div");

        this.renderContent();
        this.configure();
    }

    configure(): void {
        this.element.addEventListener("click", this.onClickHandler);
    }

    renderContent(): void {
        this.element.id = "backdrop";
    }

    hide(): void {
        this.element.style.display = "none";
    }

    show(): void {
        this.element.style.display = "block";
    }

    @AutoBind
    destroy() {
        this.element.removeEventListener("click", this.onClickHandler);
        this.element.style.display = "none";
    }
}

export default Backdrop;