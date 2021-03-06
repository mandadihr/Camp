var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");
var Comment = require("../models/comment");
//=========================================================================================================================
// COMMENTS ROUTES
//=========================================================================================================================
//comments new
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});
//comments create
router.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
    //lookup campground using id 
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else {
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                     //redirect  to campground show page 
                     res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    }); 
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
     res.redirect("/login");
}

module.exports = router;