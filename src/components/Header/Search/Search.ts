import Component from "../../Component/Component";
import AutoBind from "../../../decorators/AutoBind";
import ReminderState from "../../../state/ReminderState";
import template from "./search.template";

import "./search.scss";

class Search extends Component<HTMLLIElement, HTMLFormElement> {

    constructor(hostId: string) {
        super(hostId, "form");
        this.element.id = "search-form";

        this.renderContent();
        this.configure();
    }

    @AutoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        const searchText = this.element.querySelector('input')!.value;
        ReminderState.updateFilter(searchText);
    }

    configure(): void {
        this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent(): void {
        this.element.innerHTML = template;
    }
}

export default Search;