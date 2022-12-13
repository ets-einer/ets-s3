import { Router } from "express";
import sharp from 'sharp';
import { upload } from "../util";
import { randomUUID } from 'crypto';

const router = Router();

type ImageUploadOptions = {
    quality?: number
}

function validateOptions(options: ImageUploadOptions) {
    if (options.quality) {
        if (options.quality > 100 || options.quality < 10) {
            return { status: 400, err: 'Quality needs to be in a range between 100 an 10.' }
        }
    }

    return null
}

router.post('/upload/image', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ err: 'No file sent' });
    }

    const options: ImageUploadOptions = req.body;

    const error = validateOptions(options);

    if (error) return res.status(error.status).json({ err: error.err });

    const { buffer, originalname } = req.file;
    const timestamp = new Date().toISOString();
    const ref = `${timestamp}-${originalname.split('.')[0]}.webp`;

    await sharp(buffer)
        .webp({ quality: options.quality || 40 })
        .toFile('./public/images/' + ref);

    const imgPath = `/images/${ref}`;
    return res.status(200).json({ imgPath });
})

export default { router };