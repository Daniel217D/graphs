const defaults = {
    id: -1,
    paths: [],
    r: 30,
    color: "black"
};

export default class Dot {
    constructor(id = defaults.id, x, y, r = defaults.r, color = defaults.color, paths = defaults.paths) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.paths = Array.from(paths);
        this.r = r;
        this.color = color;
    }

    printDot = ($gcanvas) => {
        $gcanvas.gDot(this.x, this.y, this.r, this.color, this.id);
    };

    printPaths = ($gcanvas) => {
        this.paths.forEach(({id, x, y}) => {
            // if (id >= this.id) {
            $gcanvas.gArrow(this.x, this.y, x, y, this.r);
            // }
        });
    };

    addPath = (dot) => this.paths.push(dot)

    setPos = (x, y) =>  {
        this.x = x;
        this.y = y;
    }
}

export {defaults};