const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todo.schema");

const Todo = new mongoose.model("Todo", todoSchema);

const todoRouter = express.Router();

todoRouter.get("/", async (req, res) => {
  try {
    const result = await Todo.find({ status: "active" }).select({
      _id: 0,
      date: 0,
    });
    //   .limit(1);
    console.log(result);
    res.send(result);
  } catch (err) {
    res.status(500).json({
      error: "server error",
    });
  }
});

todoRouter.get("/:id", async (req, res) => {
  try {
    const result = await Todo.find({ _id: req.params.id });
    console.log(result);
    res.send(result);
  } catch (err) {
    res.status(500).json({
      error: "server error",
    });
  }
});

todoRouter.post("/", (req, res) => {
  const result = new Todo(req.body);
  result.save((err) => {
    if (err) {
      res.status(500).json({
        error: "server failed",
      });
    } else {
      res.status(200).json({
        message: "successfully inserted",
      });
    }
  });
});

todoRouter.post("/all", async (req, res) => {
  try {
    const result = await Todo.insertMany(req.body);
    console.log(result);
    res.send(result);
  } catch (err) {
    res.status(500).json("server error");
  }
});

todoRouter.put("/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "inactive",
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    res.status(500).json({
      error: "server error",
    });
  }
});

todoRouter.delete("/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete({ _id: req.params.id });
    res.send(result);
  } catch (err) {
    res.status(500).json({
      error: "server error",
    });
  }
});

module.exports = todoRouter;
