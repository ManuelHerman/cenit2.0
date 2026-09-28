(() => {
    const formulario = document.querySelector("#servicio-form");
    const estado = document.querySelector("#servicio-form-estado");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!formulario.reportValidity()) {
            return;
        }

        const datos = new FormData(formulario);
        const institucion = String(datos.get("Institución") || "").trim();
        const area = String(datos.get("Área de interés") || "Consulta").trim();
        const asunto = `Consulta web | ${area} | ${institucion}`;
        const cuerpo = [
            "Nueva solicitud desde quimicacenit.uy",
            "",
            `Nombre: ${String(datos.get("Nombre") || "").trim()}`,
            `Institución: ${institucion}`,
            `Correo: ${String(datos.get("Correo") || "").trim()}`,
            `Teléfono: ${String(datos.get("Teléfono") || "").trim()}`,
            `Área de interés: ${area}`,
            "",
            "Mensaje:",
            String(datos.get("Mensaje") || "").trim()
        ].join("\n");

        if (estado) {
            estado.textContent = "Abriendo su aplicación de correo con la consulta preparada…";
        }

        window.location.href = `mailto:info@quimicacenit.uy?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    });
})();
