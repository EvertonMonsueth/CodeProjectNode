//Query params =>
//Router params =>
//Request Body =>
//GET => busca informação no back-end
//POST => Cria informação no back-end
//PUT / PATCH => Altera informação no back-end
//DELETE => Deleta informação no back-end
//Middleware => Iterceptador, parar ou alterar dados

const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

const users = []
const checkUserId = (request, response, next) =>{
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)
    if(index < 0 ){
        return response.status(404).json({error: "user not found"})
    }
    request.userIndex = index
    request.userId = id
    next()
}

app.get('/users', (request, response) => {
    console.log('A rota foi chamada')
    
    //const {name, age} = request.body
    return response.json(users)
})
app.post('/users', (request, response) => {
    const {name, age} = request.body
    const user = {id:uuid.v4(), name, age} 
    users.push(user) 
    return response.status(201).json(users)

})
app.put('/users/:id', checkUserId, (request, response) => {
    //const {id} = request.params
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId
    const updateUser = {id, name, age}
    //const index = users.findIndex(user => user.id === id)
    // if(index < 0){
    //     return response.status(404).json({ consolee: 'User not found'})
    // }
    // console.log(index) 
    users[index] = updateUser 
    return response.json(updateUser)
})
app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
    //const {id} = request.params
    //const index = users.findIndex(user => user.id === id)
    // if(index < 0){
    //     return response.status(404).json({ message: "User not found"})
    // }
    users.splice(index, 1)
    return response.status(204).json()
}) 
app.listen(port, () => {
    console.log(`💥 Server started on port ${port}💥`)
})