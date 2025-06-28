import User from './user.js';
import Role from './role.js';
import Department from './department.js';
import Organization from './organization.js';
import Task from './task.js';
import Project from './project.js';
import Notification from './notification.js';

Organization.hasMany(Department, { foreignKey: 'organization_id' });
Department.belongsTo(Organization, { foreignKey: 'organization_id' });

Department.hasMany(Project, { foreignKey: 'department_id' });
Project.belongsTo(Department, { foreignKey: 'department_id' });

Department.belongsTo(User, { foreignKey: 'manager_id', as: 'manager' });
User.hasOne(Department, { foreignKey: 'manager_id', as: 'managedDepartment' });

Department.hasMany(User, { foreignKey: 'department_id', as: 'employees' });
User.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });

Project.hasMany(Task, { foreignKey: 'project_id' });
Task.belongsTo(Project, { foreignKey: 'project_id' });

User.hasMany(Task, { foreignKey: 'employee_id' });
Task.belongsTo(User, { foreignKey: 'employee_id' });

User.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(User, { foreignKey: 'role_id' });

Notification.belongsTo(Project, { foreignKey: 'project_id' });
Project.belongsTo(Notification, { foreignKey: 'project_id' });

export { User, Role, Department, Organization, Task, Project, Notification };
