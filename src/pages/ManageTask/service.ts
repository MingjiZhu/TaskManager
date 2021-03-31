import request from '@/utils/request';
import type { TaskListParams, TaskItem } from './data.d';

export async function queryTask(params?: TaskListParams) {
  return request('/api/task', {
    params,
  });
}

export async function removeTask(params: { id: number}) {
  return request('/api/task', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addTask(params: TaskItem) {
  return request('/api/task', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateTask(params: TaskListParams) {
  return request('/api/task', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
