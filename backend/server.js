import express from 'express';
import cors from 'cors';

const app = express();
//const port = 3001;

// Allow requests from our frontend development server
app.use(cors({ origin: 'http://localhost:5173' }));

// In-memory "database"
const users = [
    { id: 1, firstName: 'Tanner', lastName: 'Linsley', age: 33, status: 'Active' },
    { id: 2, firstName: 'Kevin', lastName: 'Vattappilly', age: 28, status: 'Inactive' },
    { id: 3, firstName: 'John', lastName: 'Doe', age: 45, status: 'Active' },
    { id: 4, firstName: 'Jane', lastName: 'Smith', age: 30, status: 'Pending' },
];

// --- 1. SERVE STATIC SVELTE FILES ---
// Point Express to your Svelte build output directory.
// This is usually 'public', 'dist', or 'build'. Check your svelte/rollup/vite config.
const staticPath = path.join(__dirname, '..', 'dist');
app.use(express.static(staticPath));

// API endpoint to get users
app.get('/api/users', (req, res) => {
    res.json(users);
});

/* app.listen(port, () => {
    console.log(`✅ Backend server running at http://localhost:${port}`);
});
 */

// --- 3. ADD THE CATCH-ALL ROUTE ---
// This route must come *after* all your API routes.
// It serves your Svelte app's index.html for any request that doesn't match an API route.
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html?didntcatch=themall'));
});

export default app;