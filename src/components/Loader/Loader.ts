import Component from "../Component/Component";
import Backdrop from "../Backdrop/Backdrop";
import template from "./loader.template";
import ReminderState from "../../state/ReminderState";

import "./Loader.scss";

class Loader extends Component<HTMLDivElement, HTMLDivElement> {
    private backdrop: Backdrop;

    constructor(private hostId: string) {
        super(hostId, "div");
        this.backdrop = new Backdrop(hostId);

        this.renderContent();
        this.configure();
    }

    configure(): void {
        ReminderState.addListener(() => {
            ReminderState.loading ? this.show() : this.hide();
        });
    }

    renderContent(): void {
        this.element.classList.add("loader");
        this.element.innerHTML = template;

        if (!ReminderState.loading) {
            this.hide();
        }
    }

    private show() {
        this.element.style.display = "block";
        this.backdrop.show();
    }

    private hide() {
        this.element.style.display = "none";
        this.backdrop.hide();
    }
}

export default Loader;