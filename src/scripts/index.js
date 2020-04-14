import '../styles/index.scss';

import Cursor from './Cursor';
import Dots from './Dots';

import $cg from './CanvasCMGraphs';

const $gcanvas = $cg(document.getElementById('canvas')).setSize();
const cursor = new Cursor($gcanvas.get('canvas'));
const dots = new Dots($gcanvas);

$gcanvas.on('click', () => {
    const dot = dots.getByCoordinates(cursor.x, cursor.y);
    if (dot) {
        if (!cursor.clicked.status) {
            cursor.click("dot", dot);
        } else if (cursor.statusIs("dot")) {
            const dot = dots.getByCoordinates(cursor.x, cursor.y, 0);
            if (dot) {
                dots.addPath(cursor.getObj(), dot);
                cursor.click(false);
            }
        }
    } else {
        const newDot = dots.add(cursor.x, cursor.y);

        if (cursor.statusIs("dot")) {
            dots.addPath(cursor.getObj(), newDot);
            cursor.click(false);
        }
    }
});

// $gcanvas.on('dblclick', () => dots.removeByCoordinates(cursor.x, cursor.y));

function Render() {
    requestAnimationFrame(Render);
    $gcanvas.clear();
    if (cursor.statusIs("dot")) {
        $gcanvas.gLine(cursor.getObj().x, cursor.getObj().y, cursor.x, cursor.y)
    }

    dots.show();
}

Render();