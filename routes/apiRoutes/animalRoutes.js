const router = require("express").Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require("../../lib/animals");
const { animals } = require("../../data/animals");

router.get("/animals", (req,res) => {
    let results = animals;
    if(req.query){
        //if there are queries to be filtered, then change the value of 
        //results to an array separated by the query params.
        results = filterByQuery(req.query, results);
    }
    res.json(results);
})

router.get("/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post("/animals", (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
  
    // if any data in req.body is incorrect, send 400 error back
    if(!validateAnimal(req.body)){
      res.status(400).send("The animal is not properly formatted.");
    } 
    else{
      const animal = createNewAnimal(req.body, animals);
      //the const animal will receive the return in the correct way to be
      //parsed as a json and responded to the server
      res.json(animal);
    }
});

module.exports = router;