import React, { useEffect, useRef } from 'react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'

interface IProps {
  originalCode: string;
  modifiedCode: string;
}

function MonacoDiffEditor(props: IProps) {
  const { originalCode, modifiedCode } = props;
  const editorRef: React.MutableRefObject<null>= useRef(null);

  useEffect(() => {
    // 初始化编辑器实例
    const editor = monacoEditor.editor.createDiffEditor(editorRef?.current, {
      automaticLayout: true,
      language: 'json',
    });

    // 设置原始代码和修改后的代码
    const originalModel = monacoEditor.editor.createModel(originalCode, 'plaintext');
    const modifiedModel = monacoEditor.editor.createModel(modifiedCode, 'plaintext');

    editor.setModel({
      original: originalModel,
      modified: modifiedModel,
    });

    return () => {
      // 销毁编辑器实例和模型
      editor.dispose();
      originalModel.dispose();
      modifiedModel.dispose();
    };
  }, [originalCode, modifiedCode]);

  return <div ref={editorRef} style={{ width: '100%', height: '600px' }} />;
}

export default MonacoDiffEditor;
