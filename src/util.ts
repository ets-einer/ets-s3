import fs from 'fs';

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