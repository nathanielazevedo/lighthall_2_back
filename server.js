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

app.get("/tasks", async (req, res) => {
  try {
    const { data, error } = await supabase.from("tasks").select();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = req.body;
    const { data, error } = await supabase.from("tasks").insert([task]);
    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const { user, session, error } = await supabase
      .from("users")
      .insert([req.body]);
    console.log(error);
    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);
    if (data[0].password == password) {
      res.status(200).send("Success");
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
