var users = []

function getAllUsers(currentUser){
    var newUsers = users.filter(user => user.name != currentUser)
    // console.log("users", newUsers)
    return newUsers;
}

function addUser(userr){
    console.warn("userr", userr)
    const isNewUser = users.findIndex(user => user.name == userr.user.name)
    if(isNewUser == -1 && userr.user.name != userr.currentUser){
        users.push(userr.user)
        return true
    }

    return false
}

module.exports = {
    getAllUsers,
    addUser
}

