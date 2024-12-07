const mongoose = require('mongoose');

// Book Schema
const bookSchema = new mongoose.Schema({
    // bookId: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,
    //     default: function () {
    //         // unique bookId using timestamp and random characters
    //         return `BOOK-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    //     },
    //     index: true // index for faster queries
    // },
    
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [255, 'Title cannot exceed 255 characters']
    },
    author: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        // Ensures price is stored with 2 decimal places
        get: v => v / 100,
        set: v => Math.round(v * 100)
    },
    yearPublished: {
        type: Number,
        required: true,
        min: 1000,
        max: new Date().getFullYear()
    },
    createdAt: {
        type: Date,
        default: Date.now, 
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
        // Enable virtuals to be included when converting to JSON
        toJSON: { 
            virtuals: true,
            getters: true // Ensures price getter is applied when converting to JSON
        },
        toObject: { 
            virtuals: true,
            getters: true // Ensures price getter is applied when converting to object
        }
});

// Optional: Add a virtual for formatted price
bookSchema.virtual('formattedPrice').get(function () {
    return `$${this.price.toFixed(2)}`;
});

// Optional: Validation hook to update updatedAt
bookSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create and export the Book model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;