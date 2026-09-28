const seoMenuToggle = document.querySelector(".seo-menu-toggle");
const seoNav = document.querySelector(".seo-nav");
const seoHeader = document.querySelector(".seo-header");
const seoHero = document.querySelector(".seo-hero");

const definirMenu = (abierto) => {
    seoNav?.classList.toggle("abierto", abierto);
    seoMenuToggle?.setAttribute("aria-expanded", String(abierto));
    seoMenuToggle?.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    document.body.classList.toggle("menu-abierto", abierto);
};

const actualizarDossier = () => {
    seoHeader?.classList.toggle("scrolleado", window.scrollY > 24);

    const recorrido = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    document.body.style.setProperty("--seo-progress", String(Math.min(1, window.scrollY / recorrido)));

    if (seoHero) {
        const progresoHero = Math.min(1, Math.max(0, window.scrollY / seoHero.offsetHeight));
        seoHero.style.setProperty("--seo-hero-drift", String(progresoHero));
    }
};

window.addEventListener("scroll", actualizarDossier, { passive: true });
window.addEventListener("resize", actualizarDossier, { passive: true });
actualizarDossier();

seoMenuToggle?.addEventListener("click", () => {
    definirMenu(!seoNav?.classList.contains("abierto"));
});

seoNav?.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
        definirMenu(false);
    });
});

window.addEventListener("keydown", (evento) => {
    if (evento.key !== "Escape" || !seoNav?.classList.contains("abierto")) return;
    definirMenu(false);
    seoMenuToggle?.focus();
});

const elementosReveal = document.querySelectorAll(".seo-reveal");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.classList.add("seo-motion");

    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add("visible");
            observer.unobserve(entrada.target);
        });
    }, { threshold: 0.14 });

    elementosReveal.forEach((elemento) => observer.observe(elemento));
} else {
    elementosReveal.forEach((elemento) => elemento.classList.add("visible"));
}
