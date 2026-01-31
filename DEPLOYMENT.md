# Vercel Deployment Guide for Monorepo

Since you have two separate apps (`Application` and `Landing-Page`) in one repository, you need to create **two separate projects** in Vercel.

## 1. Deploying the Landing Page
1. On Vercel Dashboard, click **Add New... > Project**.
2. Select your repository `Vitals.exe...`.
3. **Configure Project**:
   - **Project Name**: `vitals-landing` (or similar).
   - **Framework Preset**: Vite.
   - **Root Directory**: Click `Edit` and select `Landing-Page`.
4. Click **Deploy**.

## 2. Deploying the Application (Doctor/Patient Portal)
1. Go back to Vercel Dashboard and click **Add New... > Project** *again*.
2. Select the **same repository**.
3. **Configure Project**:
   - **Project Name**: `vitals-app` (or similar).
   - **Framework Preset**: Vite.
   - **Root Directory**: Click `Edit` and select `Application`.
4. **Environment Variables**:
   - Expand "Environment Variables".
   - Add the following keys from your local `.env`:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy**.

## Troubleshooting
- **"vite: command not found"**: This means "Root Directory" was not set correctly.
- **Supabase Errors**: Ensure the Environment Variables are set in the Vercel project settings for the Application.
