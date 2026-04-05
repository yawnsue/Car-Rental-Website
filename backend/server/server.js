require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🔥 IMPORTANT: disable buffering
mongoose.set('bufferCommands', false);

async function startServer() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/turo_rental_db');

        console.log('MongoDB connected successfully');

        app.use('/api/users', require('./routes/userRoutes'));
        app.use('/api/vehicles', require('./routes/vehicleRoutes'));
        app.use('/api/bookings', require('./routes/bookingRoutes'));
        app.use('/api/features', require('./routes/featuresRoutes'));
        app.use('/api/reviews', require('./routes/reviewRoutes'));

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

startServer();