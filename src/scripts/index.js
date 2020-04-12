import '../styles/index.scss';

import $c from '../../../canvas-chaining-method/dist/index';

const $canvas = $c(document.getElementById('canvas'));

let dots = [];
let lines = [];
let status = {
  name: "",
  options: {

  }
};
const draw = () => {
    $canvas.setSize();
    dots.forEach((dot) => {
        printDot($canvas, ...dot);
    });

    lines.forEach((line) => {
        $canvas.beginPath()
            .line(...line)
            .closePath()
            .stroke();
    });
};

draw();
window.addEventListener('resize', function () {
    draw();
});


$canvas.on('click', function (e) {
    const [x, y] = [e.clientX, e.clientY];

    if (dots.length === 0 || dots.every(([dot_x, dot_y]) => distance(x, y, dot_x, dot_y) >= 60)) {
        dots.push([x, y]);
    } else if (dots.length !== 0) {
        if(status.name === "") {
            let active_dot = false;
            dots.some(([dot_x, dot_y]) => {
                if(distance(x, y, dot_x, dot_y) <= 20) {
                    active_dot = [dot_x, dot_y];
                    return true
                }
                return false
            })

            if(active_dot) {
                status = {
                    name: 'drawLine',
                    options: {
                        from: active_dot
                    }
                }
            }
        } else {
            lines.push([x, y, ...status.options.from]);
            status = {
                name: ""
            }
        }
    }

    draw();
}).on('mousemove', function (e) {
    draw();
    const [x, y] = [e.clientX, e.clientY];

    if(status.name === "drawLine") {
        this.beginPath()
            .line(...status.options.from, x, y)
            .closePath()
            .stroke();
    }
});


function printDot($canvas, x, y) {
    $canvas.beginPath()
        .circle(x, y, 30)
        .closePath()
        .stroke()
        .beginPath()
        .circle(x, y, 20)
        .closePath()
        .fill();
}

const distance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);