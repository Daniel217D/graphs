const distance = (sx, sy, ex, ey) => Math.sqrt((sx - ex) ** 2 + (sy - ey) ** 2);

const angle = (sx, sy, ex, ey) => Math.atan2(ey - sy, ex - sx);

const direction = (...args) => {
    const ang = angle(...args);
    return {x: Math.cos(ang), y: Math.sin(ang)};
};

const angleToDirection = (ang) => ({x: Math.cos(ang), y: Math.sin(ang)});

export {distance, direction, angle, angleToDirection};