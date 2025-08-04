import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME, // your Gmail address
    pass: process.env.MAIL_PASSWORD, // your Gmail app password
  },
});

export const sendOTPEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `"FileFleet" <${process.env.MAIL_USERNAME}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Email failed to send to ${to}:`, error);
    throw new Error('Failed to send email');
  }
};
