import React, { useState, useEffect, useRef, useContext } from 'react'
import { Table, Button, Form, Input, Modal } from 'antd'
import ajax from '../../../../utils/ajax'
import { DeleteOutlined } from '@ant-design/icons';
const { confirm } = Modal

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
export default function NewsSort () {
  const [categoryList, setCategoryList] = useState([])
  useEffect(() => {
    ajax.get(`/api/categories`).then(res => {
      setCategoryList(res.data)
    })
  }, [])
  const handleSave = (record) => {
    setCategoryList(categoryList.map(item => {
      if (item.id === record.id) {
        return {
          id: record.id,
          value: record.title,
          title: record.title
        }
      }
      return item
    }))
    ajax.patch(`/api/categories/${record.id}`, {
      value: record.title,
      title: record.title
    })
  }
  const handleDelete = (item) => {
    confirm({
      title: '确定删除',
      content: '确定删除该项吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setCategoryList(categoryList.filter(c_item => {
          return c_item.id !== item.id
        }))
        ajax.delete(`/api/categories/${item.id}`)
      }
    })
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      key: 'title',
      onCell: (record) => (
        {
          record,
          editable: true,
          dataIndex: 'title',
          title: '栏目名称',
          handleSave: handleSave,
        }
      )
    },
    {
      title: '操作',
      render: (item) => {
        return <Button danger shape='circle' icon={<DeleteOutlined />} onClick={() => { handleDelete(item) }}></Button>
      }
    }
  ]
  return (
    <Table
      components={{
        body: {
          row: EditableRow,
          cell: EditableCell
        }
      }}
      dataSource={categoryList}
      columns={columns}
      rowKey={item => item.id}
      pagination={{
        pageSize: 5
      }}
    />
  )
}
