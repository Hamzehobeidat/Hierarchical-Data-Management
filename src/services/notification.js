import models from '../data-access/index.js';

const { Notification } = models;

const trackTaskUpdate = async projectId => {
  const batchStore = {};
  if (!batchStore[projectId]) {
    batchStore[projectId] = {
      count: 0,
      timeout: null
    };
  }
  console.log('batchStore', batchStore);
  batchStore[projectId].count += 1;
  console.log('batchStore', batchStore);
  clearTimeout(batchStore[projectId].timeout);

  batchStore[projectId].timeout = setTimeout(() => {
    const count = batchStore[projectId].count;

    const message = `${count} task${count > 1 ? 's' : ''} updated in Project ${projectId}`;
    saveNotificationToDB(projectId, message);

    delete batchStore[projectId];
  }, 3000);
};

async function saveNotificationToDB(projectId, message) {
  await Notification.create({
    message,
    projectId
  });
  console.log(`[BATCHED NOTIFICATION] ${message}`);
}

export default {
  trackTaskUpdate
};
