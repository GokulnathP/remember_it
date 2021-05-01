import Component from "../../Component/Component";

import "./Logo.scss"

class Logo extends Component<HTMLLIElement, HTMLImageElement>{

    constructor(hostId: string) {
        super(hostId, "img");
        this.element.id = "logo";

        this.configure();
        this.renderContent();
    }

    configure(): void {
    }

    renderContent(): void {
        this.element.src = "/logo.jpg";
    }

}

export default Logo;