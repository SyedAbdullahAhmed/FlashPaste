// models/TextDocument.js
import mongoose from 'mongoose';

const TextDocumentSchema = new mongoose.Schema({
    path: {
        type: String,
        required: false,
    },
    text: {
        type: String,
        required: false,
        validate: {
            validator: function (value: string) {
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount <= 5000;
            },
            message: 'Text must not exceed 5000 words.',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.TextDocument || mongoose.model('TextDocument', TextDocumentSchema);
