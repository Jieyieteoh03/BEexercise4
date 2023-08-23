const express = require("express");
const router = express.Router();

const Item = require("../models/item");

router.get("/", async (req, res) => {
  const { priority, purchased } = req.query;
  let filter = {};

  if (priority || purchased) {
    if (priority) {
      filter.priority = priority;
    }
    if (purchased) {
      filter.purchased = purchased;
    }
  }

  res.send(await Item.find(filter));
});

router.get("/:id", async (req, res) => {
  const data = await Item.findOne({ _id: req.params.id });
  res.send(data);
});

router.post("/", async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    priority: req.body.priority,
    purchased: req.body.purchased,
  });

  await newItem.save();
  res.send(newItem);
});

router.put("/:id", async (req, res) => {
  const item_id = req.params.id;
  const updatedItem = await Item.findByIdAndUpdate(item_id, req.body, {
    runValidator: true,
    new: true,
  });
  res.send(updatedItem);
});

router.put("/:id/purchased", async (req, res) => {
  const item_id = req.params.id;

  const updatedPurchased = await Item.findByIdAndUpdate(
    item_id,
    {
      purchased: true,
    },
    {
      new: true,
    }
  );
  res.send(updatedPurchased);
});

router.delete("/:id", async (req, res) => {
  const item_id = req.params.id;

  const deleteItem = await Item.findByIdAndDelete(item_id);
  res.send(deleteItem);
});

module.exports = router;
