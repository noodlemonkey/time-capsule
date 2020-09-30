const db = require('./dbConnect.js');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'njkousholt@gmail.com',
    pass: '',
  },
});

const messageController = {};

messageController.storeMessage = (req, res, next) => {
  const { hours, minutes, seconds } = req.body.buriedTime;
  const values = [req.body.message, req.body.address];
  db.query(
    `INSERT INTO messages(messagetxt, email, send_on) 
    VALUES ($1, $2, NOW() + interval '${hours} hour ${minutes} minute ${seconds} second');`,
    values,
    (err, result) => {
      if (err) return next(err);
      //   console.log(result.rows);

      return next();
    }
  );
};

messageController.sendMessage = async (req, res, next) => {
  const values = [];
  await db.query(
    'SELECT id, messagetxt, email FROM messages WHERE send_on < NOW()',
    (err, result) => {
      if (err) return next(err);
      if (result.rows.length === 0) return next();
      values[0] = result.rows[0].id;
      const message = result.rows[0].messagetxt;
      const address = result.rows[0].email;
      res.locals.message = message;

      const mailOptions = {
        from: 'njkousholt@gmail.com',
        to: address,
        subject: 'Your Time Capsule Has Been Released',
        text: message,
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log('error in sendMail', error);
        }
      });
    }
  );

  await db.query('DELETE FROM messages WHERE id=$1', values, (err, result) =>
    next()
  );
};

// .then((result) => {
//   if (result.rows.length === 0) return next();
//   values[0] = result.rows[0].id;
//   res.locals.message = result.rows[0].messagetxt;
// })
// .then((result) => {
//   if (values.length === 0) return next();
//   console.log('result in dot then', values);
//   db.query('DELETE FROM messages WHERE id=$1', values, (err, info) => {
//     if (err) console.log('error in delete', err);
//   });
//   next();
// })
// .catch((err) => {
//   console.log('catch error');
//   return next(err);
// });

module.exports = messageController;
