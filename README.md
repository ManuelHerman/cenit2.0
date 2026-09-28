# Química Cenit

Versión actual del sitio, preparada el 28/09/2026 desde previews/cenit-unificada. Incluye los últimos ajustes de logos, carrusel y fondos, los textos vigentes y las fichas 3D.

## Probar localmente

Con Node.js instalado, abrir PROBAR LOCAL.bat o ejecutar desde esta carpeta:

```sh
node scripts/serve.mjs . 4198
```

Visitar http://127.0.0.1:4198/. Detener con Ctrl+C. No abrir index.html con doble clic.

## Subir el código a GitHub

Crear un repositorio vacío y cargar el contenido de esta carpeta, con index.html en la raíz. Para conservar todos los recursos y archivos ocultos, usar Git o GitHub Desktop. No incluir las entregas ZIP ni otras carpetas del proyecto original.

Con Git instalado, desde esta carpeta:

```sh
git init
git add .
git commit -m "Sitio Química Cenit"
git branch -M main
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
```

Reemplazar URL_DEL_REPOSITORIO por la dirección de tu repositorio. No se creó ni publicó ningún repositorio automáticamente.

## Publicación web

Subir el código a GitHub y publicar un sitio son pasos distintos. Esta entrega conserva rutas sin extensión y enlaces desde la raíz. La configuración .htaccess corresponde al hosting Apache de www.quimicacenit.uy. Para otro dominio o GitHub Pages habrá que adaptar rutas y configuración antes de publicar. No activar Pages suponiendo que .htaccess funcionará allí.

Comprobar inicio, filtros del catálogo, marcas, Nosotros, carrusel de clientes, contacto y fichas 3D antes de publicar.
