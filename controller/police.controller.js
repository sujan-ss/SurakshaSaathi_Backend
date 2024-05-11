const policeModel = require("../model/police.model");
const jwtController = require("./jwt.controller");

const getPolice = async (req, res) => {
  jwtController.verifyToken(req, res, async (decoded) => {
    try {
      const police = await policeModel.find();
      res.status(200).json({
        police,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  });
};

const addPolice = async (req, res) => {
  jwtController.verifyAdmin(req, res, async (decoded) => {
    try {
      const police = new policeModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
      });

      await police.save();
      res.status(201).json({
        message: "Police added successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  });
};
