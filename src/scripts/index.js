import '../styles/index.scss';

import { setEventById } from './helpers';
import Cursor from './Cursor';
import Status from "./Status";
import Storage from "./Storage";
import Ask from "./AskPopUp";

import Dots from './Dots';
import DotsExamples from './DotsExamples';
import $cg from './CanvasCMGraphs';

const $gcanvas = $cg(document.getElementById('canvas')).setSize();
const cursor = new Cursor($gcanvas.get('canvas'));
const dots = new Dots($gcanvas);
const status = new Status(document.getElementById("status"));
(new DotsExamples(dots)).demo1();
const storage = new Storage(dots);
const asking = new Ask();

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
    const dot = dots.getByCoordinates(cursor.x, cursor.y, {r: 0});
    if(dot) {
        dots.remove(dot.id)
    }
    e.preventDefault();
});

setEventById([
    {
        id: "canvas-storage", func: (() => {
            const el = document.getElementById('canvas-saves');
            return () => el.classList.toggle('hidden');
        })()
    },
    {
        id: "canvas-saves", func: async ({target}) => {
            if (target.tagName === "BUTTON") {
                const id = target.getAttribute('data-save');
                const actions = {
                    'save': () => {storage.save(id);},
                    'rewrite': () => {storage.save(id);},
                    'load': () => {storage.load(id);},
                    'delete': () => {storage.delete(id);},
                    'close': () => {/*do nothing*/}
                };
                let answer;

                if(!storage.canLoad(id)) {
                    answer = await asking.ask([
                        {value: 'save', text: 'Сохранить'},
                        {value: 'close', text: 'Закрыть'}
                    ]);
                } else {
                    answer = await asking.ask([
                        {value: 'rewrite', text: 'Перезаписать'},
                        {value: 'load', text: 'Загрузить'},
                        {value: 'delete', text: 'Удалить'},
                        {value: 'close', text: 'Закрыть'}
                    ]);
                }

                actions[answer]();
            }
        }
    },
    {
        id: "canvas-clear", func: () => {
            dots.clear();
            status.clear();
        }
    },
    {id: "canvas-internal_stability", func: () => status.print(dots.internal_stability())},
    {id: "canvas-maximal_internal_stability", func: () => status.print(dots.internal_stability(true))},
    {id: "canvas-external_stability", func: () => status.print(dots.external_stability())},
    {id: "canvas-minimal_external_stability", func: () => status.print(dots.external_stability(true))},
    {id: "canvas-cores", func: () => status.print(dots.cores())},
]);

status.field.addEventListener('mouseover', ({target}) => {
    if (target.tagName === "LI") {
        const array = target.getAttribute('data-array').split(',');
        array.forEach(dotId => dots.getDotById(parseInt(dotId)).color = "#DD1C1A");

        target.addEventListener('mouseleave', () => array.forEach(dotId => dots.getDotById(parseInt(dotId)).color = "black", {once: true}));
    }
});

(function render (){
    requestAnimationFrame(render);
    $gcanvas.clear();
    dots.print();

    if (cursor.statusIs("click", "dot")) {
        $gcanvas.gArrow(cursor.getObj("click").x, cursor.getObj("click").y, cursor.x, cursor.y, 0);
    }
})();

window.addEventListener('resize',  () => $gcanvas.setSize());