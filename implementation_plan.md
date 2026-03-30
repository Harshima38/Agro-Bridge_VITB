# Agro-Bridge VITB Implementation Plan

This document outlines the architecture and execution plan for building **Agro-Bridge VITB**, a full-stack P2P farm-to-campus marketplace connecting VIT Bhopal students with local Sehore district farmers.

## Proposed Changes

We will build this application as a modern, progressive web app (PWA) with a React+TypeScript frontend and a Supabase backend for rapid, scalable deployment on Vercel.

### 1. Project Initialization & Architecture
- Initialize a Vite + React + TypeScript project with Tailwind CSS and Framer Motion.
- Set up the specific color palette requested (Forest Green #2D6A4F, Warm Wheat #D4A373, Terracotta #E76F51, Cream #FEFAE0).
- Integrate **Supabase** via `@supabase/supabase-js` for PostgreSQL database management and Authentication.

### 2. Database Schema (Supabase PostgreSQL)
We will create SQL scripts to initialize the required tables exactly as specified:
- `users`: Core identity tracking role type.
- `student_profiles`: Extends users for VIT Bhopal registration details.
- `farmer_profiles`: Extends users linking UPI IDs and Village info (e.g., Kothri Village).
- `listings`: The Virtual Warehouse.
- `price_history`: Tracking metrics for the ML model.
- `orders`: Includes the unique cryptographic tokens and pickup slot info.
- `ratings`: Mutual trust scoring.

### 3. Frontend Pages & Components
We will build the mobile-first React UI covering all roles:
#### Landing Page (`/`)
- Hero section emphasizing "Farm-Fresh to Your Hostel" and the zero-middleman strategy.
- "Farmer's Story" spotlight and Environmental Impact stats.
#### Student Experience (`/student/dashboard`)
- View listings with freshness indicators and a price prediction chart using Recharts.
- Generate orders leading to the unique UPI deep-link payment page ensuring direct transfers.
#### Farmer Experience (`/farmer/dashboard`)
- High-contrast, Hindi-first minimum 18px font interface.
- Voice-to-Listing Module: Integrate Web Speech API (`hi-IN`) to convert speech ("50 kilo amrood, 40 rupaye kilo") into formatted listing data.
#### Admin/Impact Dashboard
- Public (`/impact`) and restricted (`/admin`) views showing Sehore Mandi price comparisons, food miles saved, and order metrics.

### 4. Specialized Modules
#### Unique Token System
- Implement `token-generator.ts` using crypto (SHA-256) to create verifiable, deterministic order tokens with human-readable 8-char short codes and QR code generation.
#### ML Price Prediction
- We can implement the regression model either as a standalone Python script (`price_prediction_model.py`) that could run on a backend service (like Railway), OR we can compile equivalent logic in the browser context if you prefer an entirely serverless frontend-only approach.

## Open Questions

- **Workspace Location**: Should I overwrite our previous 'RuralAssist' prototype in `e:\new app`, or create a new directory for `Agro-Bridge VITB`?
- **Backend Setup**: Do you have a Supabase project created? I can write the SQL initialization scripts for you to run in your Supabase SQL Editor, and provide the client code to interact with it.
- **ML Module Hosting**: For the Python price prediction model, would you like me to just provide the `.py` file, or should I implement an equivalent algorithm in JavaScript/TypeScript so it can run entirely inside the Vercel app without needing a separate Python backend?

## Verification Plan
1. Ensure the UI layout matches the color palette and mobile-first principles.
2. Formally simulate the Voice-to-Listing interaction.
3. Verify the token generation algorithms generate valid hashes and 8-char codes.
4. Verify Supabase queries successfully tie Student and Farmer workflows together.
