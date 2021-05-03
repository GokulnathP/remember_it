class Reminder {

    constructor(
        public id: string,
        public title: string,
        public link: string,
        public favorite: boolean = false
    ) {
    }

}

export default Reminder;