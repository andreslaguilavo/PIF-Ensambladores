# Proyecto PIF: Sistemas Digitales y Ensambladores

Este proyecto es parte de la materia "Sistemas Digitales y Ensambladores" y tiene como objetivo proporcionar una herramienta interactiva para el aprendizaje y la visualización de compuertas lógicas y sus respectivas tablas de verdad. La aplicación permite a los usuarios ingresar ecuaciones lógicas, generar tablas de verdad, y visualizar mapas de Karnaugh, entre otras funcionalidades.Este proyecto es presentado por los estudiantes Dayana Calderon y Andres Laguilavo

## Funcionalidades Principales

### 1. Generación de Tablas de Verdad

La aplicación permite a los usuarios ingresar ecuaciones lógicas y generar automáticamente las tablas de verdad correspondientes. Las tablas de verdad muestran todas las combinaciones posibles de entradas y sus respectivas salidas.

### 2. Visualización de Mapas de Karnaugh

La aplicación incluye una funcionalidad para generar y visualizar mapas de Karnaugh (K-maps) basados en las tablas de verdad generadas. Los mapas de Karnaugh son una herramienta útil para simplificar expresiones lógicas.


### 3. Historial de Ecuaciones

La aplicación mantiene un historial de las ecuaciones ingresadas por el usuario, permitiendo una fácil referencia y reutilización de ecuaciones anteriores.

### 4. Generación de Minterminos y Maxterminos

La aplicación permite la generación de minterminos y maxterminos a partir de las tablas de verdad. Los minterminos y maxterminos son expresiones lógicas que representan las combinaciones de entradas que producen una salida verdadera o falsa, respectivamente.

### 5. Expresión Reducida

La aplicación incluye una funcionalidad para obtener la expresión lógica reducida utilizando el método de Quine-McCluskey. Esta funcionalidad simplifica las expresiones lógicas para facilitar su implementación en circuitos digitales.

## Proyecto en Producción
El proyecto se encuentra alojado en https://compuertas-logicas.vercel.app/

## Tecnologías Utilizadas

- **Next.js**: Framework de React para la construcción de aplicaciones web.
- **React**: Biblioteca de JavaScript para la construcción de interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipos estáticos.
- **Tailwind CSS**: Framework de CSS para el diseño de la interfaz de usuario.


## Estructura de Carpetas y Archivos
```sh
.
├───public/
│   └───favicon.svg
├───src/
│   ├───app/
│   │   ├───components/
│   │   │   ├───KarnaughMap/ (Explicación y Solución)
│   │   │   ├───MaxTerms/ (Explicación y Solución)
│   │   │   ├───MinTerms/ (Explicación y Solución)
│   │   │   ├───shared/ (Componentes compartidos UI)
│   │   │   ├───TruthTable/ (Explicación y Solución)
│   │   │   ├───ui/ (UI componentes de shadcn)
│   │   │   ├───HistorialCarousel.tsx
│   │   │   ├───KarnaughMap.tsx
│   │   │   ├───MaxTerms.tsx
│   │   │   ├───MinTerms.tsx
│   │   │   ├───TimeLine.tsx
│   │   │   └───TruthTable.tsx
│   │   ├───fonts/
│   │   ├───hooks/
│   │   │   ├───useData.tsx 
│   │   │   ├───useLocalStorage.ts
│   │   │   └───useTab.tsx
│   │   ├───lib/
│   │   │   ├───karnaughMapCore.ts (Lógica de karnaughMap) 
│   │   │   ├───maxTermsCore.ts (Lógica de maxTerms)
│   │   │   ├───minTermsCore.ts (Lógica de minTerms)
│   │   │   └───truthTableCore.ts (Lógica de truthTable)
│   │   ├───globals.css
│   │   ├───layout.tsx
│   │   └───page.tsx
│   ├───lib/
│   │   └───utils.ts
│   └───types.d.ts
├───.eslintrc.json
├───.gitignore
├───components.json
├───LICENSE
├───next-env.d.ts
├───next.config.mjs
├───package-lock.json
├───package.json
├───postcss.config.mjs
├───README.md
├───tailwind.config.ts
└───tsconfig.json

```


## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.

