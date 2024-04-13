import AWS from "aws-sdk"
import ('dotenv/config')

AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: "us-east-1"
});

export const db = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});
export const s3 = new AWS.S3();
export const lambda = new AWS.Lambda();