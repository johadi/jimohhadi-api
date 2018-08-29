import { Router } from 'express';
import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import { sendMail } from './helper';
import { Message, User } from './models';
import { authenticate } from './middlewares'

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json('Welcome to Jimoh Hadi API');
});

router.post('/message', (req, res) => {
  const validator = new Validator(req.body, {
    name: 'required',
    email: 'required|email',
    subject: 'required',
    message: 'required',
  });

  if (validator.fails()) {
    return res.status(400).json({ validationError: validator.errors.all() })
  }

  const { name, email, subject, message } = req.body;

  const emailFrom = 'no-reply <jimoh@google.com>';
  // groupMemberEmails is an array of emails
  const emailTo = 'jimoh.hadi@gmail.com';
  const emailSubject = 'Message from You Website';
  const emailTemplate = 'message';
  const emailContext = {
    name,
    email,
    subject,
    message
  };

  const newMessage = new Message(req.body);
  newMessage.save()
    .then((savedUser) => {
      sendMail(emailFrom, emailTo, emailSubject, emailTemplate, emailContext)
        .catch(error => console.log(error));

      return res.status(201).json(savedUser);
    })
    .catch(error => res.status(500).json(error));
});

router.get('/messages', authenticate, (req, res) => {
  Message.find({})
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(500).json(error));
});

router.post('/login', (req, res) => {
  const body = req.body;
  const validator = new Validator(body, {
    username: 'required',
    password: 'required',
  });
  if (validator.fails()) {
    return res.status(400).json({ validationError: validator.errors.all() })
  }
  User.findOne({ username: body.username.toLowerCase() })
    .then((user) => {
      if (!user) {
        return Promise.reject('User not found');
      }
      if (!user.comparePassword(body.password)) {
        return Promise.reject('Incorrect Password');
      }
      // Give the user a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json(token);
    })
    .catch(err => res.status(500).json(err));
});

// router.post('/register', (req, res) => {
//   const user = new User(req.body);
//   user.save()
//     .then(user => res.json(user))
//     .catch(err => res.status(500).json(err))
// });

export default router;
