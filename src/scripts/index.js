import '../styles/index.scss';

import Cursor from './Cursor';
import Dots from './Dots';

import $cg from './CanvasCMGraphs';
import {direction} from './helpers';

const $gcanvas = $cg(document.getElementById('canvas')).setSize();
const cursor = new Cursor($gcanvas.get('canvas'));
const dots = new Dots($gcanvas);

dots.add(300, 300); //1
dots.add(600, 300);
dots.add(600, 600);
dots.add(350, 700);
dots.add(800, 700); //5
dots.add(800, 200);
dots.add(800, 300);
dots.add(900, 400);
dots.add(800, 500);
dots.add(200, 500); //10
dots.addPath(1,2);
dots.addPath(1,10);
dots.addPath(1,4);
dots.addPath(2,3);
dots.addPath(3,2);
dots.addPath(3,5);
dots.addPath(3,4);
dots.addPath(2,4);
dots.addPath(5,2);
dots.addPath(5,4);
dots.addPath(6,2);
dots.addPath(6,7);
dots.addPath(7,8);
dots.addPath(8,5);
dots.addPath(8,9);
dots.addPath(9,5);
dots.addPath(10,4);

// const MAX = 13;
// for (let i = 1; i <= MAX; i++) {
//     const rad = 360 / MAX * i * Math.PI / 180;
//     dots.add(600 + 300 * Math.cos(rad), 600 + 300 * Math.sin(rad));
// }

// for (let i = 1; i < MAX; i++) {
//     for (let j = i + 1; j <= MAX; j++) {
//         dots.addPath(i,j);
//     }
// }
//
// for (let i = 1; i <= 2; i++) {
//     for (let j = 1; j <= 9; j++) {
//         dots.add(100 + 100 * j, 200 + 100 * i);
//     }
// }
dots.dots.map((dot,i) => dots.addPath(i,i+1));
dots.addPath( dots.dots.length, 1);
// dots.add(300, 300); //1
// dots.add(150, 450);
// dots.add(300, 600);
// dots.add(450, 450);
// dots.addPath(1,2);
// dots.addPath(3,4);
// dots.addPath(4,1);
// dots.addPath(1,3);

// dots.add(300, 300);
// dots.add(600, 300);
// dots.add(450, 450);
// dots.add(450, 600);
// dots.add(300, 750);
// dots.add(600, 750);
// dots.addPath(1,2);
// dots.addPath(2,3);
// dots.addPath(3,1);
// dots.addPath(4,5);
// dots.addPath(5,6);
// dots.addPath(6,4);
// dots.addPath(3,4);

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
    let r;
    // console.time("test1");
    // r = dots.maximal_independent_set();
    // console.timeEnd("test1");
    // console.log(r);

    console.time("test12");
    r = dots.maximal_independent_set2();
    dots.dots.map(dot => {
        if(r[0].includes(dot.id)) dot.color = "red";
    });
    console.timeEnd("test12");
    console.log(r);
};
setTimeout(() => window.test1(), 1000);

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