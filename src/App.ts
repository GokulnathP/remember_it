import Component from "./components/Component/Component";

class App extends Component<HTMLDivElement, HTMLHeadingElement> {

    constructor(hostId: string) {
        super(hostId, "h1");

        this.renderContent();
        this.configure();
    }

    configure() {
    }

    renderContent() {
        this.element.textContent = "Hello World";
    }
}

export default App;