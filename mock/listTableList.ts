// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';
import { TaskItem, TaskListParams } from '@/pages/ManageTask/data';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: TaskItem[] = [];

  const randomDateTime = (start: Date, end: Date, startHour: number, endHour: number) => {
    const date = new Date(+start + Math.random() * (end.getDate() - start.getDate()));
    const hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
  }
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: index,
      name: `task ${index + 1}`,
      startAt: randomDateTime(new Date(2021, index + 1, index), new Date(2021, index + 1, index), 8, 12),
      endAt: randomDateTime(new Date(2021, index + 1, index), new Date(2021, index + 1, index), 13, 17),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 10);

function getTask(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as TaskListParams;

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const sorter = JSON.parse(params.sorter as any);
  if (sorter) {
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }
  if (params.startAt) {
    dataSource = dataSource.filter((data) => data.startAt.toISOString().substring(0, 10) == params.startAt?.toString().substring(0, 10) ? data : '')
  }
  if (params.endAt) {
    dataSource = dataSource.filter((data) => data.endAt.toISOString().substring(0, 10) == params.endAt?.toString().substring(0, 10) ? data : '')
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postTask(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, startAt, endAt, id } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => item.id != id);
      break;
    case 'post':
      (() => {
        const newTask = {
          id: tableListDataSource.length,
          name,
          startAt,
          endAt,
        };
        tableListDataSource.unshift(newTask);
        return res.json(newTask);
      })();
      return;
    case 'update':
      (() => {
        let newTask = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.id === id) {
            newTask = { ...item, name, startAt, endAt };
            return { ...item, name, startAt, endAt };
          }
          return item;
        });
        return res.json(newTask);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/task': getTask,
  'POST /api/task': postTask,
};
