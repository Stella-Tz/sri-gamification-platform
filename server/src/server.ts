import "dotenv/config";
import "./types.js";

import path from "node:path";

import express from "express";
import cors from "cors";
import session from "express-session";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import caseStudyRoutes from "./routes/caseStudyRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

const PORT = Number(process.env.PORT) || 5000;
const isProduction = process.env.NODE_ENV === "production";

const CLIENT_URL =
  process.env.CLIENT_URL ??
  "http://localhost:5173";

if (!isProduction) {
  app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true,
    }),
  );
}

app.use(express.json());

if (isProduction) {
  app.set("trust proxy", 1);
}

const sessionSecret = process.env.SESSION_SECRET;

if (isProduction && !sessionSecret) {
  throw new Error("SESSION_SECRET is required in production");
}

app.use(
  session({
    secret: sessionSecret ?? "dev_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
    },
  }),
);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

app.use(
  "/api/auth",
  authRoutes,
);

app.use(
  "/api/course",
  courseRoutes,
);

app.use(
  "/api/case-study",
  caseStudyRoutes,
);

app.use(
  "/api/dashboard",
  dashboardRoutes,
);

if (isProduction) {
  const clientDistPath =
    path.resolve(
      process.cwd(),
      "../client/dist",
    );

  app.use(
    express.static(clientDistPath),
  );

  app.use(
    (req, res, next) => {
      if (
        req.method !== "GET" ||
        req.path.startsWith("/api")
      ) {
        next();
        return;
      }

      res.sendFile(
        path.join(
          clientDistPath,
          "index.html",
        ),
      );
    },
  );
}

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on port ${PORT}`,
    );
  },
);