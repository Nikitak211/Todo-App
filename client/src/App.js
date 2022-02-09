import { useEffect, useState } from 'react'
import axios from 'axios'

import TitleBtn from './components/TitleBtn'
import CreateTodo from './components/CreateTodo'
import { Card, Divider, List, ListItem, ListItemText } from '@mui/material'

function App() {

  const [data, setData] = useState([])
  const [success, setSuccess] = useState()

  useEffect(() => {
    axios.get('/todos')
      .then(res => {
        const data = res.data;
        setData(data.reverse())
        setSuccess()
      }).catch(error => {
        console.log(error)
      })
  }, [success])

  return (
    <div style={{
      margin: " 2em auto",
      display: 'grid',
      alignItems: 'center',
      justifyContent: 'center',
      gap: "2em"
    }} className="App">
      <CreateTodo setSuccess={setSuccess} />
      <Card sx={{
        width: '100%',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 0 1px black',
        gap: 1
      }}>
        <Card sx={{
          height: '10vh',
          width: '100vh',
          boxShadow: 'none',
          margin: 'auto'
        }}>
          <ListItem>
            <ListItemText primary='Todo list' />
          </ListItem>
        </Card>
        <Divider component="li" />
        <Card sx={{ boxShadow: 'none' }}>
          <List >
            <ListItem sx={{
              display: 'grid',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            >
              {data.map(data => {
                return (
                  <TitleBtn key={data.id} setSuccess={setSuccess} data={data} />
                )
              })}
            </ListItem>
          </List>
        </Card>
      </Card>
    </div>
  );
}

export default App;
