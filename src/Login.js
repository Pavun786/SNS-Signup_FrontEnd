import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import { Navigate, useNavigate,Link } from "react-router-dom";
import * as yup from "yup";
import {API} from "./Global";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginValidationSchema = yup.object({
   
    Email:yup.string().required(),
    Password:yup.string().required()
       
   });
  export function Login(){

    
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(true);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

    const formik = useFormik({
        initialValues:{
           
            Email:"",
            Password:""
        },
   
        validationSchema:LoginValidationSchema,

       onSubmit:async (values)=>{
        console.log(values)
         const data = await fetch(`${API}/auth/login`,{
            method:"POST",
            body:JSON.stringify(values),
            headers:{"Content-type": "application/json"},
      
           })
         
          if (data.status === 500) {
            console.log(" ❌ Error ");
            alert("UnAuthorized")
          }
           else {
             const result = await data.json();
            console.log("Success",result);
            localStorage.setItem("token",result.token);//after login we set this token in localstorage
            localStorage.setItem("Role",result.Role)
            localStorage.setItem("Name",result.Name)
            navigate("/users");
            if(result.Role == 1){
              alert("Admin Login Successfully")
            }else{
              alert("User Login Successfully")
            }
           
          }
         }
    });

    const handleGuestLogin = async() => {
       
        const guestCredentials = {
            Email: "guest@gmail.com",
            Password: "password"
        };

          try {
            const data = await fetch(`${API}/auth/login`, {
                method: "POST",
                body: JSON.stringify(guestCredentials),
                headers: { "Content-type": "application/json" },
            });

            if (data.status === 500) {
                console.log(" ❌ Error ");
                alert("UnAuthorized");
            } else {
                const result = await data.json();
                console.log("Success", result);
                localStorage.setItem("token", result.token); 
                localStorage.setItem("Role", result.Role);
                localStorage.setItem("Name",result.Name)
                alert("Guest login successfully.!")
                navigate("/users");
            }
        } catch (error) {
            console.error("Guest login failed", error);
            alert("Guest login failed");
        }

    };
     
    return(
        <div >
            <h3 className='register'>Login</h3>
            <form className='register-container'onSubmit={formik.handleSubmit}>
          
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
          <Button type="submit" variant="contained">submit</Button>
          <Button onClick={handleGuestLogin} >Login as Guest</Button>
          <p>If you don't have an account <Link to="/register">Click-Here</Link></p>
          </form>
        </div>
    )
 }
 