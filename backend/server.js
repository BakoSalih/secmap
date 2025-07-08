import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

// Allow requests from our frontend development server
app.use(cors({ origin: 'http://localhost:5173' }));

// In-memory "database"
const users = [
    { id: 1, firstName: 'Tanner', lastName: 'Linsley', age: 33, status: 'Active' },
    { id: 2, firstName: 'Kevin', lastName: 'Vattappilly', age: 28, status: 'Inactive' },
    { id: 3, firstName: 'John', lastName: 'Doe', age: 45, status: 'Active' },
    { id: 4, firstName: 'Jane', lastName: 'Smith', age: 30, status: 'Pending' },
];

// API endpoint to get users
app.get('/api/users', (req, res) => {
    res.json(users);
});

app.listen(port, () => {
    console.log(`✅ Backend server running at http://localhost:${port}`);
});

