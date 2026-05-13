# CodyMaster Working Memory
Last Updated: 2026-04-24T14:00:00Z
Current Phase: planning
Current Iteration: 1
Project: TaskFlow

## Active Goal
Setup QA environment với Vitest + CodyMaster Dashboard. Checkpoint 1: Vitest working, CONTINUITY.md created.

## Current Task
- ID: onboard-01
- Title: Environment Setup Buổi 03
- Status: in-progress
- Skill: cm-continuity
- Started: 2026-04-24T13:00:00Z

## Just Completed
- npm install vitest jsdom acorn
- vitest.config.ts created
- package.json updated with test scripts

## Next Actions (Priority Order)
1. Create .cm/ directory structure
2. Write CONTINUITY.md (this file)
3. Create .gitignore with .cm/ entries
4. Git init + first commit
5. Test Vitest with dummy test

## Active Blockers
- None

## Key Decisions This Session
- Use Vitest over Jest: faster for Node.js
- Keep CONTINUITY.md in .cm/ folder (not root)
- Test files mirror src/ structure

## Mistakes & Learnings

### Ebbinghaus Decay: Memory Fades, Patterns Emerge

**What Learned:** When same error happens 3x+, extend memory TTL
**Why Matters:** Prevents "forgot we tried this already"
**Prevention:** Use `reinforceCount` field in learnings.json

| Count | TTL | Status |
|-------|-----|--------|
| 0 | 30 days | new learning |
| 1 | 30 days | pattern emerging |
| 2 | 60 days | pattern confirmed |
| 3+ | 90+ days | fundamental knowledge |

### Pattern: Environment Setup Pitfall

- **What Failed:** First attempt: installed vitest globally, can't find config
- **Why It Failed:** Global install ≠ project install; config.ts not found in PATH
- **How to Prevent:** Always `npm install -D` (dev dependency), check node_modules/.bin/
- **Timestamp:** 2026-04-24T13:30:00Z
- **Scope:** global (applies to all projects)

## Working Context

### TaskFlow Stack
- **Framework:** Node.js + Express
- **Database:** SQLite (no Docker needed)
- **Test Framework:** Vitest (v1.2.0+)
- **Test Environment:** jsdom (for DOM testing later)

### Git Workflow
- Main branch: production-ready code
- Feature branches: `feature/task-validation`, `feature/security-scan`, etc.
- PR required before merge

### QA Mindset This Session
- Write test BEFORE code (Red-Green-Refactor cycle)
- Test one thing per test
- Name tests as: `should [expected behavior]`

## Files Currently Being Modified
- .cm/CONTINUITY.md: this working memory
- vitest.config.ts: test runner config
- package.json: added test scripts
- .gitignore: to add .cm/ entries

## Memory Layer Status
- Tier 1 (Sensory): CLI commands in current shell
- Tier 2 (Working): CONTINUITY.md (this file)
- Tier 3 (Long-term): .cm/context.db (SQLite)
- Tier 4 (Semantic): Not yet activated (< 50 docs)
- Tier 5 (Code): Not yet activated (< 50 source files)