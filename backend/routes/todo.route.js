const express = require("express");
const Todo = require("../model/todo.model");
const router = express.Router();

// 📌 Get All Todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos); // return only array
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error });
  }
});

// 📌 Get Single Todo
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todo", error });
  }
});

// 📌 Create Todo
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo", error });
  }
});

// 📌 Update Todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return updated result
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo", error });
  }
});

// 📌 Delete Todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error });
  }
});

module.exports = router;
