import Header from "./components/Header/Header";

class App {

    constructor(hostId: string) {
        new Header(hostId);
    }

}

export default App;