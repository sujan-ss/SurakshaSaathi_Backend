const express = require("express");
const router = express.Router();
const app = express();
const { model } = require("mongoose");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: "dddg1h2hb",
  api_key: "742746665143924",
  api_secret: "z9aHjlMOa-D4T1YNTChaneNNUvk",
});

const storage = multer.diskStorage({
  destination: "./upload/freebeats",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.status(401).json({
      error: "token is not valid",
    });
  }
}

router.post("/uploadAudio", (req, res) => {
  upload.single("audio")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during file upload
      return res.status(400).json({ msg: "Error uploading file" });
    } else if (err) {
      // An unknown error occurred
      console.log(err);
      return res.status(500).json({ msg: "Internal Server Error" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const filePath = path.join("./upload/freebeats", req.file.filename);

    const cloudinaryResult = await cloudinary.uploader
      .upload(filePath, {
        resource_type: "raw",
        public_id: `AudioUploads/${req.file.filename}`,
      })
      .catch((error) => {
        console.log(error);
        console.error(error.message);
        return res
          .status(500)
          .json({ msg: "Internal Server Error", error: error.message });
      });

    res.status(200).json({
      msg: "Upload successfully",
      beatUrl: cloudinaryResult.secure_url,
    });
  });
});

router.post("/uploadImage", (req, res) => {
  upload.single("image")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during file upload
      return res.status(400).json({ msg: "Error uploading file" });
    } else if (err) {
      // An unknown error occurred
      console.log(err);
      return res.status(500).json({ msg: "Internal Server Error" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const filePath = path.join("./upload/freebeats", req.file.filename);

    const cloudinaryResult = await cloudinary.uploader
      .upload(filePath, {
        public_id: `Image/${req.file.filename}`,
      })
      .catch((error) => {
        console.log(error);
        console.error(error.message);
        return res
          .status(500)
          .json({ msg: "Internal Server Error", error: error.message });
      });

    res.status(200).json({
      msg: "Upload successfully",
      imageUrl: cloudinaryResult.secure_url,
    });
  });
});

router.post("/changeProfileImage", verifyToken, (req, res, next) => {
  jwt.verify(req.token, "marasini", (err, authData) => {
    if (err) {
      res.status(401).json({
        error: "token is not valid",
      });
    } else {
      upload.single("image")(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred during file upload
          return res.status(400).json({ msg: "Error uploading file" });
        } else if (err) {
          // An unknown error occurred
          console.log(err);
          return res.status(500).json({ msg: "Internal Server Error" });
        }

        if (!req.file) {
          return res.status(400).json({ msg: "No file uploaded" });
        }

        const filePath = path.join("./upload/freebeats", req.file.filename);

        const cloudinaryResult = await cloudinary.uploader
          .upload(filePath, {
            public_id: `Image/${req.file.filename}`,
          })
          .catch((error) => {
            console.log(error);
            console.error(error.message);
            return res
              .status(500)
              .json({ msg: "Internal Server Error", error: error.message });
          });

        User.findOneAndUpdate(
          { _id: authData["id"] },
          { imageUrl: cloudinaryResult.secure_url }
        )
          .exec()
          .then((user) => {
            if (!user) {
              return res.status(401).json({
                error: "User does not exist",
              });
            } else {
              res.status(200).json({
                msg: "Upload successfully",
                imageUrl: cloudinaryResult.secure_url,
              });
            }
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      });
    }
  });
});

router.post("/uploadVideo", (req, res) => {
  upload.single("video")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during file upload
      return res.status(400).json({ msg: "Error uploading file" });
    } else if (err) {
      // An unknown error occurred
      console.log(err);
      return res.status(500).json({ msg: "Internal Server Error" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const filePath = path.join("./upload/videos", req.file.filename);

    const cloudinaryResult = await cloudinary.uploader
      .upload(filePath, {
        resource_type: "video",
        public_id: `VideoUploads/${req.file.filename}`,
      })
      .catch((error) => {
        console.log(error);
        console.error(error.message);
        return res
          .status(500)
          .json({ msg: "Internal Server Error", error: error.message });
      });

    res.status(200).json({
      msg: "Upload successfully",
      videoUrl: cloudinaryResult.secure_url,
    });
  });
});

module.exports = router;
