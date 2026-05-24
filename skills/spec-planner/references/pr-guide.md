# Guía de PRs y branches

## Naming de branches

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Spec | `spec-NNN-[slug]` | `spec-003-user-auth` |
| Bugfix | `fix/[descripción]` | `fix/login-redirect` |
| Chore | `chore/[descripción]` | `chore/update-deps` |
| Docs | `docs/[descripción]` | `docs/api-endpoints` |

## Checklist pre-PR (obligatorio)

Claude Code no debe abrir una PR hasta que todos estos pasen:

- [ ] Tests unitarios: `[comando]` → exit code 0
- [ ] Tests de integración/e2e: `[comando]` → exit code 0  
- [ ] Linter/ruff/formatter: `[comando]` → sin errores
- [ ] No hay `console.log`, `print`, `debugger` de debug sueltos
- [ ] Variables de entorno nuevas documentadas en `.env.example`
- [ ] Migraciones (si aplica) incluidas en la PR

## Template de descripción de PR

```markdown
## ¿Qué hace esta PR?
[Resumen claro de los cambios. Qué agrega, modifica o elimina.]

## Spec relacionada
Implementa: [specs/spec-NNN-slug.md](../specs/spec-NNN-slug.md)

## Cambios principales
- [cambio técnico 1]
- [cambio técnico 2]
- [cambio técnico 3]

## Cómo testear manualmente
1. [paso 1]
2. [paso 2]
3. [resultado esperado]

## Screenshots / outputs (si aplica)
[capturas o logs relevantes]

## Checklist
- [ ] ✅ Tests unitarios pasan
- [ ] ✅ Tests de integración/e2e pasan  
- [ ] ✅ Linter pasa sin errores
- [ ] 📝 MEMORY.md se actualizará post-merge
```

## Proceso de merge

1. PR abierta con todos los checks en verde.
2. Al menos un reviewer aprueba (si el equipo lo requiere).
3. Se mergea a `main` (preferentemente squash merge para historial limpio).
4. **Inmediatamente post-merge**: actualizar `MEMORY.md`.
5. Revisar si hay specs pendientes que deban ajustarse.

## Manejo de conflictos

Si hay conflictos con `main`:
1. Hacer `git rebase main` (no merge) para mantener historial limpio.
2. Resolver conflictos.
3. Volver a correr todos los tests antes de forzar el push.

## Si los tests fallan después de abrir la PR

1. **No mergear bajo ninguna circunstancia**.
2. Corregir en la misma branch.
3. Pushear los cambios (el CI debe volver a correr).
4. Solo proceder cuando todos los checks estén en verde.