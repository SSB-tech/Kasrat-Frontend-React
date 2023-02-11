import React, { Component } from 'react'
import './Signup.css'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Authservices from '../services/Authservices';

const authservice = new Authservices();
class Signup extends Component {
constructor(){
    super()
    this.state={
        UserName:'',
        Password:'',
        ConfirmPassword:'',
        Email:'',
        RoleValue:'User',
        UserNameFlag:false,
        PasswordFlag:false,
        ConfirmPasswordFlag:false,
        EmailFlag:false,
    }
}

handleValues=(e)=>{
const{name,value}=e.target
this.setState({[name]:value});
}

handleChangeRole = (e) =>{
    this.setState({RoleValue:e.target.value})           
}

CheckValidity(){

this.setState({
    UserNameFlag:false,
    PasswordFlag:false,
    ConfirmPasswordFlag:false,
    EmailFlag:false,
})

if(this.state.UserName===""){
    this.setState({UserNameFlag:true})
}
if(this.state.Password===""){
    this.setState({PasswordFlag:true})
}
if(this.state.ConfirmPassword===""){
    this.setState({ConfirmPasswordFlag:true})
}
if(this.state.Email===""){
    this.setState({EmailFlag:true})
}
}

handleSubmit = (e) =>{
    this.CheckValidity()
    if(this.state.UserName!==''&& this.state.Password!==''&& this.state.ConfirmPassword!==''){
        console.log('Acceptable');

        let data = {
            "userName": this.state.UserName,
            "password": this.state.Password,
            "confirmPassword": this.state.ConfirmPassword,
            "email": this.state.Email
          }
        authservice.SignUp(data).then((data)=>{
            console.log('data:',data)
            if(data.data.isSuccess){
            window.location.href="/SignIn";
            }
            
        }).catch((error)=>{
            console.log('Error:',error)
        })
    }
    else{
        console.log('Unacceptable');
    }
}
    render(){
        console.log('state:',this.state)
        return (
        <div className='signup-container'>
            <div className='signup-subcontainer'>
                <div className='header'>
                    Sign Up
                </div>
                <div className='body'>
                    <form className='form'>
                        <TextField name="UserName" error={this.state.UserNameFlag} style={{ margin: 10 }} id="outlined-basic" label="Username" variant="outlined" size='small' value={this.state.UserName} onChange={this.handleValues}/>
                        <TextField name="Email" error={this.state.EmailFlag} style={{ margin: 10 }} id="outlined-basic" label="Email" variant="outlined" size='small' value={this.state.Email} onChange={this.handleValues}/>
                        <TextField name="Password" error={this.state.PasswordFlag} style={{ margin: 10 }} id="outlined-basic" type="password" label="Password" variant="outlined" size='small' value={this.state.Password} onChange={this.handleValues}/>
                        <TextField name="ConfirmPassword" error={this.state.ConfirmPasswordFlag} style={{ margin: 10 }} id="outlined-basic" type="password" label="Confirm Password" variant="outlined" size='small' value={this.state.ConfirmPassword} onChange={this.handleValues}/>

                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            className="customradio"
                            value={this.state.RoleValue}
                            onChange={this.handleChangeRole}
                        >
                            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="User" control={<Radio />} label="User" />                            
                        </RadioGroup>
                    </form>
                </div>
                <div className='footerbutton'>
                <Button variant="contained" className='btn' onClick={this.handleSubmit}>Sign Up</Button>
                <Button className='btn'>Sign In</Button>
                </div>
            </div>
        </div>
    )
    }
}

export default Signup;
