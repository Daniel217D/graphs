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

    show = ($canvas) => {
        this.paths.forEach(({id, x, y}) => {
            if (id >= this.id) {
                $canvas.beginPath()
                    .line(this.x, this.y, x, y)
                    .closePath()
                    .stroke();
            }
        });

        $canvas
            .save()
            .beginPath()
            .set({
                "fillStyle": "white",
                "strokeStyle": this.color,
                "font": "30px Arial",
                "textAlign": "center"
            })
            .circle(this.x, this.y, this.r)
            .stroke()
            .fill()
            .set("fillStyle", this.color)
            .fillText(this.id, this.x, this.y + this.r / 4)
            .closePath()
            .restore();
    };
}

export {defaults};