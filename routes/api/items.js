const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @desc GET all items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// @route post api/items
// @desc create an Item
// @access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

// @route post api/items/:id
// @desc delete an Item
// @access Public
router.delete('/:id', (req, res) => {
    const itemId = req.params.id;
  
    // Find the item by ID and delete it
    Item.findByIdAndDelete(itemId)
      .then(deletedItem => {
        if (!deletedItem) {
          return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully' });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

module.exports = router;
