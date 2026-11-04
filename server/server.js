// Import the Express framework — lets us create a web server and define routes
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes')
const errorHandler = require('./middleware/errorMiddleware');

// Import CORS middleware — allows our frontend (running on a different port) to make requests to this server
const cors = require('cors');

// Load environment variables from a .env file (like PORT, database URLs, secrets) into process.env
require('dotenv').config();

// Create an instance of an Express application
const app = express();

// Enable CORS for all routes — without this, browsers block cross-origin requests from the React frontend
app.use(cors());

//connecting mongose
async function connectDB() {
  try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('hi hana it succesfully connect to MGatlas')
  }
  catch(error){
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure if connection fail
  }
}
  connectDB();



// Enable Express to automatically parse incoming JSON request bodies (req.body)
app.use(express.json());


// Send every request that starts with /api/auth to authRoutes.js
// (so '/register' becomes /api/auth/register and '/login' becomes /api/auth/login)
app.use('/api/auth', authRoutes);


// Send every request that starts with /api/note to noteRoutes.js
// ('/' becomes /api/notes and '/:id' becomes /api/note/:id)
app.use('/api/notes', noteRoutes);

app.use(errorHandler);



// Define a simple GET route at /api/health
// This is a "health check" endpoint — used to quickly verify the server is alive and responding
app.get('/api/health', (req, res) => {
  // Send back a JSON response confirming the server is running
  res.json({ status: 'ok', message: 'QuickNotes server is running' });
});

// Set the port the server will listen on:
// use the PORT from environment variables if it exists, otherwise default to 5001
const PORT = process.env.PORT || 5001;

// Start the server and listen for incoming requests on the chosen port
// The callback runs once the server successfully starts, logging a confirmation message
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));