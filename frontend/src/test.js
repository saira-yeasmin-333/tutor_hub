import React,{useEffect, useRef, useState} from 'react'
import {getProducts} from "../action/analytics";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PhoneIcon from '@mui/icons-material/Phone';
import {dataEntryDone, getProductsForDataEntry, getSalesForDataEntry} from "../action/sale";
import {Button, Grid, LinearProgress, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {showToast} from "../App";

const Sales=props=>{

    const [loading,setLoading]=useState(false)
    const [sales,setSales]=useState([])

    const initialize=async ()=>{
        setLoading(true)
        setSales([])
        const res=await getSalesForDataEntry()
        if(res!==null) {
            setSales(res)
            setLoading(false)
        }
    }

    const doneSale=id=>{
        var arr=[]
        sales.map(p=>{
            if(p.id!==id)
                arr.push(p)
        })
        setSales(arr)
    }

    useEffect(()=>{
        initialize()
    },[])



    return(
        <Grid container spacing={1} padding={1}>
            {
                loading?(
                    <LinearProgress/>
                ):(
                    <div/>
                )
            }
            <Grid item xs={12}>
                <Paper sx={{padding:'10px'}}>
                    <Button
                        style={{marginLeft:'10px'}}
                        color={'primary'}
                        variant={'contained'}
                        disabled={loading}
                        onClick={initialize}
                    >
                        Refresh
                    </Button>
                </Paper>
            </Grid>
            {
                sales.map(p=>{
                    return(
                        <Grid item xs={12} md={4}>
                            <div>
                                Teacher {p.name}<br/>
                                Location: {p.location}
                            </div>


                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

const Sale=props=>{
    const [loading,setLoading]=useState(false)
    const setDataEntry=async ()=>{
        setLoading(true)
        var res=await dataEntryDone({id:props.order.id})
        if(res){
            showToast('Data Entry Processed')
            props.done(props.order.id)
        }else
            showToast('Data Entry Error')
        setLoading(false)
    }

    return(
        <Paper style={{padding:'10px'}}>
            <Grid container spacing={1} padding={1}>
                <Grid item xs={12}>
                    <Typography variant={'body'}>
                        Product: {props.order.product_name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'h6'}>
                        <ContentCopyIcon color={'primary'} style={{cursor:'pointer'}} onClick={()=>{ navigator.clipboard.writeText(props.order.name)}}/> Name: {props.order.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'h6'}>
                        <ContentCopyIcon color={'primary'} style={{cursor:'pointer'}} onClick={()=>{ navigator.clipboard.writeText(props.order.phone)}}/> Phone: {props.order.phone}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'h6'}>
                        <ContentCopyIcon color={'primary'} style={{cursor:'pointer'}} onClick={()=>{ navigator.clipboard.writeText(props.order.address)}}/> Address: {props.order.address}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'body'}>
                        Ordered at: {new Date(props.order.timestamp*1000).toLocaleString()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <a href={"tel:"+props.order.phone}><PhoneIcon style={{cursor:'pointer'}} color={'primary'}/></a>
                    <Button
                        variant={'outlined'}
                        color={'primary'}
                        style={{float:'right'}}
                        disabled={loading}
                        onClick={setDataEntry}
                    >
                        Build
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Sales