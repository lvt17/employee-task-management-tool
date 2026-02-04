const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const allowList = [
  "http://localhost:5173/",
]

const corOptions = {
  origin: function(origin, callback) {
    if(!origin || allowOrigins.include(origin)) callback(null, true);
    else {
      console.log("Blocked by cors")
      callback(new Error('Not allow by cors'))
    }
  },
  cridentials: true,
  optionSuccessStatus: 200
}

dotenv.config()

const authRoute = require('./routes/authRoute');

//init
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors(corOptions));
app.use(express.json());

//use api auth
app.use('/api/auth', authRoute);

//check server live
app.get('/healthy', (req, res) => {
    res.status(200).json({ 
        message: 'server is running',
        timestamp: new Date()
    });
});

//run
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});