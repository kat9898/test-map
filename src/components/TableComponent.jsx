import React from 'react';
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { change } from '../reducers/activeRowSlice';
import {activeRowSelector} from '../selectors/selectors';
import data from '../data.json';

import './TableComponent.scss';
  
  const columns = [
    {
      title: 'Номер заявки',
      dataIndex: 'key',
      key: 'id',
    },
    {
      title: 'Координаты от lat',
      dataIndex: 'fromLat',
      key: 'fromLat',
    },
    {
      title: 'Координаты от lng',
      dataIndex: 'fromLng',
      key: 'fromLng',
    },
    {
      title: 'Координаты до lat',
      dataIndex: 'toLat',
      key: 'toLat',
    },
    {
      title: 'Координаты до lng',
      dataIndex: 'toLng',
      key: 'toLng',
    }
  ]

export const TableComponent = (props) => {
    const activeRow = useSelector(activeRowSelector);
    const dispatch = useDispatch();

    
    return (
        <div className='tableContainer'>
            <Table 
              dataSource={data} 
              columns={columns} 
              rowClassName={(row, index) => {
                return index === activeRow.id ? 'activeRow' : 'regularRow'}}
              bordered 
              pagination={{position: ["bottomCenter"], hideOnSinglePage: true}}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {dispatch(change({id: rowIndex, rowDetails: record}))}
                };
              }}
            />
        </div>
    )
}


export default TableComponent