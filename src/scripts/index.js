import '../styles/index.scss';

import Cursor from './Cursor';
import Dots from './Dots';

import $c from 'canvas-chaining-method';

const $canvas = $c(document.getElementById('canvas')).setSize();
const cursor = new Cursor($canvas.get('canvas'));
const dots = new Dots($canvas);
const line = {
    status: false,
    from: {}
};

$canvas.on('click', () => {
    const dot = dots.getByCoordinates(cursor.x, cursor.y);

    if (dot) {
        if (!line.status) {
            line.status = true;
            line.from = dot;
        } else {
            line.status = false;
            dots.addPath(line.from, dot);
        }
    } else {
        const newDot = dots.add(cursor.x, cursor.y);

        if(line.status) {
            line.status = false;
            dots.addPath(line.from, newDot);
        }
    }
});

// $canvas.on('dblclick', () => dots.removeByCoordinates(cursor.x, cursor.y));


function Render() {
    requestAnimationFrame(Render);
    $canvas.clear();

    if(line.status) {
        $canvas.beginPath()
            .line(line.from.x, line.from.y, cursor.x, cursor.y)
            .closePath()
            .stroke();
    }

    dots.show();
}

Render();