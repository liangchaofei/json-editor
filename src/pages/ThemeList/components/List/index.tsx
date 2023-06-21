import React from 'react';
import { Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { history } from '@umijs/max';
import { TableData, DataType } from '../../config'



const App: React.FC = () => {
  // 复制
  const handleCopy = () => {
    message.success('复制成功')
  }

  // 编辑
  const handleEdit = (record: DataType) => {
    console.log('record', record)
    history.push(`/theme/edit?id=${record.key}`)
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '平台',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '主题',
      dataIndex: 'theme',
      key: 'theme',
    },
    {
      title: '负责人',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <CopyToClipboard text={record.link} onCopy={handleCopy}>
             <a>复制</a>
          </CopyToClipboard>
          <a onClick={() => handleEdit(record)}>编辑</a>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={TableData} />
};

export default App;
