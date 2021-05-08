import Component from "../Component/Component";
import template from "./footer.template";
import GokulnathpLogo from "./GokulnathpLogo/GokulnathpLogo";

import "./footer.scss";

class Footer extends Component<HTMLDivElement, HTMLDivElement> {

    constructor(hostId: string) {
        super(hostId, 'div');
        this.element.id = 'footer';

        this.renderContent();
        this.configure();
    }

    configure(): void {
    }

    renderContent(): void {
        this.element.innerHTML = template;
        new GokulnathpLogo("gokulnathp");
    }

}

export default Footer;