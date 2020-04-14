import {CanvasCM} from 'canvas-chaining-method';

class CanvasCMGraphs extends CanvasCM {
    gLine = (sx, sy, ex, ey) => {
        return this.beginPath()
            .line(sx, sy, ex, ey)
            .closePath()
            .stroke();

    };

    gDot = (x, y, r, color, text) => {
        return this.save()
            .beginPath()
            .set({
                "fillStyle": "white",
                "strokeStyle": color,
                "font": "30px Arial",
                "textAlign": "center"
            })
            .circle(x, y, r)
            .stroke()
            .fill()
            .set("fillStyle", color)
            .fillText(text, x, y + r / 4)
            .closePath()
            .restore();
    };
}

const $cg = (canvas) => {
    return new CanvasCMGraphs(canvas);
};

export default $cg;
export {CanvasCMGraphs};