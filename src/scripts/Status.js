export default class Status {
    constructor(htmlElement) {
        this.field = htmlElement;
    }

    status;

    set = (status) => this.status = status;

    clear = () => {
        this.status = "";
        this.field.innerText = "";
    };

    print({title = false, data: status = false}) {
        if (status !== false) this.set(status);
        let text = "";


        if (Array.isArray(status)) {
            if (status.length === 0) {
                text = "Пустое множество";
            } else {
                status
                    .map(sub => sub.sort((a,b) => a - b))
                    .sort((a,b) => a.length - b.length || a[0] - b[0])
                    .filter(sub => sub.length > 0)
                    .map(sub => {
                        let li = "";
                        let data = "";

                        sub.forEach(el => {
                            li += el + ", ";
                            data += el + ",";
                        });

                        li = li.substring(0, li.length - 2);
                        data = data.substring(0, data.length - 1);
                        text += "<li data-array='" + data + "'>" + li + ";</li>";
                    });
                text = "<ul>" + text + "</ul>";
            }
        } else {
            text = status;
        }

        if(title) {
            text = "<h4>" + title + "</h4>" + text;
        }
        this.field.innerHTML = text;
    }
}