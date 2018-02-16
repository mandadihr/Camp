var mongoose = require("mongoose");
// defining schema: plan for what Go_camp looks like
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
// campgorundSchema is taken and compiled into a model which returns an object that has a bunch of methods and adds in methods for CRUD operations
module.exports = mongoose.model("Campground", campgroundSchema);