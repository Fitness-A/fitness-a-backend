const nodeMail = require("nodemailer");
const router = require("express").Router();
const Promise = require("bluebird");
const path = require("path");
const EmailTemplate = require("email-templates").EmailTemplate;

var transporter;

function loadTemplate(templateName, contexts) {
  console.log(path.join(__dirname, templateName));
  let template = new EmailTemplate(path.join(__dirname, templateName));
  return Promise.all(
    contexts.map((context) => {
      return new Promise((resolve, reject) => {
        template.render(context, (err, result) => {
          if (err) reject(err);
          else
            resolve({
              email: result,
              context,
            });
        });
      });
    })
  );
}

async function mainMail(name, email, subject, message) {
  transporter = await nodeMail.createTransport({
    service: "gmail",
    auth: {
      user: "yashmarakna007@gmail.com",
      pass: "uxfojfcogtbmtjip",
    },
  });
  const mailOption = {
    from: "yashmarakna007@gmail.com",
    to: email,
    subject: subject,
    html: `You got a message from 
    Email : ${email}
    Name: ${name}
    Message: ${message}`,
  };
  try {
    let user = [
      {
        name: name,
        email: email,
      },
    ];
    await loadTemplate("../template", user)
      .then((results) => {
        return Promise.all(
          results.map((result) => {
            transporter.sendMail({
              ...mailOption,
              from: "Fitness-A :)",
              subject: result.email.subject,
              html: result.email.html,
              text: result.email.text,
            });
          })
        );
      })
      .then(() => {
        console.log("Message Sent Successfully! from mail server");
      });
    return Promise.resolve("Message Sent Successfully!");
  } catch (error) {
    return Promise.reject(error);
  }
}

router.post("/", async (req, res, next) => {
  const { userName, userEmail, subject, message } = req.body;
  try {
    await mainMail(userName, userEmail, subject, message).then((result) => {
      res.send("Message Successfully Sent!");
    });
  } catch (error) {
    console.log("error", error);
    res.send("Message Could not be Sent");
  }
});

module.exports = router;
