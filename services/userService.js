const { dataUser } = require('../data2');

const getAllUsers = () => {
    return dataUser;
};

const getUserByUsername = (username) => {
    return dataUser.find(u => u.username === username);
};

const createUser = (userData) => {
    const existing = dataUser.find(u => u.username === userData.username);
    if (existing) {
        throw new Error('Username already exists');
    }

    const newUser = {
        ...userData,
        status: userData.status !== undefined ? userData.status : true,
        loginCount: 0,
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    dataUser.push(newUser);
    return newUser;
};

const updateUser = (username, userData) => {
    const index = dataUser.findIndex(u => u.username === username);
    if (index === -1) return null;

    const updatedUser = {
        ...dataUser[index],
        ...userData,
        username: username,
        updatedAt: new Date().toISOString()
    };
    dataUser[index] = updatedUser;
    return updatedUser;
};

const deleteUser = (username) => {
    const index = dataUser.findIndex(u => u.username === username);
    if (index === -1) return null;

    const deletedUser = dataUser.splice(index, 1);
    return deletedUser[0];
};

module.exports = {
    getAllUsers,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
};
