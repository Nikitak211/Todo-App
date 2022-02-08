import { useState } from 'react'
import axios from 'axios'

import { useForm } from 'react-hook-form'
import { Button, Card, Typography, TextField, CardContent, CardActions } from '@mui/material';

const CreateTodo = (props) => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm()

    const createTodo = async (data) => {
        const todo = {
            title:data.title,
            body:data.body,
            date: new Date()
        }
        await axios.post('/todo',todo).then(res => {
            const data = res.data;
            if(data.success) {
                props.setSuccess(true)
            }
        })
        
    }
    return (
        <>
            <form style={{
                display: 'grid',
                margin: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
            }} onSubmit={handleSubmit((data) => {
                createTodo(data)
                reset({
                    title:'',
                    body:''
                })
            })}>
                <Card sx={{
                    boxShadow: '0 0 5px black',
                    width: '80vh'
                }}>
                    <CardContent sx={{
                        display: 'grid',
                        margin: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                    }}>
                        <TextField
                            required
                            id="standard-basic"
                            label="Title"
                            variant="standard"
                            {...register('title',{
                                required:'Cannot be empty'
                            })}
                            ></TextField>

                        <TextField
                            required
                            id="standard-multiline-static"
                            label="Todo"
                            multiline
                            placeholder="write your todo here" 
                            variant="standard"
                            {...register('body',{
                                required:'Cannot be empty'
                            })}
                            ></TextField>

                    </CardContent>
                    <CardActions sx={{
                        display: 'grid',
                        margin: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                    }}>
                        <Button type="submit" variant="contained">Create Todo</Button>
                    </CardActions>
                </Card>
            </form>
        </>
    );
}

export default CreateTodo;