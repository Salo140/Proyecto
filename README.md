# Proyecto
Proyecto curso de Programación Web

**Integrantes**
Vanessa Ospina Ibarra
Salomé Caicedo

## Backend API de citas
Se añadió una API REST para gestionar citas dentro del proyecto.

Archivos principales:
- `src/index.js` → arranca el servidor
- `src/app.js` → configura Express y las rutas
- `src/routes/citas.js` → rutas CRUD de citas
- `src/controllers/citas.js` → lógica de negocio
- `src/services/citas.js` → lectura/escritura del JSON
- `src/data/citas.json` → datos de ejemplo

Si no existe, copia el contenido de `package-manifest.txt` a `package.json` y luego instala dependencias:

```bash
npm install
npm run dev
```

La API estará disponible en:

- `http://localhost:3000/`
- `http://localhost:3000/api/citas`
