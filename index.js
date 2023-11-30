const express = require("express");
const app = express();

const roles = require("./routes/role");

const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/", roles);

app.listen(port, () => {
  console.log(`Listen sever at http://localhost:${port}`);
});
