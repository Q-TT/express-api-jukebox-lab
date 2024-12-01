// controllers/pets.js
const Jukebox = require('../models/jukebox.js');
const express = require('express');
const router = express.Router();

// Write your routes/controller functions here
//! CREATE - POST - /jukebox
router.post('/', async (req, res) => {
  try {
    const createdJukebox = await Jukebox.create(req.body);
    res.status(201).json(createdJukebox)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
  });


//! READ - GET - /jukebox
router.get('/', async (req, res) => {
  try {
    const foundJukebox = await Jukebox.find();
    res.status(201).json(foundJukebox)

  } catch (error) {
    res.status(500).json({error:error.message})
  }
 
});


//! READ - GET - /jukebox/:jukeboxId
router.get('/:jukeboxId', async (req, res) => {
  try {
    const foundJukebox = await Jukebox.findById(req.params.jukeboxId)
    if(!foundJukebox) {
      res.status(404);
      throw new Error("Id is not found!")
    }
    res.status(200).json(foundJukebox)
  } catch(error) {
    if (res.statusCode === 404) {
      res.json({error:error.message})
    } else {
      res.status(500).json({error:error.message})
    }
  }
});


//! UPDATE - PUT - /jukebox/:jukeboxId
router.put("/:jukeboxId", async(req, res) => {
  try {
    const updatedJukebox = await Jukebox.findByIdAndUpdate(req.params.jukeboxId, req.body, {new:true,});
    if(!updatedJukebox) {
      res.status(404);
      throw new Error("Id is not found!")
    }
    res.status(200).json(updatedJukebox)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
 })


//! DELETE - DELETE - /jukebox/:jukeboxId
router.delete("/:jukeboxId", async(req, res) => {
  try {
    const deletedJukebox = await Jukebox.findByIdAndDelete(req.params.jukeboxId);
    if(!deletedJukebox) {
      res.status(404);
      throw new Error('Pet not found.');
  }
  res.status(200).json(deletedJukebox);
  } catch(error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
})

// Export the router at the bottom of the file
module.exports = router;