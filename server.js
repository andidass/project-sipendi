const express = require('express');
const connectDB = require('./config/db');

const app = express();

// mengkoneksikan database
// connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// define router
app.use('/api/users', require('./Routes/api/users'));
app.use('/api/auth', require('./Routes/api/auth'));
app.use('/api/profile', require('./Routes/api/profiles'));
app.use('/api/post', require('./Routes/api/post'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running di port ${PORT}`));
