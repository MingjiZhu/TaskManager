import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Card } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import type { TaskItem } from './data.d';
import { queryTask, addTask, removeTask } from './service';
import { Column } from '@ant-design/charts';

/**
 * add task
 *
 * @param fields
 */
const handleAdd = async (fields: TaskItem) => {
  const hide = message.loading('Creating...');
  try {
    await addTask({ ...fields });
    hide();
    message.success('Created Successfully!');
    return true;
  } catch (error) {
    hide();
    message.error('Created Failed!');
    return false;
  }
};

/**
 * delete task
 *
 * @param id
 */
const handleRemove = async (task: TaskItem) => {
  const hide = message.loading('Deleting...');
  if (!task) return true;
  try {
    await removeTask({
      id: task.id,
    });
    hide();
    message.success('Deleted Successfully!');
    return true;
  } catch (error) {
    hide();
    message.error('Update Failed!');
    return false;
  }
};

const TableList: React.FC = () => {
  /** add task modal */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<TaskItem>();
  const [tasks, setTasks] = useState<TaskItem[]>();
  const actionRef = useRef<ActionType>();

  const salesData = [];
  for (let i = 0; i < 12; i += 1) {
    salesData.push({
      x: `${i + 1}月`,
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }

  const columns: ProColumns<TaskItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.manageTask.updateForm.taskName.nameLabel"
        />
      ),
      dataIndex: 'name',
    },
    {
      title: (
        <FormattedMessage id="pages.manageTask.startAt" />
      ),
      sorter: true,
      dataIndex: 'startAt',
      valueType: 'dateTime',
    },
    {
      title: (
        <FormattedMessage id="pages.manageTask.endAt" />
      ),
      sorter: true,
      dataIndex: 'endAt',
      valueType: 'dateTime',
    },
    {
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key="delete" onClick={() => {
          handleRemove(record);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}>
          <FormattedMessage id="pages.manageTask.delete" />
        </a>,
      ],
    },
  ];

  useEffect(() => {
    setCurrentTask(currentTask)
  }, [currentTask]);

  const data: { id: number; hour: number; work: string; date: string; }[] = [];
  const renderTasks = tasks?.map(i => data.push(
    {
      id: i.id,      
      hour: Math.abs(new Date(i.endAt) - new Date(i.startAt)) / 36e5,
      work: i.name,
      date:`${i.endAt.toString().substring(0,10)}`
    }))
  var config = {
    data: data,
    xField: 'date',
    yField: 'hour',
    isGroup: true,
    isStack: true,
    seriesField: 'work',
    groupField: 'date',
  };
  return (
    <PageContainer>
      <Card>
        <Column {...config} />
      </Card>
      <ProTable<TaskItem>
        headerTitle={"Task List"}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.manageTask.createForm.newTask" />
          </Button>,
        ]}
        request={(params, sorter, filter) => queryTask({ ...params, sorter, filter })}
        columns={columns}
        onLoad={(value) => setTasks(value)}
      />
      {/* Add Task */}
      <CreateForm
        type="Create"
        modalVisible={createModalVisible}
        onVisibleChange={handleCreateModalVisible}
        onSubmit={async (value) => {
          const modifyValue = {
            name: value.name,
            startAt: value && value.dateTimeRange && value.dateTimeRange[0] ? value.dateTimeRange[0] : null,
            endAt: value && value.dateTimeRange && value.dateTimeRange[1] ? value.dateTimeRange[1] : null,
          }
          const success = await handleAdd(modifyValue as TaskItem);
          if (success) {
            handleCreateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
    </PageContainer>
  );
};

export default TableList;


