// ListSchedulesRow2

import React from 'react'
import {connect, useDispatch} from 'react-redux'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'

import InfoIcon from '@material-ui/icons/Info'
//import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import CreateIcon from '@material-ui/icons/Create'

import WbSunnyIcon from '@material-ui/icons/WbSunny'
import Brightness2Icon from '@material-ui/icons/Brightness2'

import { deleteScheduleAction } from '../actions'

const ListSchedulesRow2Component = (props)=>{
    const dispatch = useDispatch()

    const onDeleteScheduleClick = (item)=>{
        console.log('onDeleteScheduleClick', item)
        dispatch( deleteScheduleAction(item.id) )
    }
    const onDetails = (item)=>{
        //console.log('onDetails', item)
        props.onDetailsClick(item)
    }

    const onJoinWebConference = (url)=>{
        console.log('onJoinWebConference : url', url)
        /*
        const windowFeatures = "menubar=no,location=no,resizable=yes,scrollbars=no,status=no"
        const newWindow = window.open( url, 'FH:WebConferencing', windowFeatures)
        window.console.log('newWindow:', newWindow )
        */
        //const url = detailObj.webURL
        const urlMeeting = 'meeting.html' + '#' + url
        const windowFeatures = "menubar=no,location=no,resizable=yes,scrollbars=no,status=no"
        const newWindow = window.open(urlMeeting, 'FH:WebConferencing', windowFeatures)
        window.console.log('newWindow:', newWindow )
    }

    return(
        <React.Fragment>
            <ListItem button onClick={() => console.log('TODO: UX improvements') }>
                <Chip avatar={<Avatar>{props.rowData.is_morning?"M":"E"}</Avatar>} label={props.rowData.id} variant="outlined" />
                <ListItemIcon>
                    {
                        (props.rowData.is_morning ? <WbSunnyIcon /> : <Brightness2Icon />)
                    }
                </ListItemIcon>
                {/*
                <ListItemIcon>
                    <IconButton edge="end" color="secondary" onClick={() => { onDetails(props.rowData) }}>
                        <CreateIcon />
                    </IconButton>
                </ListItemIcon>
                */}
                
                <ListItemText primary={props.rowData.on_date} />
                
                <ListItemSecondaryAction>
                { props.rowData.isWeb 
                        ? ( <span style={{ marginLeft:"4px" }}> <Button size="small" variant="outlined" color="primary" onClick={ ()=>{ onJoinWebConference(props.rowData.webURL) } }> {props.rowData.web_at_time} </Button> </span> )
                        : "" }
                        
                    <IconButton edge="end" color="secondary" onClick={() => { onDeleteScheduleClick(props.rowData) }}>
                        <HighlightOffIcon />
                    </IconButton>
                    <IconButton edge="end" color="primary" onClick={() => { onDetails(props.rowData) }}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
        </React.Fragment>
    )
}

export default connect()(ListSchedulesRow2Component)