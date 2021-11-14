import Component from "../Component/Component";
import template from "./deleteConfirmation.template";
import AutoBind from "../../decorators/AutoBind";
import Backdrop from "../Backdrop/Backdrop";
import ReminderState from "../../state/ReminderState";

import "./deleteConfirmation.scss";

class DeleteConfirmation extends Component<HTMLDivElement, HTMLDivElement> {
    private backdrop: Backdrop;

    constructor(hostId: string, private reminderId: string) {
        super(hostId, "div");
        this.element.id = "delete-confirmation";
        this.backdrop = new Backdrop(hostId, this.destroy);

        this.renderContent();
        this.configure();
    }

    @AutoBind
    async deleteReminder() {
        await ReminderState.deleteReminder(this.reminderId);
        this.destroy();
    }

    configure(): void {
        this.element.querySelector("#delete-sure-btn")?.addEventListener("click", this.deleteReminder);
        this.element.querySelector("#delete-cancel-btn")?.addEventListener("click", this.destroy);
    }

    renderContent(): void {
        this.element.innerHTML = template;
    }

    @AutoBind
    destroy() {
        this.element.querySelector("#delete-sure-btn")?.removeEventListener("click", this.deleteReminder);
        this.element.style.display = "none";
        this.backdrop.destroy();
    }
}

export default DeleteConfirmation;