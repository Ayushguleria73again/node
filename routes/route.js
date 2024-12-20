const express = require("express")
const route = express.Router();
const model = require("../schema/model")

  route.get("/", async (req, res) => {
    try {
      const data = await model.find({});
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({message:"An error occurred while fetching data."});
    }
  });
  route.delete("/:id", async (req,res)=>{
    const { id } = req.params;
    try {
      const data = await model.findByIdAndDelete({_id:id})
      res.status(200).json({message:"user deleted",data:data})
    } catch (error) {
      console.log(err);
      res.status(404).json({message:"user not found"})
      
    }
  })
  route.get("/about", (req, res) => {
    res.send("About Us");
  });
  route.get("/hello", (req, res) => {
    res.send("About Us");
  });
  route.get("/blog", (req, res) => {
    res.send("Blog Home");
  });
  
  route.get("*", (req, res) => {
    res.status(404).send("Page not found");
  });
module.exports = route