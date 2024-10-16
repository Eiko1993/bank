import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {editUsername, fetchUserProfile} from "../redux/editReducer";

function NameEdit() {
const [newUsername, setNewUsername] = useState(''); 
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() =>{
        if (user && user.userName) {
            setNewUsername(user.userName);
        }
    }, [user])


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUsername(newUsername)).then((result) => {
        if (!result.error) {
            alert("Username updated successfully")
        }
    });
  };

  return(
    <div>
        <section className='main'>
            <h1>Edit user info</h1>
            <form onSubmit={handleSubmit}>
                <div className='input-wrapper'>
                    <label htmlFor='username'>User name</label>
                    <input type='text' id='username' value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder={user.userName} />
                </div>
                <div className='input-wrapper'>
                    <label htmlFor='firstname'>First name</label>
                    <input type='text' id='firstname' value={newUsername} placeholder={user.firstName} disabled />
                </div>
                <div className='input-wrapper'>
                    <label htmlFor='lastname'>Last name</label>
                    <input type='text' id='lastname' value={newUsername} placeholder={user.lastName} disabled />
                </div>
                <button className="sign-in-button" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}                
                </button>
                <button className="sign-in-button" type="submit" disabled={loading}>Cancel</button>
                {error&&(
                    <div className='error-message'>{error}</div>
                )}
            </form>
        </section>
    </div>
  )
}

export default NameEdit;