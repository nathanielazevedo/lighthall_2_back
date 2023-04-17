import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
