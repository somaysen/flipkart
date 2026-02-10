import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.NODEMAIL_USER,
        pass:process.env.NODEMAIL_PASS,
    },
});

const sendMail = async (to, subject, html) => {
  let newMail = {
    from: process.env.NODEMAIL_USER,
    to,
    subject,
    html,
  };

  return await transporter.sendMail(newMail);
};

export default sendMail;
