export default class Cursor {
    constructor(el) {
        this.x = 0;
        this.y = 0;
        this.clicked = {
            status: false,
            obj: {}
        };
        const rect = el.getBoundingClientRect();

        el.addEventListener('mousemove', (e) => {
            this.x = e.clientX - rect.left;
            this.y = e.clientY - rect.top;
        });
    }

    click = (status, obj = {}) => this.clicked = {status, obj};

    statusIs = (status, context = "clicked") => status === this[context]?.status;

    getObj = (context = "clicked") => this[context] !== undefined ? this[context].obj : undefined;
}