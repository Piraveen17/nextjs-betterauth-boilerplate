import nodemailer from "nodemailer";

// Make sure these are set in .env.local
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // SMTP server host / NODEMAILER_HOST
  port: 465, // SMTP server port (465 for secure) / NODEMAILER_PORT
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

// Optional: verify transporter immediately
transporter.verify((error, success) => {
  if (error) {
    console.error("[Nodemailer Verify Error]:", error);
  } else {
    console.log("[Nodemailer]: SMTP Server ready to send emails");
  }
});

export default transporter;
