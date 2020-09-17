//
import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

import StoreItemReportComp from './StoreItemReport.comp'

import { getAllStoreItems_action, 
            getTransactionsOfItemId_action } from '../actions'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const StoreReportComp = ()=>{
    const dispatch = useDispatch()
    
    const appMessages = useSelector( state=>state.messages )
    const storeData = useSelector( state=>state.storeData )

    const [itemId, setItemId] = useState('')
    const [theDate, setTheDate] = useState('')
    const [selectedItem, setSelectedItem] = useState({name:'',company:'', price:'0'})
    const [open, setOpen] = useState(false)

    useEffect( () => {
        dispatch( getAllStoreItems_action() )
    }, [storeData.storeItems.length] )

    const onShowDetails = ()=>{
        //console.log('onShowDetails ', itemId, theDate)
        //console.log( selectedItem )
        
        // open the report View
        setOpen(true)
        // call database and get the reports
        dispatch( getTransactionsOfItemId_action(selectedItem.id) )      
    }

    const handleClose = ()=> setOpen(false)

    return(
        <React.Fragment>
            <div style={{marginTop:20}} />
            
            <Dialog fullScreen open={open} TransitionComponent={Transition}>
                <StoreItemReportComp item={selectedItem} bought={storeData.itemBought} sold={storeData.itemSold} onClose={handleClose} />
            </Dialog>

            
            {/* JSON.stringify(storeData.itemBought) */}
            {/* JSON.stringify(storeData.itemSold) */}

            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    { selectedItem.id }-{ selectedItem.name }
                    {/*
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField label="Item Id" variant="outlined" fullWidth onChange={ event => setItemId(event.target.value)  } />
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <TextField type="date" variant="outlined" fullWidth onChange={ event => setTheDate(event.target.value)  } />
                    </form>
                    */}
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Button variant="outlined" color="primary" onClick={()=>(onShowDetails()) }> Show Details </Button>
                    </form>
                </Paper>
            </Container>
            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        {
                            storeData.storeItems.map( item=>(
                                <Button key={item.id} fullWidth variant="outlined" color="primary" onClick={ ()=>setSelectedItem(item) }> {item.id}-{item.name}-{item.company}--{item.price} </Button>
                            ) )
                        }
                    </form>
                </Paper>
            </Container>
        </React.Fragment>
    )
}

export default connect()(StoreReportComp)