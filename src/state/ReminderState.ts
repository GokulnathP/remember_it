import IndexedDB from "../database/IndexedDb";
import AutoBind from "../decorators/AutoBind";
import Reminder from "../models/Reminder";
import State from "./State";
import {IndexedDBConnection} from "../database/IndexedDBConnection";

class ReminderState extends State<Reminder> {
    private static instance: ReminderState;
    private indexedDBConnection: IndexedDBConnection | undefined;

    private reminders: Reminder[] = [];
    private filterText: string = "";
    public loading: boolean = false;

    private constructor() {
        super();
    }

    @AutoBind
    async establishDBConnection() {
        this.loading = true;
        this.notify();

        try {
            this.indexedDBConnection = await IndexedDB.connect("reminders", 1, async (db) => {
                if (!db.objectStoreNames.contains("reminders")) {
                    await db.createObjectStore("reminders", {keyPath: "id"});
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            this.loading = false;
            this.notify();
        }
    }

    @AutoBind
    async load() {
        const reminders = await this.execute(() => {
            return this.indexedDBConnection!.readAll<Reminder>("reminders");
        });

        this.reminders.push(...reminders);
        this.notify();
    }

    @AutoBind
    async addReminder(reminder: Reminder) {
        this.reminders.push(reminder);

        await this.execute(() => {
            return this.indexedDBConnection!.write("reminders", reminder);
        });
    }

    @AutoBind
    async updateReminder(reminder: Reminder) {
        this.reminders = this.reminders.map(oldReminder => {
            if (oldReminder.id == reminder.id) {
                return reminder;
            }
            return oldReminder;
        });

        await this.execute(() => {
            return this.indexedDBConnection!.write("reminders", reminder);
        });
    }

    @AutoBind
    async deleteReminder(reminderId: string) {
        this.reminders = this.reminders.filter(reminder => reminder.id != reminderId);

        await this.execute(() => {
            return this.indexedDBConnection!.remove("reminders", reminderId);
        });
    }

    @AutoBind
    async toggleFavorite(reminderId: string) {
        const toggledReminder = this.reminders.find(reminder => reminder.id === reminderId);

        if (toggledReminder) {
            toggledReminder.favorite = !toggledReminder.favorite;

            await this.execute(() => {
                return this.indexedDBConnection!.write("reminders", toggledReminder);
            });
        }
    }

    @AutoBind
    updateFilter(filterText: string) {
        this.filterText = filterText;
        this.notify();
    }

    private async execute<T>(fn: () => Promise<T>): Promise<T> {
        if (!this.indexedDBConnection) {
            throw Error("No connection established");
        }

        this.loading = true;
        this.notify();

        return fn().finally(() => {
            this.loading = false;
            this.notify();
        })
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
        if (!this.instance) {
            this.instance = new ReminderState();
        }
        return this.instance;
    }
}

export default ReminderState.getInstance();