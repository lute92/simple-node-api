const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create ninja schema and model
const PersonSchema = new schema({
    name: {
        type: String,
        required: [true, "Name field is required"]

    },
    address: {
        type: String,
        required: [true, "Address field is required"]

    },
    age: {
        type: Number

    },
    isMarried: {
        type: Boolean,
        default: false
    }
});

const Person = mongoose.model("person", PersonSchema);

module.exports = Person;