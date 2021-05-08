import Component from "../Component/Component";
import Reminder from "../../models/Reminder";
import ReminderState from "../../state/ReminderState";
import AutoBind from "../../decorators/AutoBind";
import ReminderItem from "../ReminderItem/ReminderItem";
import template from "./reminderList.template";

import "./reminderList.scss";

class ReminderList extends Component<HTMLDivElement, HTMLDivElement> {
    private reminders: Reminder[];

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

    configure(): void {
        ReminderState.addListener(this.reminderListener);
    }

    renderContent(): void {
        this.element.id = 'reminder-list';
        this.element.innerHTML = template;
        this.element.querySelector('h2')!.textContent = (this.favorite ? 'Favorite ' : 'Other ') + 'Reminders';
        this.element.querySelector('div')!.id = (this.favorite ? '' : 'non-') + 'favorite-reminder-list';
        this.renderReminders();
    }

    private renderReminders() {
        const remindersDiv = this.element.querySelector('div')!;
        remindersDiv.innerHTML = '';

        if (this.reminders.length) {
            for (let reminder of this.reminders) {
                remindersDiv.className = '';
                new ReminderItem((this.favorite ? '' : 'non-') + 'favorite-' + this.element.id, reminder);
            }
        } else {
            remindersDiv.className = 'center';
            remindersDiv.innerHTML = 'No reminders yet! Add a one!!';
        }

    }

}

export default ReminderList;