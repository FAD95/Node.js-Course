const db = require('mongoose')
const Model = require('./model')

db.Promise = global.Promise
db.connect(
  'mongodb+srv://Fad:UEXjZMa844bbDQ2G@cluster0-dwoa7.gcp.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
console.log('[db] conectada con exito')

function addMessage(message) {
  const myMessage = new Model(message)
  myMessage.save()
}

async function getMessages() {
  const messages = await Model.find()
  return messages
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({ _id: id })
  foundMessage.message = message
  const newMessage = await foundMessage.save()
  return newMessage
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText: updateText,
}
