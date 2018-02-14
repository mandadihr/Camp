var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");
var Comment = require("../models/comment");
//INDEX ROUTE- SHOW ALL CAMPGROUNDS
router.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });    
            
    }); 
    
    //CREATE ROUTE - ADD NEW CAMPGROUND TO DB
    //adding post route if anyone needs to add new campground
    router.post("/campgrounds", isLoggedIn, function(req, res){
        
        // getting data from form and add it to campground array
        var name = req.body.name;
        var price = req.body.price;
        var image = req.body.image;
        var desc = req.body.description;
        var newCampground = {name: name, price: price, image: image, description: desc};
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            }
            else{
                // redirect back to campgrounds page
                res.redirect("/campgrounds");
            }
        });
        // our array nolonger exists campgrounds.push(newCampground);    
    });
    
    // NEW ROUTE - SHOW FORM TO CREATE CAMPGROUND
    router.get("/campgrounds/new", isLoggedIn, function(req, res){
        res.render("campgrounds/new");
    });
    
    
    
    //SHOW - shows more info about one campground
    router.get("/campgrounds/:id", function(req, res){
        //find the campground with provided id 
        Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
            if(err){
                console.log(err);
            }
            else{
                console.log(foundCampground);
                    //render show template with that campground
                res.render("campgrounds/show", {campground: foundCampground});
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
    