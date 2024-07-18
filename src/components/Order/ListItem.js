import React, { useEffect, useState } from 'react';
import { TableRow } from '@mui/material';
import { TableCell } from '@material-ui/core';
import RatingInput from '../rateAndReviewForm/RatingInput';
import { Button } from '@mui/material';
import { Timeline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const ListItem = ({item}) => {
    const [items, setItem] = useState(item);
    useEffect(()=>{
        console.log(item);
        setItem(item);
    },[item]);
    return (<>
        {
            items?.map((product)=>{
        return(<><TableRow>
            <TableCell>
            <div>
                <div>{product?.productName}</div>
                {product?.review?
                    <div><Rating
                    name="read-only"
                    value={product?.review?.rating}
                    readOnly
                /></div>:
                <div><Link to="/rateAndReview"><Button className='AddReviewButton' style={{backgroundColor:"#CF7D08",color:"white"}}>Rate and Review</Button></Link></div>}
            </div>
            </TableCell>
            <TableCell>
            <div>
            <img src={product?.productImage} alt={product?.productImage} width={"50px"} height={"50px"} style={{borderRadius: "50%"}} />
            </div>
            </TableCell>
            <TableCell>{product?.quantity}</TableCell>
            <TableCell>{product?.price}</TableCell>
        </TableRow>
        </>    
    )
            })
        }
        </>
    )
};

export default ListItem;