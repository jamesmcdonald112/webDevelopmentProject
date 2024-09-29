
// create an array to store user data
const users = [];

// Function to create a user with a username and a password
function createUser(username, password) {
    users.push({ username, password});
    console.log(users);
}

// Authenticate users by iterating through the users array and matching the username and password
function authenticateUser(username, password) {
    // Finfd the user by username in the array
    const user = users.find(user => user.username === username)

    if(!user || user.password !== password) {
        return false;
    }

    return true; 

}

module.exports = {createUser, authenticateUser};