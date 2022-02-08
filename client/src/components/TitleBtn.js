import { useState } from 'react'
import axios from 'axios'

import { Button, Card, Typography,Checkbox, CardContent, Divider,TextareaAutosize } from '@mui/material';

const TitleBtn = (props) => {

    const [opend, setOpend] = useState(false)
    const data = props.data
    const calendar = ["Sunday", 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day = new Date()
    const now = day.getDay()

    const date = new Date(props.data.date)
    const todoDate = date.getDay()

    const open = () => {
        if (opend) {
            setOpend(false)
        } else {
            setOpend(true)
        }
    }

    const remove = async () => {
        await axios.delete(`/todo/${data.id}`).then(res => {
            if( res.data.success){
                setTimeout(() => {
                    props.setSuccess(true)
                },1000)
            }
        })
    }

    const Open = () => {
        if (opend) {
            return (
                <Card sx={{
                    boxShadow: '0 0 5px black',
                    display: 'grid',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    
                    <CardContent sx={{
                        display: 'grid',
                        margin: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        
                    }}>
                        
                        <Divider textAlign="left">Todo <Checkbox onChange={remove} /> </Divider>
                        <TextareaAutosize 
                            style={{
                                border: 'none',
                                outline: 'none',
                                resize: 'none',
                                backgroundColor:'transparent',
                                width: '70vh',
                                overflowY: 'none'
                            }}
                            defaultValue={data.body}
                            disabled
                            minRows={3}
                            maxRows={10}
                        ></TextareaAutosize>   
                    </CardContent>
                </Card>
            )
        }
    }

    return (
        <div>
            <Button sx={{ width: '100%' }} onClick={open} variant="outlined">{data.title}</Button>
            {opend ? (<Open />) : (<></>)}
        </div>
    );
}

export default TitleBtn;