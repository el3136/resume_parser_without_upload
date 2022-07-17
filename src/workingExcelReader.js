import logo from './logo.svg';
import './App.css';
import * as XLSX from 'xlsx';
import React, { useState } from 'react';

function App() {

  const [items, setItem] = useState([]);

  const readExcel=(file)=>{
    const promise=new Promise((resolve,reject)=>{
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)

      fileReader.onload=(e)=>{
        const bufferArray = e.target.result;
        // workbook
        const wb = XLSX.read(bufferArray, {type: 'buffer'});
        // worksheet
        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      }

      // if filereader has an error
      fileReader.onerror = (error) => {
        reject(error);
      };
    })

    promise.then((d)=>{
      console.log(d);
      setItem(d);
    })
  }

  // Python, C, C++, Java, JavaScript, Rust, Golang, SQL

  return (
    <div>
      <input type="file" onChange={(e)=>{
        const file = e.target.files[0];
        readExcel(file);
      }} />

      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Languages</th>
            <th scope="col">Experience</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">

          {items.map((d)=>(
            <tr key={d.id}>
              <th>{d.id}</th>
              <td>{d.first_name}</td>
              <td>{d.last_name}</td>
              <td>{d.Languages}</td>
              <td>{d.Experience}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
}

export default App;
