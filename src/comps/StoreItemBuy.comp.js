//
import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { getAllStoreItems_action, createNewBuy_action } from '../actions'

const StoreItemBuyComp = ()=>{
    const dispatch = useDispatch()

    const storeData = useSelector( state=>state.storeData )

    const [quantity, setQuantity] = useState('')
    const [inDate, setInDate] = useState('')
    const [selectedItem, setSelectedItem] = useState({name:'',company:'', price:'0'})

    useEffect( () => {
        dispatch( getAllStoreItems_action() )
    }, [storeData.storeItems.length] )

    
    const onBuyClick = ()=>{
        const newBuy = {
            store_item_id : selectedItem.id,
            quantity : quantity,
            bought_on : inDate
        }
        dispatch( createNewBuy_action(newBuy) )
    }


    return(
        <React.Fragment>
            <div>
                <div> StoreItem Buy </div>
                <Container maxWidth="sm">
                    <Paper elevation={3} style={{padding:20}}>
                        
                        <form style={{margin:'1em'}} noValidate autoComplete="off">
                            <Typography variant="h4"> Buy </Typography>
                        </form>

                        <form style={{margin:'1em'}} noValidate autoComplete="off">
                            <Typography variant="h6"> { selectedItem.name + '-' + selectedItem.company } </Typography>
                        </form>
                        <form style={{margin:'1em'}} noValidate autoComplete="off">
                            <TextField label="Quantity" variant="outlined" fullWidth onChange={ event => setQuantity(event.target.value)  } />
                        </form>
                        <form style={{margin:'1em'}} noValidate autoComplete="off">
                            <TextField type="date" variant="outlined" fullWidth onChange={ event => setInDate(event.target.value)  } />
                        </form>
                        <form style={{margin:'1em'}} noValidate autoComplete="off">
                            <Button variant="contained" color="primary" onClick={onBuyClick}> Buy </Button>
                        </form>
                        <div> Total cost - { selectedItem.price * quantity } </div>
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

                <div style={{marginBottom:'5em'}} /> 

                
                {/* JSON.stringify(storeData.storeItems) */}
            </div>
        </React.Fragment>
    )
}


export default connect()(StoreItemBuyComp)