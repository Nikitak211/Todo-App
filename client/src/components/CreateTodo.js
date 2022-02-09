
import axios from 'axios'

import { useForm } from 'react-hook-form'
import { Button, Card, InputAdornment, TextField, CardContent, CardActions } from '@mui/material';
import Icon from '@mdi/react'
import { mdiCalendarCheck } from '@mdi/js';

const CreateTodo = (props) => {

    const {
        register,
        reset,
        handleSubmit
    } = useForm()

    const createTodo = async (data) => {
        const todo = {
            body: data.body,
            date: new Date()
        }
        await axios.post('/todo', todo).then(res => {
            const data = res.data;
            if (data.success) {
                props.setSuccess(true)
            }
        })

    }
    return (
        <form style={{
            display: 'inline-flex',
            margin: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
        }} onSubmit={handleSubmit((data) => {
            createTodo(data)
            reset({
                body: ''
            })
        })}>
            <Card sx={{
                width: '100vh',
                boxShadow: 'none',
                display: 'flex',
                margin: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent'
            }}>
                <CardContent>
                    <TextField
                        sx={{
                            minWidth: "70vh",
                            backgroundColor: 'white'
                        }}
                        required
                        id="input-with-icon-textfield"
                        multiline
                        placeholder="write your todo here"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    < Icon
                                        path={mdiCalendarCheck}
                                        size={1}
                                        color="gray"
                                    />
                                </InputAdornment>
                            ),
                        }}
                        {...register('body', {
                            required: 'Cannot be empty'
                        })}
                    ></TextField>
                </CardContent>
                <CardActions sx={{ width: "40vh" }} >
                    <Button type="submit" variant="contained">Create Todo</Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default CreateTodo;