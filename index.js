const express = require("express");
const mongoose = require("mongoose");
const todoRouter = require("./routes/todo.route");

const PORT = 3000;
const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log(err));

app.use("/todo", todoRouter);

function getHandleError(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    err: err,
  });
}

app.listen(PORT, () => {
  console.log(`server run at http://localhost:${PORT}`);
});
