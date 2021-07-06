var messages = []

function addMessage(obj) {
    var newObj = {
        users: {
            userEmit: obj.userEmit,
            userReceived: obj.userReceived
        },
        message: obj.message
    }
    messages.push(newObj)
}

function getAllMessages(obj) {
    var specificMessages = []
    if (messages.length > 0) {
        for(var i = 0; i < messages.length; i++){
                if (messages[i].users.userEmit == obj.userEmit && messages[i].users.userReceived == obj.userReceived) {
                specificMessages.push(messages[i])
            }
        }
    }
    return specificMessages;
}



module.exports = {
    getAllMessages,
    addMessage
}

