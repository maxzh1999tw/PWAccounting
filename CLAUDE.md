# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server on port 5173 with host 0.0.0.0
- `npm run build` - Build for production (runs vue-tsc typecheck + vite build)
- `npm run preview` - Preview production build on port 5050
- `npm run typecheck` - Run TypeScript type checking with vue-tsc
- `npm run lint` - Run ESLint with auto-fix for Vue/JS/TS files

## Architecture Overview

### Technology Stack
- **Frontend Framework**: Vue 3 with TypeScript
- **UI Framework**: Vuetify 3 
- **Build Tool**: Vite
- **Database**: IndexedDB (using idb library for client-side storage)
- **State Management**: Pinia
- **Internationalization**: Vue i18n

### Key Architectural Patterns

#### Domain-Driven Design Structure
- **Domain Layer**: `src/models/domain/accounting/` contains core business entities
  - `Record` class with RecordTypeEnum (支出/Income/Transfer)
  - `Account` and `RecordCategory` entities
  - Repository interfaces for data access abstraction

#### Repository Pattern
- **Domain Repositories**: Abstract interfaces in `src/models/domain/accounting/`
- **IDB Implementations**: Concrete implementations in `src/models/idbs/repositories/`
- **Database Context**: `src/models/idbs/dbContext.ts` manages IndexedDB connection and versioning

#### Component Architecture
- **Layout System**: Full layout with customizable sidebar, header, and theme system
- **Shared Components**: Reusable UI components in `src/components/shared/`
- **Feature Components**: Domain-specific components organized by feature (record, account, recordCategory)

### Data Flow
1. **Client-Side Database**: All data stored locally in IndexedDB (`PWAccountingV1`)
2. **Repository Pattern**: Domain repositories abstract data access from business logic
3. **Component Communication**: Uses Pinia stores and Vue event bus (`eventBus.js`)

### Project Structure Notes
- **Dependency Injection**: `src/models/injection.ts` handles service registration
- **Helpers**: Utility functions in `src/helpers/` for amount, array, and date operations
- **Theming**: Dark/Light theme support with Vuetify customization
- **Localization**: Multi-language support (en, zh, fr, ar) in `src/utils/locales/`

### Database Schema Management
- **Version Upgrades**: Database schema changes handled in `src/models/idbs/versionUpgraders/`
- **Current Version**: Database version 1 with upgrade path management

## Important Notes
- This is a personal accounting application with client-side data storage
- All financial data remains local to the user's browser via IndexedDB
- The application supports income/expense tracking and account transfers
- UI text includes both English and Chinese comments/labels