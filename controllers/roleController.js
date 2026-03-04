const roleService = require('../services/roleService');

const getAllRoles = (req, res) => {
    try {
        const roles = roleService.getAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRoleById = (req, res) => {
    try {
        const role = roleService.getRoleById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createRole = (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });
        }
        const newRole = roleService.createRole({ name, description });
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRole = (req, res) => {
    try {
        const updatedRole = roleService.updateRole(req.params.id, req.body);
        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRole = (req, res) => {
    try {
        const deletedRole = roleService.deleteRole(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json({ message: 'Role deleted successfully', role: deletedRole });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsersByRoleId = (req, res) => {
    try {
        const users = roleService.getUsersByRoleId(req.params.id);
        const role = roleService.getRoleById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    getUsersByRoleId
};
