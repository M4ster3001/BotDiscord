import 'dotenv/config'
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import morgan from "morgan";

import "./bot";

const PORT = process.env.NODE_ENV == 'production' ? process.env.PORT : 3334;

const app = express();

app.use(morgan("tiny"));

app.use(express.json());

/** RULES OF OUR API */
app.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
      return res.status(200).json({});
  }
  
  next();
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
