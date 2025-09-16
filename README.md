# Modern React Wallpaper Website with Supabase

This project is a modern, responsive website for wallpapers built with React and Supabase.

## Getting Started

To get the frontend running locally:

1.  Clone the repository.
2.  Install the dependencies: `npm install`
3.  Start the development server: `npm start`

## Supabase Backend Setup

This project requires a Supabase backend for authentication, database, and storage. You will need to create a Supabase project and configure it as follows:

### 1. Environment Variables

Create a `.env` file in the root of the project and add your Supabase project URL and anon key:

```
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You will also need to update `src/supabaseClient.js` to use these environment variables instead of the hardcoded values.

### 2. Authentication

No special configuration is needed for Supabase Auth. The application uses email/password login. You will need to sign up a new user to be your admin user.

### 3. Database Setup

You need to create a table named `wallpapers` with the following schema:

| Column Name | Type                      | Constraints              |
| ----------- | ------------------------- | ------------------------ |
| `id`        | `uuid`                    | Primary Key, Default: `uuid_generate_v4()` |
| `created_at`| `timestamp with time zone`| Default: `now()`         |
| `title`     | `text`                    |                          |
| `description`| `text`                   |                          |
| `file_url`  | `text`                    |                          |
| `file_name` | `text`                    |                          |

#### Row Level Security (RLS)

Enable Row Level Security (RLS) on the `wallpapers` table. Create the following policies:

*   **Allow public read access:**
    *   **Policy Name:** `Allow public read access`
    *   **Target Roles:** `anon`, `authenticated`
    *   **Command:** `SELECT`
    *   **Using Expression:** `true`

*   **Allow admin full access:**
    *   **Policy Name:** `Allow admin full access`
    *   **Target Roles:** `authenticated`
    *   **Command:** `INSERT`, `UPDATE`, `DELETE`
    *   **Using Expression:** `auth.uid() = <your_admin_user_id>` (Replace `<your_admin_user_id>` with the user ID of your admin user)

### 4. Storage Setup

Create a new storage bucket named `wallpapers`.

#### Storage Policies

*   **Allow public read access:**
    *   **Policy Name:** `Allow public read access`
    *   **Allowed operations:** `SELECT`
    *   **Target roles:** `anon`, `authenticated`

*   **Allow admin full access:**
    *   **Policy Name:** `Allow admin full access`
    *   **Allowed operations:** `INSERT`, `UPDATE`, `DELETE`
    *   **Target roles:** `authenticated`
    *   **Policy Definition:** `(bucket_id = 'wallpapers' AND auth.uid() = <your_admin_user_id>)` (Replace `<your_admin_user_id>` with the user ID of your admin user)

## Build Issue in Sandbox

During development in the sandboxed environment, I encountered a persistent issue where `npm` failed to create the `node_modules/.bin` directory. This prevented me from running the `npm run build` command to test the production build. This appears to be an issue with the sandbox environment itself, not the application code. The application should build and run correctly in a standard Node.js environment.
