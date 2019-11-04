import React, { Component, useState} from 'react'
import {render} from 'react-dom'
import { Button, Spin } from 'antd';
import 'antd/dist/antd.css';
import { useAsyncTask } from '../../src'

const Demo = () => {
  const [id, setId] = useState(1);
  
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

  return <div>
    <Spin spinning={moduleStateTest.loading}>
      <p>ID:{id}</p>
      <Button type="primary" onClick={() => addID()}>add id</Button>
      <Button type="danger" onClick={() => reduceId()}>reduce id</Button>
      <Button>edit data</Button>
    </Spin>
    
  </div>
}

render(<Demo/>, document.querySelector('#demo'));
