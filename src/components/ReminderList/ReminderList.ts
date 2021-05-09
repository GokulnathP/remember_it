import Component from "../Component/Component";
import Reminder from "../../models/Reminder";
import ReminderState from "../../state/ReminderState";
import AutoBind from "../../decorators/AutoBind";
import ReminderItem from "../ReminderItem/ReminderItem";
import template from "./reminderList.template";
import DragTarget from "../../models/DragTarget";

import "./reminderList.scss";

class ReminderList extends Component<HTMLDivElement, HTMLDivElement> implements DragTarget {
    private reminders: Reminder[];
    private remindersDiv: HTMLDivElement | null = null;
    private dragEventType: string = "";

    constructor(hostId: string, private favorite: boolean = false) {
        super(hostId, "div");
        this.reminders = [];

        this.renderContent();
        this.configure();
    }

    @AutoBind
    private reminderListener(reminders: Reminder[]) {
        this.reminders = reminders.filter(reminder => reminder.favorite == this.favorite);
        this.renderReminders();
    }

    @AutoBind
    dragOverHandler(event: DragEvent): void {
        if(event.dataTransfer?.types[0] == this.dragEventType) {
            event.preventDefault();
            this.remindersDiv?.classList.add("droppable");
        }
    }

    @AutoBind
    dropHandler(event: DragEvent): void {
        const reminderId = event.dataTransfer!.getData(this.dragEventType);
        ReminderState.toggleFavorite(reminderId);
        this.dragLeaveHandler(event);
    }

    @AutoBind
    dragLeaveHandler(event: DragEvent): void {
        this.remindersDiv?.classList.remove("droppable");
    }

    configure(): void {
        this.dragEventType = "text/" + (this.favorite ? "non-" : "") + "fav";

        ReminderState.addListener(this.reminderListener);
        this.remindersDiv?.addEventListener("drop", this.dropHandler);
        this.remindersDiv?.addEventListener("dragover", this.dragOverHandler);
        this.remindersDiv?.addEventListener("dragleave", this.dragLeaveHandler);
    }

    renderContent(): void {
        this.element.id = 'reminder-list';
        this.element.innerHTML = template;
        this.element.querySelector('h2')!.textContent = (this.favorite ? 'Favorite ' : 'Other ') + 'Reminders';

        this.remindersDiv = this.element.querySelector('div')!;
        this.remindersDiv.id = (this.favorite ? '' : 'non-') + 'favorite-reminder-list';
        this.renderReminders();
    }

    private renderReminders() {
        this.remindersDiv!.innerHTML = '';

        if (this.reminders.length) {
            for (let reminder of this.reminders) {
                this.remindersDiv!.className = '';
                new ReminderItem((this.favorite ? '' : 'non-') + 'favorite-' + this.element.id, reminder);
            }
        } else {
            this.remindersDiv!.className = 'center';
            this.remindersDiv!.innerHTML = 'No reminders yet! Add a one!!';
        }

    }

}

export default ReminderList;