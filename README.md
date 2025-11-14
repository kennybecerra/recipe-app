# 🍳 Recipe Discovery App

A modern, responsive React application for discovering and managing recipes with an intuitive user interface, powerful search capabilities, and a beautiful mobile-first design.

[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.x-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.x-0170FE?style=flat-square&logo=ant-design)](https://ant.design/)

![Recipe App Demo](https://github.com/kennybecerra/recipe-app/blob/master/src/assets/images/RecipeApp.gif "Recipe App Demo")

## 🔗 Links

- **Live Demo**: [Recipe App](https://kennybecerra.github.io/recipe-app/)
- **API Documentation**: [Tasty API](https://rapidapi.com/apidojo/api/tasty)
- **Repository**: [GitHub](https://github.com/kennybecerra/recipe-app)

## ✨ Features

### Core Functionality

- **🏠 Landing Page**: Beautiful hero section with feature highlights and call-to-action
- **🔍 Advanced Search**: Search through thousands of recipes with real-time results
- **❤️ Favorites System**: Save and manage your favorite recipes with local storage persistence
- **� Recipe Details**: Full recipe views with ingredients, instructions, nutrition info, and cooking times
- **🏷️ Category Browsing**: Explore recipes by cuisine, dietary preferences, meal type, cooking method, and more
- **📱 Mobile-First Design**: Fully responsive layout that works beautifully on all devices
- **🎨 Modern UI**: Clean, gradient-based design with smooth animations and transitions

### User Experience

- **⚡ Skeleton Loaders**: Smooth loading states for better perceived performance
- **🎯 Route-Based Navigation**: Clean URLs with React Router for easy sharing
- **💾 Local Storage**: Persistent favorites and shopping lists across sessions
- **📊 Recipe Cards**: Visual recipe cards with ratings, calories, and quick favorite toggle
- **🔄 Dynamic Servings**: Adjust ingredient quantities based on serving size
- **🌙 Collapsible Sidebar**: Space-efficient navigation with responsive behavior
- **🎭 Empty States**: Helpful messaging with emoji when no content is available

### Performance & Accessibility

- **⚡ Recipe Caching**: Client-side caching for faster subsequent loads
- **🎨 CSS Modules**: Scoped styling for optimal performance
- **♿ ARIA Labels**: Proper accessibility attributes throughout
- **📱 Touch-Friendly**: Optimized for mobile interactions

## 🚀 Tech Stack

### Frontend Framework

- **React 18.2.0** - Modern React with hooks and concurrent features
- **TypeScript 5.x** - Type-safe development with full IDE support
- **React Router v6** - Declarative routing with nested routes and dynamic parameters

### UI & Styling

- **Ant Design 5.x** - Enterprise-class UI components
  - Layout (Sider, Header, Content)
  - Menu, Badge, Tooltip, Card, Skeleton
  - Input, Button, and form components
- **SASS/SCSS** - Advanced CSS preprocessing with modern syntax
- **CSS Modules** - Scoped styling for component isolation
- **Mobile-First Mixins** - Responsive breakpoints (mobile: 480px, tablet: 768px, desktop: 1200px)

### State Management

- **Redux Toolkit 2.x** - Modern Redux with simplified patterns
  - `createSlice` for reducer logic
  - `createAsyncThunk` for API calls
  - Type-safe hooks (`useSelector`, `useDispatch`)
- **Redux Slices**:
  - `recipesSlice` - Recipe search and browsing
  - `currentRecipeSlice` - Individual recipe details
  - `favoritesSlice` - Favorite recipes management
  - `shoppingListSlice` - Shopping list items

### Build Tools & Development

- **Vite 7.x** - Next-generation frontend tooling with HMR
- **ESLint** - Code linting and style enforcement
- **TypeScript Compiler** - Full type checking and validation

### APIs & Data Management

- **Tasty RapidAPI** - Comprehensive recipe database
- **LocalStorage API** - Client-side data persistence
- **Recipe Caching** - Custom caching layer for performance
- **Day.js** - Lightweight date formatting

### Code Quality & Type Safety

- **TypeScript Interfaces** - Comprehensive type definitions
- **Discriminated Unions** - Type-safe tag system (302+ tag types)
- **Record Mappings** - Efficient ID-based data structures
- **Type Guards** - Runtime type checking utilities

## 📁 Project Structure

```
src/
├── api/                      # API integration layer
│   ├── recipe.ts            # Tasty API client with TypeScript
│   └── types.ts             # API response type definitions
├── assets/                  # Static assets
│   └── images/              # App images and icons
├── cache/                   # Client-side caching
│   └── recipeCache.ts       # Recipe caching system
├── components/
│   ├── pages/               # Route-based page components
│   │   ├── home/            # Landing page with hero section
│   │   ├── search/          # Recipe search page
│   │   ├── favorites/       # Favorites collection page
│   │   ├── recipe_detail/   # Individual recipe view
│   │   └── recipe_tag/      # Category browsing page
│   ├── recipe_card/         # Recipe card with skeleton loader
│   ├── UI/                  # Reusable UI components
│   │   ├── Container/       # Main app container
│   │   ├── Modal/           # Modal dialogs
│   │   ├── Spinner/         # Loading spinner
│   │   └── Message/         # Message component
│   └── Body/                # Legacy components (being phased out)
├── store/                   # Redux state management
│   ├── slices/              # Redux Toolkit slices
│   │   ├── recipesSlice.ts         # Recipe search state
│   │   ├── currentRecipeSlice.ts   # Current recipe state
│   │   ├── favoritesSlice.ts       # Favorites management
│   │   └── shoppingListSlice.ts    # Shopping list state
│   ├── actions/             # Action creators and types
│   └── reducers/            # Root reducer configuration
├── sass/                    # Global styles
│   ├── main.scss            # Main stylesheet
│   ├── mixins.scss          # SCSS mixins (responsive, etc.)
│   └── variables.scss       # SCSS variables (colors, sizes)
├── utils/                   # Utility functions
│   └── menuTags.ts          # Tag definitions and utilities
├── App.tsx                  # Main app component with routing
└── store.ts                 # Redux store configuration
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production with optimizations
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks
- `npm run deploy` - Build and deploy to GitHub Pages

## 🔧 Recent Updates & Modernization

This project has undergone a comprehensive redesign and modernization:

### Major Architecture Overhaul (2025)

#### State Management Modernization

- ✅ Migrated to **Redux Toolkit** with `createSlice` and `createAsyncThunk`
- ✅ Implemented 4 dedicated slices for clean state separation
- ✅ Added **localStorage persistence** for favorites and shopping lists
- ✅ Built custom **recipe caching system** for improved performance
- ✅ Full TypeScript integration with typed hooks and actions

#### UI/UX Complete Redesign

- ✅ Added **landing page** with hero section and feature highlights
- ✅ Created dedicated pages for all major features (Search, Favorites, Recipe Details)
- ✅ Implemented **Ant Design** component library for professional UI
- ✅ Built **collapsible sidebar navigation** with responsive behavior
- ✅ Added **route-based navigation** with React Router v6
- ✅ Designed gradient-based theme with consistent color palette

#### Mobile-First Responsive Design

- ✅ Refactored all styles to **mobile-first approach**
- ✅ Created responsive SCSS mixins for consistent breakpoints
- ✅ Implemented **adaptive sidebar** (60px collapsed on desktop, 0px on mobile)
- ✅ Added mobile menu button and backdrop overlay
- ✅ Optimized typography and spacing for all screen sizes
- ✅ Touch-friendly UI elements and interactions

#### Component Architecture

- ✅ Built **RecipeCard component** with skeleton loaders
- ✅ Added **favorites toggle** directly on recipe cards
- ✅ Created **empty states** with helpful messaging
- ✅ Implemented **loading states** for better UX
- ✅ Added **badge and tooltip** for favorites counter
- ✅ Built reusable UI components with CSS Modules

#### Developer Experience

- ✅ Converted to **functional components** with React hooks
- ✅ Full **TypeScript** conversion with strict typing
- ✅ Organized code with **feature-based folder structure**
- ✅ Added comprehensive **type definitions** and interfaces
- ✅ Implemented **tag system** with 302+ categorized tags
- ✅ Created utility functions for common operations

### Previous Modernization (2024)

#### Build System Migration

- ✅ Migrated from Create React App to **Vite** for faster builds
- ✅ Updated to **React 18** with modern APIs
- ✅ Modern **SASS** syntax with `@use`/`@forward`

#### Code Quality Improvements

- ✅ Replaced Redux `connect` HOC with modern **Redux hooks**
- ✅ Environment variable configuration for API keys
- ✅ Proper error handling and validation
- ✅ Modern ES6+ syntax throughout
- ✅ Component-level TypeScript interfaces

## 🎨 Design Features

- **Gradient Theme**: Consistent red-orange gradient (#de5542 → #f93117)
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Responsive Typography**: Scales from mobile (20px) to desktop (56px) for headers
- **Card-Based Layout**: Modern card designs with shadows and hover effects
- **Icon Integration**: Ant Design icons throughout the interface
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your Tasty API key
4. Start development server: `npm run dev`
5. Build for production: `npm run build`

---

Built with ❤️ using React, TypeScript, and Vite
