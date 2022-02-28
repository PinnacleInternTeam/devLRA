const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// const app = express();
// mongoose.connect("mongodb://localhost:27017/trail").then(() => {
//   console.log("MongoDB Connected...");
// });

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
