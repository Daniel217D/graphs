import {CanvasCM} from 'canvas-chaining-method';

CanvasCM.prototype.drawTree = function (dot, depth, x, y) {
    const r = depth * 8;
    const fontSize = r;
    const y_lr = y + r * 2;

    if(dot.right) {
        this.line(x, y, x + x / 2, y_lr);
    }

    if(dot.left) {
        this.line(x, y, x / 2, y_lr);
    }

    this.circle(x, y, r)
        .set("fillStyle", "white")
        .fill()
        .set("fillStyle", "black")
        .closePath()
        .set({
            'font': `${fontSize}px Arial`,
            'textAlign': 'center'
        })
        .fillText(dot.num < 1000 ? dot.num : '.', x, y + fontSize / 3);

    if (dot.right) {
        this.translate(x, 0)
            .drawTree(dot.right, depth - 1, x / 2, y_lr)
            .translate(-x, 0)
    }

    if (dot.left) {
        this.drawTree(dot.left, depth - 1, x / 2, y_lr);
    }

    return this;
};