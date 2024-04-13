import { db } from "../helpers/aws_connectors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const tabelName = "users";

export const login = async (req, res) => {
    // res.status(200).json({"message" : "login"});
    const { email, password } = req.body;

    const params = {
        TableName: tabelName,
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: { ':email': email },
        Limit: 1
      };

    await db.scan(params).promise().then(async (data) => {
        const userPasswordHadh = data.Items[0].password;

        const isMatch = await bcrypt.compare(password, userPasswordHadh);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({ "message": "Invalid credentials" });
        }

        const token =  jwt.sign({id: "some thing"}, process.env.JWT_SECRET);

        console.log(token)
        res.status(200).json ({ token });
    }).catch(error => {
        res.status(500).json({"message" : error});
    });

    
}