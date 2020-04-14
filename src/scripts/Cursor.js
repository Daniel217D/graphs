export default class Cursor {
    constructor(el) {
        this.x = 0;
        this.y = 0;

        this.mouseDown = {
            status: false,
            obj: {}
        };

        this.drag = {
            status: false,
            obj: {}
        };

        this.click = {
            status: false,
            obj: {}
        };
        const rect = el.getBoundingClientRect();

        el.addEventListener('mousemove', (e) => {
            this.x = e.clientX - rect.left;
            this.y = e.clientY - rect.top;
        });
    }

    set = (event, status, obj = {}) => this[event] = {status, obj};

    statusIs = (event, status) => status === this[event]?.status;

    getObj = (event) => this[event] !== undefined ? this[event].obj : undefined;
}