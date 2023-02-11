import React, {Component} from 'react'
import './Signup.css'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Authservices from '../services/Authservices';

const authservice = new Authservices();

class Signin extends Component {
    constructor(){
        super()
        this.state={
            UserName:'',
            Password:'',
        }
    }

    handleValues=(e)=>{
        const{name,value}=e.target
        this.setState({[name]:value});
        }

        CheckValidity(){

            this.setState({
                UserNameFlag:false,
                PasswordFlag:false,              
            })
            
            if(this.state.UserName===""){
                this.setState({UserNameFlag:true})
            }
            if(this.state.Password===""){
                this.setState({PasswordFlag:true})
            }
            }
            handleSubmit = (e) =>{
                this.CheckValidity()
                if(this.state.UserName!==''&& this.state.Password!==''){
                    console.log('Acceptable');
            
                    let data = {
                        "username": this.state.UserName,
                        "password": this.state.Password,
                      }
                    authservice.SignIn(data).then((data)=>{
                        console.log('data:',data)
                        if(data.data.isSuccess){
                        window.location.href="/HomePage";
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
        return(
            <div className='signup-container'>
            <div className='signup-subcontainer'>
                <div className='header'>
                    Sign In
                </div>
                <div className='body'>
                    <form className='form'>
                        <TextField name="UserName" error={this.state.UserNameFlag} style={{ margin: 10 }} id="outlined-basic" label="Username" variant="outlined" size='small' value={this.state.UserName} onChange={this.handleValues} />
                        <TextField name="Password" error={this.state.UserNameFlag} style={{ margin: 10 }} id="outlined-basic" label="Password" variant="outlined" size='small' value={this.state.Password} onChange={this.handleValues} />

                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            className="customradio"
                        >
                            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="User" control={<Radio />} label="User" />                            
                        </RadioGroup>
                    </form>
                </div>
                <div className='footerbutton'>
                <Button variant="contained" className='btn' onClick={this.handleSubmit}>Sign In</Button>
                <Button className='btn'>Create New Account</Button>
                </div>
            </div>
        </div>
        )
        }
}
export default Signin;