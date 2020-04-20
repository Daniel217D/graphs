import {CanvasCM} from 'canvas-chaining-method';
import {direction, angle, angleToDirection} from './helpers';

class CanvasCMGraphs extends CanvasCM {
    gArrow = (sx, sy, ex, ey, r) => {
        const dir = direction(sx, sy, ex, ey);
        const sxArrow = ex - dir.x * r;
        const syArrow = ey - dir.y * r;
        const exArrow = ex - dir.x * 2 * r;
        const eyArrow = ey - dir.y * 2 * r;

        const arrow1 = angleToDirection(angle(sxArrow, syArrow, exArrow, eyArrow) - ( 30 * Math.PI / 180));
        const arrow2 = angleToDirection(angle(sxArrow, syArrow, exArrow, eyArrow) + ( 30 * Math.PI / 180));

        return this.gLine(sx, sy, ex, ey)
            .gLine(sxArrow, syArrow, sxArrow + arrow1.x * r /2 , syArrow + arrow1.y * r / 2)
            .gLine(sxArrow, syArrow, sxArrow + arrow2.x * r / 2, syArrow + arrow2.y * r / 2);
    };

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