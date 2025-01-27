const router = require("express").Router();
const Celebrity=require("../models/Celebrity.model")

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new");
  });

module.exports = router;

//all celebrities

router.get("/", async (req,res,next)=>{
    try {
        const allCelebrities= await Celebrity.find();
        res.render("celebrities/celebrities", { allCelebrities })
    } catch (error) {
        next(error)
    }
})

//new celebrity

router.get("/create", (req,res,next)=>{
    try {

      res.render("celebrities/new-celebrity")  

    } catch (error) {

        next(error)
    }
})

router.post("/create", async (req,res,next)=>{
    try {
        
    const {name, occupation, catchPhrase}=req.body;
    await Celebrity.create({
        name,
        occupation,
        catchPhrase
    });
    res.redirect("/celebrities")

    } catch (error) {
        
        res.redirect("/new-celebrity");
        next(error)

    }
})