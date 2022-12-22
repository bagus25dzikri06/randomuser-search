import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { BiSearch } from 'react-icons/bi'
import axios from 'axios'

const Home = () => {
  const [ users, setUsers ] = useState([])
  const [ gender, setGender ] = useState('')
  const [ filteredResults, setFilteredResults ] = useState([])
  const [ searchInput, setSearchInput ] = useState('')
  
  useEffect(() => {
    axios
      .get('https://randomuser.me/api/?results=5000')
      .then((res) => {
        setUsers(res.data.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const userColumns = [
    {
        name: <div style={{
          fontSize: '15px'
        }}>Username</div>,
        selector: row => row.login,
        sortable: false,
        cell: row => <div style={{fontSize: 16}}>{row.login.username}</div>
    },
    {
        name: <div style={{
          fontSize: '15px'
        }}>Name</div>,
        selector: row => row.name,
        sortable: true,
        cell: row => <div style={{fontSize: 16}}>{
          row.name.title + ' ' + row.name.first + ' ' + row.name.last
        }</div>
    },
    {
        name: <div style={{
          fontSize: '15px'
        }}>E-mail</div>,
        selector: row => row.email,
        sortable: true,
        cell: row => <div style={{fontSize: 16}}>{row.email}</div>
    },
    {
        name: <div style={{
          fontSize: '15px'
        }}>Gender</div>,
        selector: row => row.gender,
        sortable: true,
        cell: row => <div style={{fontSize: 16}}>{row.gender}</div>
    },
    {
        name: <div style={{
          fontSize: '15px'
        }}>Registered Date</div>,
        selector: row => row.registered,
        sortable: true,
        cell: row => <div style={{fontSize: 16}}>{row.registered.date}</div>
    },
  ]

  const searchUsers = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredUserData = users.filter((item) => {
          return item.login.username.includes(searchInput.toLowerCase()) ||
          item.name.title.includes(searchInput[0].toUpperCase() + searchInput.substring(1)) ||
          item.name.first.includes(searchInput[0].toUpperCase() + searchInput.substring(1)) ||
          item.name.last.includes(searchInput[0].toUpperCase() + searchInput.substring(1))
        })
        setFilteredResults(filteredUserData)
    }
    else{
        setFilteredResults(users)
    }
  }

  const resetFilter = () => {
    setSearchInput('')
    document.getElementById('search').value = ''
    setGender('')
    document.getElementById('gender').value = ''
  }

  return (
    <>
      <div className='m-2 overflow-x-hidden'>
        <h1 className='font-semibold'>Example of Search And Filter</h1>
        <div className='mx-2 row'>
          <div className='col-3'>Search</div>
          <div className='col-6'>Gender</div>
        </div>
        <div className='mx-2 row'>
          <div className='col-3'>
            <div className='my-2 row'>
              <input onChange={(e) => searchUsers(e.target.value)}
              className='p-2 border-2 rounded-l-xl col-9' 
              type="text" name="search" id="search" placeholder="Search" />
              <div className='p-2 bg-blue-300 rounded-r-xl col-2'>
                <BiSearch color='#FFFFFF' size={35} />
              </div>
            </div>
          </div>
          <div className='my-2 col-3'>
            <select id='gender' name='gender' 
            value={gender}
            onChange={(e) => setGender(e.target.value)} 
            className='p-2 mt-2 mb-3 border-2 border-solid rounded-xl col-12'>
              <option value="" disabled selected hidden>Choose your role</option>
              <option value='all'>All</option>
              <option value='female'>Female</option>
              <option value='male'>Male</option>
            </select>
          </div>
          <button className='border-2 col-1 rounded-xl' onClick={resetFilter}>Reset Form</button>
        </div>
        <hr className='my-7' />
        <div className='px-24 text-center col-12'>
        {/*
          searchInput.length > 1 ? (
            <>
              <DataTable columns={userColumns} data={filteredResults} paginationRowsPerPageOptions={[5,10,15,20,25]} pagination />
            </>
          ) : (
            <>
              <DataTable columns={userColumns} data={users} paginationRowsPerPageOptions={[5,10,15,20,25]} pagination />
            </>
          )
        */}
        {
          searchInput.length > 1 && (gender === 'female' || gender === 'male') ? (
            <>
              <DataTable columns={userColumns} data={
                filteredResults.filter((item) => {
                  return item.gender === `${gender}`
                })
              } paginationRowsPerPageOptions={[5,10,15]} pagination />
            </>
          ) : (searchInput.length > 1 && gender === 'all') || searchInput.length > 1 ? (
            <>
              <DataTable columns={userColumns} data={filteredResults} paginationRowsPerPageOptions={[5,10,15]} pagination />
            </>
          ) : gender === 'female' || gender === 'male' ? (
            <>
              <DataTable columns={userColumns} data={
                users.filter((item) => {
                  return item.gender === `${gender}`
                })
              } paginationRowsPerPageOptions={[5,10,15]} pagination />
            </>
          ) : gender === 'all' ? (
            <>
              <DataTable columns={userColumns} data={users} paginationRowsPerPageOptions={[5,10,15]} pagination />
            </>
          ) : (
            <>
              <DataTable columns={userColumns} data={users} paginationRowsPerPageOptions={[5,10,15]} pagination />
            </>
          )
        }
        </div>
      </div>
    </>
  )
}

export default Home