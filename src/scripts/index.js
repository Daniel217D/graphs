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

$gcanvas.on('mousedown', (e) => {
    if(e.button !== 0) { //only left click
        return;
    }
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
        dots.remove(dot.id);
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
                    'save': () => {storage.save(id); alert('Граф сохранен в браузере');},
                    'rewrite': () => {storage.save(id); alert('Сохранение пересаписано');},
                    'file_save': () => {
                        const data = new DataView(new ArrayBuffer(12 + dots.count() * 20 + dots.pathsCount() * 12));

                        data.setInt8(0, 71);
                        data.setInt8(1, 82);
                        data.setInt8(2, 68);
                        data.setInt8(3, 1);
                        data.setUint32(4, dots.count(), true);

                        let offset = 8;

                        for (let i = 0; i < dots.count(); i++) {
                            data.setUint32(offset + 20 * i, dots.dots[i].id - 1, true);
                            data.setFloat64(offset + 4 + 20 * i, dots.dots[i].x, true);
                            data.setFloat64(offset + 12 + 20 * i, dots.dots[i].y,true);
                        }

                        offset += 20 * dots.count();

                        data.setUint32(offset, dots.pathsCount(), true);

                        offset += 4;

                        const paths = [];

                        dots.dots.forEach(dot => {
                            paths[dot.id - 1] = dot.paths.map(d => {
                                if(paths[d.id - 1] === undefined) {
                                    return [d.id - 1, 2];
                                } else {
                                    const find = paths[d.id - 1].find(el => el !== undefined && el[0] === dot.id - 1);
                                    if(find!== undefined) {
                                        find[1] = 3;
                                    } else {
                                        return [d.id - 1, 2];
                                    }
                                }
                            });
                        });
                        let i = 0;
                        paths.forEach((ps, psid) => {
                            ps.forEach(p => {
                                if(p !== undefined) {
                                    data.setUint32(offset + 12 * i, psid, true);
                                    data.setUint32(offset + 4 + 12 * i, p[0], true);
                                    data.setUint32(offset + 8 + 12 * i,p[1], true);
                                    i++;
                                }
                            });
                        });
                        console.log(data.buffer);

                        function download(data, filename, type) {
                            const file = new Blob([data], {type: type});
                            if (window.navigator.msSaveOrOpenBlob) // IE10+
                                window.navigator.msSaveOrOpenBlob(file, filename);
                            else { // Others
                                const a = document.createElement("a"),
                                    url = URL.createObjectURL(file);
                                a.href = url;
                                a.download = filename;
                                document.body.appendChild(a);
                                a.click();
                                setTimeout(function() {
                                    document.body.removeChild(a);
                                    window.URL.revokeObjectURL(url);
                                    alert('Граф сохранен в файл ' + filename);
                                }, 0);
                            }
                        }

                        download(data.buffer, `graph-${(new Date).getMonth() + 1}-${(new Date).getDate()}-${(new Date).getHours()}-${(new Date).getMinutes()}-${(new Date).getSeconds()}.grd`, 'binary');
                    },
                    'load': () => {storage.load(id); alert('Граф загружен из браузера');},
                    'file_load' : () => {
                        const input = document.getElementById('fileLoader');
                        input.addEventListener("change", function () {
                            const file = this.files[0];
                            const reader = new FileReader();
                            reader.onload = function () {
                                const data = new DataView((new Uint8Array(this.result)).buffer);

                                if (data.getUint8(0) !== 71 || data.getUint8(1) !== 82 || data.getUint8(2) !== 68) {
                                    alert("Неверный формат файла");
                                    return false;
                                }
                                let offset;

                                const dotsCount = data.getUint32(4, true);

                                offset = 8 + dotsCount * 20;
                                const pathsCount = data.getUint32(offset, true);

                                const readDots = [];
                                const readPaths = [];

                                offset = 8;
                                for (let i = 0; i < dotsCount; i++) {
                                    readDots.push({
                                        id: data.getUint32(offset + 20 * i, true) + 1,
                                        x: data.getFloat64(offset + 4 + 20 * i, true),
                                        y: data.getFloat64(offset + 12 + 20 * i, true)
                                    });
                                }

                                offset = 8 + 20 * dotsCount + 4;

                                for (let i = 0; i < pathsCount; i++) {
                                    readPaths.push({
                                        firstId: data.getUint32(offset + 12 * i, true) + 1,
                                        secondId: data.getUint32(offset + 4 + 12 * i, true) + 1,
                                        dir: data.getUint32(offset + 8 + 12 * i, true)
                                    });
                                }

                                dots.clear();
                                readDots.forEach(({x,y}) => dots.add(x,y));
                                readPaths.forEach(({firstId, secondId, dir}) => {
                                    if(dir === 0) {
                                        dots.addPath(secondId, firstId);
                                    } else if(dir === 1) {
                                        dots.addPath(firstId, secondId);
                                    } else {
                                        dots.addPath(secondId, firstId);
                                        dots.addPath(firstId, secondId);
                                    }
                                });

                                storage.save(id);
                                alert('Граф загружен из файла');
                            };
                            reader.readAsArrayBuffer(file);
                        }, {once: true});
                        input.click();
                    },
                    'delete': () => {storage.delete(id); alert('Сохранение удалено из браузера');},
                    'close': () => {/*do nothing*/}
                };
                let answer;

                if(!storage.canLoad(id)) {
                    answer = await asking.ask([
                        {value: 'save', text: 'Сохранить'},
                        {value: 'file_load', text: 'Загрузить из файла и сохранить'},
                        {value: 'close', text: 'Закрыть'}
                    ]);
                } else {
                    answer = await asking.ask([
                        {value: 'rewrite', text: 'Перезаписать'},
                        {value: 'load', text: 'Загрузить'},
                        {value: 'delete', text: 'Удалить'},
                        {value: 'file_load', text: 'Загрузить из файла и перезаписать'},
                        {value: 'file_save', text: 'Сохранить в файл'},
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
    {id: "canvas-internal_stability", func: () => status.print({title: 'Внутренне устойчивые', data: dots.internal_stability()})},
    {id: "canvas-maximal_internal_stability", func: () => status.print({title: 'Макc. внутренне устойчивые', data: dots.internal_stability(true)})},
    {id: "canvas-external_stability", func: () => status.print({title: 'Внешне устойчивые', data: dots.external_stability()})},
    {id: "canvas-minimal_external_stability", func: () => status.print({title: 'Мин. внешне устойчивые', data: dots.external_stability(true)})},
    {id: "canvas-cores", func: () => status.print({title: 'Ядра', data: dots.cores()})},
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