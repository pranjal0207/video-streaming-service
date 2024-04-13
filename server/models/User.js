class User {
  user = {
    "user_id": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": "",
    "picturePath": "",
    "subscribers": [],
    "viewedProfile": 0,
    "impressions": 0,
    "videos": []
  }

  constructor(user) {
    this.user = {
      "user_id": user.user_id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "password": user.password,
      "picturePath": user.picturePath,
      "subscribers": user.subscribers,
      "viewedProfile": user.viewedProfile,
      "impressions": user.impressions,
      "videos" : user.videos
    }
  }

  getUser() {
    return this.user;
  }

  getUserId() {
    return this.user.user_id;
  }
}

export default User;