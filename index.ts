import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.listen(port, () => {
  console.log(`Started Backend on port ${port}`);
})