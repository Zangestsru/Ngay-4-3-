const { dataRole, dataUser } = require('../data2');

const generateRoleId = () => {
    let max = 0;
    dataRole.forEach(r => {
        const num = parseInt(r.id.replace('r', ''));
        if (!isNaN(num) && num > max) {
            max = num;
        }
    });
    return `r${max + 1}`;
};

const getAllRoles = () => {
    return dataRole;
};

const getRoleById = (id) => {
    return dataRole.find(r => r.id === id);
};

const createRole = (roleData) => {
    const newRole = {
        id: generateRoleId(),
        name: roleData.name,
        description: roleData.description,
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    dataRole.push(newRole);
    return newRole;
};

const updateRole = (id, roleData) => {
    const index = dataRole.findIndex(r => r.id === id);
    if (index === -1) return null;

    const updatedRole = {
        ...dataRole[index],
        ...roleData,
        id: id, // prevent id modification
        updatedAt: new Date().toISOString()
    };
    dataRole[index] = updatedRole;
    return updatedRole;
};

const deleteRole = (id) => {
    const index = dataRole.findIndex(r => r.id === id);
    if (index === -1) return null;

    const deletedRole = dataRole.splice(index, 1);
    return deletedRole[0];
};

const getUsersByRoleId = (id) => {
    return dataUser.filter(u => u.role && u.role.id === id);
};

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    getUsersByRoleId
};
