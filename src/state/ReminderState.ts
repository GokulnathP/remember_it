import State from "./State";
import Reminder from "../models/Reminder";
import AutoBind from "../decorators/AutoBind";

class ReminderState extends State<Reminder> {
    private static instance: ReminderState;
    private reminders: Reminder[] = [];
    private filterText: string = "";

    private constructor() {
        super();
    }

    @AutoBind
    addReminder(reminder: Reminder) {
        this.reminders.push(reminder);
        this.notify();
    }

    @AutoBind
    updateReminder(reminder: Reminder) {
        this.reminders = this.reminders.map(oldReminder => {
            if(oldReminder.id == reminder.id) {
                return reminder;
            }
            return oldReminder;
        });
        this.notify();
    }

    @AutoBind
    deleteReminder(reminderId: string) {
        this.reminders = this.reminders.filter(reminder => reminder.id != reminderId);
        this.notify();
    }

    @AutoBind
    toggleFavorite(reminderId: string) {
        this.reminders = this.reminders.map(reminder => {
            if(reminder.id == reminderId) {
                reminder.favorite = !reminder.favorite;
            }
            return reminder;
        });
        this.notify();
    }

    @AutoBind
    updateFilter(filterText: string) {
        this.filterText = filterText;
        this.notify();
    }

    private filterReminders(): Reminder[] {
        return this.reminders.filter(reminder => reminder.title.toLowerCase().search(this.filterText.toLowerCase()) >= 0);
    }

    protected notify() {
        for (const listener of this.listeners) {
            listener(this.filterReminders().slice());
        }
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new ReminderState();
        }
        return this.instance;
    }
}

export default ReminderState.getInstance();