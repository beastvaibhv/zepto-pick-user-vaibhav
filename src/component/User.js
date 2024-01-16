import React from 'react'

const User = ({ name, image, onRemove }) => {
    return (
        <div className='user-added'>
            <span><img className='user-added-image' src={image} alt={name} /></span>
            <span className='user-added-name' >{name}</span>
            <span className='user-added-btn'>
                <button onClick={onRemove}>
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </button></span>
        </div>
    )
}

export default User
