import '../styles/index.scss';

import Cursor from './Cursor';
import Dots from './Dots';

import $cg from './CanvasCMGraphs';
import {direction} from './helpers';

const $gcanvas = $cg(document.getElementById('canvas')).setSize();
const cursor = new Cursor($gcanvas.get('canvas'));
const dots = new Dots($gcanvas);

// dots.add(300, 300); //1
// dots.add(600, 300);
// dots.add(600, 600);
// dots.add(350, 700);
// dots.add(800, 700); //5
// dots.add(800, 200);
// dots.add(800, 300);
// dots.add(900, 400);
// dots.add(800, 500);
// dots.add(200, 500); //10
//
// dots.addPath(1,2);
// dots.addPath(1,10);
// dots.addPath(1,4);
// dots.addPath(2,3);
// dots.addPath(3,2);
// dots.addPath(3,5);
// dots.addPath(3,4);
// dots.addPath(2,4);
// dots.addPath(5,2);
// dots.addPath(5,4);
// dots.addPath(6,2);
// dots.addPath(6,7);
// dots.addPath(7,8);
// dots.addPath(8,5);
// dots.addPath(8,9);
// dots.addPath(9,5);
// dots.addPath(10,4);

const MAX = 20;
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        if(i * 10 + j >MAX) break;
        dots.add(200 + 80 * j, 200 + 100 * i);
    }
}

dots.dots.map((dot,i) => dots.addPath(i + 1, i + 2));

$gcanvas.on('mousedown', () => {
    const dot = dots.getByCoordinates(cursor.x, cursor.y, 0);
    if (dot) {
        cursor.set("mousedown", "dot", dot);
    }
}).on('mousemove', () => {
    if (cursor.statusIs("mousedown", "dot") && !cursor.statusIs("click", "dot")) {
        const dot = cursor.getObj("mousedown");
        cursor.set("mousedown", false);
        cursor.set("drag", "dot", dot);
    }

    if (cursor.statusIs("drag", "dot")) {
        const dot = dots.getByCoordinates(cursor.x, cursor.y);
        if(!dot || dot.id === cursor.getObj("drag").id) {
            cursor.getObj("drag").setPos(cursor.x, cursor.y);
        }
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
        const dot_r0 = dots.getByCoordinates(cursor.x, cursor.y, 0);
        if (dot_r0 && !cursor.statusIs('click', 'dot')) {
            cursor.set("click", "dot", dot);
        } else if (cursor.statusIs("click", "dot")) {
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
    }
    e.preventDefault();
});

window.test1 = () => {
    console.time("test1");
    const r = dots.maximal_independent_set();
    console.timeEnd("test1");
    console.log(r);
};
// window.test1();

// $gcanvas.on('dblclick', () => dots.removeByCoordinates(cursor.x, cursor.y));

function Render() {
    requestAnimationFrame(Render);
    $gcanvas.clear();
    dots.print();

    if (cursor.statusIs("click", "dot")) {
        $gcanvas.gArrow(cursor.getObj("click").x, cursor.getObj("click").y, cursor.x, cursor.y, 0);
    }
}

Render();
window.addEventListener('resize', function () {
    $gcanvas.setSize();
    Render();
});