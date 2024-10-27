import express from 'express';
import os, { hostname } from 'os';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const app = express();
const port = 3000;
import bodyParser from 'body-parser';

app.use(bodyParser.json());

const uploadDir = path.join(__dirname, '../uploads');

app.get('/', (_req : express.Request, res : express.Response) => {

  res.status(200).json({
    message: 'Hello World!',
    hostname: os.hostname(),
    platform: os.platform(),
  });
});

app.post('/message', (req: express.Request, res: express.Response) => {
  const { message } = req.body;

  console.log(`Received message: ${message}`);

  res.status(200).json({
    message: `You sent: ${message}`,
  });
});

// path to upload huge file
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req: express.Request & { file?: Express.Multer.File }, res: express.Response) => {
  const newFilename = req.file?.originalname || `file_${Date.now()}${path.extname(req.file?.originalname || '')}`;
  const newPath = path.join(uploadDir, newFilename);
  fs.renameSync(req.file?.path || '', newPath);

  res.status(200).json({
    message: 'File uploaded successfully!',
    file: req.file,
    filename: newFilename,
    hostname: os.hostname(),
  });
});

app.post('/image/upload', upload.single('image'), (req: express.Request & { file?: Express.Multer.File }, res: express.Response) => {
  const newFilename = req.file?.originalname || `image_${Date.now()}${path.extname(req.file?.originalname || '')}`;
  const newPath = path.join(uploadDir, newFilename);
  fs.renameSync(req.file?.path || '', newPath);

  res.status(200).json({
    message: 'Image uploaded successfully!',
    file: req.file,
    filename: newFilename,
    hostname: os.hostname(),
  });
});

app.post('/video/upload', upload.single('video'), (req: express.Request & { file?: Express.Multer.File }, res: express.Response) => {
  const newFilename = req.file?.originalname || `video_${Date.now()}${path.extname(req.file?.originalname || '')}`;
  const newPath = path.join(uploadDir, newFilename);
  fs.renameSync(req.file?.path || '', newPath);

  res.status(200).json({
    message: 'Video uploaded successfully!',
    file: req.file,
    filename: newFilename,
    hostname: os.hostname(),
  });
});

app.get('/keep/:filename', (req: express.Request, res: express.Response) => {
  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename);

  try {
    if (fs.existsSync(filePath)) {
      res.status(200).sendFile(filePath);
  }} catch (error) {
    res.status(404).json({
      message: 'File not found',
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});