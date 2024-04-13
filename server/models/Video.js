class Video {
    video = {
        "video_id": "",
        "title": "",
        "description": "",
        "upload_date": "",
        "video_data_key" : "",
        "thumbnail_key":  "",
        "uploader_id": "",
        "views": 0,
        "likes": 0,
        "dislikes": 0,
        "comments": []
      }
      
    constructor(video) {
        this.video  = {
            "video_id": video.video_id,
            "title": video.title,
            "description": video.description,
            "upload_date": video.upload_date,
            "video_data_key" : video.video_data_key,
            "thumbnail_key":  video.thumbnail_key,
            "uploader_id": video.uploader_id,
            "views": video.views,
            "likes": video.likes,
            "dislikes": video.dislikes,
            "comments": video.comments
          }
    }

    getVideo() {
        return this.video;
    }

    getVideoId() {
        return this.video.video_id;
    }

    getVideoKey() {
        return this.video.video_data_key;
    }

    getThumbnailKey() {
        return this.video.thumbnail_key;
    }
}

export default Video;