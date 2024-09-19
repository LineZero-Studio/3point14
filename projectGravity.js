if (window.innerWidth >= 992) {
    themeSwitch.addEventListener("click", (e) => {
        textblocks.forEach(box => {
            box.body.isStatic = !box.body.isStatic
            if (box.body.isStatic) {
                box.elem.style.transitionDuration = '0.5s'
                box.elem.style.transitionProperty = 'top, left, transform';
                box.snap()
            } else {
                box.elem.style.transitionDuration = '0s'
            }
        })
    });

    const vw = window.innerWidth / 100;
    const containerHeight = 26 * vw;
    const containerWidth = 30.37 * vw;
    const borderWidth = 0.5 * vw;
    const engine = Matter.Engine.create();
    engine.gravity.y = -0.1;

    const topOffset = 85 * vw;
    const leftOffset = 3.56 * vw;

    const textblock = (element, i) => {
        const elementLeftOffset = element.offsetWidth / 2 + (i % 3 * (containerWidth + (0.885 * vw))) + leftOffset;
        const elementTopOffset = (element.offsetHeight * Math.floor(i / 3)) + element.offsetHeight / 2 + topOffset;

        return {
            w: element.offsetWidth,
            h: element.offsetHeight,
            body: Matter.Bodies.rectangle(elementLeftOffset, elementTopOffset, element.offsetWidth, element.offsetHeight),
            elem: element,
            render() {
                const { x, y } = this.body.position;
                this.elem.style.top = `${y - this.h / 2}px`;
                this.elem.style.left = `${x - this.w / 2}px`;
                this.elem.style.transform = `rotate(${this.body.angle}rad)`;
            },
            snap() {
                Matter.Body.setPosition(this.body, { x: elementLeftOffset, y: elementTopOffset });
                Matter.Body.setAngle(this.body, 0);
            }
        }
    };

    Matter.Composite.add(engine.world, [
        Matter.Bodies.rectangle(containerWidth / 2 + leftOffset, borderWidth / 2 + topOffset, containerWidth, borderWidth, { isStatic: true }),
        Matter.Bodies.rectangle(containerWidth / 2 + leftOffset, containerHeight - (borderWidth / 2) + topOffset, containerWidth, borderWidth, { isStatic: true }),
        Matter.Bodies.rectangle(borderWidth / 2 + leftOffset, containerHeight / 2 + topOffset, borderWidth, containerHeight, { isStatic: true }),
        Matter.Bodies.rectangle(containerWidth - borderWidth / 2 + leftOffset, containerWidth / 2 + topOffset, borderWidth, containerHeight, { isStatic: true })
    ]);
    Matter.Composite.add(engine.world, [
        Matter.Bodies.rectangle(containerWidth + containerWidth / 2 + leftOffset, borderWidth / 2 + topOffset, containerWidth, borderWidth, { isStatic: true }),
        Matter.Bodies.rectangle(containerWidth + containerWidth / 2 + leftOffset, containerHeight - (borderWidth / 2) + topOffset, containerWidth, borderWidth, { isStatic: true }),
        Matter.Bodies.rectangle(containerWidth + borderWidth / 2 + leftOffset, containerHeight / 2 + topOffset, borderWidth, containerHeight, { isStatic: true }),
        Matter.Bodies.rectangle(containerWidth + containerWidth - borderWidth / 2 + leftOffset, containerWidth / 2 + topOffset, borderWidth, containerHeight, { isStatic: true })
    ]);
    Matter.Composite.add(engine.world, [
        Matter.Bodies.rectangle(containerWidth * 2 + containerWidth / 2 + leftOffset, borderWidth / 2 + topOffset, containerWidth, borderWidth, { isStatic: true }),
        Matter.Bodies.rectangle(containerWidth * 2 + containerWidth / 2 + leftOffset, containerHeight - (borderWidth / 2) + topOffset, containerWidth, borderWidth, { isStatic: true }),
        Matter.Bodies.rectangle(containerWidth * 2 + borderWidth / 2 + leftOffset, containerHeight / 2 + topOffset, borderWidth, containerHeight, { isStatic: true }),
        Matter.Bodies.rectangle(containerWidth * 2 + containerWidth - borderWidth / 2 + leftOffset, containerWidth / 2 + topOffset, borderWidth, containerHeight, { isStatic: true })
    ]);
    const mouseConstraint = Matter.MouseConstraint.create(
        engine, { element: document.body }
    );

    const textblocks = [];

    document.querySelectorAll(".textblock").forEach((element, i) => {
        const tb = textblock(element, i);
        textblocks.push(tb);
        Matter.Composite.add(
            engine.world, [tb.body]
        );
    });

    Matter.Composite.add(
        engine.world, [mouseConstraint]
    );
    (function rerender() {
        textblocks.forEach(tb => tb.render());
        Matter.Engine.update(engine);
        requestAnimationFrame(rerender);
    })();
} else {
    const wrapper = document.getElementById("wrapper");

    themeSwitch.addEventListener("touchend", (e) => {
        textblocks.forEach(box => {
            box.body.isStatic = !box.body.isStatic
            if (box.body.isStatic) {
                box.elem.style.transitionDuration = '0.5s'
                setTimeout(() => {
                    box.elem.style.transitionDuration = '0s'
                }, 500);
                box.elem.style.transitionProperty = 'top, left, transform';
                box.snapNoScroll()
            } else {
                box.snap()
                box.elem.style.transitionDuration = '0s'
            }
        })
    });

    const vw = window.innerWidth / 100;
    const containerHeight = 80 * vw;
    const containerWidth = 66.75 * vw;
    const borderWidth = 4.65 * vw;
    const engine = Matter.Engine.create();
    engine.gravity.y = -0.1;

    const topOffset = 242.2 * vw;
    const leftOffset = 3.5 * vw;
    const gap = 7 * vw;

    const textblock = (element, i) => {
        const elementLeftOffset = element.offsetWidth / 2 + (i % 3 * (containerWidth + (0.885 * vw) + gap)) + leftOffset + borderWidth;
        const elementTopOffset = (element.offsetHeight * Math.floor(i / 3)) + element.offsetHeight / 2 + topOffset + borderWidth;

        return {
            w: element.offsetWidth,
            h: element.offsetHeight,
            body: Matter.Bodies.rectangle(elementLeftOffset, elementTopOffset, element.offsetWidth, element.offsetHeight),
            elem: element,
            render() {
                const { x, y } = this.body.position;
                this.elem.style.top = `${y - this.h / 2}px`;
                this.elem.style.left = `${x - this.w / 2 - (this.body.isStatic ? wrapper.scrollLeft : 0)}px`;
                this.elem.style.transform = `rotate(${this.body.angle}rad)`;
            },
            snap() {
                Matter.Body.setPosition(this.body, { x: elementLeftOffset - wrapper.scrollLeft, y: elementTopOffset });
                Matter.Body.setAngle(this.body, 0);
            },
            snapNoScroll() {
                Matter.Body.setPosition(this.body, { x: elementLeftOffset, y: elementTopOffset });
                Matter.Body.setAngle(this.body, 0);
            }
        }
    };

    const rectangle = (x, y, width, height, i) => {
        return {
            w: width,
            h: height,
            i: i,
            body: Matter.Bodies.rectangle(x, y, width, height, { isStatic: true }),
        }
    };

    const rectangleDefs = [
        { x: containerWidth / 2 + leftOffset, y: borderWidth / 2 + topOffset, width: containerWidth, height: borderWidth },
        { x: containerWidth / 2 + leftOffset, y: containerHeight - (borderWidth / 2) + topOffset, width: containerWidth, height: borderWidth },
        { x: borderWidth / 2 + leftOffset, y: containerHeight / 2 + topOffset, width: borderWidth, height: containerHeight },
        { x: containerWidth - borderWidth / 2 + leftOffset, y: containerWidth / 2 + topOffset, width: borderWidth, height: containerHeight },
        { x: containerWidth + gap + containerWidth / 2 + leftOffset, y: borderWidth / 2 + topOffset, width: containerWidth, height: borderWidth },
        { x: containerWidth + gap + containerWidth / 2 + leftOffset, y: containerHeight - (borderWidth / 2) + topOffset, width: containerWidth, height: borderWidth },
        { x: containerWidth + gap + borderWidth / 2 + leftOffset, y: containerHeight / 2 + topOffset, width: borderWidth, height: containerHeight },
        { x: containerWidth + gap + containerWidth - borderWidth / 2 + leftOffset, y: containerWidth / 2 + topOffset, width: borderWidth, height: containerHeight },
        { x: (containerWidth + gap) * 2 + containerWidth / 2 + leftOffset, y: borderWidth / 2 + topOffset, width: containerWidth, height: borderWidth },
        { x: (containerWidth + gap) * 2 + containerWidth / 2 + leftOffset, y: containerHeight - (borderWidth / 2) + topOffset, width: containerWidth, height: borderWidth },
        { x: (containerWidth + gap) * 2 + borderWidth / 2 + leftOffset, y: containerHeight / 2 + topOffset, width: borderWidth, height: containerHeight },
        { x: (containerWidth + gap) * 2 + containerWidth - borderWidth / 2 + leftOffset, y: containerWidth / 2 + topOffset, width: borderWidth, height: containerHeight }
    ];

    const rectangles = [];

    rectangleDefs.forEach((def, i) => {
        const rect = rectangle(def.x, def.y, def.width, def.height, i);
        rectangles.push(rect);
        Matter.Composite.add(engine.world, [rect.body]);
    });

    /*
Matter.Composite.add(engine.world, [
Matter.Bodies.rectangle(containerWidth / 2 + leftOffset, borderWidth / 2 + topOffset, containerWidth, borderWidth, { isStatic: true }),
Matter.Bodies.rectangle(containerWidth / 2 + leftOffset, containerHeight - (borderWidth / 2) + topOffset, containerWidth, borderWidth, { isStatic: true }),
Matter.Bodies.rectangle(borderWidth / 2 + leftOffset, containerHeight / 2 + topOffset, borderWidth, containerHeight, { isStatic: true }),
Matter.Bodies.rectangle(containerWidth - borderWidth / 2 + leftOffset, containerWidth / 2 + topOffset, borderWidth, containerHeight, { isStatic: true })
]);
Matter.Composite.add(engine.world, [
Matter.Bodies.rectangle(containerWidth + gap + containerWidth / 2 + leftOffset, borderWidth / 2 + topOffset, containerWidth, borderWidth, { isStatic: true }),
Matter.Bodies.rectangle(containerWidth + gap + containerWidth / 2 + leftOffset, containerHeight - (borderWidth / 2) + topOffset, containerWidth, borderWidth, { isStatic: true }),
Matter.Bodies.rectangle(containerWidth + gap + borderWidth / 2 + leftOffset, containerHeight / 2 + topOffset, borderWidth, containerHeight, { isStatic: true }),
Matter.Bodies.rectangle(containerWidth + gap + containerWidth - borderWidth / 2 + leftOffset, containerWidth / 2 + topOffset, borderWidth, containerHeight, { isStatic: true })
]);
Matter.Composite.add(engine.world, [
Matter.Bodies.rectangle((containerWidth + gap) * 2 + containerWidth / 2 + leftOffset, borderWidth / 2 + topOffset, containerWidth, borderWidth, { isStatic: true }),
Matter.Bodies.rectangle((containerWidth + gap) * 2 + containerWidth / 2 + leftOffset, containerHeight - (borderWidth / 2) + topOffset, containerWidth, borderWidth, { isStatic: true }),
Matter.Bodies.rectangle((containerWidth + gap) * 2 + borderWidth / 2 + leftOffset, containerHeight / 2 + topOffset, borderWidth, containerHeight, { isStatic: true }),
Matter.Bodies.rectangle((containerWidth + gap) * 2 + containerWidth - borderWidth / 2 + leftOffset, containerWidth / 2 + topOffset, borderWidth, containerHeight, { isStatic: true })
]);
    */

    const textblocks = [];

    document.querySelectorAll(".textblock").forEach((element, i) => {
        const tb = textblock(element, i);
        textblocks.push(tb);
        Matter.Composite.add(
            engine.world, [tb.body]
        );
    });

    (function rerender() {
        textblocks.forEach(tb => tb.render());
        rectangles.forEach((rect, i) => {
            Matter.Body.setPosition(rect.body, {x: rectangleDefs[i].x - wrapper.scrollLeft, y: rectangleDefs[i].y});
        })
        Matter.Engine.update(engine);
        requestAnimationFrame(rerender);
    })();
}
