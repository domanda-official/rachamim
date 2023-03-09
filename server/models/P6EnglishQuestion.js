import mongoose from 'mongoose';

const P6EnglishQuestionSchema = mongoose.Schema({
  questionText: {
    type: String
  },
  optionA: {
    type: String
  },
  optionB: {
    type: String
  },
  optionC: {
    type: String
  },
  optionD: {
    type: String
  },
  answer: {
    type: String
  }
}, {
    collection: 'p6english'
});

export default mongoose.model("P6EnglishQuestion", P6EnglishQuestionSchema);

