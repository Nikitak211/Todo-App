import { useEffect, useState } from 'react'
import axios from 'axios'

import TitleBtn from './components/TitleBtn'
import CreateTodo from './components/CreateTodo'



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
      margin: " 5px auto",
      display:'grid',
      gap:4
    }} className="App">
      <CreateTodo setSuccess={setSuccess} />
      {data.map(data => {
        return (
          <TitleBtn setSuccess={setSuccess} key={data.id} data={data}></TitleBtn>
        )
      })}
    </div>
  );
}

export default App;
