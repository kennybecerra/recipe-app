# 🍳 Recipe Discovery App

A modern, responsive React application for discovering and managing recipes with an intuitive user interface and powerful search capabilities.

[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Redux](https://img.shields.io/badge/Redux-5.0.0-764ABC?style=flat-square&logo=redux)](https://redux.js.org/)

![Website Screenshot](https://github.com/kennybecerra/recipe-app/blob/master/src/assets/images/RecipeApp.png "Recipe App")

## 🔗 Links

- **Live Demo**: [Recipe App](https://kennybecerra.github.io/recipe-app/)
- **API Documentation**: [Tasty API](https://rapidapi.com/apidojo/api/tasty)
- **Repository**: [GitHub](https://github.com/kennybecerra/recipe-app)

## ✨ Features

- **🔍 Recipe Search**: Search through thousands of recipes using the Tasty API
- **📱 Responsive Design**: Mobile-first design that works seamlessly across all devices
- **🛒 Shopping List**: Add recipe ingredients to a persistent shopping list
- **❤️ Favorites**: Save your favorite recipes for quick access
- **🧾 Ingredient Management**: Adjust serving sizes and quantities dynamically
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🔒 Secure**: Environment-based API key management

## 🚀 Tech Stack

### Frontend Framework

- **React 18.2.0** - Modern React with hooks and concurrent features
- **TypeScript 5.x** - Type-safe development with full IDE support
- **Redux 5.0.0** - Predictable state management with Redux Toolkit patterns

### Build Tools & Development

- **Vite 7.x** - Next-generation frontend tooling for fast builds
- **SASS/SCSS** - Advanced CSS preprocessing with modern syntax
- **CSS Modules** - Scoped styling for component isolation

### State Management & APIs

- **Redux Hooks** - Modern Redux integration with `useSelector` and `useDispatch`
- **Tasty RapidAPI** - Comprehensive recipe database integration
- **Environment Variables** - Secure API key management

### Code Quality & Type Safety

- **ESLint** - Code linting and style enforcement
- **TypeScript Interfaces** - Comprehensive type definitions for all data structures
- **Modern ES6+ Syntax** - Latest JavaScript features and best practices

## 📁 Project Structure

```
src/
├── api/                    # API integration layer
│   └── recipe.ts          # Tasty API client with TypeScript
├── components/            # Reusable React components
│   ├── Body/             # Main content area
│   ├── Search/           # Search functionality
│   ├── Layout/           # App layout components
│   └── UI/               # Reusable UI components
├── store/                # Redux state management
│   ├── actions/          # Action creators and async thunks
│   └── reducers/         # Redux reducers with TypeScript
├── sass/                 # Global SASS variables and mixins
├── assets/               # Static assets (images, icons)
└── types/                # TypeScript type definitions
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production with optimizations
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🔧 Recent Updates & Modernization

This project has been comprehensively modernized with the following improvements:

### Build System Migration

- ✅ Migrated from Create React App to **Vite** for faster builds
- ✅ Updated to **React 18** with modern APIs
- ✅ Full **TypeScript** conversion for type safety
- ✅ Modern **SASS** syntax with `@use`/`@forward`

### State Management Modernization

- ✅ Converted from class components to **functional components**
- ✅ Replaced Redux `connect` HOC with modern **Redux hooks**
- ✅ Added comprehensive **TypeScript interfaces**
- ✅ Implemented proper state typing with `RootState` and `AppDispatch`

### Security & Best Practices

- ✅ Environment variable configuration for API keys
- ✅ Proper error handling and validation
- ✅ Modern ES6+ syntax throughout
- ✅ Component-level TypeScript interfaces

---

Built with ❤️ using React, TypeScript, and Vite
