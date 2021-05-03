import State from "./State";
import Reminder from "../models/Reminder";
import AutoBind from "../decorators/AutoBind";

class ReminderState extends State<Reminder> {
    private static instance: ReminderState;
    private reminders: Reminder[] = [];

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

    protected notify() {
        for (const listener of this.listeners) {
            listener(this.reminders.slice());
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