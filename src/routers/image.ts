import { Router } from "express";
import sharp from 'sharp';
import { upload } from "../util";

const router = Router();

type ImageUploadOptions = {
    quality?: number
}

router.post('/upload/image', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ err: 'No file sent' });
    }

    const options: ImageUploadOptions = req.body;

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