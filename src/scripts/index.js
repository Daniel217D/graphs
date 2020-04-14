import '../styles/index.scss';

import Cursor from './Cursor';
import Dots from './Dots';

import $cg from './CanvasCMGraphs';

const $gcanvas = $cg(document.getElementById('canvas')).setSize();
const cursor = new Cursor($gcanvas.get('canvas'));
const dots = new Dots($gcanvas);

$gcanvas.on('mousedown', () => {
    const dot = dots.getByCoordinates(cursor.x, cursor.y, 0);
    if (dot) {
        cursor.set("mousedown", "dot", dot);
    }
}).on('mousemove', () => {
    if (cursor.statusIs("mousedown", "dot")) {
        const dot = cursor.getObj("mousedown");
        cursor.set("mousedown", false);
        cursor.set("drag", "dot", dot);
        dot.setPos(cursor.x, cursor.y);
    }

    if (cursor.statusIs("drag", "dot")) {
        cursor.getObj("drag").setPos(cursor.x, cursor.y);
    }
}).on('click', () => {
    if (cursor.statusIs("drag", "dot")) {
        cursor.set("drag", false);
        return;
    }

    if (cursor.statusIs("mousedown", "dot")) {
        cursor.set("mousedown", false);
    }

    const dot = dots.getByCoordinates(cursor.x, cursor.y);
    if (dot) {
        if (!cursor.statusIs('click', 'dot')) {
            cursor.set("click", "dot", dot);
        } else if (cursor.statusIs("click", "dot")) {
            const dot = dots.getByCoordinates(cursor.x, cursor.y, 0);
            if (dot) {
                dots.addPath(cursor.getObj("click"), dot);
                cursor.set("click", false);
            }
        }
    } else {
        const newDot = dots.add(cursor.x, cursor.y);

        if (cursor.statusIs("click", "dot")) {
            dots.addPath(cursor.getObj("click"), newDot);
            cursor.set("click", false);
        }
    }
}).on('contextmenu', (e) => {
    if(cursor.statusIs("click", "dot")) {
        cursor.set("click", false);
        e.preventDefault();
    }
});

// $gcanvas.on('dblclick', () => dots.removeByCoordinates(cursor.x, cursor.y));

function Render() {
    requestAnimationFrame(Render);
    $gcanvas.clear();
    if (cursor.statusIs("click", "dot")) {
        $gcanvas.gLine(cursor.getObj("click").x, cursor.getObj("click").y, cursor.x, cursor.y);
    }

    dots.show();
}

Render();