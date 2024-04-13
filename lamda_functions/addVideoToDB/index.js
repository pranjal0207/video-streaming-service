const { DynamoDBClient, UpdateItemCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const ddbClient = new DynamoDBClient({ region: "us-east-1" }); // Ensure you use the correct region

exports.handler = async (event) => {
  const key = event.Records[0].s3.object.key;

  const videoData = key.split('/');
  const user_id = videoData[0];
  const video_id = videoData[1];
  const asset = videoData[2];
  
  let type = 0;
  
  if (asset == "thumbnail.png"){
    type = 1;
  }
  
  const params_videos = {
    TableName: "videos",
    Key: {
      "video_id": { S: video_id }
    },
    UpdateExpression: `set ${(type == 1)? "thumbnail_key" : "video_data_key"} = :s`,
    ExpressionAttributeValues: {
      ":s": { S: key }
    },
    ReturnValues: "UPDATED_NEW"
  };
  
  const params_users_get = {
    TableName: "users",
    Key: {
      "user_id": { S: user_id }
    },
  };
  
  const params_users = {
    TableName: "users",
    Key: {
      "user_id": { S: user_id }
    },
    UpdateExpression: "SET videos = list_append(videos, :newVideo)",
    ExpressionAttributeValues: {
      ":newVideo": { L: [{ S: video_id }] }
    },
    ReturnValues: "UPDATED_NEW"
  };
  
  try {
    await ddbClient.send(new UpdateItemCommand(params_videos));
  
    const user = await ddbClient.send(new GetItemCommand(params_users_get));
    
    if (user) {const videos = parseDynamoDBListToJsArray(user.Item.videos.L) || [];
      
      if (!videos.includes(video_id)) {
        await ddbClient.send(new UpdateItemCommand(params_users));
      }
    }
    
    return { statusCode: 200, body: JSON.stringify("DB UPDATED") };
  } catch (err) {
    console.error("Error", err);
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};

function parseDynamoDBListToJsArray(inputList) {
  return inputList.map(item => item.S);
}