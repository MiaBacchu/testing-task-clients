import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import {Link} from "react-router-dom"

const Header = () => {
    const [total, setTotal]=useState([])
    const [value, setValue]=useState(0);
    console.log(value)
    useEffect(()=>{
        fetch(`http://localhost:5000/list`)
        .then(res=>res.json())
        .then(data=>{
            setTotal(data);
        });
        const ammount =total.map(total=>parseInt(total.ammount))
        let sum=0;
        for (let i = 0; i < ammount.length; i++) {
            sum += ammount[i];
            setValue(sum)  
        }
      },[total]);
    return (
        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginY:'3rem'}}>
            <Link to='/home'><button>Home</button></Link>
            <Typography>Paid Ammount : {value} </Typography>
        </Box>
    );
};

export default Header;