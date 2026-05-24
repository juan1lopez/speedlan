# Plantilla completa — MEMORY.md

Copiar y adaptar al inicio de cada proyecto.

---

```markdown
# Project Memory — [Nombre del Proyecto]

_Última actualización: [YYYY-MM-DD] — después de merge de [spec o evento inicial]_

---

## Visión general

[2-4 oraciones: qué hace este proyecto, para quién, y por qué existe.]

---

## Stack tecnológico

### Backend
- Lenguaje: [ej. Python 3.12]
- Framework: [ej. FastAPI / Django / Express]
- Base de datos: [ej. PostgreSQL 15]
- ORM / query builder: [ej. SQLAlchemy / Prisma]

### Frontend
- Lenguaje: [ej. TypeScript]
- Framework: [ej. React 18 / Next.js 14]
- Estilos: [ej. Tailwind CSS]

### Infraestructura y DevOps
- CI/CD: [ej. GitHub Actions]
- Contenedores: [ej. Docker + docker-compose]
- Hosting: [ej. AWS / GCP / Render / Railway]

### Testing
- Unit tests: [ej. pytest / jest]
- Integration / e2e: [ej. pytest + httpx / Playwright / Cypress]
- Linter / formatter: [ej. ruff / eslint + prettier]

---

## Arquitectura

[Descripción de los componentes principales. Puede incluir un diagrama ASCII simple.]

```
[componente A] → [componente B] → [componente C]
```

[Explicar responsabilidades de cada componente.]

---

## Estado actual

### Implementado y funcionando
- [feature o módulo 1]
- [feature o módulo 2]

### En progreso
- [feature o módulo — spec en curso]

### Pendiente
- [feature o módulo — specs futuras]

---

## Decisiones técnicas relevantes

### [Título de la decisión]
**Fecha**: [YYYY-MM-DD]  
**Decisión**: [qué se decidió]  
**Justificación**: [por qué]  
**Alternativas descartadas**: [qué se consideró y por qué se descartó]

---

## Convenciones del proyecto

### Branches
- Formato: `spec-NNN-[slug]` para implementaciones de specs
- Formato: `fix/[descripción]` para hotfixes
- Formato: `chore/[descripción]` para tareas de mantenimiento

### Commits
- [ej. Conventional Commits: feat:, fix:, chore:, docs:]

### Estructura de carpetas
```
[estructura principal del repo]
```

### Estilo de código
- [convenciones de naming, formateo, etc.]

---

## Cómo correr el proyecto localmente

```bash
# 1. Clonar el repo
git clone [url]

# 2. Instalar dependencias
[comando]

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con los valores locales

# 4. Correr migraciones (si aplica)
[comando]

# 5. Levantar el proyecto
[comando]
```

---

## Cómo correr los tests

```bash
# Tests unitarios
[comando]

# Tests de integración / e2e
[comando]

# Linter / formatter
[comando]

# Todos los checks juntos (ideal para pre-PR)
[comando]
```

---

## Skills instaladas en este proyecto

| Skill | Propósito en este proyecto |
|-------|---------------------------|
| spec-planner | Planificación y gestión de specs |
| [skill-2] | [para qué se usa] |

---

## Specs

| # | Título | Estado | PR | Skills |
|---|--------|--------|----|--------|
| 001 | [título] | 📋 Pendiente | — | [skills] |

### Leyenda de estados
- 📋 Pendiente
- 🔄 En progreso  
- 👀 En review
- ✅ Mergeada
- ❌ Cancelada
```