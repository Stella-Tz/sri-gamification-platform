import { Router } from "express";
import bcrypt from "bcryptjs";

import prisma from "../prismaClient.js";

const router = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  language: true,
};

router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
    } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof firstName !== "string" ||
      typeof lastName !== "string"
    ) {
      return res.status(400).json({
        message: "Please fill in all fields.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const normalizedFirstName =
      firstName.trim();

    const normalizedLastName =
      lastName.trim();

    if (
      !normalizedEmail ||
      !password ||
      !normalizedFirstName ||
      !normalizedLastName
    ) {
      return res.status(400).json({
        message: "Please fill in all fields.",
      });
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res.status(400).json({
        message:
          "Please enter a valid email address.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters.",
      });
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (existingUser) {
      return res.status(409).json({
        message:
          "A user with this email already exists.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
      },
      select: userSelect,
    });

    return res.status(201).json({
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to register user.",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message:
          "Please enter your email and password.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        message:
          "Please enter your email and password.",
      });
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res.status(400).json({
        message:
          "Please enter a valid email address.",
      });
    }

    const userWithPassword =
      await prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (!userWithPassword) {
      return res.status(401).json({
        message:
          "Invalid email or password.",
      });
    }

    const isValidPassword =
      await bcrypt.compare(
        password,
        userWithPassword.password,
      );

    if (!isValidPassword) {
      return res.status(401).json({
        message:
          "Invalid email or password.",
      });
    }

    req.session.userId =
      userWithPassword.id;

    return res.json({
      user: {
        id: userWithPassword.id,
        email: userWithPassword.email,
        firstName:
          userWithPassword.firstName,
        lastName:
          userWithPassword.lastName,
        language:
          userWithPassword.language,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to login.",
    });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");

    return res.json({
      message: "Logged out",
    });
  });
});

router.get("/me", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        user: null,
      });
    }

    const user =
      await prisma.user.findUnique({
        where: {
          id: req.session.userId,
        },
        select: userSelect,
      });

    if (!user) {
      return res.status(401).json({
        user: null,
      });
    }

    return res.json({
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to load user.",
    });
  }
});

export default router;