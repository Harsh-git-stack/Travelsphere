const nodemailer = require("nodemailer");

const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP is not configured");
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

const sendResetOtpEmail = async ({ to, name, otp }) => {
  const transporter = createTransporter();
  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from: fromEmail,
    to,
    subject: "TravelSphere password reset OTP",
    text: `Hello ${name}, your TravelSphere OTP is ${otp}. It will expire in 10 minutes.`,
  });
};

module.exports = { sendResetOtpEmail };