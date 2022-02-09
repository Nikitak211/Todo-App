const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();
const todos = []
app.use(cors());
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
    res.send(todos)
})

app.post('/todo', (req, res) => {
    if (req.body !== undefined) {
        const data = {
            id: shortid.generate(),
            body: req.body.body,
            date: req.body.date,
        }
        todos.push(data)
        res.send({
            success: true
        })
    }
})

app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos.splice(i, 1)
            res.send({
                success: true
            })
        }
    }
})

app.post('/status', (req, res) => {
    if (req.body !== undefined) {
        const id = req.body.id
        const data = {
            status: req.body.status,
            cross: req.body.cross
        }
        const index = todos.findIndex(arr => arr.id === id)
        todos[index].status = data.status
        todos[index].cross = data.cross
        res.send({
            success: true
        })
    }
})

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})