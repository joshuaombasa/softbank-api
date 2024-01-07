const express = require("express")

const mongoose = require('mongoose');

const PORT = 4000

const app = express()

const MONGODB_URI = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=employee"

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

const employeeSchema = require('./models/employee')
const branchSchema = require('./models/branch')

const Employee = mongoose.model('Employee', employeeSchema)
const Branch = mongoose.model('Branch', branchSchema)

app.get('/api', (req, res) => {
    res.status(200).json({ message: "Request successful" })
})



app.get('/api/employees', async (req, res) => {
    const employees = await Employee.find()
    res.status(200).json({ employees })
})

app.get('/api/employeeAdd', async (req, res) => {
    try {
        const newEmployee = new Employee({
            firstName: "Joshua",
            lastName: "Ombasa",
            isParmanent: true,
            languages: ["Java", "Python", "JavaScript", "Go"]
        })
        await newEmployee.save()
        res.status(200).json({ employee: newEmployee })
    } catch (error) {
        res.status(200).json(error)
    }
})


app.get('/api/branchesAdd', async (req, res) => {
    try {
        const newBranch = new Branch({
            name: "Nakuru",
            manager: "Mbudi Bruce"
        })
        await newBranch.save()
        res.status(200).json({ branch: newBranch })
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get('/api/branches', async (req, res) => {
    try {
        const branches = Branch.find()
        res.status(200).json({ branches : branches })
    } catch (error) {
        res.status(400).json(error)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})