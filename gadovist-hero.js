(() => {
    "use strict";

    const hero = document.querySelector(".cenit-gadovist-sequence");
    const stage = hero?.querySelector("[data-gadovist-sequence]");

    if (!hero || !stage) {
        return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 700px)");
    const images = Array.from(stage.querySelectorAll("img"));
    let sectionStart = 0;
    let sectionTravel = 1;
    let renderFrame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const clamp = (value, minimum = 0, maximum = 1) =>
        Math.min(maximum, Math.max(minimum, value));

    const smooth = (value) => {
        const limited = clamp(value);
        return limited * limited * (3 - 2 * limited);
    };

    const range = (progress, start, end) =>
        smooth((progress - start) / Math.max(0.001, end - start));

    const set = (name, value) => hero.style.setProperty(name, value);

    const measure = () => {
        const bounds = hero.getBoundingClientRect();
        sectionStart = bounds.top + window.scrollY;
        sectionTravel = Math.max(1, hero.offsetHeight - window.innerHeight);
    };

    const render = () => {
        renderFrame = 0;
        const progress = reducedMotion.matches
            ? 0.78
            : clamp((window.scrollY - sectionStart) / sectionTravel);
        const isMobile = mobile.matches;

        const frame = range(progress, 0.08, 0.235);
        const macro = range(progress, 0.235, 0.37);
        const consumables = range(progress, 0.455, 0.585);
        const system = range(progress, 0.69, 0.815);
        const settle = range(progress, 0.815, 0.91);

        const frameX = isMobile ? 14 : Math.min(window.innerWidth * 0.052, 78);
        const frameTop = isMobile ? 82 : 70;
        const frameBottom = isMobile ? Math.min(window.innerHeight * 0.18, 150) : Math.min(window.innerHeight * 0.12, 112);

        set("--g-frame-x", `${(frameX * frame).toFixed(2)}px`);
        set("--g-frame-top", `${(frameTop * frame).toFixed(2)}px`);
        set("--g-frame-bottom", `${(frameBottom * frame).toFixed(2)}px`);
        set("--g-product-scale", (1.045 - frame * 0.035 + macro * 0.025).toFixed(4));
        set("--g-product-x", `${((isMobile ? 0 : 4) + (isMobile ? -4 : 1.8) * frame + pointerX * 0.55).toFixed(2)}%`);
        set("--g-product-y", `${((isMobile ? 2 : -1) * frame + pointerY * 0.35).toFixed(2)}%`);

        set("--g-macro-clip", `${(100 * (1 - macro)).toFixed(2)}%`);
        set("--g-macro-scale", (1.075 - macro * 0.055 + pointerY * 0.003).toFixed(4));
        set("--g-macro-x", `${((isMobile ? 8 : 2) * (1 - macro) + pointerX * 0.45).toFixed(2)}%`);

        set("--g-consumables-clip", `${(100 * (1 - consumables)).toFixed(2)}%`);
        set("--g-consumables-scale", (0.925 + consumables * 0.075).toFixed(4));
        set("--g-consumables-x", `${((1 - consumables) * (isMobile ? 18 : 10)).toFixed(2)}%`);
        set("--g-consumables-rotate", `${((1 - consumables) * -7).toFixed(2)}deg`);
        set("--g-consumables-detail", range(progress, 0.54, 0.65).toFixed(4));

        set("--g-system-clip", `${(100 * (1 - system)).toFixed(2)}%`);
        set("--g-system-scale", (1.12 - system * 0.17 - settle * 0.03).toFixed(4));
        set("--g-system-x", `${((1 - system) * (isMobile ? 25 : 15) - settle * (isMobile ? 0 : 3) + pointerX * 0.35).toFixed(2)}%`);
        set("--g-system-y", `${((1 - system) * 7 + settle * (isMobile ? 2 : 0) + pointerY * 0.25).toFixed(2)}%`);
        set("--g-system-rotate", `${((1 - system) * 1.1 - settle * 0.25).toFixed(2)}deg`);

        set("--g-shutter", `${(100 * consumables).toFixed(2)}%`);
        set("--g-axis", `${(12 + progress * 76).toFixed(2)}%`);
        set("--g-axis-opacity", Math.sin(Math.PI * range(progress, 0.12, 0.92)).toFixed(3));
        hero.dataset.gadovistPhase = progress < 0.235
            ? "producto"
            : progress < 0.455
                ? "detalle"
                : progress < 0.69
                    ? "consumibles"
                    : progress < 0.91
                        ? "sistema"
                        : "cenit";
    };

    const schedule = () => {
        if (!renderFrame) {
            renderFrame = window.requestAnimationFrame(render);
        }
    };

    const waitForImage = (image) => {
        if (image.complete) {
            return image.decode?.().catch(() => undefined);
        }
        return new Promise((resolve) => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
        });
    };

    const prepareImages = async () => {
        const [openingImage, ...laterImages] = images;
        await waitForImage(openingImage);
        hero.classList.add("is-gadovist-ready");

        Promise.all(laterImages.map((image) => {
            if (image.complete) {
                return image.decode?.().catch(() => undefined);
            }
            return new Promise((resolve) => {
                image.addEventListener("load", resolve, { once: true });
                image.addEventListener("error", resolve, { once: true });
            });
        })).catch(() => undefined);
    };

    stage.addEventListener("pointermove", (event) => {
        if (reducedMotion.matches || mobile.matches) {
            return;
        }
        const bounds = stage.getBoundingClientRect();
        pointerX = clamp((event.clientX - bounds.left) / bounds.width, 0, 1) * 2 - 1;
        pointerY = clamp((event.clientY - bounds.top) / bounds.height, 0, 1) * 2 - 1;
        schedule();
    }, { passive: true });

    stage.addEventListener("pointerleave", () => {
        pointerX = 0;
        pointerY = 0;
        schedule();
    }, { passive: true });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", () => {
        measure();
        schedule();
    });
    reducedMotion.addEventListener("change", schedule);
    mobile.addEventListener("change", schedule);

    if ("ResizeObserver" in window) {
        new ResizeObserver(() => {
            measure();
            schedule();
        }).observe(hero);
    }

    measure();
    render();
    prepareImages();
})();
