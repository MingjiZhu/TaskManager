import React, { Dispatch, SetStateAction } from 'react';
import { FormattedMessage } from 'umi';
import { ModalForm, ProFormDateTimeRangePicker, ProFormText } from '@ant-design/pro-form';
import type { TaskItem } from '../data';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TaskItem>;

export type UpdateFormProps = {
  type: string;
  currentTask?: TaskItem;
  modalVisible: boolean;
  onVisibleChange?: Dispatch<SetStateAction<boolean>>;
  onSubmit?: (values: FormValueType) => Promise<void>;
};

const CreateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <ModalForm
      title={`${props.type} Task`}
      width="400px"
      visible={props.modalVisible}
      onVisibleChange={props.onVisibleChange}
      onFinish={props.onSubmit}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.manageTask.updateForm.taskName.nameTasks"
              />
            ),

          },
        ]}
        placeholder="Task Name"
        width="md"
        name="name"
        allowClear={true}
        initialValue={props.currentTask && props.currentTask.name ? props.currentTask.name : ''}
      />
      <ProFormDateTimeRangePicker
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.manageTask.updateForm.timeTasks"
              />
            ),
          },
        ]}
        width="md"
        name="dateTimeRange"
        initialValue={[props.currentTask && props.currentTask.startAt ? props.currentTask.startAt : null,
        props.currentTask && props.currentTask.endAt ? props.currentTask.endAt : null]}
      />
    </ModalForm>
  )
};

export default CreateForm;
