---
description: 
---

# UNI360 PHASE 2 MASTER INSTRUCTIONS

## Status

Phase 1 is completed.

Do not redesign UI.

Do not change workflows.

Do not modify navigation.

Use Phase 1 implementation as the source of truth.

---

# Phase 2 Objective

Replace demo systems with real systems.

Keep:

* Student Workflow
* University Finder
* Applications
* Documents
* Admin Portal
* Journey System

unchanged.

---

# Do Not Build Yet

Do NOT implement:

* OTP Login
* Payments
* Visa Workflow Engine
* Commission Tracking
* Notification System
* AI SOP Generator
* AI LOR Generator
* Real Recommendation Engine
* University Import Pipeline

These belong to future phases.

---

# Supabase Scope

Create only:

student_profiles

applications

documents

saved_universities

saved_courses

admin_notes

Do NOT create:

universities

courses

recommendations

until the university data model is finalized.

---

# Demo Mode

Keep DEMO_MODE working.

All new systems must support:

DEMO_MODE = true

and

DEMO_MODE = false

switching.

---

# Authentication

Order:

1. Google Login
2. Email Login
3. OTP Login

OTP is not Phase 2.

---

# Storage

Use Supabase Storage.

Buckets:

personal

academic

language

financial

sop

lor

---

# Migration Rule

Never replace all localStorage systems at once.

Migrate module by module:

1. student_profiles
2. applications
3. documents
4. saved_universities
5. saved_courses
6. admin_notes

---

# University Data

University and course data remain mock data.

Do not create university tables.

Do not create course tables.

Do not build import systems.

Do not build scraping systems.

Wait for finalized university schema.

---

# Success Criteria

Phase 2 is complete when:

* Student Profiles persist in Supabase
* Applications persist in Supabase
* Documents persist in Supabase
* Saved Universities persist in Supabase
* Saved Courses persist in Supabase
* Google Login works
* Demo Mode can be disabled

Only then move to Phase 3.
