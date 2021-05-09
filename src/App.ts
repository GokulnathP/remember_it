import Component from "./components/Component/Component";
import ReminderList from "./components/ReminderList/ReminderList";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import ReminderForm from "./components/ReminderForm/ReminderForm";
import AutoBind from "./decorators/AutoBind";

import './app.scss';
import DeleteConfirmation from "./components/DeleteConfirmation/DeleteConfirmation";

class App extends Component<HTMLDivElement, HTMLDivElement> {

    constructor(hostId: string) {
        super(hostId, 'div');
        this.element.id = 'app';

        this.renderContent();
        this.configure();
    }

    @AutoBind
    onAddReminder() {
        new ReminderForm(this.element.id);
    }

    configure(): void {
    }

    renderContent(): void {
        new ReminderList(this.element.id, true);
        new ReminderList(this.element.id);
        new FloatingButton(this.element.id, this.onAddReminder);
    }

}

export default App;