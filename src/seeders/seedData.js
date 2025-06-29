import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import sequelize from '../data-access/connection.js';
import Role from '../data-access/models/role.js';
import User from '../data-access/models/user.js';
import Organization from '../data-access/models/organization.js';
import Project from '../data-access/models/project.js';
import Task from '../data-access/models/task.js';
import Department from '../data-access/models/department.js';
import scaled from '../utils/getScale.js';
import config from '../config/index.js';

async function seed() {
  const { saltRounds } = config;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync('password123', salt);
  await sequelize.sync({ force: true });

  const [adminRole, managerRole, employeeRole] = await Role.bulkCreate(
    [{ name: 'admin' }, { name: 'manager' }, { name: 'employee' }],
    { returning: true }
  );

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashedPassword,
    roleId: adminRole.id
  });

  const numOrgs = 3;
  const allDepartments = [];
  const allManagers = [];
  const allProjects = [];
  const allTasks = [];
  const allEmployees = [];

  for (let o = 0; o < numOrgs; o++) {
    const org = await Organization.create({ name: `Organization ${o + 1}` });

    const departments = [];
    const managers = [];

    for (let i = 0; i < scaled(100); i++) {
      const dept = await Department.create({
        name: `Department ${i + 1} - Org${org.id}`,
        organizationId: org.id
      });

      const manager = await User.create({
        name: faker.internet.username(),
        email: `${faker.number.int()}_${i}_${faker.internet.email()}`,
        password: hashedPassword,
        roleId: managerRole.id,
        departmentId: dept.id
      });

      await dept.update({ managerId: manager.id });

      departments.push(dept);
      managers.push(manager);
    }

    for (const dept of departments) {
      const numProjects = faker.number.int({ min: scaled(50), max: scaled(80) });

      for (let i = 0; i < numProjects; i++) {
        const project = await Project.create({
          name: `Project ${faker.commerce.productName()} - Dept${dept.id}`,
          departmentId: dept.id
        });

        allProjects.push(project);

        const numEmployees = faker.number.int({ min: 3, max: 5 });
        const projectEmployees = [];

        for (let j = 0; j < numEmployees; j++) {
          const employee = await User.create({
            name: faker.internet.username(),
            email: `${faker.number.int()}_${j}_${faker.internet.email()}`,
            password: hashedPassword,
            roleId: employeeRole.id,
            departmentId: dept.id
          });

          allEmployees.push(employee);
          projectEmployees.push(employee);
        }

        const numTasks = faker.number.int({ min: scaled(100), max: scaled(200) });
        const tasks = [];

        for (let t = 0; t < numTasks; t++) {
          const assignee = faker.helpers.arrayElement(projectEmployees);

          tasks.push({
            name: faker.hacker.phrase(),
            projectId: project.id,
            employeeId: assignee.id
          });
        }

        const createdTasks = await Task.bulkCreate(tasks);
        allTasks.push(...createdTasks);
      }
    }

    allDepartments.push(...departments);
    allManagers.push(...managers);
  }

  console.log('Seed complete ✅');
  console.log(`Organizations: ${numOrgs}`);
  console.log(`Departments: ${allDepartments.length}`);
  console.log(`Projects: ${allProjects.length}`);
  console.log(`Tasks: ${allTasks.length}`);
  console.log(`Managers: ${allManagers.length}`);
  console.log(`Employees: ${allEmployees.length}`);
  console.log(`Admin User: admin@example.com`);

  process.exit();
}

seed().catch(console.error);
