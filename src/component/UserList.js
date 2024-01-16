import React from 'react'

const UserList = ({image, name, email}) => {
  return (
    <div className='user-list'>
    <span><img  className="user-list-image" src={image} alt={name} /></span>
    <span className="user-list-name">{name}</span>
    <span className="user-list-email">{email}</span>
      
    </div>
  )
}

export default UserList
