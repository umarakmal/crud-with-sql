const { Sequelize } = require("sequelize");
const User = require("../models/user.model.js");
const Test = require("../models/testModel.js");
const db = require("../db/database.js");
const fs = require("fs");
const csv = require("fast-csv");
const { Op } = Sequelize;
exports.getAllUsers = async (req, res) => {
    try {
        const userData = await User.findAll();
        res.json(userData);
    } catch (error) {
        res.json({ message: error.message });
    }
}
exports.getAllTests = async (req, res) => {
    try {
        const testData = await Test.findAll();
        // console.log(testData.length);
        res.status(200).json(testData);
    } catch (error) {
        res.json({ message: error.message });
    }
}

//Join User to Test tables
exports.Jointest = async (req, res) => {
    try {
        var data = await db.query(`SELECT 
        users.id,
        users.name AS userName, -- Rename 'name' to 'userName'
        test.id AS testid,
        test.name AS testname
        FROM users
        INNER JOIN test ON Users.id = test.id`, {
            type: db.QueryTypes.SELECT,
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getUserById = async (req, res) => {
    try {
        const userData = await User.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(userData[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

exports.createUser = async (req, res) => {
    try {
        await User.create(req.body);
        res.json({
            "message": "User Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        await User.update(
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                username: req.body.username,
            }
            , {
                where: {
                    id: req.params.id
                }
            });
        res.json({
            "message": "User Updated"
        });

    } catch (error) {
        res.json({ message: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}


exports.uploadData = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload a CSV file!");
        }
        if (req.formaterror) {
            return res.status(207).json({
                success: false,
                message: "Only CSV files are allowed",
                chk: "2",
            });
        }
        let DataBulk = [];
        let path = "./public/uploads/" + req.file.filename;
        let i = 0
        fs.createReadStream(path)
            .pipe(csv.parse({ headers: true }))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                i++
                DataBulk.push(row);
            })
            .on("end", () => {
                Test.bulkCreate(DataBulk)
                    .then(() => {
                        res.status(200).send({
                            message:
                                "Uploaded successfully",
                            chk: "0",
                            totalCount: i
                        });
                    })
                    .catch((error) => {
                        res.status(500).send({
                            message: "Fail to import data into database!",
                            error: error.message,
                        });
                    });
            });
    } catch (error) {
        res.status(500).send({
            message: "Could not upload the file",
        });
    }
}

exports.getReport = async (req, res) => {
    const startDate = new Date(req.body.date1);
    // const endDate = new Date('2023-12-31');
    const endDate = new Date(req.body.date2);
    endDate.setDate(endDate.getDate() + 1)
    try {
        const results = await Test.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });
        return res.status(200).json(results)
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json(error)
    }
}