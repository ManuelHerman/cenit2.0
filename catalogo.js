const producto = (nombre, marca, imagen, descripcion, modelo = "", opciones = {}) => ({
    nombre,
    marca,
    imagen,
    descripcion,
    modelo,
    ...opciones
});

const categoriasCatalogo = {
    cardiologia: {
        titulo: "Cardiología y monitoreo",
        descripcion: "Equipos para diagnóstico cardiovascular, monitoreo clínico y respuesta ante emergencias.",
        productos: [
            producto(
                "Cardiodesfibrilador Cardiolife",
                "Nihon Kohden",
                "img/equipos/cardiolife-tec5600.webp",
                "Cardiodesfibrilador para emergencias, con desfibrilación manual y semiautomática, cardioversión sincronizada y monitoreo.",
                "TEC-5631"
            ),
            producto(
                "Cardiofax C",
                "Nihon Kohden",
                "img/equipos/ecg-3150-sin-fondo.webp",
                "Electrocardiógrafo compacto de 12 derivaciones con pantalla color y herramientas de análisis para el flujo clínico diario.",
                "ECG-3150"
            ),
            producto(
                "Desfibrilador externo automático Cardiolife",
                "Nihon Kohden",
                "img/equipos/desfibrilador-aed3100.webp",
                "Desfibrilador externo automático portátil, diseñado para guiar una respuesta rápida y clara ante un paro cardíaco.",
                "AED-3100"
            ),
            producto(
                "Monitor multiparamétrico Vismo",
                "Nihon Kohden",
                "img/equipos/vismo-pvm4000.webp",
                "Monitor multiparamétrico de cabecera para ECG, SpO₂, presión no invasiva y otros parámetros, con operación intuitiva.",
                "PVM-4763K",
                { mediaClase: "catalogo-media--fondo-blanco" }
            ),
            producto(
                "Life Scope G5",
                "Nihon Kohden",
                "img/equipos/life-scope-g5.png",
                "Plataforma de monitoreo de alta resolución para cuidados intensivos y quirófano, adaptable a distintas necesidades clínicas.",
                "CSM-1502 / CU-152RK"
            ),
            producto(
                "Monitor de cabecera Life Scope",
                "Nihon Kohden",
                "img/equipos/svm-7600.webp",
                "Monitor de 10,4 pulgadas con pantalla táctil, visualización de múltiples ondas y autonomía para el trabajo asistencial.",
                "SVM-7603K",
                { mediaClase: "catalogo-media--fondo-blanco" }
            )
        ]
    },
    neurologia: {
        titulo: "Neurología",
        descripcion: "Sistemas para neurodiagnóstico, electromiografía y registro de la actividad cerebral.",
        productos: [
            producto(
                "Neuropack S3",
                "Nihon Kohden",
                "img/equipos/meb-9600-sin-fondo.webp",
                "Sistema compacto de electromiografía y potenciales evocados con panel de control integrado y adquisición de señales de bajo ruido.",
                "MEB-9600"
            ),
            producto(
                "Electroencefalógrafo Neurofax",
                "Nihon Kohden",
                "img/equipos/neurofax-eeg1200-sin-fondo.webp",
                "Sistema de electroencefalografía para registro, revisión y análisis de EEG, con opciones de video sincronizado y ampliación de canales.",
                "EEG-1200K",
                { escala: 0.92 }
            )
        ]
    },
    neonatologia: {
        titulo: "Neonatología",
        descripcion: "Soluciones para cuidado térmico, reanimación, fototerapia y monitoreo neonatal.",
        productos: [
            producto(
                "Incubadora de transporte",
                "Fanem",
                "img/equipos/fanem-it158-sin-fondo.webp",
                "Incubadora neonatal preparada para mantener un ambiente térmico controlado durante traslados internos y externos.",
                "IT-158-TS"
            ),
            producto(
                "Incubadora híbrida Duetto",
                "Fanem",
                "img/equipos/incubadora-duetto.webp",
                "Unidad híbrida que integra incubadora y calor radiante para cuidados intensivos neonatales sin interrumpir la atención.",
                "2386"
            ),
            producto(
                "Termocuna Ampla",
                "Fanem",
                "img/equipos/termocuna-ampla.webp",
                "Estación abierta de cuidado neonatal configurable con reanimación, panel de gases y soporte térmico para sala de partos y UCIN."
            ),
            producto(
                "Incubadora Vision Advanced",
                "Fanem",
                "img/equipos/fanem-vision2286-completa.webp",
                "Incubadora de cuidados intensivos con control térmico y configuraciones de servo control para un entorno neonatal estable.",
                "2286",
                { mediaClase: "catalogo-media--fondo-blanco", escala: 0.96 }
            ),
            producto(
                "Monitor neonatal Life Scope",
                "Nihon Kohden",
                "img/equipos/svm-7260-sin-fondo.webp",
                "Monitor compacto para SpO₂, presión no invasiva y temperatura, adecuado para seguimiento neonatal y clínico.",
                "SVM-7260K-T2"
            ),
            producto(
                "Reanimador neonatal Babypuff",
                "Fanem",
                "img/equipos/babypuff-1020-sin-fondo.webp",
                "Reanimador pulmonar manual con control de presión para asistencia respiratoria inmediata del recién nacido.",
                "1020"
            ),
            producto(
                "Fototerapia Bilitron Sky",
                "Fanem",
                "img/equipos/bilitron-5006-sin-fondo.webp",
                "Sistema de fototerapia LED para el tratamiento de la hiperbilirrubinemia neonatal con aplicación flexible sobre el paciente.",
                "5006 BSP"
            )
        ]
    },
    imagenologia: {
        titulo: "Imagenología",
        descripcion: "Equipamiento para ecografía, mamografía, radiología y gestión de estudios médicos.",
        productos: [
            producto(
                "Mamógrafo AMULET Innovality",
                "Fujifilm",
                "img/equipos/mamografo-amulet-innovality-sin-fondo.webp",
                "Sistema de mamografía digital con alta resolución, baja dosis y tomosíntesis en dos modos para estudios de mama.",
                "FDR MS-3500"
            ),
            producto(
                "Mamógrafo AMULET Sophinity",
                "Fujifilm",
                "img/equipos/amulet-sophinity-sin-fondo.webp",
                "Sistema de mamografía digital diseñado para combinar calidad de imagen, baja dosis y comodidad para paciente y operador."
            ),
            producto(
                "Ecógrafo Aplio i800",
                "Canon Medical",
                "img/equipos/ecografo-aplio-i800-sin-fondo.webp",
                "Plataforma premium de ultrasonido con herramientas avanzadas de imagen y cuantificación para distintas especialidades clínicas.",
                "TUS-AI800"
            ),
            producto(
                "Equipo móvil de rayos X",
                "BEMEMS",
                "img/equipos/acemobil-510-sin-fondo.webp",
                "Sistema radiográfico rodante para realizar estudios al pie de cama y acompañar las necesidades de áreas críticas.",
                "AceMobil 510"
            ),
            producto(
                "Sistema de angiografía Alphenix",
                "Canon Medical",
                "img/equipos/angiografo-alphenix-sin-fondo.webp",
                "Plataforma de intervención guiada por imagen para procedimientos vasculares, cardíacos y radiológicos.",
                "",
                { escala: 0.9 }
            ),
            producto(
                "Mesa radiográfica Canon Medical",
                "Canon Medical",
                "img/equipos/mesa-rayos-x-canon-sin-fondo.webp",
                "Solución radiográfica fija para estudios generales, diseñada para integrarse al flujo de trabajo de la sala de rayos X."
            )
        ]
    },
    contraste: {
        titulo: "Inyectores y medios de contraste",
        descripcion: "Sistemas Bayer MEDRAD y medios de contraste para tomografía, resonancia y medicina nuclear.",
        productos: [
            producto(
                "Inyector de contraste para resonancia",
                "Bayer",
                "img/equipos/mrxperion-sin-fondo.webp",
                "Sistema de inyección de contraste diseñado para procedimientos de resonancia magnética y flujos de trabajo controlados.",
                "MRXperion"
            ),
            producto(
                "Inyector de contraste para tomografía",
                "Bayer",
                "img/equipos/inyectora-centargo.webp",
                "Plataforma de inyección para tomografía computada orientada a agilizar la preparación y el manejo de múltiples pacientes.",
                "MEDRAD Centargo",
                { escala: 0.92 }
            ),
            producto(
                "Ultravist 300",
                "Bayer",
                "img/equipos/ultravist-300-sin-fondo.webp",
                "Medio de contraste yodado para procedimientos de diagnóstico por imagen, en concentración de 300 mg de yodo por ml."
            ),
            producto(
                "Ultravist 370",
                "Bayer",
                "img/equipos/ultravist-370-sin-fondo.webp",
                "Medio de contraste yodado para procedimientos de diagnóstico por imagen, en concentración de 370 mg de yodo por ml."
            ),
            producto(
                "Gadovist",
                "Bayer",
                "img/equipos/gadovist-sin-fondo.webp",
                "Medio de contraste a base de gadobutrol para estudios de resonancia magnética, sujeto a indicación y protocolo profesional."
            ),
            producto(
                "Primovist",
                "Bayer",
                "img/equipos/primovist-sin-fondo.webp",
                "Medio de contraste hepatoespecífico para resonancia magnética del hígado, sujeto a indicación y protocolo profesional.",
                "",
                { escala: 0.92 }
            )
        ]
    },
    insumos: {
        titulo: "Transductores, insumos y accesorios",
        descripcion: "Transductores Canon Medical, consumibles Nihon Kohden y productos de uso hospitalario.",
        productos: [
            producto(
                "Transductores Canon Medical",
                "Canon Medical",
                "img/equipos/transductores-canon-v2-sin-fondo.webp",
                "Opciones convexas, lineales, sectoriales y endocavitarias para sistemas Aplio, seleccionadas según la aplicación clínica.",
                "PVT, PLT, PST y PLI"
            ),
            producto(
                "Accesorios y consumibles Nihon Kohden",
                "Nihon Kohden",
                "img/equipos/nihon-sensor-spo2-solo-fondo-blanco.webp",
                "Sensores de SpO2, parches para desfibrilación y electrodos descartables originales Nihon Kohden.",
                "",
                {
                    mediaClase: "catalogo-media--accesorios",
                    imagenes: [
                        {
                            src: "img/equipos/nihon-sensor-spo2-solo-fondo-blanco.webp",
                            alt: "Sensor reutilizable de SpO2 Nihon Kohden"
                        },
                        {
                            src: "img/equipos/nihon-parches-descartables-p740k-fondo-blanco.webp",
                            alt: "Parches descartables para desfibrilación Nihon Kohden"
                        },
                        {
                            src: "img/equipos/nihon-electrodos-descartables-vitrode-fondo-blanco.webp",
                            alt: "Electrodo descartable Vitrode Nihon Kohden"
                        }
                    ]
                }
            ),
            producto(
                "Neozime 5 L",
                "Labnews",
                "img/equipos/neozime-5.webp",
                "Detergente multienzimático concentrado para limpieza de instrumental y artículos médicos."
            ),
            producto(
                "Gel de ecografía Censonic",
                "Censonic",
                "img/equipos/censonic-gel.webp",
                "Gel transmisor de ultrasonido para procedimientos de ecografía, disponible en 500 ml, 1 litro y 5 litros."
            )
        ]
    }
};

const logosMarcas = {
    "Bayer": {
        src: "img/marcas/bayer-cross-oficial.png",
        clase: "catalogo-logo-bayer",
        url: "https://www.radiologysolutions.bayer.com/products/products"
    },
    "BEMEMS": {
        src: "img/marcas/bemems.png",
        clase: "catalogo-logo-bemems",
        url: "https://www.bemems.com/main"
    },
    "Canon Medical": {
        src: "img/marcas/canon-medical.svg",
        clase: "catalogo-logo-canon",
        url: "https://global.medical.canon/"
    },
    "Censonic": {
        textoVisible: "Censonic",
        url: "https://www.quimicacenit.uy/"
    },
    "Codonics": {
        src: "img/marcas/codonics.png",
        clase: "catalogo-logo-codonics",
        url: "https://codonics.com/"
    },
    "Fanem": {
        src: "img/marcas/fanem.png",
        clase: "catalogo-logo-fanem",
        url: "https://fanem.com.br/en/"
    },
    "Fujifilm": {
        src: "img/marcas/fujifilm.svg",
        clase: "catalogo-logo-fujifilm",
        url: "https://global.fujifilm.com/en/about/corporate/field/healthcare"
    },
    "Labnews": {
        src: "img/marcas/labnews.png",
        clase: "catalogo-logo-labnews",
        url: "https://www.labnews.ind.br/"
    },
    "Nihon Kohden": {
        src: "img/marcas/nihon-kohden-horizontal.svg",
        clase: "catalogo-logo-nihon",
        url: "https://www.nihonkohden.com/",
        textoVisible: "Nihon Kohden"
    }
};

const fichasPorModelo = {
    "TEC-5631": "/productos/cardiodesfibrilador-nihon-kohden-cardiolife-tec-5600",
    "ECG-3150": "/productos/electrocardiografo-nihon-kohden-cardiofax-ecg-3150",
    "AED-3100": "/productos/desfibrilador-dea-nihon-kohden-aed-3100",
    "PVM-4763K": "/productos/monitor-nihon-kohden-vismo-pvm-4763",
    "CSM-1502 / CU-152RK": "/productos/monitor-nihon-kohden-life-scope-g5",
    "SVM-7603K": "/productos/monitor-nihon-kohden-svm-7603",
    "SVM-7260K-T2": "/productos/monitor-neonatal-nihon-kohden-svm-7260",
    "MEB-9600": "/productos/electromiografo-nihon-kohden-meb-9600",
    "EEG-1200K": "/productos/electroencefalografo-nihon-kohden-neurofax-eeg-1200",
    "IT-158-TS": "/productos/incubadora-transporte-fanem-it-158",
    "2386": "/productos/incubadora-hibrida-fanem-duetto-2386",
    "2286": "/productos/incubadora-fanem-vision-advanced-2286",
    "1020": "/productos/reanimador-neonatal-fanem-babypuff-1020",
    "5006 BSP": "/productos/fototerapia-fanem-bilitron-sky-5006",
    "FDR MS-3500": "/productos/mamografo-fujifilm-amulet-innovality",
    "TUS-AI800": "/productos/ecografo-canon-medical-aplio-i800",
    "AceMobil 510": "/productos/equipo-rayos-x-movil-bemems-acemobil-510",
    "MRXperion": "/productos/inyector-resonancia-bayer-medrad-mrxperion",
    "MEDRAD Centargo": "/productos/inyector-contraste-bayer-medrad-centargo",
    "PVT, PLT, PST y PLI": "/productos/transductores-canon-medical-aplio"
};

const fichasPorNombre = {
    "Termocuna Ampla": "/productos/termocuna-fanem-ampla",
    "Mamógrafo AMULET Sophinity": "/productos/mamografo-fujifilm-amulet-sophinity",
    "Sistema de angiografía Alphenix": "/productos/angiografo-canon-medical-alphenix",
    "Mesa radiográfica Canon Medical": "/productos/mesa-radiografica-canon-medical",
    "Ultravist 300": "/productos/ultravist-300-uruguay",
    "Ultravist 370": "/productos/ultravist-370-uruguay",
    "Gadovist": "/productos/gadovist-uruguay",
    "Primovist": "/productos/primovist-uruguay",
    "Accesorios y consumibles Nihon Kohden": "/productos/insumos-originales-nihon-kohden",
    "Neozime 5 L": "/productos/neozime-labnews-5-litros",
    "Gel de ecografía Censonic": "/productos/gel-ecografia-censonic"
};

const parametros = new URLSearchParams(window.location.search);
const categoriaSolicitada = parametros.get("categoria");
const categoriaActiva = categoriasCatalogo[categoriaSolicitada] ? categoriaSolicitada : "cardiologia";
const categoria = categoriasCatalogo[categoriaActiva];
const headerCatalogo = document.querySelector(".catalogo-header");
const portadaCatalogo = document.querySelector(".catalogo-presentacion");
const portadaImagen = document.querySelector("#catalogo-portada-imagen");
const portadaMarca = document.querySelector("#catalogo-portada-marca");
const portadaNombre = document.querySelector("#catalogo-portada-nombre");
const portadaModelo = document.querySelector("#catalogo-portada-modelo");

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

const iniciarCatalogoDesdeArriba = () => {
    window.scrollTo(0, 0);
};

window.addEventListener("pageshow", iniciarCatalogoDesdeArriba);
iniciarCatalogoDesdeArriba();

const actualizarScrollCatalogo = () => {
    headerCatalogo?.classList.toggle("scrolleado", window.scrollY > 24);

    const recorrido = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    document.body.style.setProperty("--catalogo-progreso", String(Math.min(1, window.scrollY / recorrido)));

    if (portadaCatalogo) {
        const progresoPortada = Math.min(1, Math.max(0, window.scrollY / portadaCatalogo.offsetHeight));
        portadaCatalogo.style.setProperty("--hero-drift", String(progresoPortada));
    }
};

window.addEventListener("scroll", actualizarScrollCatalogo, { passive: true });
window.addEventListener("resize", actualizarScrollCatalogo, { passive: true });
actualizarScrollCatalogo();

const titulo = document.querySelector("#catalogo-titulo");
const descripcion = document.querySelector("#catalogo-descripcion");
const cantidad = document.querySelector("#catalogo-cantidad");
const grid = document.querySelector("#catalogo-grid");
const enlacesCategoria = document.querySelectorAll("[data-categoria]");
const navegacionCategorias = document.querySelector(".catalogo-categorias");
let enlaceCategoriaActiva = null;

const crearMarca = (producto) => {
    const logoMarca = logosMarcas[producto.marca];
    const marca = document.createElement(logoMarca?.url ? "a" : "div");
    marca.className = "catalogo-marca";

    if (logoMarca?.url) {
        marca.href = logoMarca.url;
        const destinoMarca = new URL(logoMarca.url, window.location.href);
        const esSitioCenit = /(^|\.)quimicacenit\.uy$/i.test(destinoMarca.hostname);

        if (!esSitioCenit) {
            marca.target = "_blank";
            marca.rel = "noopener";
        }

        marca.setAttribute("aria-label", `Visitar el sitio oficial de ${producto.marca}`);
        marca.title = `Sitio oficial de ${producto.marca}`;
    }

    if (logoMarca?.src) {
        const logo = document.createElement("img");
        logo.className = `catalogo-marca-logo ${logoMarca.clase}`;
        logo.src = logoMarca.src;
        logo.alt = "";
        logo.loading = "lazy";
        logo.decoding = "async";
        logo.setAttribute("aria-hidden", "true");
        marca.appendChild(logo);
    }

    if (logoMarca?.textoVisible) {
        const nombreMarca = document.createElement("span");
        nombreMarca.className = "catalogo-marca-nombre";
        nombreMarca.textContent = logoMarca.textoVisible;
        marca.appendChild(nombreMarca);
    }

    return marca;
};

const crearProducto = (producto, indice) => {
    const articulo = document.createElement("article");
    articulo.className = "catalogo-card";

    const media = document.createElement("div");
    media.className = `catalogo-media ${producto.mediaClase || ""}`.trim();
    media.style.setProperty("--escala-producto", String(producto.escala || 1));

    const imagenes = producto.imagenes?.length
        ? producto.imagenes
        : [{ src: producto.imagen, alt: producto.nombre }];

    const crearImagen = (item, posicion) => {
        const imagen = document.createElement("img");
        imagen.src = item.src;
        imagen.alt = item.alt || producto.nombre;
        imagen.loading = indice < 2 && posicion === 0 ? "eager" : "lazy";
        imagen.decoding = "async";
        return imagen;
    };

    if (imagenes.length > 1) {
        media.classList.add("catalogo-media-grid");
        imagenes.forEach((item, posicion) => {
            const contenedorImagen = document.createElement("div");
            contenedorImagen.className = "catalogo-media-item";
            contenedorImagen.appendChild(crearImagen(item, posicion));
            media.appendChild(contenedorImagen);
        });
    } else {
        media.appendChild(crearImagen(imagenes[0], 0));
    }

    const contenido = document.createElement("div");
    contenido.className = "catalogo-card-contenido";

    const nombreProducto = document.createElement("h3");
    nombreProducto.textContent = producto.nombre;

    const descripcionProducto = document.createElement("p");
    descripcionProducto.className = "catalogo-descripcion";
    descripcionProducto.textContent = producto.descripcion;

    const modelo = producto.modelo ? document.createElement("span") : null;
    if (modelo) {
        modelo.className = "catalogo-modelo";
        const etiquetaModelo = producto.modelo.includes("/") || producto.modelo.includes(",")
            ? "Modelos"
            : "Modelo";
        modelo.textContent = `${etiquetaModelo} ${producto.modelo}`;
    }

    const consulta = document.createElement("a");
    consulta.className = "catalogo-consultar";
    consulta.href = `https://wa.me/59897511511?text=${encodeURIComponent(
        `Hola, quisiera consultar por ${producto.nombre}${producto.modelo ? ` (${producto.modelo})` : ""}.`
    )}`;
    consulta.target = "_blank";
    consulta.rel = "noopener";
    consulta.textContent = "Consultar";
    consulta.setAttribute("aria-label", `Consultar por ${producto.nombre}`);

    const rutaFicha = fichasPorModelo[producto.modelo] || fichasPorNombre[producto.nombre];
    const acciones = document.createElement("div");
    acciones.className = "catalogo-acciones";

    if (rutaFicha) {
        articulo.classList.add("catalogo-card--clicable");

        const enlaceNombre = document.createElement("a");
        enlaceNombre.href = rutaFicha;
        enlaceNombre.textContent = producto.nombre;
        enlaceNombre.setAttribute("aria-label", `Ver ficha de ${producto.nombre}`);
        nombreProducto.replaceChildren(enlaceNombre);

        articulo.addEventListener("click", (evento) => {
            if (evento.target.closest("a, button")) {
                return;
            }

            window.location.href = rutaFicha;
        });

        const ficha = document.createElement("a");
        ficha.className = "catalogo-consultar catalogo-ficha";
        ficha.href = rutaFicha;
        ficha.textContent = "Ver ficha";
        ficha.setAttribute("aria-label", `Ver ficha de ${producto.nombre}`);
        acciones.appendChild(ficha);
    }

    acciones.appendChild(consulta);

    contenido.append(crearMarca(producto), nombreProducto, descripcionProducto);
    if (modelo) {
        contenido.appendChild(modelo);
    }
    contenido.appendChild(acciones);
    articulo.append(media, contenido);

    return articulo;
};

titulo.textContent = categoria.titulo;
descripcion.textContent = categoria.descripcion;
const totalProductos = categoria.productos.length;
cantidad.textContent = `${totalProductos} ${totalProductos === 1 ? "producto" : "productos"}`;
document.title = `${categoria.titulo} | Química Cenit`;
grid.dataset.categoria = categoriaActiva;
grid.dataset.cantidad = String(totalProductos);

const productoPortada = categoria.productos[0];
if (productoPortada && portadaImagen && portadaMarca && portadaNombre && portadaModelo) {
    portadaImagen.src = productoPortada.imagen;
    portadaImagen.alt = productoPortada.nombre;
    portadaImagen.style.setProperty("--portada-escala", String(productoPortada.escala || 1));
    portadaMarca.textContent = productoPortada.marca;
    portadaNombre.textContent = productoPortada.nombre;
    portadaModelo.textContent = productoPortada.modelo || "Selección Cenit";
}

const urlCanonica = "https://www.quimicacenit.uy/catalogo";
const canonical = document.querySelector('link[rel="canonical"]');
const metaDescripcion = document.querySelector('meta[name="description"]');
const ogTitulo = document.querySelector('meta[property="og:title"]');
const ogDescripcion = document.querySelector('meta[property="og:description"]');
const ogUrl = document.querySelector('meta[property="og:url"]');

if (canonical) {
    canonical.href = urlCanonica;
}

if (metaDescripcion) {
    metaDescripcion.content = categoria.descripcion;
}

if (ogTitulo) {
    ogTitulo.content = `${categoria.titulo} | Química Cenit`;
}

if (ogDescripcion) {
    ogDescripcion.content = categoria.descripcion;
}

if (ogUrl) {
    ogUrl.content = urlCanonica;
}

enlacesCategoria.forEach((enlace) => {
    const esActivo = enlace.dataset.categoria === categoriaActiva;
    enlace.classList.toggle("activa", esActivo);

    if (esActivo) {
        enlaceCategoriaActiva = enlace;
        enlace.setAttribute("aria-current", "page");
    }
});

if (navegacionCategorias && enlaceCategoriaActiva) {
    window.requestAnimationFrame(() => {
        const desplazamiento =
            enlaceCategoriaActiva.offsetLeft -
            (navegacionCategorias.clientWidth - enlaceCategoriaActiva.offsetWidth) / 2;

        navegacionCategorias.scrollLeft = Math.max(0, desplazamiento);
    });
}

categoria.productos.forEach((producto, indice) => {
    grid.appendChild(crearProducto(producto, indice));
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.classList.add("catalogo-motion");

    const observadorProductos = new IntersectionObserver((entradas, observador) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) {
                return;
            }

            entrada.target.classList.add("is-visible");
            observador.unobserve(entrada.target);
        });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    document.querySelectorAll(".catalogo-card").forEach((tarjeta) => observadorProductos.observe(tarjeta));
}
