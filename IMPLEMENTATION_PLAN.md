# UNI360 MVP — Implementation Plan

> **Date:** 2026-06-11  
> **Strategy:** Yocket-inspired lean MVP using local mock data only  
> **No Supabase, No Backend, No Auth**

---

## PHASE 1 — FOUNDATION REFACTOR

### 1.1 Create Mock Data Structures
Create `/src/data/mock/` with TypeScript files:
- `universities.ts` — mirror existing `mock-data/universities.json`
- `courses.ts` — mirror existing `mock-data/courses.json`
- `applications.ts` — mirror existing `mock-data/applications.json`
- `documents.ts` — mirror existing `mock-data/documents.json`
- `recommendations.ts` — new file for recommendation logic

### 1.2 Create Local Storage Service
- `/src/services/localStorage.ts` — generic get/set for mock data persistence

### 1.3 Refactor Dashboard
**Remove:**
- Profile Completion section
- ProgressRing component usage
- Profile builder links

**Add:**
- Recommended Universities card (mock stats)
- Saved Universities card (mock stats)
- Saved Courses card (mock stats)
- Applications card (mock stats)
- Documents card (mock stats)

---

## PHASE 2 — STUDENT PREFERENCE BUILDER

### 2.1 Create Preference Store
- `/src/store/preferences.ts` — local state for student preferences

### 2.2 Create Preference Page
- Route: `/preferences`
- Collect: Preferred Countries, Degree Level, Target Course, CGPA, IELTS, TOEFL, PTE, GRE, GMAT, Work Experience
- Use cards, chips, toggle buttons, radio groups, sliders
- Allow Save Progress, Edit Later, Skip

### 2.3 Create Preference Components
- `/src/components/preferences/` folder with reusable input components

---

## PHASE 3 — UNIVERSITY DISCOVERY

### 3.1 Create Discovery Page
- Route: `/discover`
- Search bar
- Country filter (chips)
- Degree filter (dropdown)
- Course filter (dropdown)
- University cards grid
- University Details Modal

### 3.2 Create Components
- UniversityCard
- UniversityFilters
- UniversityDetailModal

---

## PHASE 4 — RECOMMENDATION ENGINE V1

### 4.1 Create Recommendation Logic
- `/src/data/mock/recommendations.ts` with filtering rules

### 4.2 Create Recommendation Page
- Route: `/recommendations`
- Shows Dream, Target, Safe categories
- Based on: Country, Course, CGPA, IELTS, Experience

### 4.3 Rules Engine
- CGPA ≥ 9.0 + IELTS ≥ 7.5 → Dream: Top 50 QS
- CGPA 7.5-8.9 + IELTS 6.5-7.4 → Target: 50-200 QS
- CGPA < 7.5 + IELTS < 6.5 → Safe: 200+ QS

---

## PHASE 5 — SAVE INTEREST SYSTEM

### 5.1 Create Saved Items Store
- `/src/store/savedItems.ts`
- Save/remove universities
- Save/remove courses

### 5.2 Create Saved Pages
- Route: `/saved`
- Tabs: Universities | Courses

### 5.3 Add Save Buttons
- University cards → heart/bookmark toggle
- Course cards → heart/bookmark toggle

---

## PHASE 6 — APPLICATION SYSTEM

### 6.1 Create Application Store
- `/src/store/applications.ts`

### 6.2 Create Application Pages
- Route: `/applications` (refactor existing)
- Application form modal
- Status: Draft → Submitted → Under Review → Accepted → Rejected

### 6.3 Flow
Recommendation → Apply → Draft Application

---

## PHASE 7 — DOCUMENT CENTER

### 7.1 Create Document Store
- `/src/store/documents.ts`

### 7.2 Create Document Pages
- Route: `/documents` (refactor existing)
- Categories: Personal, Academic, Language, Financial, SOP, LOR, Additional
- Upload, Replace, Delete, Preview UI

---

## PHASE 8 — ADMIN PORTAL

### 8.1 Connect Admin to Mock Data
- Applications view
- Documents view
- Saved Universities view
- Saved Courses view
- Student Interests view

### 8.2 Admin Routes
- `/admin/applications`
- `/admin/documents`
- `/admin/interests`

---

## FILE STRUCTURE (NEW)

```
ascend-student-suite-main/src/
├── data/
│   └── mock/
│       ├── universities.ts
│       ├── courses.ts
│       ├── applications.ts
│       ├── documents.ts
│       └── recommendations.ts
├── store/
│   ├── preferences.ts
│   ├── savedItems.ts
│   ├── applications.ts
│   └── documents.ts
├── services/
│   └── localStorage.ts
├── components/
│   └── preferences/
│       ├── CountrySelector.tsx
│       ├── DegreeSelector.tsx
│       ├── ScoreSelector.tsx
│       └── ExperienceSelector.tsx
├── pages/
│   ├── Dashboard.tsx          (REFACTORED)
│   ├── Preferences.tsx        (NEW)
│   ├── Discover.tsx           (NEW)
│   ├── Recommendations.tsx    (NEW)
│   ├── Saved.tsx              (NEW)
│   ├── Applications.tsx       (REFACTORED)
│   └── Documents.tsx          (REFACTORED)
```

---

## PROGRESS TRACKING

| Phase | Status |
|-------|--------|
| Phase 1 — Foundation Refactor | ✅ Complete |
| Phase 2 — Student Preference Builder | ✅ Complete |
| Phase 3 — University Discovery | ✅ Complete |
| Phase 4 — Recommendation Engine V1 | ✅ Complete |
| Phase 5 — Save Interest System | ✅ Complete |
| Phase 6 — Application System | ✅ Complete |
| Phase 7 — Document Center | ✅ Complete |
| Phase 8 — Admin Portal | ✅ Complete |

---

## FILES CREATED / MODIFIED

### New Files (Student Portal)
| File | Purpose |
|------|---------|
| `src/data/mock/index.ts` | Barrel export for all mock data |
| `src/data/mock/universities.ts` | 12 mock universities with full metadata |
| `src/data/mock/courses.ts` | 15 mock courses across universities |
| `src/data/mock/applications.ts` | Mock application data + types |
| `src/data/mock/documents.ts` | Mock document data + category config |
| `src/data/mock/recommendations.ts` | Rules-based recommendation engine |
| `src/services/localStorage.ts` | Generic localStorage service |
| `src/store/preferences.ts` | Student preference persistence |
| `src/store/savedItems.ts` | Saved universities & courses |
| `src/store/applications.ts` | Application CRUD + stats |
| `src/store/documents.ts` | Document management + categories |
| `src/pages/Preferences.tsx` | 7-step preference builder |
| `src/pages/Discover.tsx` | University search + filters + detail modal |
| `src/pages/Recommendations.tsx` | Dream/Target/Safe tiered recommendations |
| `src/pages/Saved.tsx` | Saved universities & courses with tabs |

### Modified Files (Student Portal)
| File | Change |
|------|--------|
| `src/pages/Dashboard.tsx` | Complete rewrite — removed profile completion, added 5 stat cards, recommendations preview, Yocket-inspired layout |
| `src/pages/Applications.tsx` | Rewritten to use local store — create/edit/delete applications with status management |
| `src/pages/Documents.tsx` | Rewritten to use local store — category-based document center with upload modal |
| `src/App.tsx` | Added routes for /preferences, /discover, /recommendations, /saved |
| `src/components/ui/floating-sidebar.tsx` | Updated nav items with new routes |

### New Files (Admin Portal)
| File | Purpose |
|------|---------|
| `src/pages/Interests.tsx` | Admin view: applications, saved items, preferences, documents — reads from localStorage |

### Modified Files (Admin Portal)
| File | Change |
|------|--------|
| `src/App.tsx` | Added /interests route |
| `src/components/layout/AppSidebar.tsx` | Added Interests nav item |
