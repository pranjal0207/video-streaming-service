import User from "../models/User.js"
import { db } from "../helpers/aws_connectors.js"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

const tabelName = "users"

export const getUser = (req, res) => {
    try {
        const { id } = req.params

        const params = {
            TableName: tabelName,
            Key: {
               user_id: id
            }
        }

        db.get(params).promise().then(data => {
            const user = new User(data.Item) 
            res.status(200).json({"user": user.getUser()})
        })
        .catch(error => {
            res.status(400).json({"Error Message" : error})
        });
    } catch (err) {
        res.status(400).json({"message" : err.message})
    }
}

export const postUser = async (req, res) => {
    try {
        const temp = req.body

        temp.user_id = uuidv4()

        const new_user = new User(temp)

        const salt = await bcrypt.genSalt();
        new_user.user.password = await bcrypt.hash(new_user.user.password, salt);

        const params = {
            TableName: tabelName,
            Item: new_user.getUser(),
        }

        db.put(params).promise().then(data => {
            res.status(200).json({"user_id": new_user.getUserId()})
        })
        .catch(error => {
            res.status(400).json({"Error Message" : error})
        });

        
    } catch (err) {
        res.status(400).json({"Error Message" : err.message})
    }
}