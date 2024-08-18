import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import {API} from "./Global";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../src/App.css"

export function UserList(){

    const[data,setData]=useState([])
    const navigate = useNavigate()
   
   
    useEffect(()=>{
       fetch(`${API}/auth/all-users`,{
        method:"GET",
       })
      .then((data)=>data.json())
      .then((mv)=>setData(mv))
      },[])
    
      console.log(data)
   
   
    return(
        <div className="table">
          <h2>Login-Details</h2>
          <TableContainer component={Paper} >
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell align="right">UserName</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Mobile</TableCell>
            <TableCell align="right">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((ele,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="right">{ele.FirstName}</TableCell>
              <TableCell align="right">{ele.Email}</TableCell>
              <TableCell align="right">{ele.Mobile}</TableCell>
              <TableCell align="right">{ele.Role === 1 ? "Admin" : (ele.Role === 2 ? "User" : (ele.Role === 3 ? "Guest" : ""))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </div>
    )
}