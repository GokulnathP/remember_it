import State from "./State";
import Reminder from "../models/Reminder";

class ReminderState extends State<Reminder> {
    private static instance: ReminderState;
    private reminders: Reminder[] = [];

    private constructor() {
        super();
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