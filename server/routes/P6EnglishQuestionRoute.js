import express from "express";
const router = express.Router();

// Question Model
import questionSchema from '../models/P6EnglishQuestion.js';

// Read Questions
router.route('/').get((req, res, next) => {
  questionSchema.find().exec()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      return next(error);
    });
});

export default router;


// import express from "express";
// const router = express.Router();

// // Question Model
// import questionSchema from '../models/P6EnglishQuestion.js';

// // Read Questions

// const query = questionSchema.find();

// router.route('/').get((req, res) => {
//   query.exec((error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.json(data);
//     }
//   })
// })

// export default router;

// router.route('/').get((req, res) => {
//   questionSchema.find((error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })