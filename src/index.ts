import { logger } from './logger';
import express from 'express';

const S3_PORT = process.env.PORT || 4001;
const app = express();

app.listen(S3_PORT, () => {
    logger.log(`Server listening on port ${S3_PORT}`)
})