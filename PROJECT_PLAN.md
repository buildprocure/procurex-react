# Procurex React Project Plan

## 1. Project Overview

This project is a new React frontend for BuildProcure, built as an independent application that will host new modules gradually while the legacy PHP application remains the source of truth for existing business logic.

The initial focus is on:
- Supplier onboarding
- Role-based landing/dashboard experience
- Shared global navigation shell
- Authentication integration with SSO and backend-based login

## 2. Core Product Principles

- Build modules as vertical slices.
- Keep shared shell and design patterns reusable across modules.
- Avoid making the app overly generic too early.
- Use the legacy PHP app as the business logic reference until migration is complete.
- Keep the first implementation focused on supplier onboarding and a scalable foundation.

## 3. Recommended Folder Structure

```text
src/
  app/
    router/
      routes/
      guards/
    layouts/
      MainLayout/
      ModuleLayout/
    providers/
      AuthProvider/
      RoleProvider/
    constants/
      roles/
      routes/
      permissions/

  modules/
    dashboard/
      pages/
      components/
      hooks/
      services/
      utils/
      constants/
    supplier-onboarding/
      pages/
      components/
      hooks/
      services/
      utils/
      types/
    customer-config/
      pages/
      components/
      hooks/
      services/
      utils/
      types/

  shared/
    components/
      buttons/
      cards/
      tables/
      forms/
      pagination/
    layouts/
      TopNav/
      LeftNav/
      RightUserPanel/
    hooks/
    services/
      api/
      auth/
    utils/
    styles/
    types/

  assets/
  styles/
  main.jsx
  App.jsx
```

## 4. Page and Feature Structure

### 4.1 Global Application Shell
The application should have a consistent shell across modules:
- Top horizontal navigation
- Left-side module menu
- Right-side user/account panel
- Shared header/footer behavior where applicable

### 4.2 Landing / Dashboard Page
This page will act as the entry point for users.

Responsibilities:
- Show module cards based on role and permissions
- Show different cards for admin, supplier, buyer, and subscription-based access
- Allow navigation to the chosen module

### 4.3 Supplier Onboarding Module
This is the first module to build.

Responsibilities:
- Provide onboarding UI flow
- Collect and validate supplier information
- Submit data to the backend service
- Display status and progress

### 4.4 Customer Config Module
Planned as a future module.

Responsibilities:
- Follow the same structure as supplier onboarding once started
- Reuse shared components and layout shell

## 5. Execution Plan

### Phase 1 — Foundation
Goal: Create the base app structure and shell.

Tasks:
1. Replace the starter Vite screen in App.jsx.
2. Set up React Router.
3. Create the main app layout.
4. Create the shared navigation components.
5. Add a simple route structure for home, dashboard, and module placeholder pages.

Expected outcome:
- A working basic shell with navigation and route switching.

### Phase 2 — Shared UI System
Goal: Build reusable UI building blocks.

Tasks:
1. Create shared button styles and button components.
2. Create card components for module tiles.
3. Create layout helpers for forms, tables, and pagination.
4. Establish a consistent design pattern for components.

Expected outcome:
- A reusable UI system that can be used across modules.

### Phase 3 — Authentication and Role Handling
Goal: Prepare the app for user access control.

Tasks:
1. Create an auth context/provider.
2. Define role constants and permissions.
3. Create protected routes.
4. Prepare support for SSO and login from the users table via backend.

Expected outcome:
- The app can distinguish user roles and restrict access properly.

### Phase 4 — Dashboard / Landing Experience
Goal: Build the user landing experience.

Tasks:
1. Create the dashboard page.
2. Show cards based on role and permissions.
3. Add navigation links to modules.
4. Add empty or placeholder states for future modules.

Expected outcome:
- Users see a role-based module landing page.

### Phase 5 — Supplier Onboarding Module
Goal: Implement the first module as a working vertical slice.

Tasks:
1. Create module routes and page structure.
2. Build onboarding form components.
3. Connect the form to a service layer.
4. Add validation and basic error handling.
5. Display success and failure states.

Expected outcome:
- A basic supplier onboarding workflow is available.

### Phase 6 — Backend Integration
Goal: Connect the frontend to the backend.

Tasks:
1. Create a shared API service layer.
2. Define request/response utilities.
3. Connect supplier onboarding to PHP backend endpoints.
4. Prepare the app for future Java backend migration.

Expected outcome:
- The frontend can communicate with the existing backend architecture.

### Phase 7 — Expansion and Hardening
Goal: Improve maintainability and prepare for future modules.

Tasks:
1. Refactor shared logic into reusable modules.
2. Add loading states and error handling.
3. Improve accessibility and responsiveness.
4. Add documentation for module conventions.
5. Prepare for customer config and future modules.

Expected outcome:
- The app is structured for incremental growth.

## 6. Daily Execution Plan

### Day 1 — Setup and app foundation
- Install and verify dependencies.
- Review the current starter app structure.
- Replace the starter screen with a basic app shell.
- Add a basic route structure.

### Day 2 — Global layout
- Build top navigation.
- Build left navigation panel.
- Build right-side user/account area.
- Make the layout reusable and consistent.

### Day 3 — Shared components
- Create reusable buttons, cards, and form wrappers.
- Set up a consistent visual style for the app shell.
- Prepare common UI patterns for future modules.

### Day 4 — Authentication context
- Set up auth provider.
- Define roles and permissions.
- Add simple protected routes.

### Day 5 — Dashboard and module cards
- Create the landing/dashboard page.
- Show cards based on role.
- Add basic navigation to mock module pages.

### Day 6 — Supplier onboarding structure
- Create the module folder structure.
- Create the onboarding page and initial form layout.
- Add placeholder steps and components.

### Day 7 — Supplier onboarding form logic
- Add form state, validation, and submission flow.
- Connect to a mock service or placeholder API service.
- Display success/failure feedback.

### Day 8 — Backend integration prep
- Create API service abstractions.
- Connect to PHP backend endpoints.
- Handle request errors cleanly.

### Day 9 — Testing and refinement
- Check navigation, layout, and role access flows.
- Fix UI issues and improve component structure.
- Improve loading and error states.

### Day 10 — Future module preparation
- Document patterns and conventions.
- Prepare the architecture for customer config.
- Plan the next module implementation sprint.

## 7. Suggested Implementation Priority

1. Shared layout
2. Routing
3. Authentication and roles
4. Dashboard
5. Supplier onboarding
6. Backend connection
7. More modules

## 8. Notes for the Team

- Keep the implementation simple at first.
- Do not overbuild the design system too early.
- Focus on a working shell and one module first.
- Reuse patterns instead of creating one-off solutions.
- Keep the legacy PHP app and the React app aligned in terms of module behavior.
