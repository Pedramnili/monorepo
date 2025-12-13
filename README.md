# 🧱 Monorepo Project

Modern monorepo setup using **Turborepo** with a React frontend and multiple backend servers.

---

## 📦 What's Inside?

This monorepo contains multiple applications managed under a single repository using **pnpm workspaces** and **Turborepo**.

### 📱 Apps

- **`apps/web`**  
  React frontend built with **Vite + TypeScript**

- **`apps/api-express`**  
  Backend REST API using **Express.js + TypeScript**

- **`apps/api-fastify`**  
  High‑performance backend API using **Fastify + TypeScript**

---

## 🛠 Tech Stack

### 🎨 Frontend (`apps/web`)
- ⚛️ React 19
- ⚡ Vite
- 📘 TypeScript
- 🎨 CSS Modules
- 🔄 REST API communication

---

### 🚀 Backend — Express (`apps/api-express`)
- 🧩 Express.js
- 📘 TypeScript
- 🔄 CORS enabled
- 🔥 Hot reload with `tsx`
- 🧪 Simple & familiar REST APIs

---

### ⚡ Backend — Fastify (`apps/api-fastify`)
- 🚀 Fastify
- 📘 TypeScript
- ✅ Schema-based validation
- ⚡ Better performance than Express
- 🔥 Hot reload with `tsx`
- 🧪 Suitable for scalable APIs

---

## 🧩 Monorepo & Tooling

- 📦 **pnpm workspaces**
- ⚙️ **Turborepo**
- 🔧 Shared configs (TypeScript, linting, build)
- 🚀 Parallel development & builds
- 💾 Incremental caching

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Node.js** ≥ 18
- **pnpm** ≥ 10
- **npm** ≥ 10 

---

### 📥 Install Dependencies
```bash
pnpm install
