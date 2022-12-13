import fs from 'fs';
import multer from 'multer';

export function checkPublicDir() {
    fs.access('./public', (error) => {
        if (error) {
            fs.mkdirSync('./public')
        }
    })

    fs.access('./public/images', (error) => {
        if (error) {
            fs.mkdirSync('./public/images', { recursive: true })
        }
    })
}

const storage = multer.memoryStorage();
export const upload = multer({ storage });