---
name: spec-planner
description: >
  Use this skill when the user wants to plan, spec out, or organize work on a software project from scratch or incrementally.
  Triggers include: "armemos las specs", "quiero planificar el proyecto", "crea las specs", "necesito organizar las tareas del repo",
  "actualiza la memoria del proyecto", "preparemos el contexto para el equipo", "hagamos el plan de implementación", or any request
  to break down a project into trackable implementation units. Also triggers when the user asks to "crear specs", "definir specs",
  "planificar implementación", or when they want to set up shared project memory for a team. Always use this skill when the goal
  is to produce structured .md spec files in a repo, a MEMORY.md, or a guided implementation plan.
---

# Spec Planner Skill

Esta skill guía a Claude Code para que actúe como **tech lead planificador**: investiga el repo, construye memoria compartida del proyecto, define specs atómicas de implementación, y gestiona el ciclo PR → tests → merge → actualización de memoria.

---

## Principios fundamentales

- Las specs describen **qué** hay que hacer y **por qué**, nunca el **cómo** técnico.
- Cada spec es una unidad de trabajo independiente que termina en una PR mergeada.
- La memoria (`MEMORY.md`) es la fuente de verdad del proyecto para todo el equipo.
- Antes de planificar, hay que entender lo que ya existe.

---

## Fase 1 — Investigación del contexto

Antes de escribir cualquier spec o memoria, Claude Code debe investigar el repo exhaustivamente:

1. **Leer el README y documentación existente** (`README.md`, `docs/`, `CONTRIBUTING.md`, `CHANGELOG.md`).
2. **Explorar la estructura de carpetas** (2-3 niveles de profundidad).
3. **Identificar el stack**: lenguajes, frameworks, herramientas de test, linters, CI/CD.
4. **Leer archivos de configuración clave** (`package.json`, `pyproject.toml`, `Makefile`, `docker-compose.yml`, `.github/workflows/`, etc.).
5. **Revisar PRs o issues abiertos** si hay acceso a la API de GitHub (via MCP).
6. **Identificar lo que ya está implementado** vs. lo que está pendiente o roto.

Solo después de esta investigación se procede a las fases siguientes.

---

## Fase 2 — Identificación de skills necesarias

Antes de planificar las specs, Claude Code debe identificar **qué skills de Claude Code** serán necesarias para ejecutar el proyecto de punta a punta.

### Cómo hacerlo

1. Listar las categorías de trabajo que el proyecto requiere (ej: base de datos, API REST, frontend, autenticación, testing, CI/CD, infraestructura, etc.).
2. Para cada categoría, identificar si existe una skill que la cubra.
3. Presentar al usuario la lista de skills necesarias con una breve justificación de cada una.
4. **Esperar confirmación del usuario** antes de proceder a instalar cada skill.
5. Instalar las skills confirmadas una por una.

### Formato de presentación al usuario

```
Skills necesarias para este proyecto:

1. **[nombre-skill]** — [por qué es necesaria para este proyecto]
   ¿La instalo? (sí / no / más info)

2. **[nombre-skill]** — [por qué es necesaria]
   ...
```

---

## Fase 3 — Crear o actualizar MEMORY.md

El archivo `MEMORY.md` vive en la raíz del repo y se sube a GitHub. Es el contexto compartido del equipo.

### Estructura de MEMORY.md

```markdown
# Project Memory — [Nombre del Proyecto]

_Última actualización: [fecha] — después de merge de spec-XXX_

## Visión general
[Qué hace este proyecto, para quién, y por qué existe]

## Stack tecnológico
[Lenguajes, frameworks, bases de datos, servicios externos, herramientas de test]

## Arquitectura
[Descripción de los componentes principales y cómo interactúan]

## Estado actual
[Qué está implementado y funcionando, qué está en progreso, qué falta]

## Decisiones técnicas relevantes
[Decisiones de diseño importantes con su justificación]

## Convenciones del proyecto
[Naming, estructura de carpetas, estilo de código, proceso de PR]

## Cómo correr el proyecto localmente
[Pasos mínimos para levantar el entorno de desarrollo]

## Cómo correr los tests
[Comandos para unit tests, integration/e2e tests, linter]

## Skills instaladas en este proyecto
[Lista de skills de Claude Code activas, con su propósito]

## Specs
[Tabla con estado de cada spec — ver Fase 4]
```

### Reglas de actualización

- **No se regenera desde cero**: se edita incrementalmente.
- **Después de cada spec mergeada**, actualizar las secciones afectadas y el estado en la tabla de specs.
- Si una spec mergeada cambia la arquitectura, decisiones técnicas o convenciones, actualizar esas secciones.
- Commitear el `MEMORY.md` actualizado en la misma rama o como commit directo a `main` post-merge.

---

## Fase 4 — Definir las specs

### Estructura de una spec

Cada spec vive en `specs/spec-NNN-[slug].md`:

```markdown
# Spec NNN — [Título descriptivo]

## Contexto
[Por qué existe esta spec. Qué problema resuelve. Referencia al estado actual en MEMORY.md.]

## Objetivo
[Qué debe estar funcionando cuando esta spec esté completa. Criterios de aceptación concretos.]

## Alcance
[Qué incluye esta spec. Qué explícitamente NO incluye (para evitar scope creep).]

## Dependencias
[Otras specs que deben estar mergeadas antes. Servicios externos necesarios.]

## Skills asignadas
[Lista de skills de Claude Code que se deben usar para implementar esta spec.]

## Criterios de completitud
- [ ] Tests unitarios pasan
- [ ] Tests de integración/e2e pasan
- [ ] Linter/ruff/formatter pasa sin errores
- [ ] PR description completa (ver guía de PRs)
- [ ] MEMORY.md actualizado post-merge
```

### Reglas para escribir specs

- **Una spec = una PR**. Si la spec es demasiado grande para una PR, dividirla.
- Describir el **qué y el por qué**, no el cómo técnico.
- Los criterios de aceptación deben ser verificables, no ambiguos.
- Ordenar las specs por dependencia (las más fundamentales primero).
- Numerar secuencialmente (`spec-001`, `spec-002`, etc.).

### Tabla de specs en MEMORY.md

Mantener una tabla actualizada:

```markdown
## Specs

| # | Título | Estado | PR | Skills |
|---|--------|--------|----|--------|
| 001 | [título] | ✅ Mergeada | #12 | skill-a, skill-b |
| 002 | [título] | 🔄 En progreso | #15 | skill-c |
| 003 | [título] | 📋 Pendiente | — | skill-a |
```

Estados: `📋 Pendiente` → `🔄 En progreso` → `👀 En review` → `✅ Mergeada`

---

## Fase 5 — Ciclo de implementación por spec

Por cada spec, Claude Code debe seguir este flujo estrictamente:

### 5.1 Antes de empezar

1. Leer la spec completa.
2. Verificar que las specs dependientes estén mergeadas.
3. Verificar que las skills asignadas estén instaladas.
4. Crear una branch con el nombre `spec-NNN-[slug]`.

### 5.2 Durante la implementación

- Implementar siguiendo lo que indica la spec (qué, no cómo).
- Escribir tests a medida que se implementa, no al final.
- Consultar `MEMORY.md` para respetar convenciones del proyecto.

### 5.3 Antes de abrir la PR — Verificación obligatoria

Claude Code **no debe abrir la PR** hasta que pasen todos los checks:

```bash
# 1. Tests unitarios
[comando según stack del proyecto]

# 2. Tests de integración / e2e
[comando según stack del proyecto]

# 3. Linter / formatter / ruff (según stack)
[comando según stack del proyecto]
```

Si alguno falla: corregir, volver a correr, no avanzar hasta que pasen todos.

### 5.4 Descripción de la PR

La PR debe incluir:

```markdown
## ¿Qué hace esta PR?
[Resumen de los cambios. Qué funcionalidad agrega o modifica.]

## ¿Por qué?
[Referencia a la spec. Link al archivo specs/spec-NNN-[slug].md]

## Cambios principales
- [cambio 1]
- [cambio 2]

## Cómo testear
[Pasos para verificar que funciona correctamente]

## Checklist
- [ ] Tests unitarios pasan ✅
- [ ] Tests de integración/e2e pasan ✅
- [ ] Linter pasa sin errores ✅
- [ ] MEMORY.md actualizado (se hará post-merge)
```

### 5.5 Post-merge

Después de que la PR es mergeada:

1. Actualizar el estado de la spec en `MEMORY.md` (tabla de specs).
2. Actualizar las secciones afectadas de `MEMORY.md` (arquitectura, estado actual, decisiones técnicas, etc.).
3. Revisar si alguna spec pendiente necesita ser actualizada dado lo que se implementó.
4. Si hay specs que deben modificarse, actualizarlas y notificar al usuario.

---

## Flujo completo resumido

```
Investigar repo
    ↓
Identificar skills → confirmar con usuario → instalar
    ↓
Crear MEMORY.md (si no existe) o actualizarlo
    ↓
Definir specs ordenadas por dependencia
    ↓
Por cada spec:
  ├─ Crear branch
  ├─ Implementar
  ├─ Correr todos los tests → deben pasar
  ├─ Abrir PR con descripción completa
  ├─ Merge (cuando aprobada)
  └─ Actualizar MEMORY.md + revisar specs pendientes
```

---

## Referencia rápida de archivos

| Archivo | Propósito |
|---------|-----------|
| `MEMORY.md` | Memoria del proyecto, actualizada incrementalmente |
| `specs/spec-NNN-slug.md` | Definición de cada unidad de trabajo |

Leer `references/memory-template.md` para una plantilla completa de MEMORY.md lista para usar.
Leer `references/pr-guide.md` para guía extendida de PRs y convenciones de branches.