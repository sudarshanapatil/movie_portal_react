import React from 'react'
import '../styles/LogsData.css';
import { Table } from 'react-bootstrap';

function LogsData(props) {
  return (
    <div className='container-fluid adminShowMovie'>
      <div className='adminTitleLogs'>
        <span className='goBack' onClick={() => props.goBack()}>
          <svg width="18" height="30" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg">
            <polyline points="5,1 1,5 5,9" style={{ stroke: '#333', strokeWidth: '0.8', strokeLinejoin: "round", strokeLinecap: "round", fill: "#fff" }}></polyline>
          </svg>
        </span>
        Change Logs For Admin
      </div>
      <div className='row movieTableContainer'>
        <Table className='movieTableContainer'>
          <thead>
            <tr>
              <th className='tableTitle'>User Name</th>
              <th className='tableTitle'>Action Date</th>
              <th className='tableTitle' >Api Url</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item =>
              <tr className="tableTitle" key={item['_id']}>
                <td>{item.username}</td>
                <td>{item.time}</td>
                <td>{item.apiUrl}</td>
              </tr>))}
          </tbody>
        </Table>
      </div>
    </div >
  );
}

export default LogsData;
