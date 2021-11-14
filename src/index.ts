import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import App from "./App";
import ReminderState from "./state/ReminderState";
import Loader from "./components/Loader/Loader";

import "./index.scss";

async function init() {
    new Loader("main");
    new Header("main");
    new App("main");
    new Footer("main");

    await ReminderState.establishDBConnection();
    await ReminderState.load();
}

(async () => await init())();