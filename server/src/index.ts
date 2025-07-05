import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import { authRoutes } from "./routes/auth";
import { nutritionRoutes } from "./routes/nutrition";
import { userRoutes } from "./routes/user";
import { calendarRoutes } from "./routes/calendar";
import { deviceRoutes } from "./routes/devices";
import { mealPlanRoutes } from "./routes/mealPlans";
import statisticsRoutes from "./routes/statistics";

// Load environment variables first
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

console.log("🚀 Starting Nutrition Tracker Server...");
console.log("📊 Environment:", process.env.NODE_ENV || "development");
console.log("🔌 Port:", PORT);

// Check for required environment variables
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is required");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is required");
  process.exit(1);
}

// Check for OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  console.log("⚠️  WARNING: No OpenAI API key found. AI features will use mock data.");
  console.log("💡 To enable AI features, set OPENAI_API_KEY in your .env file");
} else {
  console.log("✅ OpenAI API key found - AI features enabled");
}

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:8081",
      "http://localhost:19006", 
      "http://localhost:19000",
      "http://192.168.1.70:8081",
      "http://192.168.1.70:19006",
      "http://192.168.1.70:19000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

// Body parsing middleware
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    database: "postgresql",
    environment: process.env.NODE_ENV || "development",
    openai_enabled: !!process.env.OPENAI_API_KEY,
  });
});

// Test endpoint for connectivity
app.get("/test", (req, res) => {
  console.log("🧪 Test endpoint hit from:", req.ip);
  res.json({
    message: "Nutrition Tracker Server is running!",
    timestamp: new Date().toISOString(),
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    origin: req.headers.origin,
    openai_enabled: !!process.env.OPENAI_API_KEY,
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/meal-plans", mealPlanRoutes);
app.use("/api", statisticsRoutes);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Database: PostgreSQL`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📱 Access from phone: http://192.168.1.70:${PORT}`);
  console.log(`🍪 Cookie-based authentication enabled`);
  console.log(`🧪 Test endpoint: http://192.168.1.70:${PORT}/test`);
  console.log(`💚 Health check: http://192.168.1.70:${PORT}/health`);

  if (!process.env.OPENAI_API_KEY) {
    console.log("⚠️  Note: AI features are using mock data. Add OPENAI_API_KEY to enable real AI analysis.");
  }
});

export default app;