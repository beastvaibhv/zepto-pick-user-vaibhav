import { useState, useEffect, useRef } from 'react';
import './App.css';
import User from './component/User';
import UserList from './component/UserList';
import { userInfo } from './utils/constant';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [addedUser, setAddedUser] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [filteredList, setFilteredList] = useState(userInfo);
  const inputRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsListVisible(false);
    }
  };

  const handleKeyDown = (event) => {
    // Handle backspace to remove the last chip
    if (event.key === 'Backspace' && inputValue === '' && addedUser.length > 0) {
      let newArray = addedUser.slice(0, -1);
      setAddedUser(newArray);
    }
  };

  const handleUserRemove = (item) => {
    // Remove the chip and add it back to the filteredItems
    setAddedUser(addedUser.filter((c) => c.name !== item.name));
    setFilteredList([...filteredList, item]);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setIsListVisible(true);

    // Filter the user list based on the input value
    const filteredUsers = userInfo.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredList(filteredUsers);
  };

  const handleItemClick = (item) => {
    // Add the selected user to addedUser list
    setAddedUser([...addedUser, item]);

    // Remove the selected user from the filtered list
    setFilteredList(filteredList.filter(user => user.name !== item.name));

    setInputValue('');
    setIsListVisible(false);
  };

  useEffect(() => {
    // Add an event listener for outside clicks
    document.addEventListener('mousedown', handleOutsideClick);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="App">
      <h1>PICK USERS</h1>
      <div className='main-container'>
        <div className='added-user-container'>
          {addedUser.map((user) => (
            <span key={user.name}>
              <User image={user.image} name={user.name} onRemove={() => handleUserRemove(user)} />
            </span>
          ))}
          <span className='input-list-container'>
            <div>
              <input
                type="text"
                value={inputValue}
                placeholder="Add new user..."
                onClick={handleInputChange}
                onKeyDown={handleKeyDown}
                ref={inputRef}
              />
            </div>
            <div className='input-list'>
              {isListVisible && filteredList.map(item => (
                <UserList
                  key={item.name}
                  name={item.name}
                  image={item.image}
                  email={item.email}
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
