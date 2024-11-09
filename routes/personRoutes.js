const express = require("express");
const router = express.Router();
const Person = require("../models/person");

// POST route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data
    // Creating a new Person document using the Mongoose Model
    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET person data
router.get("/", async (req, res) => {
  try {
    const personData = await Person.find();
    console.log("Person Data Fatched");
    res.status(200).json(personData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Parametrised API calls
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Target Data are fatched");
      res.status(500).json(response);
    } else {
      console.log("Internal Server Error");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Data 
router.put('/:id',async(req, res)=>{
  try{
    const personId = req.params.id;
    const updateInfo = req.body;
    const response = await Person.findByIdAndUpdate(personId, updateInfo,{
      new:true,
      runValidators: true
    })

    if(!response){
      res.status(404).json({error:'Person info Not Found'})
    }
    console.log('Data Updated')
    res.status(200).json(response)
  }catch(err){
    console.log(err)
    res.status(500).json({error:'Internal Server Error'})
  }
})

// Person Information Delete operation
router.delete('/:id',async(req,res)=>{
  try{
    const personId = req.params.id
    const response = await Person.findByIdAndDelete(personId)

    if(!response){
      res.status(404).json({error:'Person not found'})
    }
    console.log('Person Delete Successfully')
    res.status(200).json('Person Deleted successfully')
  }catch(err){
    console.log(err)
    res.status(500).json({error: 'Internal Server Error'})
  }
})

module.exports = router