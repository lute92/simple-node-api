const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create ninja schema and model
const NinjaSchema = new schema({
    name: {
        type: String,
        required: [true, "Name field is required"]

    },
    occupation: {
        type: String,
        required: [true, "Occupation field is required"]

    },
    available: {
        type: Boolean,
        default: false

    }
});

const Ninja = mongoose.model("ninja", NinjaSchema);

module.exports = Ninja;