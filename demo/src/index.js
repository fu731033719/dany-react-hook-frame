import React, { Component, useState} from 'react'
import {render} from 'react-dom'
import { Button, Spin, Result, Input } from 'antd';
import 'antd/dist/antd.css';
import './index.css'
import { useAsyncTask } from '../../src'

const Demo = () => {
  const [id, setId] = useState(1);
  const [editValue, setEditValue] = useState('修改返回值');
  function addID() {
    setId(id + 1);
  }

  function reduceId() {
    setId(id - 1);
  }
 
  async function testFunction() {
    const result = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (result.status !== 200) {
      throw new Error('bad status = ' + result.status);
    }
    return result.json();
  }
  const moduleStateTest = useAsyncTask(testFunction, [id]);

  function inputChange (e) {
    setEditValue(e.target.value);
  }

  function editData() {
    let preData = { ...moduleStateTest.data };
    preData.body = editValue;
    moduleStateTest.setData(preData);
  }
  console.log(moduleStateTest);
  const ResultPanel = () => {
    let panelJsx = null
    moduleStateTest.error ? panelJsx = <Result
      status="error"
      title="请求失败" />
    :
    panelJsx = <Result
      status="success"
      title="请求成功"
      subTitle={moduleStateTest.data ? moduleStateTest.data.body : ''}
    />
    return panelJsx;
  }
  return <div className="test-block">
    <Spin spinning={moduleStateTest.loading}>
      {ResultPanel()}
      <p>ID:{id}</p>
      <Input placeholder="输入修改值" onChange={(e) => { inputChange(e) }} style={{ width: '300px'}}/>
      <Button type="primary" onClick={() => addID()}>add id</Button>
      <Button type="danger" onClick={() => reduceId()}>reduce id</Button>
      <Button onClick={() => editData()}>edit data</Button>
    </Spin>
  </div>
}

render(<Demo/>, document.querySelector('#demo'));
