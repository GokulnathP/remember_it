import Component from "../Component/Component";
import Logo from "./Logo/Logo";
import Search from "./Search/Search";
import template from './header.template';

import "./header.scss";

class Header extends Component<HTMLDivElement, HTMLUListElement> {

    constructor(hostId: string) {
        super(hostId, "ul");
        this.element.id = "header";

        this.renderContent();
        this.configure();
    }

    configure(): void {
        new Logo("brand-logo");
        new Search("search");
    }

    renderContent(): void {
        this.element.innerHTML = template;
    }

}

export default Header;