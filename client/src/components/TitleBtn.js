import { useState } from 'react'
import axios from 'axios'

import { Button, ListItemText, List, ListItem, Checkbox, Typography, Divider, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TitleBtn = (props) => {
    const data = props.data

    const [done, setDone] = useState(data.status !== undefined ? data.status : false)
    const [crossed, setCrossed] = useState(data.cross !== undefined ? data.cross : 'none')

    const remove = async () => {
        await axios.delete(`/todo/${data.id}`).then(res => {
            if (res.data.success) {
                props.setSuccess(true)
            }
        })
    }
    const complete = async () => {
        const id = data.id
        if (done) {
            await axios.post('/status', { id, status: false, cross: 'none' })
                .then(res => {
                    if (res.data.success) {
                        setDone(false)
                        setCrossed('none')
                        props.setSuccess(true)
                    }
                })
        } else {
            await axios.post('/status', { id, status: true, cross: 'line-through' })
                .then(res => {
                    if (res.data.success) {
                        setDone(true)
                        setCrossed('line-through')
                        props.setSuccess(true)
                    }
                })
        }
    }
    
    return (
        <List >
            <ListItem
                alignItems="flex-start"
                sx={{
                    display: 'inline-flex',
                    margin: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Checkbox checked={done} onChange={complete} />
                <ListItemText
                    sx={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        width: '70vh',
                        display: 'inline-flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        margin: '0 auto',
                    }}
                    primary={done ? <Alert sx={{ color: 'green', width: '1em' }} variant="inline" severity="success"></Alert> : <></>}
                    secondary={<Typography sx={{
                        textDecoration: crossed
                    }}
                        m={1} variant='h5'>
                        {data.body}
                    </Typography>}
                />
                <Button onClick={remove} sx={{ color: 'red' }} variant="inline" startIcon={<DeleteIcon />} />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
}

export default TitleBtn;