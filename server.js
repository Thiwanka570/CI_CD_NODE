const express = require('express');
const app = express();
const port = 3001;

// Sample data (you can replace this with actual database data)
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane2@example.com' },
    { id: 3, name: 'Jane Doe', email: 'jane3@example.com' }
];

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Simple API!');
});

// GET request to fetch all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET request to fetch a specific user by ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
