'use strict';

let express = require('express');
let cors = require('cors');
let multer = require('multer');

let app = express();
let upload = multer({ dest: 'assets/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', (req, res) => {
  res.json({greetings: "Hello, API"});
});

app.listen(3000, () => {
  console.log('Node.js listening ...');
});

// Accepts a file upload and returns the file name and size
app.post('/api/fileanalyze', upload.single('upfile'), (req, res) => {
  let originalSize = req.file.size;
  let size, ending;
  
  switch (originalSize.toString().length) {
    case 1:
    case 2:
    case 3:
      ending = 'Bytes';
      size = originalSize;
      break;
    case 4:
    case 5:
    case 6:
      ending = 'Kilobytes';
      size = originalSize / 1000;
      break;
    case 7:
    case 8:
    case 9:
      ending = 'Megabytes';
      size = originalSize / 1000000;
      break;
    case 10:
    case 11:
    case 12:
      ending = 'Gigabytes';
      size = originalSize / 1000000000;
      break;
    default:
      ending = 'Terabytes';
      size = originalSize / 1000000000000;
      break;
      
  }
  
  let fileSize = size + ' ' + ending;
      
  
  res.json({ fileName: req.file.originalname, size: fileSize, sizeInBytes: originalSize });
});
