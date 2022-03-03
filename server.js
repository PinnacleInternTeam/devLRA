const express = require("express");
const connectDB = require("./config/db");
//const path = require('path');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/tenants", require("./routes/api/tenants"));

// Set static folder for client build Serve static assets in production
//app.use(express.static('client/build'));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

const PORT = process.env.PORT || 5433;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
