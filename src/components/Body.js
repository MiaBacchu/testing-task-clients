import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import { Button, Modal } from '@mui/material';
import Form from './Form';
import { Link } from "react-router-dom";

const Body = () => {
  const [displayBillings,setDisplayBillings]=useState([]);
  const [billings,setBillings]=useState([]);
  const [insertedId,setInsertedId]=useState();
  const [page,setPage]=useState(0);
  const [pageCount,setPageCount]=useState(0);
  const nameRef=useRef();
  const emailRef=useRef();
  const phoneRef=useRef();
  const ammountRef=useRef();

  useEffect(()=>{
    fetch(`http://localhost:5000/list`)
    .then(res=>res.json())
    .then(data=>{
      setBillings(data);
    })
  },[insertedId,page]);
  
  useEffect(()=>{
    fetch(`http://localhost:5000/billing-list?page=${page}&&size=${10}`)
    .then(res=>res.json())
    .then(data=>{
      setDisplayBillings(data.result);
      const count = data.count;
      const pageNumber = Math.ceil(count/10);
      setPageCount(pageNumber);
    })
  },[insertedId,page]);


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    bbilling: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const handleSubmit= e =>{
    const name=nameRef.current.value;
    const email=emailRef.current.value;
    const phone=phoneRef.current.value;
    const ammount=ammountRef.current.value;
    const newBilling={
      name,email,phone,ammount
    }
    fetch('http://localhost:5000/add-billing',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newBilling)
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.insertedId){
        alert('user added successfully')
        setInsertedId(data.insertedId);
        e.target.reset();
      }
    });
    e.preventDefault();
  }
  const handleDelete=id=>{
    const url=`http://localhost:5000/delete-billing/${id}`;
    fetch(url,{
      method:'DELETE'
    })
    .then(res=>res.json())
    .then(data=>{
      if (data.deletedCount>0) {
        alert('deleted successfully')
        const remaining=billings.filter(billing=>billing._id!==id);
        setDisplayBillings(remaining);
      }
    })
  }
  const handleSearch=e=>{
    const searchText= e.target.value;
    const matchedBilling= billings.filter(billing=>billing.name.toLowerCase().includes(searchText.toLowerCase()) || billing.email.toLowerCase().includes(searchText.toLowerCase()) ||billing.phone.toLowerCase().includes(searchText.toLowerCase()));
    setDisplayBillings(matchedBilling);
  }
  return (
    <Box>
        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginTop:'3rem'}}>
            <Typography>Billings</Typography>
            <Input onChange={handleSearch} placeholder='search'></Input>
            <Button onClick={handleOpen}>Add new bill</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <Form handleSubmit={handleSubmit} nameRef={nameRef} emailRef={emailRef} phoneRef={phoneRef} ammountRef={ammountRef}></Form>
          </Box>
            </Modal>
          </Box>
          <Box sx={{marginTop:'3rem'}}>
          <table>
            <tr>
                    <th>Billing ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Paid Ammount</th>
                    <th>Action</th>
                </tr>
            {displayBillings.map((billing)=>
                <tr key={billing._id}>
                    <td>{billing._id}</td>
                    <td>{billing.name}</td>
                    <td>{billing.email}</td>
                    <td>{billing.phone}</td>
                    <td>{billing.ammount}</td>
                    <td>
                      <Link to={`/update-billing/${billing._id}`}>
                      <button>Edit</button>
                      </Link>
                    <button onClick={()=>handleDelete(billing._id)}>Delete</button></td>
                    
                </tr>
            )}
            </table>
            <div>
            {
          [...Array(pageCount).keys()]
          .map(number=><button
            key={number}
            style={{color: number===page ? 'white' : 'black',backgroundColor: number===page ? 'blue' : 'white',margin:'.5rem'}}
            onClick={()=>setPage(number)}
            >{number}</button>)
            }
        </div>
        </Box>
    </Box>
  );
};

export default Body;