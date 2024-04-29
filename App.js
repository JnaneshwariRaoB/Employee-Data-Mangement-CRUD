 import logo from './logo.svg';

import React, { useEffect, useState } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';


function App() 
{

  const [data,setData]=useState([]);
  const [ fristName,setFristName ] = useState('');
  const [ lastName,setLastName ] = useState('');
  const [ age,setAge ] = useState(0);
  const [ id,setId ] = useState(0);
  const [ isUpadate,setIsUpdate ] = useState(false);

  useEffect(()=>{
    setData(EmployeeData)
  },[]);

const handleEdit=(id)=>{
  const dt= data.filter(item => item.id === id);
  if(dt !== undefined)
  {
    setIsUpdate(true);
    setId(id);
    setFristName(dt[0].fristName);
    setLastName(dt[0].lastName);
    setAge(dt[0].age);
  }
}

const handleDelete=(id)=>{

  if(id>0)
  {
    if(window.confirm("Are You sure to delete this item?"))
    {
    const dt=data.filter(item => item.id !== id);
    setData(dt);
    }
  }
}

const handleSave=(e)=>{
  let error='';
  if(fristName === '')
    error+='Frist name is required, ';

    if(lastName === '')
    error+='Last name is required, ';

    if(age <= 0)
    error+='Age name is required. ';

    if(error === '')
{
e.preventDefault();
const dt = [...data];
const newObject = {
  id :EmployeeData.length+1,
        fristName:fristName,
        lastName:lastName,
        age:age
}

dt.push(newObject);
setData(dt);
}
else{
  alert(error);
} 
}

const handleUpdate=()=>{
  const index = data.map((item)=>{
    return item.id
  }).indexOf(id);

  const dt =[...data];
  dt[index].fristName=fristName;
  dt[index].lastName=lastName;
  dt[index].age=age;

  setData(dt);
  
  handleClear();
}

const handleClear=()=>{
  setId(0);
  setFristName('');
  setLastName('');
  setAge('');
  setIsUpdate(false);

}





  return(
    <div className="App" >
      <h1 className="page-heading">CRUD Operation</h1>
      <div className='AppIn'>
      
      <div style={{display:'flex',justifyContent:'center'}}>
        <div style={{ marginLeft: '100px' }}>
          <label>FristName :
            <input type='text' placeholder='Enter Frist name' onChange={(e)=>setFristName(e.target.value)} value={fristName}/>
          </label>
        </div>
        
        <div style={{display:'flex',justifyContent:'center'}}>
        <div style={{ marginLeft: '100px' }}>
          <label>LastName :
            <input type='text' placeholder='Enter Last name' onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
          </label>
        </div></div>

        <div style={{display:'flex',justifyContent:'center'}}>
        <div style={{ marginLeft: '100px' }}>
          <label>Age :
            <input type='text' placeholder='Enter Age' onChange={(e)=>setAge(e.target.value)} value={age}/>
          </label>
        </div>
        </div>
        


        <div style={{ position: 'absolute', bottom: 20, left: 500 }}>
          {
            !isUpadate ?
            <button className='btn btn-primary' onClick={(e)=>handleSave(e)} style={{ marginLeft: '10px' }}>Save</button>
            :
            <button className='btn btn-primary' onClick={()=>handleUpdate()} style={{ marginLeft: '10px' }}>Update</button>
          }
          <button className='btn btn-danger' onClick={()=>handleClear()} style={{ marginLeft: '10px' }}>Clear</button>
        </div>
      </div>
      </div>
     <table className='table table-hover'  >
      
      <thead>
        <th colSpan="9" ><h1 className="table-heading" style={{ backgroundColor: 'lavender' ,color:'#333'}}>Employee List</h1></th>
        <tr>
          <td>Sr.No</td>
          <td>Id</td>
          <td>Frist Name</td>
          <td>Last Name</td>
          <td>Age</td>
          <td>Actions</td>
        </tr>
      </thead>

      <tbody >
        {
          data.map((item, index)=>{

        return(
            <tr key={index}>
              <td>{index+ 1}</td>
              <td>{item.id}</td>
              <td>{item.fristName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button className='btn btn-primary' onClick={(e)=>handleEdit(item.id)}>Edit</button>&nbsp;
                <button className='btn btn-danger' onClick={(e)=>handleDelete(item.id)}>Delete</button>
              </td>
            </tr>

        )
          })
        }
      </tbody>
      </table> 
    </div>
  );
}

export default App;




