//
import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import { createNewStoreItem_action } from '../actions'

const StoreItemAddNewComp = ()=>{
    const dispatch = useDispatch()

    const appMessages = useSelector( state=>state.messages )

    const [iCompany, setItemCompany] = useState('')
    const [iName, setItemName] = useState('')
    const [iPrice, setItemPrice] = useState('')

    const onCreateNewItem = ()=> { 
        console.log('onCreateNewItem')
        //console.log( iCompany, ':', iName, ':', iPrice )
        
        const item = {
            name: iName,
            price: iPrice,
            company: iCompany
        }
        //console.log('item', item)
        dispatch( createNewStoreItem_action(item) )
    }
    const getAllItems = ()=> console.log('getAllItems')

    return(
        <React.Fragment>
            <div style={{marginTop:20}} />
            {/*
            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Typography variant="h6"> Search Doctor By Id </Typography>
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Id" variant="outlined" fullWidth onChange={ event => setDocId(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Button variant="outlined" color="primary" onClick={onSearchDoctor}> Search </Button>
                    </form>
                    
                    <div>
                        <div> { clinicData.doctorWithId.name }</div>
                        <div> { clinicData.doctorWithId.specialization }</div>
                        <div> { clinicData.doctorWithId.phone }</div>
                        <div> { clinicData.doctorWithId.email }</div>
                        <div> { clinicData.doctorWithId.address }</div>
                    </div>

                    { 
                        clinicData.doctorWithId.id ? 
                            <form style={{margin:'1em'}} noValidate autoComplete="off">
                                <Button variant="contained" color="secondary" onClick={onDeleteDoctor}> Delete </Button>
                            </form>
                        : "Not Available" 
                     }
                    
                </Paper>
                <LinearProgress color="secondary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
            </Container>
            <div style={{marginTop:'1em'}} />
            */}
            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Typography variant="h6"> Add New Item </Typography>
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Company" variant="outlined" fullWidth onChange={ event => setItemCompany(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Name" variant="outlined" fullWidth onChange={ event => setItemName(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Price" variant="outlined" fullWidth onChange={ event => setItemPrice(event.target.value)  } />
                    </form>
                    

                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Button variant="outlined" color="primary" onClick={onCreateNewItem}> Add New Item </Button>
                    </form>
                    { appMessages.info }
                </Paper>
                <LinearProgress color="secondary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
            </Container>
            {/*
            <div style={{marginTop:'1em'}} />
            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    <Button onClick={ getAllItems }> Show All Items </Button>
                    {
                        clinicData.doctors.map( (doctor)=>(
                        <div key={doctor.id}>
                            <div>{doctor.id}-{doctor.name}-{doctor.phone}-{doctor.specialization}</div>
                        </div>
                        ) )
                    }
                </Paper>
                <LinearProgress color="secondary" variant={appMessages.isAppBusy ? "indeterminate" : "determinate" } value={0} />
            </Container>
            */}
            <div style={{marginBottom:20}} />
        </React.Fragment>
    )
}

export default connect()(StoreItemAddNewComp)