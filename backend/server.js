import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import moviesRoutes from "./routes/movies.js";
import tvRoutes from "./routes/tv.js";
import searchRoutes from "./routes/search.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/movies", moviesRoutes);
app.use("/api/tv", tvRoutes);
app.use("/api/search", searchRoutes);

// Root
app.get("/", (req, res) => {
  res.json({ message: "KinoPro backend is running..." });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
