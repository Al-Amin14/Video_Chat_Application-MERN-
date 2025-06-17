import React, { useEffect } from 'react'
import Sidebar from '../components/sidebar'
import Dashboard from '../components/rightSideDash'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Home = () => {
  let findRealuser=[];
  const [currentUsername, setcurrentUsername] = useState('');
  const navigate = useNavigate()
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem('id')) {
      navigate('/login')
    } else {
      fetch('http://localhost:3000/userall/allusers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem('jwt')
        }
      }).then(res => res.json()).then(result => {
        // console.log(result)
        const userscontant=result.filter(items=>
          items._id!=localStorage.getItem('id')
      )
      findRealuser=result.filter(items=>items._id==localStorage.getItem('id'))
      setcurrentUsername(findRealuser[0].name)
      setUserList(userscontant)
      })

    }
  }, []);

  return (
    <div className='flex'>
      <Sidebar currentUser={currentUsername} users={userList} />
      <Dashboard />
    </div>
  )
}

export default Home
