import React from 'react';

const Form = ({handleSubmit,nameRef,emailRef,phoneRef,ammountRef,handleName,handleEmail,handlePhone,handleAmmount}) => {
    return (
        <form onSubmit={handleSubmit}>
              <input style={{height:'3rem',width:'80%'}} type='text' ref={nameRef} onChange={handleName} placeholder='name' required></input>
              <input style={{height:'3rem',width:'80%'}} type='email' ref={emailRef} onChange={handleEmail} placeholder='email' required></input>
              <input style={{height:'3rem',width:'80%'}} type='number' ref={phoneRef} onChange={handlePhone} placeholder='phone' required></input>
              <input style={{height:'3rem',width:'80%'}} type='number' ref={ammountRef} onChange={handleAmmount} placeholder='paid ammount' required></input>
              <br></br>
              <input style={{height:'3rem',width:'80%',backgroundColor:'blue',color:'white',fontSize:'2rem'}} type="submit" value="Submit"/>
            </form>
    );
};

export default Form;