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

    print(status = false) {
        if (status !== false) this.set(status);
        let text = "";

        if (status.length === 0) {
            text = "Пустое множество";
        } else if (Array.isArray(status)) {
            status
                .map(sub => sub.sort((a,b) => a - b))
                .sort((a,b) => a.length - b.length || a[0] - b[0])
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
        } else {
            text = status;
        }

        this.field.innerHTML = text;
    }
}