import '../styles/index.scss';

import './CanvasCM-graphs';
import $c from 'canvas-chaining-method';
import createTree from './createTree'

const depth = 8;

const tree = createTree(depth);

const $canvas = $c(document.getElementById('canvas')).setSize();

const draw = () => {
    $canvas.setSize()
        .set("fillStyle", "white")
        .rect(0,0,$canvas.get("w"),$canvas.get("h"))
        .fill()
        .set("fillStyle", "black")
        .drawTree(tree, depth, $canvas.get("w") / 2, depth * 10 + 10);
};

draw();

window.addEventListener('resize', function () {
    draw();
});

