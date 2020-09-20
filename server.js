require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening to port ${port}`));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));
app.use(express.static(path.join(__dirname, "client/build")));
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/users", require("./routes/user"));
app.use("/auth/login/", require("./routes/login"));
app.use("/posts", require("./routes/posts"));
app.use("/category", require("./routes/category"));
app.use("/reset", require("./routes/auth"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const msg = {
  to: "fs992161@gmail.com",
  from: "tadesina26@gmail.com",
  subject: "Sending first email",
  text: "This is a good one believe me",
  html: "",
};

// sendMessage = async () => {
//   try {
//     await gridMsg.send(msg);
//   } catch (e) {
//     console.log(e.response.body);
//   }
// };

// sendMessage();
