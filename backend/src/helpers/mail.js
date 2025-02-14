const nodemailer = require("nodemailer");
const logger = require("../controllers/loggerController");
const { smtpEmail, smtpPass } = require("../../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: smtpEmail,
    pass: smtpPass,
  },
});

const sendEmail = async (userEmail, userName) => {
  try {
    const mailOption = {
      from: smtpEmail, // sender address
      to: userEmail, // list of receivers
      subject: "Application Approved", // Subject line
      text: `Dear ${userName},\n\nYour application has been approved.\n\nBest regards. click this link  http://jobsvisa24.netlify.app and check status`, // html body
    };
    const info = await transporter.sendMail(mailOption);
    logger.log("info", "message sent: %s", info.response);
  } catch (error) {
    logger.log("error", "Error occurred with sending email: ", error);
    throw error;
  }
};

module.exports = sendEmail;
