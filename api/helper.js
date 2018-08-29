import nodemailer from 'nodemailer';
import handlebars from 'nodemailer-express-handlebars';
import dotenv from 'dotenv';

dotenv.config();
// Sending Email
// Create handlebars options
const handlebarsOptions = {
  viewPath: 'api/emails',
  extName: '.hbs'
};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});
// Tells transport to use handlebars
transporter.use('compile', handlebars(handlebarsOptions));

/**
 * Helper function that handles send mail
 * @function sendMail
 * @param {string} from
 * @param {string|array} to
 * @param {string} subject
 * @param {string} template
 * @param {string} context
 * @return {*} any
 */
export const sendMail = (from, to, subject, template, context) => {
  const mailOptions = {
    from,
    to,
    subject,
    template,
    context
  };
  return transporter.sendMail(mailOptions);
};
