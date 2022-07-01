import { Box } from '@mui/system';
import React, { useRef, useState } from 'react';
import Form from './Form';
import { useParams } from 'react-router'

const Update = () => {
  const [errorEmail,setErrorEmail]=useState(false);
    const[errorPhone,seterrorPhonePhone]=useState(false)
    const[billing,setBilling]=useState({})
    const {id}=useParams()
    const nameRef=useRef();
  const emailRef=useRef();
  const phoneRef=useRef();
  const ammountRef=useRef();

  const handleName=e=>{
    const updatedName=e.target.value;
    const updatedBilling={name:updatedName,email:billing.email,phone:billing.phone,ammount:billing.ammount}
    setBilling(updatedBilling);
  }
  const handleEmail=e=>{
    const updatedEmail=e.target.value;
    const updatedBilling={name:billing.name,email:updatedEmail,phone:billing.phone,ammount:billing.ammount}
    setBilling(updatedBilling);
    const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (regex.test(updatedEmail)) {
      setErrorEmail(false)
    }
    else{
      setErrorEmail(true)
    }
  }
  const handlePhone=e=>{
    const updatedPhone=e.target.value;
    const updatedBilling={name:billing.name,email:billing.email,phone:updatedPhone,ammount:billing.ammount}
    setBilling(updatedBilling);
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (regex.test(updatedPhone)) {
      seterrorPhonePhone(false)
    }
    else{
      seterrorPhonePhone(true)
    }
  }
  const handleAmmount=e=>{
    const updatedAmmount=e.target.value;
    const updatedBilling={name:billing.name,email:billing.email,phone:billing.phone,ammount:updatedAmmount}
    setBilling(updatedBilling);
  }
    const handleSubmit= e =>{
        const url= `https://friendly-parliament-64654.herokuapp.com/update-billing/${id}`
        fetch(url,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(billing)
        })
    .then(res=>res.json())
    .then(data=>{
      if (errorEmail) {
        alert('Please input a valid email')
        return
      }
      if (errorPhone) {
        alert('phone number should be 11 character')
        return
      }
        if (data.modifiedCount>0) {
            alert('update successfully')
        }
    })
    e.preventDefault()  
}
    return (
        <Box>
            <Form handleSubmit={handleSubmit} nameRef={nameRef} emailRef={emailRef} phoneRef={phoneRef} ammountRef={ammountRef} handleName={handleName} handleEmail={handleEmail} handlePhone={handlePhone} handleAmmount={handleAmmount}></Form>
        </Box>
    );
};

export default Update;