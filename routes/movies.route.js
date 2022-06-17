const router = require("express").Router();
const Movie=require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model");


router.get("/", async (req, res, next) => {
  try {
  const allMovies=await Movie.find();
  res.render("movies/movies",{ allMovies })
} catch (error) {
  next(error)
}

});

router.get("/new-movie", async (req, res, next)=>{
  try {
    const allCelebrities=await Celebrity.find();
    res.render("movies/new-movie",{ allCelebrities })
  } catch (error) {
    
  }
})

router.post("/new-movie", async (req, res, next)=>{
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create ({
      title, genre, plot, cast })
    res.redirect("/movies");
  }catch(error){
    res.redirect("movies/new-movie")
    next(error);  
  }
  });


router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const moviesCast = await Movie.findById(id);
    const allCelebrities = await Celebrity.find();
    res.render("movies/edit-movie", { moviesCast, allCelebrities });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/edit", async (req, res, next)=>{
  try {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndUpdate(id,{title, genre, plot, cast},{new: true});
    res.redirect(`/movies/${id}`);

  }  catch (error) {
    next(error);
    res.render('movies/movie-details');
  }
})


router.post("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
    res.redirect("/movies/:id/delete");
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieDetails = await Movie.findById(id).populate('cast');
    console.log(movieDetails)
    res.render("movies/movie-details", {movieDetails });
  } catch (error) {
    next(error);
  }
});
  

module.exports = router;
