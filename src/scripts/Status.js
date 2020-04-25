export default class Status {
    constructor(htmlElement) {
        this.field = htmlElement;
    }

    status;

    set = (status) => this.status = status;

    print(status = false) {
        if (status !== false) this.set(status);
        let text = "";

        if (status.length === 0) {
            text = "Пустое множество";
        } else if (Array.isArray(status)) {
            text = "<ul>";
            status.forEach(sub => {
                text += "<li>";
                sub.forEach(el => {
                    text += el + ", ";
                });
                text = text.substring(0, text.length - 2);
                text += ";</li>";
            });
            text += "</ul>";
        } else {
            text = status;
        }

        this.field.innerHTML = text;
    }
}