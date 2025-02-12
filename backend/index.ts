// import express, { Express, Request, Response } from "express";
// import dotenv from "dotenv";

// import main from "./main";

// dotenv.config();

// const app: Express = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req: Request, res: Response) => {
//   res.send("Welcome to the alloan.ai");
// });

// app.use("/api", main);


// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });


import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
// import cors from "cors"; // Import CORS
var cors = require('cors')

import main from "./main";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins (for development)
app.use(cors());

// OR configure specific CORS options
const corsOptions = {
  origin: "http://localhost:3001/", // Change this to your frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the alloan.ai");
});

app.use("/api", main);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
