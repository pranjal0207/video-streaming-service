import Video from "../models/Video.js"
import { db, s3 } from "../helpers/aws_connectors.js"
import { v4 as uuidv4 } from 'uuid';

const tabelName = "videos"
const s3Bucket = "videostreaminguploadedvideos"

export const getVideoLink = async (req, res) => {
    const key = await getVideoData(req, video => video.getVideoKey());
    return getMedia(key, res);
}

export const getThumbnailLink = async (req, res) => {
    const key = await getVideoData(req, video => video.getThumbnailKey());
    return getMedia(key, res);
}

export const getVideo = async (req, res) => {
    const key = await getVideoData(req, video => video.getVideo());
    res.status(200).json({"message":key});
}

export const postVideo = async (req, res) => {
    try {
        const body = req.body
        const files = req.files

        const video_uuid = uuidv4()

        addVideoToDb (body, video_uuid)
        uploadFileHelper (body.uploader_id, video_uuid, files)

        res.status(200).json({"message" : body})
    } catch (err) {
        res.status(500).json({"Error Message" : err.message})
    }
}

async function addVideoToDb(body, video_uuid) {
    const temp = {
        "video_id": video_uuid,
        "title": body.title,
        "description": body.description,
        "upload_date": body.upload_date,
        "video_data_key" : "",
        "thumbnail_key":  "",
        "uploader_id": body.uploader_id,
        "views": 0,
        "likes": 0,
        "dislikes": 0,
        "comments": []
    }

    const video = new Video(temp)

    const params = {
        TableName: tabelName,
        Item: video.getVideo(),
    }

    db.put(params).promise().then(data => {
        return true
    })
    .catch(error => {
        return res.status(500).json({'message' : error});
    });
}

async function uploadFileHelper(user_id, video_uuid, files)  {
    const uploadParams = files.map ((file, index) => {
        const params = {
            Bucket: s3Bucket,
            Key: user_id + "/" + video_uuid + "/" + ((index === 0)? "video" : "thumbnail") + "." + file.mimetype.split('/').pop(),
            Body: file.buffer,
        }

        return params;
    })

    uploadParams.map(async (params) => {
        s3.upload(params, (err, data) => {
            if (err) {
                return res.status(500).json({'message' : err});
            }
        })
    })
}

async function getMedia (key, res) {
    const s3Params = {
        Bucket: s3Bucket,
        Key: key,
    };

    try {
        const url = await s3.getSignedUrlPromise('getObject', s3Params);
        res.status(200).json({ "message": url });
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
}

async function getVideoData(req, keyGetter) {
    try {
        const { id } = req.params;

        const params = {
            TableName: tabelName,
            Key: {
                video_id: id
            }
        };

        const data = await db.get(params).promise();
        const video = new Video(data.Item);
        const key = keyGetter(video);
        
        return key;
    } catch (error) {
        res.status(500).json({ "Error Message": error.message });
    }
}