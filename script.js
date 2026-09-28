const textosAnimables = Array.from(document.querySelectorAll(`
    header nav a,
    main section h1,
    main section h2,
    main section h3,
    main section p,
    main section .etiqueta,
    main section .categoria-accion,
    main section .btn,
    main section .marca-logo,
    .site-footer h3,
    .site-footer p,
    .site-footer .footer-links a,
    .site-footer .footer-contacto-item,
    .site-footer .footer-contacto-item span
`)).filter((texto) => !texto.closest(".hero, .contrast-story, .rm-projection, .cenit-opening, .cenit-product, .cenit-mr-preparation, .cenit-modality-break, .servicio-landing-hero"));

textosAnimables.forEach((texto, indice) => {
    texto.classList.add("texto-scroll");
    texto.style.setProperty("--texto-delay", `${Math.min(indice % 6, 5) * 0.055}s`);
});

const elementosRevelables = document.querySelectorAll(".revelar, .texto-scroll");
const heroSlides = document.querySelectorAll(".hero-slide");
const progresoScroll = document.querySelector(".progreso-scroll");
const header = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");
const seccionesNav = document.querySelectorAll("main section[id]");
const marcasGrid = document.querySelector(".marcas-grid");
const marcaAnterior = document.querySelector(".marca-scroll-prev");
const marcaSiguiente = document.querySelector(".marca-scroll-next");
const volverArriba = document.querySelector(".volver-arriba");
const whatsappFijo = document.querySelector(".whatsapp-fijo");
const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const heroPrincipal = document.querySelector(".rm-projection, .cenit-opening, .contrast-story, .hero");
const contrastStory = document.querySelector(".contrast-story");
const contrastCopies = Array.from(document.querySelectorAll(".contrast-copy-item"));
const contrastProducts = {
    gadovist: document.querySelector(".contrast-product-gadovist"),
    injector: document.querySelector(".contrast-product-injector")
};
const contrastRailButtons = Array.from(document.querySelectorAll("[data-contrast-jump]"));
const contrastPercent = document.querySelector("#contrast-story-percent");
const contrastStatus = document.querySelector("#contrast-stage-status");

/* ----------------------------------------------------------------
   SECUENCIA CLÍNICA / SCROLL PROJECTION
   El motor consume un manifest intercambiable y mantiene en memoria solo una
   ventana corta de frames. La secuencia responde directamente al scroll.
   ---------------------------------------------------------------- */

const rmProjection = document.querySelector(".rm-projection");

if (rmProjection) {
    const canvas = rmProjection.querySelector(".rm-projection-canvas");
    const context = canvas?.getContext("2d", { alpha: false, desynchronized: true });
    const fileFallback = rmProjection.querySelector(".rm-projection-file-fallback");
    const useDirectImage = window.location.protocol === "file:" && !rmProjection.hasAttribute("data-atlas");
    const copies = Array.from(rmProjection.querySelectorAll(".rm-projection-copy"));
    const progressNumber = rmProjection.querySelector(".rm-projection-progress strong");
    const loader = rmProjection.querySelector(".rm-projection-loader");
    const loaderNumber = loader?.querySelector("strong");
    const representation = rmProjection.querySelector(".rm-projection-representation");
    const mobileMedia = window.matchMedia("(max-width: 900px)");
    const reducedMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cinematicMode = rmProjection.classList.contains("cenit-cinematic-stills");
    const animatedPhotos = rmProjection.classList.contains("cenit-restored-process");

    rmProjection.classList.toggle("uses-file-fallback", useDirectImage);

    if (canvas && context) {
        const manifestUrl = new URL(rmProjection.dataset.manifest, document.baseURI);
        const manifestBase = new URL("./", manifestUrl);
        const embeddedManifest = window.CENIT_SCROLL_SEQUENCE || null;
        const cache = new Map();
        const cacheLimit = 18;
        let manifest = null;
        let sequence = null;
        let sequenceName = "desktop";
        let sequenceVersion = 0;
        let currentFrame = 1;
        let requestedFrame = 1;
        let lastRequestedFrame = 1;
        let currentProgress = 0;
        let sectionStart = 0;
        let sectionTravel = 1;
        let renderRequest = null;
        let drawRequest = null;
        let lastRenderTime = 0;
        let progressInitialized = false;
        let preloadStopped = false;

        const clamp = (value, minimum = 0, maximum = 1) =>
            Math.min(maximum, Math.max(minimum, value));

        const smooth = (value) => {
            const limited = clamp(value);
            return limited * limited * (3 - 2 * limited);
        };

        const validateManifest = (candidate) => {
            if (!candidate || typeof candidate !== "object") {
                throw new Error("Configuración de secuencia ausente");
            }

            const frameDigits = Number(candidate.frameDigits ?? 4);
            if (!Number.isInteger(frameDigits) || frameDigits < 3 || frameDigits > 6) {
                throw new Error("frameDigits debe ser un entero entre 3 y 6");
            }

            const normalized = { ...candidate, frameDigits };
            ["desktop", "mobile"].forEach((variant) => {
                const source = candidate[variant];
                const count = Number(source?.count);
                const width = Number(source?.width);
                const height = Number(source?.height);
                const validPattern = typeof source?.pattern === "string" && source.pattern.includes("{frame}");
                const validPoster = typeof source?.poster === "string" && source.poster.length > 0;

                if (!Number.isInteger(count) || count < 1 || count > 240 ||
                    !Number.isInteger(width) || width < 320 ||
                    !Number.isInteger(height) || height < 320 ||
                    !validPattern || !validPoster) {
                    throw new Error(`Variante ${variant} inválida en la configuración de secuencia`);
                }

                normalized[variant] = { ...source, count, width, height };
            });

            return normalized;
        };

        const frameUrl = (frameNumber) => {
            const assetNumber = sequence.atlas ? Math.ceil(frameNumber / 4) : frameNumber;
            const frame = String(assetNumber).padStart(manifest.frameDigits, "0");
            return new URL(sequence.pattern.replace("{frame}", frame), manifestBase).href;
        };

        const setLoaderProgress = (loaded, total) => {
            const progress = total ? loaded / total : 0;
            rmProjection.style.setProperty("--rm-load-progress", progress.toFixed(3));
            if (loaderNumber) {
                loaderNumber.textContent = `${String(Math.round(progress * 100)).padStart(2, "0")}%`;
            }
        };

        const removeDistantFrames = () => {
            const loaded = Array.from(cache.entries()).filter(([, record]) => record.state === "loaded");
            if (loaded.length <= cacheLimit) {
                return;
            }

            loaded
                .sort((first, second) => Math.abs(second[0] - requestedFrame) - Math.abs(first[0] - requestedFrame))
                .slice(0, loaded.length - cacheLimit)
                .forEach(([frameNumber]) => cache.delete(frameNumber));
        };

        const loadFrame = (frameNumber, priority = false) => {
            if (!sequence) {
                return Promise.reject(new Error("Secuencia RM no inicializada"));
            }

            const safeFrame = Math.round(clamp(frameNumber, 1, sequence.count));
            const existing = cache.get(safeFrame);
            if (existing) {
                existing.lastUsed = performance.now();
                return existing.promise;
            }

            const versionAtRequest = sequenceVersion;
            const image = new Image();
            image.decoding = "async";
            image.fetchPriority = priority ? "high" : "low";

            const record = {
                image,
                state: "loading",
                lastUsed: performance.now(),
                promise: null
            };

            record.promise = new Promise((resolve, reject) => {
                image.onload = async () => {
                    try {
                        await image.decode();
                    } catch (_) {
                        // onload ya garantiza un bitmap utilizable aunque decode no esté disponible.
                    }

                    if (versionAtRequest !== sequenceVersion) {
                        resolve(null);
                        return;
                    }

                    record.state = "loaded";
                    record.lastUsed = performance.now();
                    removeDistantFrames();
                    resolve(image);
                };
                image.onerror = () => {
                    cache.delete(safeFrame);
                    reject(new Error(`No se pudo cargar el frame ${safeFrame}`));
                };
            });

            cache.set(safeFrame, record);
            image.src = frameUrl(safeFrame);
            return record.promise;
        };

        const resizeCanvas = () => {
            const bounds = canvas.getBoundingClientRect();
            const pixelRatio = Math.min(window.devicePixelRatio || 1, mobileMedia.matches ? 1.25 : 1.5);
            const width = Math.max(1, Math.round(bounds.width * pixelRatio));
            const height = Math.max(1, Math.round(bounds.height * pixelRatio));

            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        };

        const drawImageCover = (image) => {
            if (!image?.naturalWidth || !image?.naturalHeight) {
                return;
            }

            if (useDirectImage && fileFallback) {
                if (fileFallback.src !== image.src) {
                    fileFallback.src = image.src;
                }
                return;
            }

            resizeCanvas();
            // Sprite-sheet source rectangles preserve actual distinct storyboard poses.
            // No interpolated product geometry or crossfades are used.
            if (sequence?.atlas) {
                const cell = (currentFrame - 1) % 4;
                const sw = image.naturalWidth / (sequence.atlas ? 2 : 1);
                const sh = image.naturalHeight / (sequence.atlas ? 2 : 1);
                const scale = Math.min(canvas.width / sw, canvas.height / sh);
                const dw = sw * scale;
                const dh = sh * scale;
                context.fillStyle = "#092c24";
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, sequence.atlas ? (cell % 2) * sw + 2 : 0,
                    sequence.atlas ? Math.floor(cell / 2) * sh + 2 : 0,
                    sw - (sequence.atlas ? 4 : 0), sh - (sequence.atlas ? 4 : 0),
                    (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
                return;
            }
            const canvasRatio = canvas.width / canvas.height;
            const imageRatio = image.naturalWidth / image.naturalHeight;
            let sourceX = 0;
            let sourceY = 0;
            let sourceWidth = image.naturalWidth;
            let sourceHeight = image.naturalHeight;

            if (imageRatio > canvasRatio) {
                sourceWidth = image.naturalHeight * canvasRatio;
                sourceX = (image.naturalWidth - sourceWidth) * (rmProjection.classList.contains("cenit-generic-process") && mobileMedia.matches ? 1 : .5);
            } else {
                sourceHeight = image.naturalWidth / canvasRatio;
                sourceY = (image.naturalHeight - sourceHeight) / 2;
            }

            // Continuous camera travel between the existing source images.
            // This animates the composition, not the depicted clinical action.
            if (animatedPhotos && !reducedMedia.matches) {
                const travel = Math.min(currentProgress / 0.9, 1);
                const zoom = 1.015 + 0.035 * Math.pow(Math.sin(travel * Math.PI * 4), 2);
                const width = sourceWidth / zoom;
                const height = sourceHeight / zoom;
                sourceX += (sourceWidth - width) * (0.5 + 0.2 * Math.sin(travel * Math.PI * 2));
                sourceY += (sourceHeight - height) * 0.45;
                sourceWidth = width;
                sourceHeight = height;
            }

            context.drawImage(
                image,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                0,
                0,
                canvas.width,
                canvas.height
            );
        };

        const nearestLoadedFrame = () => {
            let nearest = null;
            let nearestDistance = Infinity;
            cache.forEach((record, frameNumber) => {
                if (record.state !== "loaded") {
                    return;
                }
                const distance = Math.abs(frameNumber - requestedFrame);
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearest = { frameNumber, image: record.image };
                }
            });
            return nearest;
        };

        const drawRequestedFrame = () => {
            drawRequest = null;
            const exact = cache.get(requestedFrame);
            const drawable = exact?.state === "loaded"
                ? { frameNumber: requestedFrame, image: exact.image }
                : nearestLoadedFrame();

            if (drawable) {
                currentFrame = drawable.frameNumber;
                drawable.imageRecord = exact;
                drawImageCover(drawable.image);
                rmProjection.dataset.frame = String(currentFrame);
            }
        };

        const requestDraw = () => {
            if (drawRequest === null) {
                drawRequest = window.requestAnimationFrame(drawRequestedFrame);
            }
        };

        const loadAround = (frameNumber, direction) => {
            const offsets = direction < 0
                ? [0, -1, -2, 1, -3, 2, -4]
                : [0, 1, 2, -1, 3, -2, 4];

            offsets.forEach((offset, index) => {
                const candidate = frameNumber + offset;
                if (candidate < 1 || candidate > sequence.count) {
                    return;
                }
                loadFrame(candidate, index < 2)
                    .then(() => {
                        if (candidate === requestedFrame) {
                            requestDraw();
                        }
                    })
                    .catch(() => {});
            });
        };

        const copyVisibility = (copy, progress) => {
            const start = Number(copy.dataset.start || 0);
            const end = Number(copy.dataset.end || 1);
            const duration = Math.max(0.001, end - start);
            const fadeInEnd = start + duration * 0.24;
            const fadeOutStart = end - duration * 0.26;
            const fadeIn = start === 0 ? 1 : smooth((progress - start) / Math.max(0.001, fadeInEnd - start));
            const fadeOut = end === 1 ? 1 : 1 - smooth((progress - fadeOutStart) / Math.max(0.001, end - fadeOutStart));
            return clamp(Math.min(fadeIn, fadeOut));
        };

        const updateCopies = (progress) => {
            let activeCopy = null;
            let activeOpacity = 0;

            copies.forEach((copy) => {
                const visibility = copyVisibility(copy, progress);
                const start = Number(copy.dataset.start || 0);
                const end = Number(copy.dataset.end || 1);
                const center = (start + end) / 2;
                const direction = progress < center ? 1 : -1;
                copy.style.setProperty("--rm-copy-opacity", visibility.toFixed(3));
                copy.style.setProperty("--rm-copy-y", `${((1 - visibility) * 26 * direction).toFixed(2)}px`);

                if (visibility > activeOpacity) {
                    activeOpacity = visibility;
                    activeCopy = copy;
                }
            });

            copies.forEach((copy) => {
                const current = copy === activeCopy && activeOpacity > 0.42;
                copy.classList.toggle("is-current", current);
                copy.setAttribute("aria-hidden", String(!current));
                copy.querySelectorAll("a, button").forEach((control) => {
                    if (current) {
                        control.removeAttribute("tabindex");
                    } else {
                        control.setAttribute("tabindex", "-1");
                    }
                });
            });
        };

        const measureProjection = () => {
            const bounds = rmProjection.getBoundingClientRect();
            sectionStart = bounds.top + window.scrollY;
            sectionTravel = Math.max(1, rmProjection.offsetHeight - window.innerHeight);
            resizeCanvas();
        };

        const renderProjection = () => {
            renderRequest = null;
            if (!sequence) {
                return;
            }

            const targetProgress = reducedMedia.matches
                ? 1
                : clamp((window.scrollY - sectionStart) / sectionTravel);
            const now = performance.now();
            const elapsed = Math.min(64, Math.max(1, now - lastRenderTime));
            lastRenderTime = now;
            if (animatedPhotos && !reducedMedia.matches && progressInitialized) {
                currentProgress += (targetProgress - currentProgress) * (1 - Math.exp(-elapsed / 95));
                if (Math.abs(targetProgress - currentProgress) < 0.00008) currentProgress = targetProgress;
            } else {
                currentProgress = targetProgress;
                progressInitialized = true;
            }
            const nextFrame = 1 + Math.round(currentProgress * (sequence.count - 1));
            const direction = Math.sign(nextFrame - lastRequestedFrame) || 1;
            requestedFrame = nextFrame;
            lastRequestedFrame = nextFrame;

            rmProjection.style.setProperty("--rm-progress", currentProgress.toFixed(4));
            const paperProgress = cinematicMode
                ? smooth((currentProgress - 0.865) / 0.135)
                : smooth((currentProgress - 0.89) / 0.11);
            rmProjection.style.setProperty("--rm-paper-progress", paperProgress.toFixed(4));
            if (rmProjection.classList.contains("cenit-generic-process")) {
                const exitProgress = reducedMedia.matches ? 0 : smooth((currentProgress - .82) / .12);
                const closing = rmProjection.querySelector(".rm-projection-copy-cenit");
                const height = rmProjection.querySelector(".rm-projection-sticky").clientHeight;
                // Reserve the actual closing text height before revealing it.
                const reserved = (closing?.offsetHeight || 180) + 64;
                const finalRise = Math.min(0, height * .22 - reserved);
                rmProjection.style.setProperty("--hero-scale", (1 - exitProgress * .22).toFixed(4));
                rmProjection.style.setProperty("--hero-rise", `${(exitProgress * finalRise).toFixed(2)}px`);
                rmProjection.style.setProperty("--hero-copy-exit", (1 - exitProgress).toFixed(4));
            }
            if (cinematicMode) {
                const sceneOneTravel = smooth(currentProgress / 0.34);
                const sceneTwoReveal = smooth((currentProgress - 0.25) / 0.22);
                const sceneThreeReveal = smooth((currentProgress - 0.58) / 0.20);
                const frameHandoff = smooth((currentProgress - 0.86) / 0.14);
                const frameMaxX = window.innerWidth <= 700
                    ? Math.min(window.innerWidth * .034, 15)
                    : Math.min(window.innerWidth * .047, 72);
                const frameMaxBottom = window.innerWidth <= 700
                    ? window.innerHeight * .22
                    : Math.min(window.innerHeight * .28, 280);
                rmProjection.style.setProperty("--scene-01-scale", (1.03 + sceneOneTravel * .05).toFixed(4));
                rmProjection.style.setProperty("--scene-01-x", `${(-1.5 * sceneOneTravel).toFixed(2)}%`);
                rmProjection.style.setProperty("--scene-02-scale", (1.08 - sceneTwoReveal * .05).toFixed(4));
                rmProjection.style.setProperty("--scene-02-x", `${(2 * (1 - sceneTwoReveal)).toFixed(2)}%`);
                rmProjection.style.setProperty("--scene-02-clip", `${(100 * (1 - sceneTwoReveal)).toFixed(2)}%`);
                rmProjection.style.setProperty("--scene-03-scale", (1.07 - sceneThreeReveal * .04).toFixed(4));
                rmProjection.style.setProperty("--scene-03-y", `${(2 * (1 - sceneThreeReveal)).toFixed(2)}%`);
                rmProjection.style.setProperty("--scene-03-clip", `${(100 * (1 - sceneThreeReveal)).toFixed(2)}%`);
                rmProjection.style.setProperty("--wipe-v-x", `${(sceneTwoReveal * 100).toFixed(2)}%`);
                rmProjection.style.setProperty("--wipe-v-opacity", Math.sin(Math.PI * sceneTwoReveal).toFixed(3));
                rmProjection.style.setProperty("--wipe-h-y", `${((1 - sceneThreeReveal) * 100).toFixed(2)}%`);
                rmProjection.style.setProperty("--wipe-h-opacity", Math.sin(Math.PI * sceneThreeReveal).toFixed(3));
                rmProjection.style.setProperty("--frame-inset-x", `${(frameMaxX * frameHandoff).toFixed(2)}px`);
                rmProjection.style.setProperty("--frame-inset-bottom", `${(frameMaxBottom * frameHandoff).toFixed(2)}px`);
            }
            rmProjection.dataset.progress = currentProgress.toFixed(4);
            document.body.classList.toggle("rm-projection-paper", currentProgress >= 0.94);
            document.body.classList.toggle(
                "rm-projection-active",
                window.scrollY >= sectionStart && window.scrollY < sectionStart + rmProjection.offsetHeight
            );
            if (representation) {
                representation.style.opacity = (1 - smooth((currentProgress - 0.84) / 0.12)).toFixed(3);
            }
            if (progressNumber) {
                progressNumber.textContent = String(Math.round(currentProgress * 100)).padStart(3, "0");
            }

            updateCopies(currentProgress);
            if (!cinematicMode) {
                loadAround(requestedFrame, direction);
                drawRequestedFrame();
            }
            if (animatedPhotos && currentProgress !== targetProgress) scheduleProjection();
        };

        const scheduleProjection = () => {
            if (renderRequest === null) {
                renderRequest = window.requestAnimationFrame(renderProjection);
            }
        };

        const idlePause = () => new Promise((resolve) => {
            if ("requestIdleCallback" in window) {
                window.requestIdleCallback(resolve, { timeout: 240 });
            } else {
                window.setTimeout(resolve, 32);
            }
        });

        const preloadRemaining = async (versionAtStart) => {
            const order = Array.from({ length: sequence.count }, (_, index) => index + 1)
                .sort((first, second) => Math.abs(first - requestedFrame) - Math.abs(second - requestedFrame));

            for (const frameNumber of order) {
                if (preloadStopped || versionAtStart !== sequenceVersion) {
                    return;
                }
                await idlePause();
                try {
                    await loadFrame(frameNumber, false);
                } catch (_) {
                    // Un frame aislado no invalida el scrubbing; se dibuja el vecino cargado.
                }
            }
        };

        const loadPosterFallback = async () => {
            const image = new Image();
            image.decoding = "async";
            image.src = new URL(sequence.poster, manifestBase).href;
            await new Promise((resolve) => {
                image.onload = resolve;
                image.onerror = resolve;
            });
            drawImageCover(image);
        };

        const configureSequence = async () => {
            if (!manifest) {
                return;
            }

            preloadStopped = true;
            sequenceVersion += 1;
            cache.clear();
            sequenceName = mobileMedia.matches ? "mobile" : "desktop";
            sequence = manifest[sequenceName];
            preloadStopped = false;
            currentFrame = 1;
            requestedFrame = 1;
            lastRequestedFrame = 1;

            if (reducedMedia.matches) {
                rmProjection.dataset.reducedMotion = "true";
                await loadPosterFallback();
                rmProjection.classList.add("is-ready");
                renderProjection();
                return;
            }

            rmProjection.removeAttribute("data-reduced-motion");
            rmProjection.classList.remove("is-ready");
            const keyFrames = [...new Set([1, Math.round(sequence.count * .22), Math.round(sequence.count * .47), Math.round(sequence.count * .70), Math.round(sequence.count * .89), sequence.count])];
            let loaded = 0;
            setLoaderProgress(0, keyFrames.length);

            await Promise.all(keyFrames.map((frameNumber, index) =>
                loadFrame(frameNumber, index === 0)
                    .catch(() => null)
                    .finally(() => {
                        loaded += 1;
                        setLoaderProgress(loaded, keyFrames.length);
                    })
            ));

            measureProjection();
            renderProjection();
            rmProjection.classList.add("is-ready");
            preloadRemaining(sequenceVersion);
        };

        const initializeProjection = async () => {
            try {
                if (cinematicMode) {
                    sequence = { count: 101 };
                    measureProjection();
                    renderProjection();
                    rmProjection.classList.add("is-ready");
                    return;
                }
                if (window.location.protocol === "file:") {
                    manifest = validateManifest(embeddedManifest);
                } else {
                    try {
                        const response = await fetch(manifestUrl, { credentials: "same-origin" });
                        if (!response.ok) {
                            throw new Error(`Manifest RM ${response.status}`);
                        }
                        manifest = validateManifest(await response.json());
                    } catch (fetchError) {
                        manifest = validateManifest(embeddedManifest);
                    }
                }

                await configureSequence();
            } catch (_) {
                rmProjection.classList.add("is-ready", "has-load-error");
                copies.forEach((copy) => copy.removeAttribute("aria-hidden"));
            }
        };

        window.addEventListener("scroll", scheduleProjection, { passive: true });
        window.addEventListener("resize", () => {
            measureProjection();
            scheduleProjection();
        });
        mobileMedia.addEventListener("change", cinematicMode ? measureProjection : configureSequence);
        reducedMedia.addEventListener("change", cinematicMode ? renderProjection : configureSequence);

        if ("ResizeObserver" in window) {
            new ResizeObserver(() => {
                resizeCanvas();
                requestDraw();
            }).observe(canvas);
        }

        initializeProjection();
    }
}

if (contrastStory && contrastCopies.length) {
    const estadosContraste = ["SELECCIÓN", "PREPARACIÓN", "INSTALACIÓN", "SISTEMA LISTO"];
    const fotogramasContraste = {
        gadovist: [
            { x: 0, y: 1, s: 1.06, r: -1, o: 1 },
            { x: -17, y: -18, s: .45, r: 0, o: .72 },
            { x: -25, y: -23, s: .3, r: 1, o: 0 },
            { x: -25, y: -23, s: .3, r: 1, o: 0 }
        ],
        injector: [
            { x: 26, y: 18, s: 1.58, r: 1.5, o: 0 },
            { x: 12, y: 13, s: 1.52, r: .4, o: .92 },
            { x: 5, y: 5, s: 1.16, r: -.5, o: 1 },
            { x: 0, y: 1, s: .98, r: 0, o: 1 }
        ]
    };

    const limitarContraste = (valor, minimo = 0, maximo = 1) =>
        Math.min(maximo, Math.max(minimo, valor));
    const suavizarContraste = (valor) => valor * valor * (3 - 2 * valor);
    const mezclarContraste = (inicio, fin, progreso) => inicio + (fin - inicio) * progreso;

    const leerFotogramaContraste = (fotogramas, tiempo) => {
        const inicio = Math.min(fotogramas.length - 1, Math.floor(tiempo));
        const fin = Math.min(fotogramas.length - 1, inicio + 1);
        const progreso = suavizarContraste(tiempo - inicio);
        const actual = fotogramas[inicio];
        const siguiente = fotogramas[fin];

        return {
            x: mezclarContraste(actual.x, siguiente.x, progreso),
            y: mezclarContraste(actual.y, siguiente.y, progreso),
            s: mezclarContraste(actual.s, siguiente.s, progreso),
            r: mezclarContraste(actual.r, siguiente.r, progreso),
            o: mezclarContraste(actual.o, siguiente.o, progreso)
        };
    };

    const aplicarFotogramaContraste = (elemento, fotograma) => {
        if (!elemento) {
            return;
        }

        elemento.style.opacity = fotograma.o.toFixed(3);
        elemento.style.transform = `translate3d(${fotograma.x.toFixed(2)}vw, ${fotograma.y.toFixed(2)}vh, 0) scale(${fotograma.s.toFixed(3)}) rotate(${fotograma.r.toFixed(2)}deg)`;
    };

    const actualizarAccesibilidadContraste = (escenaActiva) => {
        contrastCopies.forEach((copia, indice) => {
            const activa = indice === escenaActiva;
            copia.setAttribute("aria-hidden", String(!activa));
            copia.classList.toggle("is-active", activa);
            copia.querySelectorAll("a, button").forEach((control) => {
                if (activa) {
                    control.removeAttribute("tabindex");
                } else {
                    control.setAttribute("tabindex", "-1");
                }
            });
        });

        contrastRailButtons.forEach((boton, indice) => {
            const activo = indice === escenaActiva;
            boton.classList.toggle("is-active", activo);
            if (activo) {
                boton.setAttribute("aria-current", "step");
            } else {
                boton.removeAttribute("aria-current");
            }
        });

        contrastStory.dataset.scene = String(escenaActiva);
        if (contrastStatus) {
            contrastStatus.textContent = estadosContraste[escenaActiva];
        }
    };

    if (reducirMovimiento) {
        contrastStory.dataset.reducedMotion = "true";
        contrastCopies.forEach((copia) => {
            copia.setAttribute("aria-hidden", "false");
            copia.querySelectorAll("a, button").forEach((control) => control.removeAttribute("tabindex"));
        });
    } else {
        let inicioContraste = 0;
        let recorridoContraste = 1;
        let frameContraste = null;
        let escenaContrasteActiva = -1;

        const medirContraste = () => {
            const limites = contrastStory.getBoundingClientRect();
            inicioContraste = limites.top + window.scrollY;
            recorridoContraste = Math.max(1, contrastStory.offsetHeight - window.innerHeight);
        };

        const renderizarContraste = () => {
            frameContraste = null;
            const progreso = limitarContraste((window.scrollY - inicioContraste) / recorridoContraste);
            const tiempo = progreso * (contrastCopies.length - 1);
            const escenaActiva = Math.round(tiempo);

            contrastStory.style.setProperty("--contrast-progress", progreso.toFixed(4));

            aplicarFotogramaContraste(
                contrastProducts.gadovist,
                leerFotogramaContraste(fotogramasContraste.gadovist, tiempo)
            );
            aplicarFotogramaContraste(
                contrastProducts.injector,
                leerFotogramaContraste(fotogramasContraste.injector, tiempo)
            );

            contrastCopies.forEach((copia, indice) => {
                const distancia = Math.abs(tiempo - indice);
                // Dejamos un breve silencio entre escenas para que dos titulares
                // editoriales nunca compitan mientras el producto se transforma.
                const visibilidad = suavizarContraste(1 - limitarContraste(distancia / .5));
                const desplazamiento = indice - tiempo;

                copia.style.opacity = visibilidad.toFixed(3);
                copia.style.transform = `translate3d(${(desplazamiento * 38).toFixed(2)}px, ${(desplazamiento * 18).toFixed(2)}px, 0)`;
                copia.style.pointerEvents = visibilidad > .72 ? "auto" : "none";
            });

            if (contrastPercent) {
                contrastPercent.textContent = `${String(Math.round(progreso * 100)).padStart(3, "0")}%`;
            }

            if (escenaActiva !== escenaContrasteActiva) {
                escenaContrasteActiva = escenaActiva;
                actualizarAccesibilidadContraste(escenaActiva);
            }
        };

        const solicitarContraste = () => {
            if (frameContraste === null) {
                frameContraste = window.requestAnimationFrame(renderizarContraste);
            }
        };

        contrastRailButtons.forEach((boton) => {
            boton.addEventListener("click", () => {
                const escena = Number(boton.dataset.contrastJump);
                const destino = inicioContraste + (escena / (contrastCopies.length - 1)) * recorridoContraste;
                window.scrollTo({ top: destino, behavior: "smooth" });
            });
        });

        window.addEventListener("scroll", solicitarContraste, { passive: true });
        window.addEventListener("resize", () => {
            medirContraste();
            solicitarContraste();
        });

        medirContraste();
        renderizarContraste();
        window.addEventListener("load", () => {
            medirContraste();
            solicitarContraste();
        }, { once: true });
    }
}

const entradasEditoriales = Array.from(document.querySelectorAll(".editorial-enter"));

if (entradasEditoriales.length) {
    const entradasApertura = entradasEditoriales.filter((elemento) => elemento.closest(".cenit-opening"));
    const entradasObservables = entradasEditoriales.filter((elemento) => !elemento.closest(".cenit-opening"));

    entradasApertura.forEach((elemento) => elemento.classList.add("is-inview"));

    if (reducirMovimiento || !("IntersectionObserver" in window)) {
        entradasObservables.forEach((elemento) => elemento.classList.add("is-inview"));
    } else {
        const observadorEditorial = new IntersectionObserver((entradas, observador) => {
            entradas.forEach((entrada) => {
                if (!entrada.isIntersecting) {
                    return;
                }

                entrada.target.classList.add("is-inview");
                observador.unobserve(entrada.target);
            });
        }, {
            rootMargin: "0px 0px -11% 0px",
            threshold: 0.08
        });

        entradasObservables.forEach((elemento) => observadorEditorial.observe(elemento));
    }
}

const cargarFondoHero = (slide) => {
    const fondo = slide?.dataset.background;

    if (!fondo) {
        return;
    }

    slide.style.backgroundImage = `url("${fondo}")`;
    delete slide.dataset.background;
};

if (heroSlides.length > 1) {
    const cargarFondosSecundarios = () => heroSlides.forEach(cargarFondoHero);

    window.addEventListener("load", () => {
        if ("requestIdleCallback" in window) {
            window.requestIdleCallback(cargarFondosSecundarios, { timeout: 1800 });
        } else {
            window.setTimeout(cargarFondosSecundarios, 400);
        }
    }, { once: true });
}

if (!("IntersectionObserver" in window)) {
    elementosRevelables.forEach((elemento) => {
        elemento.classList.add("visible");
        elemento.classList.add("texto-visible");
    });
} else {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) {
                return;
            }

            entrada.target.classList.add("visible");
            entrada.target.classList.add("texto-visible");

            observador.unobserve(entrada.target);
        });
    }, {
        threshold: 0.18,
        rootMargin: "0px 0px -70px 0px"
    });

    elementosRevelables.forEach((elemento) => {
        observador.observe(elemento);
    });
}

if (heroSlides.length > 1) {
    let heroActivo = 0;
    let heroEnPantalla = true;
    const hero = heroSlides[0].closest(".hero");

    if ("IntersectionObserver" in window && hero) {
        const observadorHero = new IntersectionObserver(([entrada]) => {
            heroEnPantalla = entrada.isIntersecting;
        }, {
            rootMargin: "120px 0px"
        });

        observadorHero.observe(hero);
    }

    const activarHero = (indice) => {
        heroSlides[heroActivo].classList.remove("activo");

        heroActivo = (indice + heroSlides.length) % heroSlides.length;

        cargarFondoHero(heroSlides[heroActivo]);
        heroSlides[heroActivo].classList.add("activo");
    };

    if (!reducirMovimiento) {
        window.setInterval(() => {
            if (heroEnPantalla && !document.hidden) {
                activarHero(heroActivo + 1);
            }
        }, 5200);
    }
}

const actualizarScroll = () => {
    const scrollActual = window.scrollY;
    const scrollMaximo = document.documentElement.scrollHeight - window.innerHeight;
    const progreso = scrollMaximo > 0 ? scrollActual / scrollMaximo : 0;

    if (progresoScroll) {
        progresoScroll.style.transform = `scaleX(${progreso})`;
    }

    header?.classList.toggle("scrolleado", scrollActual > 24);
    volverArriba?.classList.toggle("visible", scrollActual > 520);
    whatsappFijo?.classList.toggle("sobre-hero", Boolean(heroPrincipal) && scrollActual < heroPrincipal.offsetHeight - 120);
};

const actualizarNavegacion = () => {
    if (!seccionesNav.length || !navLinks.length) {
        return;
    }

    const referencia = window.scrollY + window.innerHeight * 0.34;
    let seccionActiva = seccionesNav[0];

    seccionesNav.forEach((seccion) => {
        if (seccion.offsetTop <= referencia) {
            seccionActiva = seccion;
        }
    });

    const linkActivo = document.querySelector(
        `.nav-link[href="#${seccionActiva.id}"], .nav-link[data-section="${seccionActiva.id}"]`
    );

    navLinks.forEach((link) => {
        link.classList.toggle("activo", link === linkActivo);
    });
};

let frameScroll = null;

const actualizarInterfazScroll = () => {
    frameScroll = null;
    actualizarScroll();
    actualizarNavegacion();
};

const solicitarActualizacionScroll = () => {
    if (frameScroll !== null) {
        return;
    }

    frameScroll = window.requestAnimationFrame(actualizarInterfazScroll);
};

window.addEventListener("scroll", solicitarActualizacionScroll, { passive: true });
window.addEventListener("resize", solicitarActualizacionScroll);
actualizarInterfazScroll();

const cerrarMenu = () => {
    header?.classList.remove("menu-abierto");
    document.body.classList.remove("menu-abierto");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menú");
};

menuToggle?.addEventListener("click", () => {
    const menuAbierto = header?.classList.toggle("menu-abierto") ?? false;

    document.body.classList.toggle("menu-abierto", menuAbierto);
    menuToggle.setAttribute("aria-expanded", String(menuAbierto));
    menuToggle.setAttribute("aria-label", menuAbierto ? "Cerrar menú" : "Abrir menú");
});

navLinks.forEach((link) => {
    link.addEventListener("click", cerrarMenu);
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && header?.classList.contains("menu-abierto")) {
        cerrarMenu();
        menuToggle?.focus();
    }
});

if (marcasGrid) {
    const moverMarcas = (direccion) => {
        const desplazamiento = marcasGrid.clientWidth * 0.72;

        marcasGrid.scrollBy({
            left: desplazamiento * direccion,
            behavior: reducirMovimiento ? "auto" : "smooth"
        });
    };

    marcaAnterior?.addEventListener("click", () => moverMarcas(-1));
    marcaSiguiente?.addEventListener("click", () => moverMarcas(1));
}

volverArriba?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: reducirMovimiento ? "auto" : "smooth"
    });
});
