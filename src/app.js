import express from "express";
import resourcesRouter from "./routes/resources.routes.js";
import reservationsRouter from "./routes/reservations.routes.js";
import authRoutes from "./routes/auth.routes.js";
import projectInquiriesRouter from "./routes/projectInquiries.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { requireAuth } from "../middleware/auth.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cookieParser());

// Serve everything in ./public as static assets
const publicDir = path.join(__dirname, "..", "public");
app.use(express.static(publicDir));

const frontendDistDir = path.join(__dirname, "..", "frontend", "dist");
app.use("/frontend", express.static(frontendDistDir));

// --- Views (HTML pages) ---
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/resources", (req, res) => {
  res.sendFile(path.join(__dirname, "views/resources.html"));
});

app.get("/reservations", requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "views/reservations.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(publicDir, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(publicDir, "register.html"));
});

app.get(/^\/frontend(?:\/.*)?$/, (req, res, next) => {
  res.sendFile(path.join(frontendDistDir, "index.html"), (error) => {
    if (error) {
      next();
    }
  });
});

// ----------------------------
// API routes
// ----------------------------
app.use("/api/resources", resourcesRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/auth", authRoutes);
app.use("/api/project-inquiries", projectInquiriesRouter);

// ----------------------------
// API 404 (unknown API routes)
// ----------------------------
app.use("/api", (req, res) => {
  return res.status(404).json({
    ok: false,
    error: "Not found",
    path: req.originalUrl,
  });
});

// ----------------------------
// Frontend 404 (unknown pages)
// ----------------------------
app.use((req, res) => {
  return res.status(404).send("404 - Page not found");
});

// ----------------------------
// Central error handler
// ----------------------------
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  if (res.headersSent) return next(err);

  return res.status(500).json({
    ok: false,
    error: "Internal server error",
  });
});

export default app;
