// 
// StoreItemReport.comp.js
//

import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Divider from '@material-ui/core/Divider'


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },

    root: {
        flexGrow: 1,
    },
    paper: {
        height: 220,
        width: 300,
        padding: '2em',
    },
    control: {
        padding: theme.spacing(2),
    },
}));

const StoreItemReportComp = (props)=>{
    const classes = useStyles()

    const totalItemsBought = ()=>{
        let result = 0
        if(props.bought.length>=1){
            result = props.bought.reduce( (total,current)=>{ return ( Number(total) + Number(current.quantity) ) }, 0  ) 
        }
        return result
    }
    const totalItemsSold = ()=>{
        let result = 0
        if(props.sold.length>=1){
            result = props.sold.reduce( (total,current)=>{ return ( Number(total) + Number(current.quantity) ) }, 0  ) 
        }
        return result
    }
    return(
        <React.Fragment>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Button color="inherit" onClick={ ()=>( props.onClose() ) }>
                        <ArrowBackIosIcon />
                    </Button>
                    <Typography variant="h6" className={classes.title}>
                        Item - {props.item.name} - Rs.{props.item.price}
                    </Typography>
                    {/*
                    <Button color="inherit" onClick={ onCloseClick }>
                        Done
                        <ArrowForwardIosIcon />
                    </Button>
                    */}
                </Toolbar>
            </AppBar>

            <div style={{marginBottom:80}} />

            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    <Typography variant="h4"> Summary </Typography>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Typography variant="h6"> Bought - {totalItemsBought()} </Typography>
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Typography variant="h6"> Sold - {totalItemsSold()} </Typography>
                    </form>
                    <form style={{margin:'1em'}} noValidate autoComplete="off">
                        <Typography variant="h6"> In Stock - { totalItemsBought() - totalItemsSold() } </Typography>
                    </form>
                </Paper>
            </Container>
            {/*
            <div>
                <div>Summary</div>
                <div> Total Bought - {totalItemsBought()} </div>
                <div> Total Sold - {totalItemsSold()} </div>
                <div> Remaining - { totalItemsBought() - totalItemsSold() } </div>
            </div>
            */}

            <div style={{marginTop:20}} />
            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                    <Typography variant="h4"> Buy </Typography>
                    <List component="nav">
                    {
                        props.bought.map(item=>(
                            <ListItem button key={item.id} onClick={() => console.log('TODO: UX improvements') }>
                                <ListItemText primary={item.bought_on + ' - '+ item.quantity} />
                            </ListItem>
                        ))
                    }
                    </List>
                </Paper>
            </Container>

            <div style={{marginTop:20}} />
            <Container maxWidth="sm">
                <Paper elevation={3} style={{padding:20}}>
                <Typography variant="h4"> Sell </Typography>
                    <List component="nav">
                    {
                        props.sold.map(item=>(
                            <ListItem button key={item.id} onClick={() => console.log('TODO: UX improvements') }>
                                <ListItemText primary={item.sold_on + ' - '+ item.quantity} />
                            </ListItem>
                        ))
                    }
                    </List>
                </Paper>
            </Container>
            <div style={{marginTop:20}} />

        </React.Fragment>
    )
}

export default StoreItemReportComp