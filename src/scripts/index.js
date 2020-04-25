import '../styles/index.scss';

import Cursor from './Cursor';
import Dots from './Dots';
import DotsExamples from './DotsExamples';

import $cg from './CanvasCMGraphs';

const $gcanvas = $cg(document.getElementById('canvas')).setSize();
const cursor = new Cursor($gcanvas.get('canvas'));
const dots = new Dots($gcanvas);
const examples = new DotsExamples(dots);

examples.demo1();

$gcanvas.on('mousedown', () => {
    const dot = dots.getByCoordinates(cursor.x, cursor.y, {r: 0});
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
        const draggableDotId = cursor.getObj("drag").id;
        const dot = dots.getByCoordinates(cursor.x, cursor.y, {except: [draggableDotId]});
        if (!dot || dot.id === draggableDotId) {
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
        const dot_r0 = dots.getByCoordinates(cursor.x, cursor.y, {r: 0});
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
    if (cursor.statusIs("click", "dot")) {
        cursor.set("click", false);
    }
    e.preventDefault();
});

const clearBtn = document.getElementById("canvas-clear");
clearBtn.addEventListener("click", () => dots.clear());

window.test1 = () => {
    console.log(dots.cores());
    console.log(dots.cores(true));
};

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