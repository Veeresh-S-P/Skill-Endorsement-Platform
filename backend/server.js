const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); 

const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');

dotenv.config();
connectDB(); 
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);

const PORT = process.env.PORT || 6009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


