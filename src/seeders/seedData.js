import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import sequelize from '../data-access/connection.js';
// import { Role, User, Organization, Department, Project, Task } from '../data-access/index.js';
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

  // 1. Create Roles
  const [adminRole, managerRole, employeeRole] = await Role.bulkCreate(
    [{ name: 'admin' }, { name: 'manager' }, { name: 'employee' }],
    { returning: true }
  );

  // 2. Create Admin User
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashedPassword, // Replace with bcrypt in real app
    roleId: adminRole.id
  });

  // 3. Create Organization
  const org = await Organization.create({ name: 'Global Corp' });

  // 4. Create Departments with Managers
  const departments = [];
  const managers = [];

  for (let i = 0; i < scaled(100); i++) {
    const dept = await Department.create({
      name: `Department ${i + 1}`,
      organizationId: org.id
    });

    const manager = await User.create({
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: hashedPassword,
      roleId: managerRole.id,
      departmentId: dept.id
    });

    await dept.update({ managerId: manager.id });

    departments.push(dept);
    managers.push(manager);
  }

  // 5. Create Projects & Employees & Tasks
  const allProjects = [];
  const allTasks = [];
  const allEmployees = [];

  for (const dept of departments) {
    const numProjects = faker.number.int({ min: scaled(50), max: scaled(80) });
    const deptProjects = [];

    for (let i = 0; i < numProjects; i++) {
      const project = await Project.create({
        name: `Project ${faker.commerce.productName()} - D${dept.id}`,
        departmentId: dept.id
      });

      deptProjects.push(project);
      allProjects.push(project);

      // Create Employees (3–5 per project)
      const numEmployees = faker.number.int({ min: 3, max: 5 });
      const projectEmployees = [];

      for (let j = 0; j < numEmployees; j++) {
        const employee = await User.create({
          name: faker.internet.username(),
          email: faker.internet.email(),
          password: hashedPassword,
          roleId: employeeRole?.id,
          departmentId: dept?.id
        });

        allEmployees.push(employee);
        projectEmployees.push(employee);
      }

      // Create Tasks and assign randomly to one of the employees
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

  console.log(`Seed complete ✅`);
  console.log(`Created: ${departments.length} departments`);
  console.log(`Created: ${allProjects.length} projects`);
  console.log(`Created: ${allTasks.length} tasks`);
  console.log(`Created: ${managers.length} managers`);
  console.log(`Created: ${allEmployees.length} employees`);
  console.log(`Admin User: admin@example.com`);

  process.exit();
}

seed().catch(console.error);
