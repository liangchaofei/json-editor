import React, { useEffect, useState, useRef } from "react";
import { Card, Space, Button, Modal, Popconfirm, message } from 'antd'
// import { getThemeJson } from '@/services/theme/api'
import { TableData, DataType } from '../config'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import MonacoDiffEditor from '../components/MonacoDiffEditor';



const DefaultData =
`
{
  Button: {
    colorPrimary: '#fff'
  }
}
`

const ThemeEdit = () => {
  const editorRef:any = useRef(null);
  const [code, setCode] = useState(DefaultData);


  const [visible, setVisible] = useState(false)
  const [data, setData] = useState<DataType>({
    key: '',
    name: '',
    theme: '',
    owner: '',
    link: '',
  })
  useEffect(() => {
    const urlParams = new URL(window.location.href).searchParams;
    const id = urlParams.get('id');
    const targetData: DataType | undefined = TableData.find(item => item.key === id);
      setData(targetData)
    }, [])

  useEffect(() => {
    // 初始化编辑器实例
    const editor = monacoEditor.editor.create(editorRef?.current, {
      value: code,
      language: 'json',
    });

    // 注册 JSON 语言
    monacoEditor.languages.register({
      id: 'json',
    });

    monacoEditor.languages.setLanguageConfiguration('json', {
      brackets: [
        ['{', '}'], // 大括号
        ['[', ']'], // 方括号
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '"', close: '"', notIn: ['string'] }, // 在字符串中不自动关闭
      ],
    });

    // 监听编辑器内容变化事件
    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      console.log('code', code)
      setCode(code);
    });

    return () => {
      // 销毁编辑器实例
      editor.dispose();
    };
  }, []);

  // diff
  const handleDiff = () => setVisible(true)

  // 发布
  const handlePublish = () => {
    console.log('发布',code)
    message.success('发布成功')
  }
  return (
    <Card title={data?.name} extra={
      <Space>
        <Button type="primary" onClick={handleDiff}>Diff</Button>
        <Popconfirm
          title="确认要发布吗?"
          onConfirm={handlePublish}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary">发布</Button>
        </Popconfirm>
      </Space>
    }>
      <div ref={editorRef} style={{ width: '100%', height: '600px' }} />
      <Modal
        open={visible}
        title="Diff"
        onOk={() => setVisible(true)}
        onCancel={() => setVisible(false)}
        width="1000"
        footer={null}
      >
        <MonacoDiffEditor originalCode={DefaultData} modifiedCode={code} />
      </Modal>
    </Card>
  )
}

export default ThemeEdit;
