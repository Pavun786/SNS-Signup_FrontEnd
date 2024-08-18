import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import { useNavigate,Link} from "react-router-dom";
import * as yup from "yup";
import {API} from "./Global";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const RegisterValidationSchema = yup.object({
    FirstName:yup.string().required(),
    LastName:yup.string().required(),
    Email:yup.string().required(),
    Mobile:yup.number().required(),
    Password:yup.string().required(),
    Role : yup.number().required()
       
   });
  export function Register(){
    
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(true);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const formik = useFormik({
        initialValues:{
            FirstName:"",
            LastName : "",
            Email:"",
            Mobile : "",
            Password:"",
            Role : ""
        },
   
        validationSchema:RegisterValidationSchema,

       onSubmit:async (values)=>{
        console.log(values)
       
        const signup = await fetch(`${API}/auth/register`,{
            method:"POST",
            body:JSON.stringify(values),
            headers:{"Content-type": "application/json"},
      
           })
           if (signup.status === 500) {
            alert(signup.message);
          
          } else
           { 
            const result=await signup.json() 
            alert("User Registered Successfully..")
            navigate("/");
           }
       }
    });
     
    return(
        <div >
            <h3 className='register'>Register</h3>
            <form className='register-container'onSubmit={formik.handleSubmit}>
          <TextField id="outlined-basic" 
          label="FirstName" 
          variant="outlined" 
          value={formik.values.FirstName}
            onChange={formik.handleChange}
            name="FirstName"
            onBlur={formik.handleBlur} 
            //here error & helpertext is Meterial UI feature word..
            error={formik.touched.FirstName && formik.errors.FirstName}
            helperText={formik.touched.FirstName && formik.errors.FirstName ? formik.errors.FirstName : null}/>

        <TextField id="outlined-basic" 
          label="LastName" 
          variant="outlined" 
          value={formik.values.LastName}
            onChange={formik.handleChange}
            name="LastName"
            onBlur={formik.handleBlur} 
            //here error & helpertext is Meterial UI feature word..
            error={formik.touched.LastName && formik.errors.LastName}
            helperText={formik.touched.LastName && formik.errors.LastName ? formik.errors.LastName : null}/>
  

          <TextField id="outlined-basic" 
          label="Email" 
          variant="outlined"
          value={formik.values.Email}
            onChange={formik.handleChange}
            name="Email" 
            onBlur={formik.handleBlur} 
            //here error & helpertext is Meterial UI feature word..
            error={formik.touched.Email && formik.errors.Email}
            helperText={formik.touched.Email && formik.errors.Email ? formik.errors.Email : null}/>

        <TextField id="outlined-basic" 
          label="Mobile" 
          variant="outlined"
          value={formik.values.Mobile}
            onChange={formik.handleChange}
            name="Mobile" 
            onBlur={formik.handleBlur} 
            //here error & helpertext is Meterial UI feature word..
            error={formik.touched.Mobile && formik.errors.Mobile}
            helperText={formik.touched.Mobile && formik.errors.Mobile ? formik.errors.Mobile : null}/>


       <TextField id="outlined-basic" 
          label="Password" 
          variant="outlined"
          type={showPassword ? 'password' : "text"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                 // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={formik.values.Password}
            onChange={formik.handleChange}
            name="Password" 
            onBlur={formik.handleBlur} 
            //here error & helpertext is Meterial UI feature word..
            error={formik.touched.Password && formik.errors.Password}
            helperText={formik.touched.Password && formik.errors.Password ? formik.errors.Password : null}/>
           

        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.Role}
          label="Role"
          onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldValue('Role', e.target.value);
            }}
          error={formik.touched.Role && formik.errors.Role}
          helperText={formik.touched.Role && formik.errors.Role ? formik.errors.Role : null}
          >
        
          <MenuItem value={1}>Admin</MenuItem>
          <MenuItem value={2}>User</MenuItem>
          <MenuItem value={3}>Guest</MenuItem>
          
        </Select>


          <Button type="submit" variant="contained">submit</Button>
          
          <p> If you have an account <Link to="/">Click-Here</Link> </p>
     
          </form>
        </div>
    )
 }
 