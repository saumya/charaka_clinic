//
// HomeContainer.comp.js
//

import React, {useState} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import PersonIcon from '@material-ui/icons/Person'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import PeopleIcon from '@material-ui/icons/People'
import ScheduleIcon from '@material-ui/icons/Schedule'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import StorefrontIcon from '@material-ui/icons/Storefront'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import AccountTreeIcon from '@material-ui/icons/AccountTree'

import HomeDefaultComp from './HomeDefault.comp'
import ProfileComp from './Profile.comp'
import DoctorsComp from './Doctors.comp'
import PatientsComp from './Patients.comp'
import SchedulesComp from './Schedules.comp'

import StoreItemAddComp from './StoreItemAddNew.comp'
import StoreItemBuyComp from './StoreItemBuy.comp'
import StoreItemSellComp from './StoreItemSell.comp'
import StoreReportComp from './StoreReport.comp'


import { logoutAction } from '../actions'



const useStyles = makeStyles( (theme)=> ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
    })
)

const HomeContainerComp = ()=>{
    const classes = useStyles()

    const dispatch = useDispatch()

    const loginData = useSelector( state=>state.loginData )

    const [menuIsOpen, setMenuIsOpen] = useState(false)
    // profile, doctors, patients, schedules
    const [activeViewName, setActiveViewName] = useState('')

    const showSideBar = ()=> setMenuIsOpen(true)
    const hideSideBar = ()=> setMenuIsOpen(false)

    const onProfile = ()=> setActiveViewName('profile')
    const onDoctors = ()=> setActiveViewName('doctors')
    const onPatients = ()=> setActiveViewName('patients')
    const onSchedules = ()=> setActiveViewName('schedules')
    const onBuyItem = ()=> setActiveViewName('buyItem')
    const onSellItem = ()=> setActiveViewName('sellItem')
    const onAddNewItem = ()=> setActiveViewName('addNewItem')
    const onStoreItemDetailsView = ()=> setActiveViewName('viewStoreItemDetails')
    const onLogout = ()=> dispatch( logoutAction() )
    
    const renderViewComponent = (viewName)=>{
        // profile, doctors, patients, schedules, buyItem, sellItem, addNewItem  
        switch (viewName){
            case 'profile' :
                return(<ProfileComp />)
            case 'doctors' :
                return(<DoctorsComp />)
            case 'patients' :
                return(<PatientsComp />)
            case 'schedules' :
                return(<SchedulesComp />)
            case 'buyItem' :
                return (<StoreItemBuyComp />)
            case 'sellItem' :
                return(<StoreItemSellComp />)
            case 'addNewItem' :
                return (<StoreItemAddComp />)
            case 'viewStoreItemDetails' :
                return(<StoreReportComp />)
            default :
                return(<HomeDefaultComp />)

        }
    }
    

    return(
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={showSideBar}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}> Clinic-{ loginData.loginUser.group_name } </Typography>
                    {/* <Button color="inherit"> Login </Button> */}
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={menuIsOpen} onClose={ hideSideBar }>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem button key={'profile'} onClick={ onProfile }> 
                        <ListItemIcon> <PersonIcon /> </ListItemIcon>
                        <ListItemText primary='Profile' /> 
                    </ListItem>
                    <Divider />
                    <ListItem button key={'doctors'} onClick={ onDoctors }> 
                        <ListItemIcon> <LocalHospitalIcon /> </ListItemIcon>
                        <ListItemText primary='Doctors' /> 
                    </ListItem>
                    <ListItem button key={'patients'} onClick={ onPatients }> 
                        <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                        <ListItemText primary='Patients' /> 
                    </ListItem>
                    <ListItem button key={'schedules'} onClick={ onSchedules }> 
                        <ListItemIcon> <ScheduleIcon /> </ListItemIcon>
                        <ListItemText primary='Schedules' /> 
                    </ListItem>
                    <Divider />
                    <ListItem button key={'buyItem'} onClick={ onBuyItem }> 
                        <ListItemIcon> <ShoppingCartIcon /> </ListItemIcon>
                        <ListItemText primary='Buy' /> 
                    </ListItem>
                    <ListItem button key={'sellItem'} onClick={ onSellItem }> 
                        <ListItemIcon> <StorefrontIcon /> </ListItemIcon>
                        <ListItemText primary='Sell' /> 
                    </ListItem>
                    <ListItem button key={'addNewItem'} onClick={ onAddNewItem }> 
                        <ListItemIcon> <PlaylistAddIcon /> </ListItemIcon>
                        <ListItemText primary='New Item' /> 
                    </ListItem>
                    <ListItem button key={'viewStoreItemDetails'} onClick={ onStoreItemDetailsView }> 
                        <ListItemIcon> <AccountTreeIcon /> </ListItemIcon>
                        <ListItemText primary='View Details' /> 
                    </ListItem>
                    <Divider />
                    <ListItem button key={'logout'} onClick={ onLogout }> 
                        <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
                        <ListItemText primary='Logout' /> 
                    </ListItem>
                    <Divider />
                    <ListItem key={'version'}>
                        <ListItemText primary='Thank you.' secondary="Version 1.0.0 Alpha. Public." /> 
                    </ListItem>
                </List>
            </Drawer>
            <div style={{marginTop:'5em'}}>
                { renderViewComponent(activeViewName) }
            </div>
        </React.Fragment>
    )
}

export default connect()(HomeContainerComp)