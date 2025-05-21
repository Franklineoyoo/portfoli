let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nava");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = (sec.offsetTop = 150);
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document.querySelector("header nav a [href*=" + id + "]");
      });
    }
  });
};

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress");
  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const circularProgresses = document.querySelectorAll(".circular-progress");

  circularProgresses.forEach((progress) => {
    const percent = parseInt(progress.getAttribute("data-percent"));
    const circle = progress.querySelector(".outer");
    const numerator = progress.querySelector(".numerator");

    // Set the conic gradient based on percentage
    circle.style.background = `conic-gradient(##a8cd89 0%, #8f94fb ${percent}%, #e0e0e0 ${percent}%, #e0e0e0 100%)`;

    // Animate the percentage counter
    let currentPercent = 0;
    const interval = setInterval(() => {
      if (currentPercent >= percent) {
        clearInterval(interval);
      } else {
        currentPercent++;
        numerator.textContent = currentPercent + "%";
      }
    }, 20);

    // Start rotation animation when element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            circle.style.animationPlayState = "running";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(progress);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer for project cards
  const projectCards = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Initial styles for animation
  projectCards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";
    card.style.transition = `opacity 0.5s ease ${
      index * 0.1
    }s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Preload images for better performance
  const images = document.querySelectorAll(".project-image img");
  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", function () {
        this.classList.add("loaded");
      });
    }
  });
});

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "portfolio_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Route to handle contact form submissions
app.post("/contact", (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Name, email, and message are required" });
  }

  const sql =
    "INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, email, phone, subject, message], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "Message sent successfully" });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
