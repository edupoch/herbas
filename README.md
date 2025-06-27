# Herbas

## Desarrollo Local

Para instalar dependencias:

```bash
npm install
```

Para ejecutar en modo desarrollo:

```bash
npm run dev
```

Para construir el proyecto:

```bash
npm run build
```

## Despliegue en GitHub Pages

### Método 1: Despliegue Automático (Recomendado)

El proyecto está configurado con GitHub Actions para despliegue automático. Simplemente haz push a la rama `main`:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Método 2: Despliegue Manual

También puedes hacer deploy manualmente usando:

```bash
npm run deploy
```

### Configuración de GitHub Pages

1. Ve a la configuración de tu repositorio en GitHub
2. En la sección "Pages", selecciona "Deploy from a branch"
3. Selecciona la rama `gh-pages` como fuente
4. Tu aplicación estará disponible en: https://edupoch.github.io/herbas

## Tecnologías

- React Router v7
- React 19
- TypeScript
- Tailwind CSS
- Material-UI
- Vite
