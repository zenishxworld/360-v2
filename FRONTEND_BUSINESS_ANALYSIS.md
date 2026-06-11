# UNI360° — Frontend Business Analysis

> **Generated:** 2026-06-11  
> **Scope:** 5 frontend portals across the UNI360° study-abroad ecosystem  
> **Focus:** Functionality, business logic, data flow, and system requirements (not styling)

---

# 1. PORTAL OVERVIEW

| Portal | Directory | Tech Stack | User Base |
|--------|-----------|------------|-----------|
| **Student Portal** | `ascend-student-suite-main` | React + TypeScript, Vite, Tailwind, React Router, TanStack Query, Framer Motion | End students managing study-abroad journey |
| **Chancenkarte Portal** | `Chancenkarte-main` | React + TypeScript, Vite, Tailwind, React Router | Prospective students assessing Germany Chancenkarte eligibility |
| **UNI360 Landing** | `UNI360_landing-main` | React + TypeScript, Vite, Tailwind, React Router | General public / marketing leads |
| **Admin Portal** | `uni360-admin-main` | React + TypeScript, Redux Toolkit, Vite, Tailwind, React Router | University counselors & admin staff |
| **Master Admin Portal** | `uni360-master-admin-main` | React + JSX, Redux Toolkit, Vite, Tailwind, React Router | Super-administrators overseeing entire platform |

---

# 2. PAGE INVENTORY

## 2.1 STUDENT PORTAL (`ascend-student-suite-main`)

| # | Route | Page | Purpose | Key Components | User Actions | Data Displayed | Forms | Tables |
|---|-------|------|---------|----------------|--------------|----------------|-------|--------|
| 1 | `/dashboard` | Dashboard | Central hub showing overview | StatCard, ProgressRing, Badge, Card, Dialog | Navigate to sections, view notifications, check profile completion | Profile completion %, active applications count, offers received, success rate, recent activity timeline | None | Recent applications list |
| 2 | `/applications` | Applications | Manage all applications | Card, Badge, Dialog, Tabs, Portal | View applications, create new, submit drafts, view progress, download docs | Application list with status, reference numbers, university names, programs | None (modal-based detail view) | Applications table with status badges, pagination |
| 3 | `/universities` | Universities | Browse & apply to universities | CourseModal, RazorpayButton, Card, Badge, Select, Input | Search universities, filter by country, view courses, favorite courses, apply, make payment | University list, course list, tuition fees, intake seasons, application deadlines | Application form (in modal), payment form | University cards grid, courses grid |
| 4 | `/visa` | Visa Management | Track visa process | Card, Badge, RazorpayButton, stepper UI | View visa checklist, track progress, book appointments, pay visa fees | Visa stages/steps, checklist items, appointment details, meeting URL | Appointment booking form (embedded) | Visa step timeline |
| 5 | `/finances` | Finances | Payment & financial management | Card, Badge, motion components | View payment history, pay consultancy fees, download demand draft, book loan consultation | Payment history list, stats (total paid, pending, failed), loan info | Payment filter (tabs) | Payment history list |
| 6 | `/documents` | Documents | Upload & manage documents | DocumentCard, Tabs, Dialog, Input file | Upload docs, view uploaded docs, download, delete, re-upload rejected docs | Document list with status (pending/uploaded/rejected), verification status, file size | File upload input | Documents grid with status badges |
| 7 | `/resources` | Resources | Study abroad resources | Card, Badge, RazorpayButton | Browse resources, filter by category, pay for premium resources, download PDFs, use calculators | Resource cards (guides, services, checklists, calculators, scholarships) | Payment modal, calculator forms | Resources grid |
| 8 | `/ai-tools` | AI Tools | AI-powered document generation | RazorpayButton, jsPDF, Card, Badge | Generate SOP/LOR/Cover Letter, pay for AI tools, download generated docs, copy text | Generated document preview, token balance, payment status | Multi-step forms for SOP, LOR, Cover Letter generation | None |
| 9 | `/ask-ai` | Ask AI | AI study abroad Q&A | Card, Input, Button, suggested questions | Ask questions, view conversation history, start new chat | Conversation messages, suggested questions | Chat input | Conversation history list |
| 10 | `/profile` | Profile | View personal profile | Card, InfoItem, StatCard | View profile information, navigate to profile builder | Name, email, phone, nationality, education, test scores, profile completion % | None | Stats display |
| 11 | `/profilebuilder` | Profile Builder | Multi-step profile setup | DatePicker, CountrySelect, Select, motion | Complete profile steps, save progress, validate data, view progress | Profile data, step completion status, validation errors | Multi-step form (basic info, education, tests, experience, documents, preferences) | Steps progress indicator |
| 12 | `/settings` | Settings | Account settings | Card, Input, Button | Change password, update profile photo, manage notifications | User info, password strength indicator, notification preferences | Password change form, profile photo upload | None |
| 13 | `/serbia-interest` | Serbia Interest | Express interest in Serbia study | Card, Badge, Button | Select intake, degree, universities, courses; submit interest form | Intake options, degree options, Serbian university/course list | Multi-select form for Serbia study interest | None |
| 14 | `/pricing` | Pricing | View pricing plans | Static content | View pricing information | Pricing tiers | None | None |
| 15 | `/terms` | Terms of Service | Legal page | Static content | Read terms | Legal text | None | None |
| 16 | `/privacy` | Privacy Policy | Legal page | Static content | Read policy | Legal text | None | None |
| 17 | `/refund` | Refund Policy | Legal page | Static content | Read policy | Legal text | None | None |
| 18 | `/cancellation` | Cancellation Policy | Legal page | Static content | Read policy | Legal text | None | None |
| 19 | `/contact-us` | Contact Us | Contact information | Static/map | View contact info | Contact details | None | None |
| 20 | `/*` | 404 | Not found | NotFound | None | Error message | None | None |

### Key Student Services (`src/services/`)

| Service File | Functions | Backend Endpoints Called |
|-------------|-----------|------------------------|
| `studentProfile.js` | `getStudentProfile`, `getStudentApplications`, `createApplication`, `submitApplication`, `getApplicationById`, `updateApplication`, `getApplicationProgress`, `getAllCourses`, `fetchAllFavoriteCourses`, `addCourseToFavorites`, `removeCourseFromFavorites`, `getProfileProgress`, `getVisaChecklist`, `getVisaTracker`, `updateVisaTracker`, `getVisaAppointments`, `getMeetingUrl`, `getNotifications`, `markNotificationAsRead`, `markAllNotificationsAsRead` | `/api/v1/students/profile`, `/api/v1/applications`, `/api/v1/courses`, `/api/v1/visa/*`, `/api/v1/notifications` |
| `auth.js` | `loginUser`, `registerUser`, `getGoogleAuthUrl`, `handleGoogleCallback`, `refreshToken`, `logoutUser`, `verifyUser`, `setPassword`, `resetPassword`, `changePassword` | `/api/v1/auth/*` |
| `payment.js` | `createOrder`, `verifyPayment`, `verifyRazorpayPayment`, `healthCheck`, `getPaymentHistory` | `/api/v1/payments/*`, Razorpay API |
| `document.js` | `getDocuments`, `uploadDocument`, `deleteDocument`, `downloadDocument`, `downloadDocumentById` | `/api/v1/documents/*` |
| `api.ts/js` | `universityAPI`, `courseAPI` | `/api/v1/universities`, `/api/v1/courses` |
| `tokenService.js` | `getAccessToken`, `refreshToken`, `clearToken`, `getAuthHeaders`, `makeAuthenticatedRequest` | Token management utilities |
| `serbia.ts` | `serbiaLeadAPI` | `/api/v1/serbia/leads` |
| `profile.js` | `getProfileCompletion`, `uploadProfilePhoto`, `deleteProfilePhoto` | Profile utilities |

---

## 2.2 CHANCENKARTE PORTAL (`Chancenkarte-main`)

| # | Route | Page | Purpose | User Actions | Data Displayed | Forms |
|---|-------|------|---------|--------------|----------------|-------|
| 1 | `/` | Index (Home) | Chancenkarte landing & eligibility checker | Browse content, complete eligibility quiz, check eligibility score, scroll to sections | Hero, advantages, about, eligibility checker, expert CTA, testimonials, FAQ | Eligibility checker form (5 criteria quiz) |
| 2 | `/uni360` | Uni360 Redirect | Redirect/promotion to main UNI360 platform | View UNI360 info, potentially navigate away | Information about UNI360 | None |
| 3 | `/privacy` | Privacy Policy | Legal page | Read | Privacy text | None |
| 4 | `/terms` | Terms of Use | Legal page | Read | Terms text | None |
| 5 | `/cancellation-refund` | Cancellation & Refund Policy | Legal page | Read | Policy text | None |
| 6 | `/cancellation-rescheduling` | Cancellation & Rescheduling Policy | Legal page | Read | Policy text | None |

### Key Components
- **EligibilityChecker**: 5-criteria quiz (age, qualifications, experience, language, funds)
- **Uni360Popup**: Promotional popup redirecting to main platform
- **StickyBar**: Persistent CTA bar

---

## 2.3 UNI360 LANDING PORTAL (`UNI360_landing-main`)

| # | Route | Page | Purpose | Key Components | User Actions | Forms |
|---|-------|------|---------|----------------|--------------|-------|
| 1 | `/` | Index | Marketing landing page | Navigation, HeroSection, CountrySelectionModal, CollegeExplorer, Germany/UK/Italy/Serbia sections, WhyChooseSection, TestimonialsSection, FAQSection, Footer, FloatingChatbot, AuthPopup | Browse content, select countries, book consultation call, authenticate, make payment | Country selection, consultation booking, auth (login/signup), payment |
| 2 | `/services` | Services | Service offerings | Service cards | Browse services | None |
| 3 | `/universities` | University Quiz | University/course discovery & quiz | Quiz component, UniversityDetailsModal, Course cards, AuthPopup, filters | Take preference quiz, browse universities, view course details, favorite courses, apply | Quiz form, application form, auth form |
| 4 | `/about` | About Us | Company information | Static content | Read about company | None |
| 5 | `/contact` | Contact | Contact form | Contact form | Submit inquiry | Contact form (name, email, phone, subject, message, country) |
| 6 | `/study-in-italy` | Study in Italy | Italy-specific landing | Country-specific content | Browse Italy info | None |
| 7 | `/study-in-serbia` | Study in Serbia | Serbia-specific landing | Country-specific content | Browse Serbia info | None |
| 8 | `/pricing` | Pricing Policy | Pricing information | Static content | View pricing | None |
| 9 | `/privacy-policy` | Privacy Policy | Legal page | Static content | Read | None |
| 10 | `/terms-of-service` | Terms of Service | Legal page | Static content | Read | None |
| 11 | `/cookie-policy` | Cookie Policy | Legal page | Static content | Read | None |
| 12 | `/refund-policy` | Refund & Cancellation Policy | Legal page | Static content | Read | None |
| 13 | `/auth/callback` | Auth Callback | OAuth callback handler | Handles Google OAuth redirect | Auth token processing | None |

### Key Services (`src/services/`)

| Service | Functions | Endpoints |
|---------|-----------|-----------|
| `api.js` | `universityAPI`, `courseAPI`, `authAPI`, `apiUtils`, `wishlistAPI`, `quizAPI`, `paymentAPI` | `/api/v1/universities`, `/api/v1/courses`, `/api/v1/auth/*`, `/api/v1/wishlist`, `/api/v1/quiz`, `/api/v1/payments` |

---

## 2.4 ADMIN PORTAL (`uni360-admin-main`)

| # | Route | Page | Purpose | Key Components | User Actions | Forms | Tables |
|---|-------|------|---------|----------------|--------------|-------|--------|
| 1 | `/dashboard` | Admin Dashboard | Central workflow hub | Card, Badge, workflow stage filters, modals | View tasks, claim applications, complete tasks, filter by country/stage/status, view workflow progress, view student profiles | Task completion form, application flags | Tasks list with filtering |
| 2 | `/applications` | Applications | Manage student applications | Card, Badge, Select, Input, pagination | View all applications, search, filter by status/student/country, navigate to details | None | Applications table with status, assigned admin, priority, intake |
| 3 | `/applications/new` | New Application | Create application for student | Multi-step form wizard (Card, Input, Select, Textarea, Progress) | Enter personal info, academics, test scores, experience, preferences, university/course, admin notes | Full multi-step application form (personal → academics → tests → experience → preferences → university → admin details) | None |
| 4 | `/applications/:id` | Application Details | View application details | Tabs, Card, Badge, Dialog, Avatar, Textarea | View student info, university, documents, timeline, notes, payments; approve/reject documents, manage payments | Document review notes, payment management | Documents table, timeline, notes, payments |
| 5 | `/history` | History | Completed tasks history | Card, Select, Input, Badge, pagination | View completed tasks, filter by stage/status/priority/country/date, search | None | Completed tasks table |
| 6 | `/documents` | Documents | Document verification | DocumentViewer, Tabs, Card | View pending/verified/reupload documents, preview docs, verify/reject, download | Rejection reason form | Documents table with status |
| 7 | `/payments` | Payments | Student payments | Card, Badge, Input, Modal, motion | View student payments grouped by student, search, filter by status, export | None | Payments grouped by student, payment details modal |
| 8 | `/students` | Students | Manage student profiles | Card, Badge, Avatar, Dialog, Input, Select | View students, search, filter, add student, view profile details, upload CV for AI processing | Add student multi-step form (personal → academics → tests → experience → preferences), CV upload | Students table |
| 9 | `/students/:id` | Student Details | View single student | Tabs, Card, Badge, Avatar | View profile, applications, documents, communications | None | Profile details, application history |
| 10 | `/universities` | Universities | Manage universities | Card, Badge, Input, Select, Tabs | View universities, filter by country, manage university records | None | Universities list |
| 11 | `/settings` | Settings | Admin account settings | TBD | Manage account | Profile settings form | None |
| 12 | `/resources` | Resources | Manage resources | TBD | Manage study resources | Resource CRUD forms | Resources list |
| 13 | `/ai-tools` | AI Tools | Admin AI document generation | Card, Button, Modals | Generate SOP/LOR/Cover Letter for students, manage AI tools | SOP/LOR/Cover Letter generation forms | None |
| 14 | `/support` | Support | Support ticket management | TBD | Manage support tickets | Ticket response forms | Tickets list |
| 15 | `/communications` | Communications | Send notifications | Input, Textarea, Select, Table, Checkbox, Portal | Select students, compose notification, broadcast, view sent history | Notification compose form (title, message, type, priority, delivery channels, target audience) | Students selection table, sent notifications history |
| 16 | `/appointments` | Appointments | Visa appointment management | Card, Badge, Dialog, Input, Select, Calendar | View appointments, create new, update status, view student appointments, manage meeting URLs | Create appointment form (student, country, date, time, type, notes), status update | Appointments table with filters |
| 17 | `/serbia-leads` | Serbia Leads | Serbia study interest leads | Card, Badge, Select, Input | View leads, search, filter by status/intake | None | Leads table with status badges |
| 18 | `/serbia-leads/:id` | Serbia Lead Details | Lead detail view | Card, Badge | View lead details | Status update form | Lead info display |
| 19 | `/payments/service` | Payments Service | Payment service page | TBD | Manage payment services | TBD | TBD |

### Key Admin Services (`src/services/`)

| Service | Functions | Endpoints |
|---------|-----------|-----------|
| `task.js` | `getAllTasks`, `claimTask`, `completeTask`, `getWorkflowProgress`, `getTaskRequirements`, `setApplicationFlags`, `getStudentProfileForAdmin`, `getApplication`, `getCourse`, `getUniversity` | `/api/v1/admin/tasks/*`, `/api/v1/admin/workflow/*` |
| `applications.ts` | `getApplications`, `getApplicationById`, `updateApplication` | `/api/v1/admin/applications` |
| `documentService.js` | `getPendingDocuments`, `getReviewedDocuments`, `getStudentDocuments`, `updateDocumentStatus`, `uploadDocument`, `getDocumentViewUrl`, `deleteDocument`, `downloadDocument` | `/api/v1/admin/documents/*` |
| `paymentsService.ts` | `fetchAssignedStudentPayments` | `/api/v1/admin/payments` |
| `visaService.ts` | `getAllVisaAppointments`, `createVisaAppointment`, `updateAppointmentStatus`, `getStudentVisaAppointments`, `getMeetingUrls`, `saveMeetingUrl` | `/api/v1/admin/visa/*` |
| `serbiaLeads.ts` | `serbiaLeadsAPI` | `/api/v1/admin/serbia-leads` |
| `authService.ts` | Token management, login, logout | `/api/v1/auth/*` |
| `auth.js` | Login functions | `/api/v1/auth/*` |
| `supportApi.ts` | Support ticket management | `/api/v1/admin/support` |
| `universities.js` | University CRUD | `/api/v1/admin/universities` |
| `dashboardMappings.js` | Workflow stage mappings | Configuration data |
| `api.ts` | API client | Base configuration |

---

## 2.5 MASTER ADMIN PORTAL (`uni360-master-admin-main`)

| # | Route | Page | Purpose | User Actions | Forms | Tables |
|---|-------|------|---------|--------------|-------|--------|
| 1 | `/dashboard` | Global Dashboard | Platform-wide analytics | View KPIs, user metrics, application metrics, financial metrics, conversion funnel, revenue charts, agent performance | None | Stat cards, charts (bar, line, pie, radar, area) |
| 2 | `/users` | User Management | Manage all users (students + admins) | View users, search, filter, export to Excel, delete users, view documents, view profiles | None | Users table with status badges, document stats |
| 3 | `/users/:id` | Student Details | View student profile | View profile, applications, documents, communications | None | Profile details |
| 4 | `/users/student/:id` | Student Details (alt) | Same as above | Same as above | Same | Same |
| 5 | `/users/admin/:id` | Admin Details | View admin profile & permissions | View admin info, manage permissions | Permission update form | Admin details |
| 6 | `/users/external-admin/:id` | External Admin Details | View external admin profile | View external admin info | None | Admin details |
| 7 | `/dashboard/users/:userId/details` | User Details Page | User details from dashboard | View user details | None | User info |
| 8 | `/universities` | University Management | CRUD universities & courses | View universities, search, filter, add/edit/delete, upload bulk CSV, view courses, manage commission rates | University create/edit form, CSV upload | Universities table, courses table |
| 9 | `/applications` | Application Oversight | View all applications in system | View applications, search, filter, export to Excel, view analytics | None | Applications table with status, analytics summary |
| 10 | `/applications/:id` | Application Details | Application deep-dive | View full application details | Document review, status updates | Application info, documents, timeline |
| 11 | `/commissions` | Commission Tracker | Track university commissions | View earned commissions, stats, manage commission rates | Set commission rate form | Commissions table |
| 12 | `/payments` | Payment Management | All system payments | View all payments, filter by status/date, search, export to Excel, refresh | None | Payments table with status, amount, purpose |
| 13 | `/reports` | Reports & Analytics | Comprehensive analytics dashboard | View charts for users, applications, payments, notifications; export reports | None | Multiple chart types (area, bar, line, pie, radar, composed) |
| 14 | `/documents` | Document Management | All user documents | View documents by student, filter by status, preview, download | Rejection reason form | Documents grouped by student |
| 15 | `/queries` | Query Management | Support queries | View queries, search, filter by status, reply, close | Reply form, close confirmation | Queries table |
| 16 | `/admin-requests` | Admin Request Management | Manage admin permissions & requests | View admin requests, approve/reject, manage permissions, advanced filtering | Permission update form, approval/rejection | Admin requests table |
| 17 | `/notifications` | Notification Management | System-wide notifications | View notification overview, broadcast notifications, view analytics, manage templates | Broadcast form (title, message, type, priority, delivery channels, target audience) | Notification analytics charts, templates list |
| 18 | `/leads` | Leads | Contact form leads | View leads, search, filter by status/subject/country, export to Excel | None | Leads table |
| 19 | `/settings` | Account Settings | Master admin account | Manage account settings | Settings forms | None |
| 20 | `/ai-tools` | AI Tools | AI document generation tools | Generate documents | AI generation forms | None |

### Key Master Admin Services (`src/services/`)

| Service | Functions | Endpoints |
|---------|-----------|-----------|
| `dashboardAPI.js` | `fetchDashboardData`, `fetchUsersAnalytics`, `fetchApplicationsAnalytics` | `/api/v1/superadmin/dashboard/*` |
| `userService.js` | `getAllUsers`, `deleteUser`, `getUserById`, `getStudentProfile` | `/api/v1/superadmin/users` |
| `applicationService.js` | `fetchApplications`, `fetchApplicationAnalytics`, `mapApplicationStatus`, `mapWorkflowStage`, `getStatusColor` | `/api/v1/superadmin/applications` |
| `universityService.js` | `universityAPI` (CRUD) | `/api/v1/superadmin/universities` |
| `courseService.js` | `courseAPI` (CRUD) | `/api/v1/superadmin/courses` |
| `paymentService.js` | `getAllSystemPayments` | `/api/v1/superadmin/dashboard/payments` |
| `commissionService.js` | `getEarnedCommissions`, `getCommissionStats`, `getAllUniversityCommissionRates`, `setUniversityCommissionRate` | `/api/v1/superadmin/commissions` |
| `notificationApi.js` | `getNotificationOverview`, `broadcastNotification`, `getNotificationAnalytics`, `getNotificationTemplates` | `/api/v1/superadmin/notifications` |
| `documentService.js` | Document management utilities | `/api/v1/superadmin/documents` |
| `queryService.js` | `getAllQueries`, `replyToQuery`, `closeQuery` | `/api/v1/superadmin/queries` |
| `adminService.js` | `fetchAdminFilters` | `/api/v1/superadmin/admins` |
| `authService.js` | Auth functions | `/api/v1/auth/*` |
| `api.js` | Axios API client | Base configuration |
| `apiServices.js` | Additional API methods | Various endpoints |
| `tokenService.js` | Token management | Utility |
| `leadsAPI_snippet.js` | Leads API | `/api/v1/superadmin/contacts` |

---

# 3. WORKFLOW MAPPING

## 3.1 STUDENT JOURNEY

```
Landing Page → Eligibility Quiz → Country Selection
       ↓
  Authentication (Email/Google SSO)
       ↓
  Profile Builder (Multi-step):
    1. Basic Information (name, DOB, nationality, passport, contact)
    2. Education Background (10th, Diploma, Bachelor's, Master's, PhD)
    3. Test Scores (IELTS, TOEFL, GRE, GMAT)
    4. Work Experience (jobs, internships, projects, certifications)
    5. Target Preferences (countries, programs, study level, intake)
    6. Document Preparation (passport, transcripts, SOP, LOR)
       ↓
  University Selection & Application:
    → Browse universities by country (Germany, UK, Italy, Serbia)
    → Filter by tuition, field, degree level, language
    → View course details, favorite courses
    → Submit application → Payment (Application Fee via Razorpay)
    → Track application status (Draft → Submitted → Under Review → Offer/Accepted/Rejected)
       ↓
  Document Management:
    → Upload required documents (passport, transcripts, SOP, LOR, etc.)
    → Track verification status (Pending → Verified/Rejected)
    → Re-upload rejected documents
       ↓
  Visa Process (per country):
    → Germany: Health Insurance → Visa Application → Biometrics → Decision
    → UK: CAS Statement → Visa Application → Biometrics → Decision
    → Track visa stages, book appointments, make visa fee payments
       ↓
  Financial Management:
    → Pay consultancy fees
    → Pay application fees
    → Pay visa fees
    → Pay for AI tools
    → View payment history
    → Apply for education loans
       ↓
  AI Tools:
    → Generate SOP (Statement of Purpose)
    → Generate LOR (Letter of Recommendation)
    → Generate Cover Letter
    → Ask AI chatbot study abroad questions
       ↓
  Resources:
    → Access study guides, checklists, language prep
    → Use calculators (GPA, currency, blocked account)
    → Access premium services (translation, accommodation, insurance, flight booking)
```

## 3.2 APPLICATION JOURNEY

```
STUDENT SIDE:
  Browse Universities → Select Course → Create Application (Draft)
       ↓
  Complete Profile Builder (if not complete)
       ↓
  Pay Application Fee (via Razorpay)
       ↓
  Submit Application
       ↓
  Upload Required Documents
       ↓
  Track Status

ADMIN SIDE:
  New Application appears in Dashboard
       ↓
  Admin Claims Application Task
       ↓
  Workflow Stages (varies by country):

  GERMANY WORKFLOW:
    1. APPLICATION_REVIEW → Claim application
    2. ACADEMIC_EVALUATION → Document Verification → Academic Verification → Language Verification
    3. CERTIFICATION_PROCESS → APS Certificate → Payment Processing (Block Account)
    4. FEES_PAYMENT → Tuition Fees Payment → Block Account
    5. UNIVERSITY_SUBMISSION → Submit to university
    6. VISA_APPLICATION → Scheduled → Completed → Result

  UK WORKFLOW:
    1. APPLICATION_REVIEW → Claim application
    2. ACADEMIC_EVALUATION → Document Verification → Academic Verification → Language Verification
    3. CONDITIONAL_OFFER → Conditional Offer Verification
    4. CAS_INTERVIEW → Scheduled → Completed → Passed
    5. FEES_PAYMENT → Tuition Fees Payment
    6. UNCONDITIONAL_OFFER → Unconditional Offer Verification
    7. UNIVERSITY_SUBMISSION → Submit to university
    8. VISA_APPLICATION → Scheduled → Completed → Result

  Admin completes each task → Progress tracked via workflow engine
       ↓
  Application completion → Marked as COMPLETED
```

## 3.3 DOCUMENT VERIFICATION JOURNEY

```
Student uploads document
       ↓
Document status: PENDING
       ↓
Admin reviews document in Documents tab
       ↓
  ┌── Verified? ──→ Status: VERIFIED/APPROVED
  │
  └── Rejected? ──→ Admin provides rejection reason
                    Status: REJECTED / REUPLOAD_REQUIRED
                    Student re-uploads corrected document
                    Status → PENDING (re-verification cycle)
```

## 3.4 UNIVERSITY SELECTION JOURNEY

```
Student Portal:
  → Select country toggle (DE/UK/IT/RS)
  → Browse universities (fetched from API)
  → View university details (courses, tuition, rankings, intake)
  → Favorite courses (wishlist)
  → Apply to course (triggers application creation)
  → Pay application fee via Razorpay

Landing Portal (University Quiz):
  → Take preference quiz (field, budget, location preferences)
  → Get matched university recommendations
  → Browse & favorite universities
  → Express interest → Redirect to auth → Application

Serbia Interest (separate flow):
  → Select intake, degree, universities, courses
  → Submit lead form → Admin gets notified
```

## 3.5 PAYMENT JOURNEY

```
Payment Trigger Events:
  → Application fee (when submitting application)
  → AI Tools fee (SOP/LOR/Cover Letter generation)
  → Visa appointment fee
  → Language course fee
  → Consultancy fee
  → Premium resources

Flow:
  1. User clicks "Pay Now" → RazorpayButton component
  2. Frontend creates order via backend API (`/api/v1/payments/create-order`)
  3. Razorpay checkout opens (amount, currency, description)
  4. User completes payment in Razorpay iframe
  5. Frontend verifies payment via backend (`/api/v1/payments/verify`)
  6. On success → Update UI, enable service
  7. On failure → Show error, allow retry

Payment Record Fields:
  - id, studentId, amount, currency, status (PENDING/COMPLETED/FAILED/PROCESSING)
  - paymentPurpose (CONSULTANCY_FEES, APPOINTMENT_FEE, LANGUAGE_COURSE_FEE, AI_TOOLS, OTHER)
  - razorpayOrderId, razorpayPaymentId, createdAt
```

## 3.6 NOTIFICATION JOURNEY

```
Notification Sources:
  → Application status changes (submitted, under review, offer, rejected)
  → Document verification updates
  → Task assignments (admin side)
  → System alerts
  → Broadcast messages from admins

Student Side:
  → Bell icon in header → Dropdown with recent notifications
  → "View All" opens full notification modal
  → Mark as read individually or "Mark all as read"
  → Unread count badge
  → Auto-fetch every 30 seconds

Admin Side:
  → Dashboard shows pending tasks (implicit notifications)
  → Communications page for broadcasting to students

Master Admin:
  → Notification Management page
  → Create & broadcast system-wide notifications
  → Choose delivery channels (IN_APP, EMAIL, PUSH)
  → Target specific user types (STUDENT, ADMIN, ALL)
  → View notification analytics (delivery rates, read rates)
  → Manage notification templates
```

---

# 4. DATA MAPPING

## 4.1 STUDENT PORTAL

| Page | Data Inputs | Data Outputs | CRUD Operations |
|------|-------------|-------------|-----------------|
| Dashboard | Auth token, selected country | Dashboard stats (applications, offers, success rate, profile %) | R: Get profile, Get applications, Get notifications |
| Applications | Country filter | Application list with status | R: Get applications; C: Create application; U: Update/submit application |
| Universities | Country, search query, filters | University list, course list, favorite courses | R: Get universities, courses, favorites; C: Create application, add favorite; D: Remove favorite |
| Visa | Country | Visa checklist, tracker, appointments | R: Get visa data; U: Update tracker |
| Finances | Payment filter | Payment history | R: Get payment history |
| Documents | File uploads, document metadata | Document list with status | R: Get documents; C: Upload document; D: Delete document |
| Profile Builder | Multi-step form data | Profile data, progress % | R: Get profile config, profile data; C/U: Save/validate profile data |
| AI Tools | Form data (program details, university name, etc.) | Generated SOP/LOR/Cover Letter | R: Get token balance; C: Generate document (via n8n webhook) |
| Ask AI | User questions | AI responses | R: Get conversation history; C: Send message |
| Settings | Password, profile photo | Updated account | U: Change password, update photo |

## 4.2 ADMIN PORTAL

| Page | Data Inputs | Data Outputs | CRUD Operations |
|------|-------------|-------------|-----------------|
| Dashboard | Filters (country, stage, status) | Task list, workflow progress | R: Get tasks, get workflow progress; U: Claim task, complete task, set flags |
| Applications | Search, filters, pagination | Application list, KPIs | R: Get applications; U: Update application |
| New Application | Full student profile form + application details | Created application | C: Create student profile + application |
| Application Details | Application ID | Full application data, documents, payments, timeline | R: Get application; U: Update status, review documents |
| Documents | Document selection, review notes | Document list with verification status | R: Get documents; U: Update document status (verify/reject); C: Upload; D: Delete |
| Payments | Search, filter | Payment list grouped by student | R: Get payments |
| Students | Search, filters, student form data, CV file | Student list, profile data | R: Get students; C: Add student (including CV AI processing) |
| Communications | Notification form (title, message, type, target) | Sent notifications | C: Broadcast notification; R: Get sent history |
| Appointments | Appointment form data | Appointment list | R: Get appointments; C: Create appointment; U: Update status |
| Serbia Leads | Filters | Lead list | R: Get leads; U: Update lead status |

## 4.3 MASTER ADMIN PORTAL

| Page | Data Inputs | Data Outputs | CRUD Operations |
|------|-------------|-------------|-----------------|
| Dashboard | None (auto-fetches) | Dashboard stats, charts | R: Get all platform analytics |
| Users | Search, filters | User list, document stats | R: Get all users; D: Delete user |
| Universities | Search, filters, university form, CSV file | University list, courses | R: Get universities; C: Create university; U: Edit; D: Delete; C: Bulk upload CSV |
| Applications | Search, filters | Application list, analytics | R: Get all applications |
| Commissions | Commission rate form | Commission list, stats | R: Get commissions; U: Set commission rate |
| Payments | Search, filters | All system payments | R: Get all payments |
| Reports | None (auto-fetches) | Analytics charts (users, apps, payments, notifications) | R: Get all analytics data |
| Documents | Student selection | Documents grouped by student | R: Get documents |
| Queries | Reply text, close confirmation | Query list | R: Get queries; C: Reply; U: Close query |
| Admin Requests | Permission update form | Admin requests list | R: Get requests; U: Update permissions, approve/reject |
| Notifications | Broadcast form (title, message, type, target) | Notification analytics, templates | R: Get analytics & templates; C: Broadcast notification |
| Leads | Search, filters | Lead list | R: Get leads |

---

# 5. ROLE PERMISSIONS

## STUDENT CAN

| Permission | Description |
|-----------|-------------|
| **Profile Management** | Complete multi-step profile builder, view/edit personal profile, upload profile photo |
| **Browse Universities** | View universities & courses by country, filter/search, favorite courses |
| **Manage Applications** | Create, view, submit, and withdraw applications; view application progress |
| **Upload Documents** | Upload required documents, re-upload rejected documents, download verified documents |
| **Make Payments** | Pay application fees (Razorpay), view payment history, download receipts |
| **Use AI Tools** | Generate SOP/LOR/Cover Letter (after payment), use Ask AI chatbot |
| **Track Visa** | View visa checklist, track visa process stages, book visa appointments |
| **Access Resources** | Browse resources, use calculators, access premium services (after payment) |
| **Manage Account** | Change password, manage notifications, view notifications |
| **Express Interest** | Submit Serbia study interest, contact support |
| **View Policies** | Read terms, privacy, refund, cancellation policies |

## ADMIN CAN

| Permission | Description |
|-----------|-------------|
| **Dashboard Management** | View tasks, filter by country/stage/status, claim tasks |
| **Application Processing** | View all assigned applications, create new applications for students, update application status, complete workflow tasks |
| **Document Verification** | View student documents, verify documents, reject with reason, request re-upload, preview documents |
| **Student Management** | View student list, view student profiles & details, add new students (with CV AI processing) |
| **Payment Management** | View assigned student payments, filter by status |
| **Appointment Management** | Create visa appointments, update appointment status, manage meeting URLs |
| **Communication** | Send broadcast notifications to students (targeted by type, priority, delivery channel) |
| **Serbia Lead Management** | View Serbia study interest leads, update lead status |
| **AI Tools** | Generate SOP/LOR/Cover Letter for students |
| **Resource Management** | Manage study resources |
| **Support** | Manage support tickets |
| **History** | View completed tasks history |
| **Account Settings** | Manage own account settings |

## MASTER ADMIN CAN

| Permission | Description |
|-----------|-------------|
| **Full Dashboard** | View platform-wide analytics (users, applications, payments, commissions, notifications) |
| **User Management** | View all users (students + admins), delete users, export user data to Excel, view user documents |
| **Admin Permission Management** | View admin requests, approve/reject admin permissions, set granular permissions (verify documents, approve applications, process payments, manage users) |
| **University Management** | Full CRUD on universities and courses, bulk upload via CSV, manage university commission rates |
| **Application Oversight** | View all applications in system, export to Excel, view application analytics |
| **Commission Management** | View earned commissions by university, set commission rates, view commission stats |
| **Payment Management** | View all system payments, filter by status/date, export to Excel |
| **Document Management** | View all user documents across system, preview, download, manage verification |
| **Query Management** | View all support queries, reply to queries, close queries |
| **Notification Management** | Broadcast system-wide notifications, view notification analytics & delivery rates, manage notification templates, choose delivery channels (in-app, email, push) |
| **Lead Management** | View all contact form leads, filter by status/subject/country, export to Excel |
| **Reports & Analytics** | Access comprehensive analytics dashboard with charts (users, applications, payments, notifications), export reports |
| **AI Tools** | Access AI document generation tools |
| **Account Settings** | Manage own account settings |

---

# 6. DATABASE REQUIREMENTS

## 6.1 ENTITIES

### Core Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **User** | All platform users (students + admins) | id, uuid, email, password, firstName, lastName, fullName, phone, role (STUDENT/ADMIN/SUPER_ADMIN), status (ACTIVE/INACTIVE/SUSPENDED), authProvider, emailVerified, phoneVerified, profileImage |
| **Student** | Student-specific profile data | userId, dateOfBirth, nationality, currentCity, currentCountry, gender, passportNumber, emergencyContact, profileCompletion% |
| **Admin** | Admin-specific profile data | userId, department, specialization, qualityScore, workload, permissions |
| **StudentProfile** | Full student profile (from builder) | studentId, basicInfo (JSON), education (JSON array), testScores (JSON), experience (JSON), preferences (JSON), completionPercentage |

### Education Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **EducationEntry** | Individual education record | studentId, level, fieldOfStudy, institutionName, startYear, endYear, gpa, honors |
| **TestScore** | Standardized test scores | studentId, testType (IELTS/TOEFL/GRE/GMAT), overallScore, listening, reading, writing, speaking, testDate |

### University Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **University** | Partner universities | id, name, code, country, city, website, imageUrl, ranking, institutionType, status, description |
| **Course** | Programs/courses offered | id, universityId, name, courseCode, degreeLevel, fieldOfStudy, studyMode, durationYears, tuitionInternational, currency, intakeSeasons, applicationDeadline, scholarshipsAvailable, language, description |

### Application Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **Application** | Student applications to universities | id, studentId, universityId, courseId, countryCode, status (DRAFT/SUBMITTED/UNDER_REVIEW/OFFER/ACCEPTED/REJECTED), workflowStage, referenceNumber, intakeTerm, assignedAdminId, completionPercentage, priority, isUrgent, submittedAt |
| **ApplicationDocument** | Documents linked to an application | id, applicationId, documentId, required, status |
| **WorkflowInstance** | Workflow engine state | id, applicationId, country, currentStage, completedStages (JSON), pendingStages (JSON) |
| **WorkflowTask** | Individual tasks within workflow | id, workflowInstanceId, stage, taskType, status (PENDING/IN_PROGRESS/COMPLETED), assignedAdminId, completedAt, metadata |

### Document Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **Document** | Uploaded documents | id, studentId, applicationId, fileName, fileType, fileSize, fileUrl, uploadDate, status (PENDING/UPLOADED/REJECTED/VERIFIED), verificationStatus, reviewStatus, rejectionReason, reviewedBy, reviewedAt |

### Payment Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **Payment** | Financial transactions | id, studentId, applicationId, amount, currency, status (PENDING/COMPLETED/FAILED/PROCESSING/REFUNDED), paymentPurpose (CONSULTANCY_FEES/APPOINTMENT_FEE/LANGUAGE_COURSE_FEE/AI_TOOLS/OTHER), razorpayOrderId, razorpayPaymentId, createdAt, completedAt |
| **Commission** | University commissions to platform | id, universityId, applicationId, amount, rate, status (PENDING/PAID/APPROVED/CANCELLED), createdAt |
| **CommissionRate** | Commission rate configuration | id, universityId, rate (percentage), description, updatedBy, updatedAt |

### Notification Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **Notification** | System notifications | id, userId, senderId, type (SYSTEM_ALERT/APPLICATION_UPDATE/DOCUMENT_VERIFIED/TASK_ASSIGNED/BROADCAST), title, message, contentType, status (READ/UNREAD), actionUrl, metadata (JSON), deliveryChannel (IN_APP/EMAIL/PUSH), createdAt, readAt |
| **NotificationTemplate** | Reusable notification templates | id, name, type, subject, body, variables (JSON) |

### Support & Communication Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **SupportQuery** | Support tickets | id, userId, subject, message, status (OPEN/IN_PROGRESS/CLOSED/RESOLVED), priority, createdAt, resolvedAt |
| **QueryReply** | Replies to support tickets | id, queryId, userId, message, createdAt |
| **ContactLead** | Landing page contact form submissions | id, firstName, lastName, email, phone, subject, message, country, status (NEW/IN_PROGRESS/RESOLVED/CLOSED), createdAt |
| **SerbiaLead** | Serbia study interest leads | id, firstName, lastName, email, phone, preferredIntake, preferredDegree, selectedUniversities (JSON), selectedCourses (JSON), notes, status (NEW_LEAD/CONTACTED/DOCUMENT_PENDING/QUALIFIED/CONVERTED/REJECTED), createdAt |

### Visa Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **VisaAppointment** | Visa appointments | id, studentId, country, appointmentType, date, time, location, status (PENDING/CONFIRMED/COMPLETED/CANCELLED), notes, confirmationNumber, createdAt |
| **VisaTracker** | Visa process tracking | id, studentId, country, currentStage, percentage, estimatedTime |
| **VisaChecklist** | Visa requirement items | id, country, item, required, status (PENDING/IN_PROGRESS/COMPLETED) |

### Admin-Specific Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **AdminPermission** | Granular admin permissions | adminId, canVerifyDocuments, canApproveApplications, canProcessPayments, canManageUsers |
| **AdminRequest** | Admin permission change requests | id, adminId, requestedPermissions (JSON), reason, status (PENDING/APPROVED/REJECTED), reviewedBy, reviewedAt |

### Resource Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **Resource** | Study abroad resources | id, title, description, category, type, url, isPremium, price, tags (JSON), featured |

### AI Tool Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **AIDocument** | AI-generated documents | id, studentId, type (SOP/LOR/COVER_LETTER), content, generatedAt, tokenCost, status |
| **AIToken** | AI tool token balance | studentId, tokensRemaining, totalTokensPurchased |
| **AIConversation** | Chatbot conversations | id, studentId, title, messages (JSON), createdAt |

## 6.2 RELATIONSHIPS

```
User 1──* Student (if role=STUDENT)
User 1──* Admin (if role=ADMIN or SUPER_ADMIN)
Student 1──* StudentProfile
Student 1──* EducationEntry
Student 1──* TestScore
Student 1──* Application
Student 1──* Document
Student 1──* Payment
Student 1──* Notification
Student 1──* SupportQuery
Student 1──* AIDocument
Student 1──* AIConversation

University 1──* Course
University 1──* CommissionRate

Application *──1 University
Application *──1 Course
Application 1──1 WorkflowInstance
Application *──1 Admin (assignedAdmin)
Application *──* Document (via ApplicationDocument)
Application *──* Payment

WorkflowInstance 1──* WorkflowTask
WorkflowTask *──1 Admin (assignedAdmin)

Document *──1 Admin (reviewedBy)

Commission *──1 University
Commission *──1 Application

Notification *──1 User (recipient)
Notification *──1 User (sender)

SupportQuery 1──* QueryReply

Admin 1──1 AdminPermission
Admin 1──* AdminRequest (subject)
Admin 1──* AdminRequest (reviewer)
```

## 6.3 REQUIRED TABLES SUMMARY (37 tables)

| Category | Tables |
|----------|--------|
| **User & Auth** | `users`, `students`, `admins`, `student_profiles` |
| **Education** | `education_entries`, `test_scores` |
| **University** | `universities`, `courses` |
| **Application** | `applications`, `application_documents`, `workflow_instances`, `workflow_tasks` |
| **Document** | `documents` |
| **Payment** | `payments`, `commissions`, `commission_rates` |
| **Notification** | `notifications`, `notification_templates` |
| **Support** | `support_queries`, `query_replies`, `contact_leads`, `serbia_leads` |
| **Visa** | `visa_appointments`, `visa_trackers`, `visa_checklists` |
| **Admin** | `admin_permissions`, `admin_requests` |
| **Resource** | `resources` |
| **AI** | `ai_documents`, `ai_tokens`, `ai_conversations` |
| **Wishlist** | `favorite_courses` |
| **Audit/Log** | `activity_logs` (implied by history feature) |
| **Configuration** | `workflow_configs` (country-specific stage definitions) |

---

# 7. API REQUIREMENTS

## 7.1 STUDENT PORTAL APIs

### Authentication
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/auth/login` | Email/password login |
| POST | `/api/v1/auth/signup` | Student registration |
| GET | `/api/v1/auth/google/url` | Get Google OAuth URL |
| POST | `/api/v1/auth/google/callback` | Handle Google OAuth callback |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| POST | `/api/v1/auth/logout` | Logout |
| POST | `/api/v1/auth/verify` | Verify email/user |
| POST | `/api/v1/auth/password/reset-request` | Request password reset |
| POST | `/api/v1/auth/password/reset` | Reset password with token |
| POST | `/api/v1/auth/password/change` | Change password (authenticated) |
| POST | `/api/v1/auth/password/set` | Set initial password |

### Profile
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/students/profile` | Get student profile |
| PUT | `/api/v1/students/profile` | Update student profile |
| GET | `/api/v1/students/profile/builder/config` | Get profile builder configuration |
| GET | `/api/v1/students/profile/progress` | Get profile completion percentage |
| POST | `/api/v1/students/profile/builder/validate` | Validate profile step |
| POST | `/api/v1/students/profile/builder/save` | Save profile data |
| POST | `/api/v1/students/profile/photo` | Upload profile photo |
| DELETE | `/api/v1/students/profile/photo` | Delete profile photo |

### Applications
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/applications` | Get student's applications |
| GET | `/api/v1/applications/:id` | Get application by ID |
| POST | `/api/v1/applications` | Create new application |
| PUT | `/api/v1/applications/:id` | Update application |
| POST | `/api/v1/applications/:id/submit` | Submit application |
| GET | `/api/v1/applications/:id/progress` | Get application workflow progress |

### Universities & Courses
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/universities` | List universities (with filters) |
| GET | `/api/v1/universities/:id` | Get university details |
| GET | `/api/v1/courses` | List courses (with filters) |
| GET | `/api/v1/courses/:id` | Get course details |
| GET | `/api/v1/courses/favorites` | Get favorite courses |
| POST | `/api/v1/courses/:id/favorite` | Add course to favorites |
| DELETE | `/api/v1/courses/:id/favorite` | Remove course from favorites |

### Documents
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/documents` | Get student's documents |
| POST | `/api/v1/documents/upload` | Upload document |
| DELETE | `/api/v1/documents/:id` | Delete document |
| GET | `/api/v1/documents/:id/download` | Download document |
| GET | `/api/v1/documents/:id/view` | View document URL |

### Payments
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/payments/create-order` | Create Razorpay order |
| POST | `/api/v1/payments/verify` | Verify Razorpay payment |
| GET | `/api/v1/payments/history` | Get payment history |
| GET | `/api/v1/payments/health` | Payment service health check |

### Visa
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/visa/checklist` | Get visa checklist by country |
| GET | `/api/v1/visa/tracker` | Get visa process tracker |
| PUT | `/api/v1/visa/tracker` | Update visa tracker |
| GET | `/api/v1/visa/appointments` | Get visa appointments |
| POST | `/api/v1/visa/appointments` | Create visa appointment |
| GET | `/api/v1/visa/meeting-url` | Get consultation meeting URL |

### Notifications
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/notifications` | Get user's notifications |
| GET | `/api/v1/notifications/unread-count` | Get unread notification count |
| PUT | `/api/v1/notifications/:id/read` | Mark notification as read |
| PUT | `/api/v1/notifications/read-all` | Mark all as read |

### AI Tools
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/ai/sop/generate` | Generate SOP (n8n webhook) |
| POST | `/api/v1/ai/lor/generate` | Generate LOR (n8n webhook) |
| POST | `/api/v1/ai/cover-letter/generate` | Generate Cover Letter (n8n webhook) |
| GET | `/api/v1/ai/tokens` | Get AI token balance |
| POST | `/api/v1/ai/tokens/purchase` | Purchase AI tokens |

### Serbia Interest
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/serbia/leads` | Submit Serbia study interest |

## 7.2 ADMIN PORTAL APIs

### Authentication
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/auth/admin/login` | Admin login |
| POST | `/api/v1/auth/admin/refresh` | Refresh admin token |
| POST | `/api/v1/auth/logout` | Logout |

### Dashboard & Tasks
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/admin/tasks` | Get all tasks (with filters) |
| GET | `/api/v1/admin/tasks/:id` | Get task details |
| POST | `/api/v1/admin/tasks/:id/claim` | Claim a task |
| POST | `/api/v1/admin/tasks/:id/complete` | Complete a task with data |
| GET | `/api/v1/admin/tasks/:id/requirements` | Get task requirements form |
| GET | `/api/v1/admin/workflow/:appId/progress` | Get workflow progress |
| GET | `/api/v1/admin/workflow/schema` | Get workflow schema by country |

### Applications
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/admin/applications` | Get all applications (paginated, filtered) |
| GET | `/api/v1/admin/applications/:id` | Get application details |
| PUT | `/api/v1/admin/applications/:id` | Update application |
| POST | `/api/v1/admin/applications/:id/flags` | Set application flags |

### Students
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/admin/students` | Get students list (paginated) |
| GET | `/api/v1/admin/students/:id` | Get student profile |
| POST | `/api/v1/admin/students` | Create new student |
| POST | `/api/v1/admin/students/cv-process` | Process student CV (AI) |

### Documents (Admin)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/admin/documents/pending` | Get pending documents |
| GET | `/api/v1/admin/documents/reviewed` | Get reviewed documents |
| GET | `/api/v1/admin/documents/student/:id` | Get student's documents |
| PUT | `/api/v1/admin/documents/:id/status` | Update document status (verify/reject) |
| POST | `/api/v1/admin/documents/upload` | Upload document for student |
| DELETE | `/api/v1/admin/documents/:id` | Delete document |
| GET | `/api/v1/admin/documents/:id/view-url` | Get document view URL |
| GET | `/api/v1/admin/documents/:id/download` | Download document |

### Payments (Admin)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/admin/payments` | Get assigned student payments |

### Visa (Admin)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/admin/visa/appointments` | Get all visa appointments |
| POST | `/api/v1/admin/visa/appointments` | Create visa appointment |
| PUT | `/api/v1/admin/visa/appointments/:id/status` | Update appointment status |
| GET | `/api/v1/admin/visa/student/:id` | Get student visa appointments |
| GET | `/api/v1/admin/visa/meeting-urls` | Get meeting URLs |
| POST | `/api/v1/admin/visa/meeting-urls` | Save meeting URL |

### Communications
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/admin/students/list` | Get students for targeting |
| POST | `/api/v1/admin/notifications/broadcast` | Broadcast notification |
| GET | `/api/v1/admin/notifications/sent` | Get sent notification history |

### Serbia Leads (Admin)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/admin/serbia-leads` | Get Serbia leads list |
| GET | `/api/v1/admin/serbia-leads/:id` | Get lead details |
| PUT | `/api/v1/admin/serbia-leads/:id/status` | Update lead status |

### Resources & AI
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/admin/resources` | Get resources list |
| POST | `/api/v1/admin/resources` | Create resource |
| PUT | `/api/v1/admin/resources/:id` | Update resource |
| DELETE | `/api/v1/admin/resources/:id` | Delete resource |
| POST | `/api/v1/admin/ai/sop/generate` | Generate SOP for student |
| POST | `/api/v1/admin/ai/lor/generate` | Generate LOR for student |
| POST | `/api/v1/admin/ai/cover-letter/generate` | Generate Cover Letter |

## 7.3 MASTER ADMIN PORTAL APIs

### Dashboard
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/superadmin/dashboard` | Get full dashboard data |
| GET | `/api/v1/superadmin/dashboard/users` | Get user analytics |
| GET | `/api/v1/superadmin/dashboard/applications` | Get application analytics |
| GET | `/api/v1/superadmin/dashboard/payments` | Get payment data |

### User Management
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/superadmin/users` | Get all users (paginated, filtered) |
| GET | `/api/v1/superadmin/users/:id` | Get user details |
| DELETE | `/api/v1/superadmin/users/:id` | Delete user |
| GET | `/api/v1/superadmin/users/:id/profile` | Get student profile |
| GET | `/api/v1/superadmin/users/:id/documents` | Get user's documents |

### University Management
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/superadmin/universities` | Get all universities (paginated) |
| POST | `/api/v1/superadmin/universities` | Create university |
| PUT | `/api/v1/superadmin/universities/:id` | Update university |
| DELETE | `/api/v1/superadmin/universities/:id` | Delete university |
| POST | `/api/v1/superadmin/universities/upload` | Bulk upload universities CSV |
| GET | `/api/v1/superadmin/courses` | Get all courses |
| POST | `/api/v1/superadmin/courses` | Create course |
| PUT | `/api/v1/superadmin/courses/:id` | Update course |
| DELETE | `/api/v1/superadmin/courses/:id` | Delete course |

### Application Oversight
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/superadmin/applications` | Get all applications (paginated) |
| GET | `/api/v1/superadmin/applications/analytics` | Get application analytics |
| GET | `/api/v1/superadmin/applications/:id` | Get application details |

### Commission Management
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/superadmin/commissions` | Get earned commissions |
| GET | `/api/v1/superadmin/commissions/stats` | Get commission statistics |
| GET | `/api/v1/superadmin/commissions/rates` | Get all university commission rates |
| PUT | `/api/v1/superadmin/commissions/rates/:universityId` | Set university commission rate |

### Payments (Master Admin)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/superadmin/payments` | Get all system payments (paginated) |

### Documents (Master Admin)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/superadmin/documents` | Get all documents |
| GET | `/api/v1/superadmin/documents/student/:id` | Get student's documents |

### Query Management
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/superadmin/queries` | Get all support queries |
| POST | `/api/v1/superadmin/queries/:id/reply` | Reply to query |
| PUT | `/api/v1/superadmin/queries/:id/close` | Close query |

### Admin Management
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/superadmin/admins` | Get all admins |
| GET | `/api/v1/superadmin/admins/filters` | Get admin filter options |
| GET | `/api/v1/superadmin/admins/:id` | Get admin details |
| GET | `/api/v1/superadmin/admins/:id/permissions` | Get admin permissions |
| PUT | `/api/v1/superadmin/admins/:id/permissions` | Update admin permissions |
| GET | `/api/v1/superadmin/admin-requests` | Get admin requests |
| PUT | `/api/v1/superadmin/admin-requests/:id` | Approve/reject admin request |

### Notification Management
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/superadmin/notifications/overview` | Get notification overview stats |
| GET | `/api/v1/superadmin/notifications/analytics` | Get notification analytics |
| GET | `/api/v1/superadmin/notifications/templates` | Get notification templates |
| POST | `/api/v1/superadmin/notifications/templates` | Create notification template |
| POST | `/api/v1/superadmin/notifications/broadcast` | Broadcast notification |
| GET | `/api/v1/superadmin/notifications/delivery-stats` | Get delivery statistics |

### Lead Management
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/superadmin/contacts` | Get contact form leads |

### Reports
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/superadmin/reports/users` | User analytics report |
| GET | `/api/v1/superadmin/reports/applications` | Application analytics report |
| GET | `/api/v1/superadmin/reports/payments` | Payment analytics report |
| GET | `/api/v1/superadmin/reports/export` | Export report as file |

---

# 8. LANDING PAGES & MARKETING

## 8.1 UNI360 LANDING PORTAL

### Purpose
Public-facing marketing website to attract prospective students, showcase study-abroad destinations (Germany, UK, Italy, Serbia), and convert visitors into leads/applications.

### Key Flows
1. **Visitor browses** → Views country sections, testimonials, FAQ
2. **Country selection modal** → Triggered on scroll to services section
3. **Consultation booking** → Calendly integration → Payment flow
4. **Auth popup** → Login/signup, then redirect to student portal
5. **University quiz** → Preference-based university matching
6. **Contact form** → Submits lead to master admin

### Conversion Points
- "Book a Call" CTA → Calendly → Payment
- Country selection → Relevant country section
- University quiz → Matched results → Auth → Application
- Contact form → Lead in Master Admin

## 8.2 CHANCENKARTE PORTAL

### Purpose
Specialized landing page for the German "Chancenkarte" (Opportunity Card) eligibility assessment.

### Key Flows
1. **Visitor arrives** → Views hero, advantages, about
2. **Eligibility checker** → 5-criteria quiz:
   - Age (18-35)
   - Qualifications (degree/vocational)
   - Work experience
   - Language skills (German/English)
   - Financial resources
3. **Score ≥ 4/5** → Eligible → CTA to apply via UNI360
4. **Score < 4/5** → Not eligible → Information on how to improve
5. **Uni360Popup** → Promotional overlay redirecting to main platform

---

# 9. CROSS-CUTTING CONCERNS

## 9.1 AUTHENTICATION FLOW

```
Student Portal: Email/Password or Google SSO → JWT tokens → Protected routes
Admin Portal: Admin-specific login → JWT tokens → Role-based access
Master Admin: Super admin credentials → JWT tokens → Full access
Landing Page: Optional auth popup → On success, redirects to student portal
```

## 9.2 PAYMENT INTEGRATION

- **Provider:** Razorpay (India-focused payment gateway)
- **Flow:** Frontend creates order → Opens Razorpay checkout → Backend verifies
- **Currencies:** INR (primary), EUR, GBP
- **Payment Purposes:** Application fees, consultancy fees, visa fees, AI tools, language courses

## 9.3 FILE HANDLING

- **Accepted Formats:** PDF, JPEG, PNG, DOC, DOCX
- **Max Size:** 10MB per file
- **Storage:** S3-compatible (document view URLs generated via backend)
- **Document Types:** Passport, transcripts, SOP, LOR, CV, certificates, photos

## 9.4 AI INTEGRATION

- **SOP/Letter Generation:** n8n webhooks connected to LLM APIs
- **Ask AI Chatbot:** Conversational Q&A for study abroad queries
- **CV Processing:** AI extracts student info from uploaded CVs (admin-side)

## 9.5 WORKFLOW ENGINE

- **Country-specific workflows** (Germany and UK have distinct stages)
- **Task-based:** Each workflow stage contains task types
- **Claim-based:** Admins claim tasks before working on them
- **Progress tracking:** Completion percentage, current stage, pending/complete tasks
- **Configurable:** Workflow schemas defined in frontend with `WORKFLOW_SCHEMAS`

---

# 10. DATA FLOW DIAGRAMS

## 10.1 APPLICATION CREATION FLOW

```
Student Portal                Backend API                    Database
     │                           │                             │
     ├─ Browse universities ────→ GET /api/v1/universities ──→ universities
     │                           │                             │
     ├─ Select course ──────────→ GET /api/v1/courses ───────→ courses
     │                           │                             │
     ├─ Click "Apply" ──────────→ POST /api/v1/applications ─→ applications (DRAFT)
     │                           │                             │
     ├─ Pay fee ────────────────→ POST /api/v1/payments/create-order
     │                           │                             │
     ├─ Razorpay checkout ──────→ (external)                   │
     │                           │                             │
     ├─ Verify payment ─────────→ POST /api/v1/payments/verify → payments
     │                           │                             │
     ├─ Submit application ─────→ POST /api/v1/applications/:id/submit
     │                           │                             ├→ applications (SUBMITTED)
     │                           │                             └→ workflow_instances (created)
     │                           │                             
     └─ Track progress ─────────→ GET /api/v1/applications/:id/progress
                                                             → workflow_tasks
```

## 10.2 DOCUMENT VERIFICATION FLOW

```
Student                      Frontend              Backend API               Admin
  │                            │                      │                        │
  ├─ Upload document ─────────→ POST /api/v1/documents/upload
  │                            │                      │
  │                            │                      ├─→ documents (PENDING)
  │                            │                      │
  │                            │                      │ ←──── Review documents ──┤
  │                            │                      │                        │
  │                            │                      ├─ Verify? ──────────────┤
  │                            │                      │  ├→ documents (VERIFIED)│
  │                            │                      │  └→ notifications (created)
  │                            │                      │                        │
  │                            │                      ├─ Reject? ──────────────┤
  │                            │                      │  ├→ documents (REJECTED)│
  │                            │                      │  └→ notifications (created)
  │                            │                      │                        │
  ├─ View status ─────────────→ GET /api/v1/documents ─→ documents
  │                            │                      │
  └─ Re-upload ───────────────→ POST /api/v1/documents/upload
                               │                      └─→ documents (PENDING)
```

## 10.3 ADMIN WORKFLOW FLOW

```
Admin Dashboard            Backend API                    Database
     │                        │                             │
     ├─ View tasks ──────────→ GET /api/v1/admin/tasks ────→ workflow_tasks
     │                        │                             │
     ├─ Claim task ──────────→ POST /api/v1/admin/tasks/:id/claim
     │                        │                             ├→ workflow_tasks (assigned)
     │                        │                             └→ activity_logs (created)
     │                        │
     ├─ View requirements ───→ GET /api/v1/admin/tasks/:id/requirements
     │                        │                             │
     ├─ Complete task ───────→ POST /api/v1/admin/tasks/:id/complete
     │                        │                             ├→ workflow_tasks (COMPLETED)
     │                        │                             ├→ workflow_instances (updated)
     │                        │                             ├→ notifications (created)
     │                        │                             └→ activity_logs (created)
     │                        │
     └─ View progress ───────→ GET /api/v1/admin/workflow/:id/progress
                                                          → workflow_instances
```

---

# 11. NOTABLE PATTERNS & OBSERVATIONS

1. **Mock Data Layer:** All services currently return mock data. The frontend code is written as if connected to a real backend, but `studentProfile.js`, `auth.js`, `task.js`, `applications.ts`, and `payment.js` all simulate API calls with delays and hardcoded responses.

2. **Country-Centric Architecture:** The entire platform is organized around target countries (Germany, UK, Italy, Serbia). Workflows, visa processes, university listings, and even UI toggles are country-specific.

3. **Workflow-Driven Processing:** Admin application processing uses a configurable workflow engine with country-specific stage definitions. The UK has 8 stages (including CAS Interview, Conditional/Unconditional Offer) while Germany has 6 stages (including APS Certificate, Block Account).

4. **Razorpay Dependency:** The payment system is tightly coupled to Razorpay. The `RazorpayButton` component dynamically loads the Razorpay SDK and creates orders via backend before opening the checkout.

5. **Dual Application Paths:** Students can apply both from the Student Portal (direct university/course selection) and from the Landing Portal (quiz-based matching → auth → application). Admin can also create applications on behalf of students.

6. **Notification-Centric UX:** The student portal auto-polls notifications every 30 seconds. The admin dashboard acts as a real-time task queue. The master admin has a dedicated notification management system with analytics.

7. **Profile Builder as Gate:** The profile builder is a multi-step wizard that gates application submission. Students cannot apply without completing their profile (profile completion percentage is checked before allowing applications).

8. **Three-Tier Admin Structure:** 
   - **Admin (Counselor):** Handles individual student applications, documents, appointments
   - **Master Admin (Super Admin):** Oversees entire platform, manages admins, configures universities/commissions, views analytics
   - No mid-tier "Manager" role exists between them
