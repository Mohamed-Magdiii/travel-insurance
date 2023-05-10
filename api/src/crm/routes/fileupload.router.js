const express = require('express');

const router = express.Router();

const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');

const upload = multer({
  // dest: 'uploads/',
  storage: multerGoogleStorage.storageEngine(),
});
const fs = require('fs');
const { generateRandomImageName, ApiResponse } = require('../../utils');
const { ResponseMessages } = require('../../common');

router.post('/image/upload', upload.single('image'), async (req, res) => res.json({
  data: req.file,
}));
router.post('/images/upload', upload.array('images', 2), (req, res) => res.json({
  data: req.files,
}));
router.post('/video/upload', upload.single('video'), (req, res) => res.json({
  data: req.file,
}));

router.post('/imageb64/upload', async (req, res, next) => {
  try {
    const { b64 } = req.body;
    if (!b64) return ApiResponse(res, 400, false, 'missing b64', { status: false });
    const base64Data = b64.split(',')[1];
    const filename = generateRandomImageName();
    return fs.writeFile(`uploads/${filename}`, base64Data, 'base64', (err) => {
      if (err) {
        return next(err);
      }
      return ApiResponse(res, 200, true, ResponseMessages.recordCreated, { filename });
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
