const express = require("express")
const app = express()
const cors = require("cors")

require('dotenv').config({ path: './config/.env' });

const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://"+process.env.DB_USER+"@cluster0.oopvkfg.mongodb.net/MyEfrei"

const client = new MongoClient(uri);

app.use(cors({ origin: "*" }))

app.use(express.json())

async function run(callback = false) {
    try {

        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
        if (callback) {
            await callback()
        }
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

app.post("/School/Students/insert", async (req, res) => {
    run(async function () {
        /*const email = req.body.email;
        const student = await client.db('School').collection('Students').findOne({ email });

        if (student) {
            return res.status(400).json({ message: 'Email already exists' });
          }
*/
        await client.db("School").collection("Students").insertOne({
            name: req.body.name, lastname: req.body.lastname, class: req.body.class, email: req.body.email, age: req.body.age
        });

        res.json("Student added successfully")
    })
    /*await client.connect();
    await client.db("School").collection("Students").insertOne({ name: req.body.q1 });
    res.json("Success")
    await client.close();
    */
})

app.put("/School/Students/update/:param1", async (req, res) => {
    run(async function () {
        let myquery = { email: req.params.param1 };
        let newvalues = { $set: {} };

        if (req.body.name) {
            newvalues.$set.name = req.body.name
        }
        if (req.body.lastname) {
            newvalues.$set.lastname = req.body.lastname
        }
        if (req.body.email) {
            newvalues.$set.email = req.body.email
        }
        if (req.body.age) {
            newvalues.$set.age = req.body.age
        }
        if (req.body.class) {
            newvalues.$set.class = req.body.class
        }
        // await client.connect()
        // console.log(await client.db("School").collection("Students").find(myquery).toArray())


        let val = await client.db("School").collection("Students").updateOne(myquery, newvalues)
        console.log(val)
        if (val.modifiedCount) {
            res.json("Updated.")
        } else {
            res.json("Did not go through.")
        }


    })

    // await client.close()

})
app.delete("/School/Students/delete", async (req, res) => {
    run(async function () {
        let val = await client.db("School").collection("Students").deleteOne({
            _id: ObjectId(req.query._id)
        });
        if (val.deletedCount) {
            res.json("Success deleted.")
        } else {
            res.json("Could not find.")
        }


    })
})

app.get("/School/Students/read", async (req, res) => {
    run(async function () {
        let myquery = (req.query.email) ? { email: req.query.email } : {};


        let val = await client.db("School").collection("Students").find(myquery
        ).toArray();
        res.json(val)
    })
})


app.post("/School/Grades/insert", async (req, res) => {
    run(async function () {
        await client.db("School").collection("Grades").insertOne({
            idStud: req.body.idStud, subjectName: req.body.subjectName, grade: req.body.grade
        });
        res.json("Success")
    })
})

app.put("/School/Grades/update/:param1", async (req, res) => {
    run(async function () {
        let myquery = { idStud: req.params.param1 };
        let newvalues = { $set: {} };

        if (req.body.idStud) {
            newvalues.$set.idStud = req.body.idStud
        }
        if (req.body.grade) {
            newvalues.$set.grade = req.body.grade
        }
        if (req.body.subjectName) {
            newvalues.$set.subjectName = req.body.subjectName
        }


        let val = await client.db("School").collection("Grades").updateOne(myquery, newvalues)
        console.log(val)
        if (val.modifiedCount) {
            res.json("Updated.")
        } else {
            res.json("Did not go through.")
        }
    })
    // await client.close()
})

app.delete("/School/Grades/delete", async (req, res) => {
    run(async function () {
        let val = await client.db("School").collection("Grades").deleteOne({
            idStud: req.query.idStud
        });
        if (val.deletedCount) {
            res.json("Success deleted.")
        } else {
            res.json("Could not find.")
        }

    })
})

app.get("/School/Grades/read", async (req, res) => {
    run(async function () {
        let myquery = (req.query.idStud) ? { idStud: req.query.idStud } : {};


        let val = await client.db("School").collection("Grades").find(myquery
        ).toArray();
        res.json(val)
    })
})



app.post("/School/Class/insert", async (req, res) => {
    console.log(req.body)
    try {

        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
        await client.db("School").collection("Class").insertOne({
            class: req.body.class, gradeAverage: req.body.gradeAverage, numberSubject: req.body.numberSubject,
        });
        res.json("Success")
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
})

app.put("/School/Class/update/:param1", async (req, res) => {
    run(async function () {
        let myquery = { class: req.params.param1 };
        let newvalues = { $set: {} };

        if (req.body.class) {
            newvalues.$set.class = req.body.class
        }
        if (req.body.gradeAverage) {
            newvalues.$set.gradeAverage = req.body.gradeAverage
        }

        if (req.body.numberSubject) {
            newvalues.$set.numberSubject = req.body.numberSubject
        }

        let val = await client.db("School").collection("Class").updateOne(myquery, newvalues)
        console.log(val)
        if (val.modifiedCount) {
            res.json("Updated.")
        } else {
            res.json("Did not go through.")
        }
    })
    // await client.close()

})

app.delete("/School/Class/delete", async (req, res) => {
    run(async function () {
        let val = await client.db("School").collection("Class").deleteOne({
            _id: ObjectId(req.query._id)
        });
        if (val.deletedCount) {
            res.json("Success deleted.")
        } else {
            res.json("Could not find.")
        }

    })
})

app.get("/School/Class/read", async (req, res) => {
    run(async function () {
        let myquery = (req.query.class) ? { class: req.query.class } : {};


        let val = await client.db("School").collection("Class").find(myquery).toArray();


        res.json(val)
    })
})



app.post("/School/Subject/insert", async (req, res) => {
    run(async function () {
        await client.db("School").collection("Subject").insertOne({
            subjectName: req.body.subjectName, numberStudents: req.body.numberStudents, gradeAverage: req.body.gradeAverage, teacherNumber: req.body.teacherNumber
        });
        res.json("Success")
    })
})

app.put("/School/Subject/update/:param1", async (req, res) => {
    run(async function () {
        let myquery = { subjectName: req.params.param1 };
        let newvalues = { $set: {} };

        if (req.body.subjectName) {
            newvalues.$set.subjectName = req.body.subjectName
        }
        if (req.body.numberStudents) {
            newvalues.$set.numberStudents = req.body.numberStudents
        }
        if (req.body.teacherNumber) {
            newvalues.$set.teacherNumber = req.body.teacherNumber
        }
        if (req.body.gradeAverage) {
            newvalues.$set.gradeAverage = req.body.gradeAverage
        }

        let val = await client.db("School").collection("Subject").updateOne(myquery, newvalues)
        console.log(val)
        if (val.modifiedCount) {
            res.json("Updated.")
        } else {
            res.json("Did not go through.")
        }
    })
    // await client.close()

})

app.delete("/School/Subject/delete", async (req, res) => {
    run(async function () {
        let val = await client.db("School").collection("Subject").deleteOne({
            _id: ObjectId(req.query._id)
        });
        if (val.deletedCount) {
            res.json("Success deleted.")
        } else {
            res.json("Could not find.")
        }
    })
})

app.get("/School/Subject/read", async (req, res) => {
    run(async function () {
        let myquery = (req.query.subjectName) ? { subjectName: req.query.subjectName } : {};


        let val = await client.db("School").collection("Subject").find(myquery
        ).toArray();
        res.json(val)
    })
})



app.post("/School/Teacher/insert", async (req, res) => {
    run(async function () {
        await client.db("School").collection("Teacher").insertOne({
            teacherName: req.body.teacherName, email: req.body.email, subjectName: req.body.subjectName, age: req.body.age
        });
        res.json("Success")
    })
})

app.put("/School/Teacher/update/:param1", async (req, res) => {
    run(async function () {
        let myquery = { email: req.params.param1 };
        let newvalues = { $set: {} };

        if (req.body.age) {
            newvalues.$set.age = req.body.age
        }
        if (req.body.subjectName) {
            newvalues.$set.subjectName = req.body.subjectName
        }
        if (req.body.teacherName) {
            newvalues.$set.teacherName = req.body.teacherName
        }
        if (req.body.email) {
            newvalues.$set.email = req.body.email
        }

        let val = await client.db("School").collection("Teacher").updateOne(myquery, newvalues)
        console.log(val)
        if (val.modifiedCount) {
            res.json("Updated.")
        } else {
            res.json("Did not go through.")
        }
    })
    // await client.close() 

})

app.delete("/School/Teacher/delete", async (req, res) => {
    run(async function () {
        let val = await client.db("School").collection("Teacher").deleteOne({
            _id: ObjectId(req.query._id)
        });
        if (val.deletedCount) {
            res.json("Success deleted.")
        } else {
            res.json("Could not find.")
        }
    })
})

app.get("/School/Teacher/read", async (req, res) => {
    run(async function () {
        let myquery = (req.query.email) ? { email: req.query.email } : {};


        let val = await client.db("School").collection("Teacher").find(myquery
        ).toArray();
        res.json(val)
    })
})


app.delete("/School/deleteAll", async (req, res) => {
    run(async function () {
        await client.db("School").collection("Students").deleteMany({
        });
        await client.db("School").collection("Teacher").deleteMany({
        });
        await client.db("School").collection("Grades").deleteMany({
        });
        await client.db("School").collection("Class").deleteMany({
        });
        await client.db("School").collection("Subject").deleteMany({
        });
        res.json("Success")
    })
})

app.listen(3020)

