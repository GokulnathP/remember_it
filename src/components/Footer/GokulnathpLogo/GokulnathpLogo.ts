import Component from "../../Component/Component";

import "./gokulnathpLogo.scss"

class GokulnathpLogo extends Component<HTMLLIElement, HTMLImageElement>{

    constructor(hostId: string) {
        super(hostId, "img");
        this.element.id = "gokulnathp-logo";

        this.configure();
        this.renderContent();
    }

    configure(): void {
    }

    renderContent(): void {
        this.element.src = "/gokulnathp.webp";
    }

}

export default GokulnathpLogo;