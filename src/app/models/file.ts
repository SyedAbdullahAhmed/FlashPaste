// models/TextDocument.js
import mongoose from 'mongoose';

const TextDocumentSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
    validate: {
      validator: function (value: string) {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount <= 500;
      },
      message: 'Text must not exceed 500 words.',
    },
  },
});

export default mongoose.models.TextDocument || mongoose.model('TextDocument', TextDocumentSchema);
