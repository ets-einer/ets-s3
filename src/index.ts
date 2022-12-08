import { logger } from './logger';
import { checkPublicDir } from './util';
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';

const S3_PORT = process.env.PORT || 4001;

const storage = multer.memoryStorage();
const upload = multer({ storage });

checkPublicDir();

const app = express();
app.use(express.static('./public'));

app.post('/upload/image', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ err: 'No file sent' });
    }

    const { buffer, originalname } = req.file;
    const timestamp = new Date().toISOString();
    const ref = `${timestamp}-${originalname.split('.')[0]}.webp`;
    await sharp(buffer)
        .webp({ quality: 40 })
        .toFile('./public/images/' + ref);
    const link = `http://localhost:${S3_PORT}/images/${ref}`;

    return res.status(200).json({ link });
})

app.listen(S3_PORT, () => {
    logger.log(`Server listening on port ${S3_PORT}`)
})