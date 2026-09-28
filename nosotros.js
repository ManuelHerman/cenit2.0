const elementosNosotros = document.querySelectorAll(".revelar-nosotros");
const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const volverArriba = document.querySelector(".volver-arriba");
const headerNosotros = document.querySelector(".nosotros-header");
const clientesTrack = document.querySelector(".clientes-track");
const clientesGrupo = clientesTrack?.querySelector(".clientes-grupo");

const clientes = [
    { nombre: "ASSE", imagen: "asse.svg", url: "https://www.asse.com.uy/", clase: "cliente-logo--asse" },
    { nombre: "CASMU", imagen: "casmu.png", url: "https://casmu.com.uy/" },
    { nombre: "Asociación Española", imagen: "asociacion-espanola.png", url: "https://www.asesp.com.uy/" },
    { nombre: "Sanatorio Americano", imagen: "sanatorio-americano.png", url: "https://www.americano.com.uy/" },
    { nombre: "Hospital Británico", imagen: "hospital-britanico.svg", url: "https://hospitalbritanico.org.uy/" },
    { nombre: "Médica Uruguaya", imagen: "medica-uruguaya.png", url: "https://www.medicauruguaya.com.uy/" },
    { nombre: "CUDIM", imagen: "cudim.png", url: "https://cudim.org/" },
    { nombre: "Hospital de Clínicas", imagen: "hospital-clinicas.png", url: "https://www.hc.edu.uy/" },
    { nombre: "Centro Médico de Salto", imagen: "centro-medico-salto.png", url: "https://www.centromedico.com.uy/", clase: "cliente-logo--centro-salto" },
    { nombre: "CMDTC", imagen: "cmdtc.png", url: "https://www.cmdtc.com.uy/" },
    { nombre: "COCEMI", imagen: "cocemi.png", url: "https://cocemi.com.uy/" },
    { nombre: "COMEPA", imagen: "comepa.png", url: "https://www.comepa.com.uy/" },
    { nombre: "COMERO", imagen: "comero.png", url: "https://www.comero.com.uy/" },
    { nombre: "COMECA", imagen: "comeca.png", url: "https://comeca.uy/" },
    { nombre: "COMTA", imagen: "comta.png", url: "https://www.comta.com.uy/" },
    { nombre: "GREMEDA", imagen: "gremeda.png", url: "https://www.gremeda.com.uy/" },
    { nombre: "Asociación Médica de San José", imagen: "amsj.png", url: "https://www.amsj.com.uy/" },
    { nombre: "Círculo Católico", imagen: "circulo-catolico.svg", url: "https://circulocatolico.com.uy/" },
    { nombre: "COSEM", imagen: "cosem.svg", url: "https://www.cosem.com.uy/" },
    { nombre: "SEMM", imagen: "semm.png", url: "https://www.semm.com.uy/" },
    { nombre: "SUMMUM", imagen: "summum.svg?v=20260803-1", url: "https://summum.com.uy/" },
    { nombre: "BlueCross & BlueShield", imagen: "bluecross.png", url: "https://www1.bcbsu.com.uy/" },
    { nombre: "Hospital Evangélico", imagen: "hospital-evangelico.jpg", url: "https://www.hospitalevangelico.com.uy/" },
    { nombre: "SUAT", imagen: "suat.png", url: "https://suat.com.uy/" },
    { nombre: "CUDAM", imagen: "cudam.png", url: "https://www.cudam.com.uy/" },
    { nombre: "CAMEDUR", imagen: "camedur.png", url: "https://web.camedur.com.uy/", clase: "cliente-logo--oscuro" },
    { nombre: "CAMS", imagen: "cams.png", url: "https://www.camsor.com.uy/" },
    { nombre: "COMEF", imagen: "comef.svg", url: "https://www.comef.com.uy/", clase: "cliente-logo--oscuro" },
    { nombre: "COMEFLO", imagen: "comeflo.png", url: "https://comeflo.com.uy/web/" },
    { nombre: "CAMCEL", imagen: "camcel.png", url: "https://www.camcel.com.uy/", clase: "cliente-logo--oscuro" },
    { nombre: "CAMDEL", imagen: "camdel-transparente.png", url: "https://camdeliampp.com.uy/", clase: "cliente-logo--camdel" },
    { nombre: "COMERI", imagen: "comeri.webp", url: "https://www.comeri.org.uy/" },
    { nombre: "INCI", imagen: "inci.webp", url: "https://www.inci.uy/" },
    { nombre: "AMDM - Asistencial Médica", imagen: "asistencial.webp", url: "https://asistencial.com.uy/" },
    { nombre: "CRAME - Sanatorio Mautone", imagen: "mautone.webp", url: "https://www.semm-mautone.com.uy/" },
    {
        nombre: "Clínica Benquet",
        imagen: "clinica-benquet.jpg?v=20260803-1",
        url: "https://www.instagram.com/consultorio_benquet/?hl=es-la",
        clase: "cliente-logo--benquet"
    },
    { nombre: "Sanidad de las Fuerzas Armadas", imagen: "dnsffaa.webp", url: "https://www.dnsffaa.gub.uy/" },
    { nombre: "CAMEC", imagen: "camec-nuevo.webp", url: "https://camec.com.uy/" },
    { nombre: "Clínica Parada", imagen: "clinica-parada.webp", url: "https://www.clinicaparada.com.uy/" },
    {
        nombre: "Clínica Dres. Leborgne",
        imagen: "clinica-leborgne-transparente.png",
        url: "https://www.facebook.com/clinicaleborgne/",
        clase: "cliente-logo--leborgne"
    },
    { nombre: "UCM", imagen: "ucm.webp" },
    { nombre: "CAMOC", imagen: "camoc-nuevo.webp", url: "https://www.camoc.com.uy/" },
    { nombre: "Sanidad Policial", imagen: "sanidad-policial.webp", url: "https://www.gub.uy/ministerio-interior/institucional/estructura-del-organismo/direccion-nacional-sanidad-policial" },
    { nombre: "Servicio Médico Integral", imagen: "smi.webp", url: "https://www.smi.com.uy/mvdcms/home" },
    { nombre: "CASMER", imagen: "casmer-nuevo.webp", url: "https://www.casmer.com.uy/" },
    { nombre: "Albinco - MP Medicina Personalizada", imagen: "mp.webp", url: "https://www.mp.com.uy/" },
    { nombre: "Anzatil - Cardiocentro", imagen: "cardiocentro.webp", url: "https://www.cardiocentro.uy/" },
    { nombre: "Instituto de Cardiología Integral", imagen: "ici-oficial.svg", url: "https://ici.org.uy/", clase: "cliente-logo--ici" },
    { nombre: "Sociedad Médica Universal", imagen: "universal.webp", url: "https://sociedadmedicauniversal.com/" },
    { nombre: "Banco de Previsión Social", imagen: "bps.webp", url: "https://www.bps.gub.uy/" },
    { nombre: "Emergencia Uno", imagen: "emergencia-uno.webp", url: "https://www.emeuno.com.uy/" },
    { nombre: "Cardiomóvil", imagen: "cardiomovil.webp", url: "https://www.cardiomovil.com.uy/" },
    { nombre: "Gabanel - Centro de Alta Tecnología", imagen: "alta-tecnologia.webp", url: "https://www.centrodealtatecnologia.com.uy/" },
    { nombre: "Banco de Seguros del Estado", imagen: "bse.webp", url: "https://www.bse.com.uy/" },
    { nombre: "Banco de Prótesis", imagen: "banco-protesis.webp", url: "https://bdp-web-front.vercel.app/" },
    { nombre: "CAAMEPA", imagen: "caamepa-nuevo.webp", url: "https://www.caamepa.com.uy/" },
    { nombre: "Biotecno", imagen: "biotecno.webp", url: "https://biotecno.uy/" },
    { nombre: "Emergencia Colonia Oeste", sigla: "Emergencia", detalle: "Colonia Oeste", url: "https://www.facebook.com/emergenciasoestes/" },
    { nombre: "UCMS", imagen: "ucms.webp" },
    { nombre: "Uruguay Emergencia", imagen: "uruguay-emergencia.webp", url: "https://www.facebook.com/uyemergencia/" },
    { nombre: "EMI", imagen: "emi.webp" },
    { nombre: "Ambulancia Russomando", imagen: "russomando.webp", url: "https://russomando.com.uy/" },
    { nombre: "MBR", imagen: "mbr.webp", url: "https://www.mbr.com.uy/" },
];

const crearCliente = (cliente) => {
    const elemento = document.createElement(cliente.url ? "a" : "div");
    elemento.className = `cliente-logo${cliente.imagen ? "" : " cliente-logo--texto"}${cliente.clase ? ` ${cliente.clase}` : ""}`;
    elemento.setAttribute("role", "listitem");

    if (cliente.url) {
        elemento.href = cliente.url;
        elemento.target = "_blank";
        elemento.rel = "noopener";
        elemento.setAttribute("aria-label", `Visitar el sitio de ${cliente.nombre}`);
    } else {
        elemento.setAttribute("aria-label", cliente.nombre);
    }

    if (cliente.imagen) {
        const imagen = document.createElement("img");
        imagen.src = `img/clientes/${cliente.imagen}`;
        imagen.alt = cliente.nombre;
        imagen.loading = "eager";
        imagen.fetchPriority = "low";
        imagen.decoding = "async";
        const ajustarProporcion = () => {
            const proporcion = imagen.naturalWidth / imagen.naturalHeight;
            elemento.classList.toggle('cliente-logo--vertical', proporcion < 1.25);
            elemento.classList.toggle('cliente-logo--ancho', proporcion > 3.8);
        };
        imagen.addEventListener('load', ajustarProporcion);
        if (imagen.complete && imagen.naturalWidth) ajustarProporcion();
        elemento.append(imagen);
    } else {
        const sigla = document.createElement("span");
        sigla.className = "cliente-marca-sigla";
        sigla.textContent = cliente.sigla;

        const detalle = document.createElement("span");
        detalle.className = "cliente-marca-nombre";
        detalle.textContent = cliente.detalle;

        elemento.append(sigla, detalle);
    }

    return elemento;
};

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

const iniciarNosotrosDesdeArriba = () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
};

window.addEventListener("load", iniciarNosotrosDesdeArriba);
window.addEventListener("pageshow", iniciarNosotrosDesdeArriba);
iniciarNosotrosDesdeArriba();

if (clientesTrack && clientesGrupo) {
    const fragmentoClientes = document.createDocumentFragment();
    clientes.forEach((cliente) => fragmentoClientes.append(crearCliente(cliente)));
    clientesGrupo.append(fragmentoClientes);
    const carrusel = clientesTrack.parentElement;
    const control = document.querySelector('.clientes-pausa');
    const copia = clientesGrupo.cloneNode(true);
    copia.removeAttribute('id');
    copia.setAttribute('aria-hidden', 'true');
    copia.querySelectorAll('a').forEach(enlace => enlace.tabIndex = -1);
    copia.querySelectorAll('img').forEach(imagen => {
        const ajustar = () => {
            const proporcion = imagen.naturalWidth / imagen.naturalHeight;
            imagen.parentElement.classList.toggle('cliente-logo--vertical', proporcion < 1.25);
            imagen.parentElement.classList.toggle('cliente-logo--ancho', proporcion > 3.8);
        };
        imagen.addEventListener('load', ajustar);
        if (imagen.complete && imagen.naturalWidth) ajustar();
    });
    clientesTrack.append(copia);
    let pausado = reducirMovimiento;
    let anterior = 0;
    let posicion = 0;
    const actualizarControl = () => {
        control.textContent = pausado ? 'Reanudar recorrido →' : 'Pausar recorrido Ⅱ';
        control.setAttribute('aria-pressed', String(pausado));
    };
    control.addEventListener('click', () => { pausado = !pausado; actualizarControl(); });
    carrusel.addEventListener('focusin', () => { pausado = true; actualizarControl(); });
    carrusel.addEventListener('pointerdown', () => { pausado = true; actualizarControl(); });
    const avanzar = tiempo => {
        const delta = anterior ? Math.min(tiempo - anterior, 50) : 0;
        anterior = tiempo;
        if (!pausado && !document.hidden) {
            posicion = (posicion + delta * 0.026) % clientesGrupo.offsetWidth;
            carrusel.scrollLeft = posicion;
        } else {
            posicion = carrusel.scrollLeft;
        }
        requestAnimationFrame(avanzar);
    };
    actualizarControl();
    requestAnimationFrame(avanzar);
}

elementosNosotros.forEach((elemento) => elemento.classList.add("visible"));

const actualizarVolverArriba = () => {
    headerNosotros?.classList.toggle("scrolleado", window.scrollY > 24);
    volverArriba?.classList.toggle("visible", window.scrollY > 520);
};

window.addEventListener("scroll", actualizarVolverArriba, { passive: true });
actualizarVolverArriba();

volverArriba?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: reducirMovimiento ? "auto" : "smooth"
    });
});
