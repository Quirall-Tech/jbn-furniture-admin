import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { resolve } from "path";
import dotenv from 'dotenv';
dotenv.config();

aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION,
});
const BUCKET_NAME = process.env.BUCKET_NAME;
const s3: any = new aws.S3({ params: { Bucket: BUCKET_NAME } });

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const currentTime = Date.now().toString()
            cb(null, `${currentTime}_${file.originalname}`);
        }
    })
})