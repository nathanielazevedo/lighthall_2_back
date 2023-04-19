import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const supabaseUrl = "https://elgioqjgqpyxbmqiujvk.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

////////////////////
// AUTHENTICATION
///////////////////

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { error } = await supabase.from("users").insert([req.body]);
    if (error) throw new Error(error);
    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);
    if (error) throw new Error(error);
    if (data[0].password == password) {
      res.status(200).send(data[0]);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

////////////////////
// CRUD for Tasks
///////////////////

// Get Tasks
app.get("/tasks", async (req, res) => {
  try {
    const { data, error } = await supabase.from("tasks").select();
    if (error) throw new Error(error);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Add Task
app.post("/tasks", async (req, res) => {
  try {
    const task = req.body;
    const { data, error } = await supabase
      .from("tasks")
      .insert([task])
      .select();
    if (error) throw new Error(error);
    res.status(200).send(data[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Delete Task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) throw new Error(error);
    res.status(200).send("Successly Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Edit Task
app.put("/tasks/:id", async (req, res) => {
  try {
    const dataR = req.body;
    const { id } = req.params;
    const { data, error } = await supabase
      .from("tasks")
      .update(dataR)
      .eq("id", id);
    if (error) throw new Error(error);
    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

////////////////////
// Start Server
///////////////////

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
