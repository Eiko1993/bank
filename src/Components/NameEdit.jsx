import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {editUsername, fetchUserProfile} from "../redux/editReducer";

function NameEdit() {
const [newUsername, setNewUsername] = useState(''); 
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.profile);
  
  
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  
  useEffect(() => {
    console.log("Fetched user:", user); // Debugging line
    if (user && user.userName) {
      setNewUsername(user.userName);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUsername(newUsername)).then((result) => {
        if (!result.error) {
            alert("Username updated successfully")
        }
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setNewUsername(user.userName); // Reset to the original username
  };

  return(
    <div>
      <>
        <section className='edit-content'>
            <h1>Edit user info</h1>
            <form onSubmit={handleSubmit}>
                <div className='input-wrapper-edit'>
                    <label htmlFor='username'>User name: </label>
                    <input type='text' id='username' value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder={user?.userName} />
                </div>
                <div className='input-wrapper-edit'>
                    <label htmlFor='firstname'>First name: </label>
                    <input type='text' id='firstname' value={user?.firstName} placeholder={user?.firstName} disabled />
                </div>
                <div className='input-wrapper-edit'>
                    <label htmlFor='lastname'>Last name: </label>
                    <input type='text' id='lastname' value={user?.lastName} placeholder={user?.lastName} disabled />
                </div>
                <div className='input-wrapper-edit'>
                <button className="edit-button" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}                
                </button>
                <button className="edit-button" onClick={handleCancel} disabled={loading}>Cancel
                </button>
                </div>
                {error&&(
                    <div className='error-message'>{error}</div>
                )}
            </form>
        </section>
        </>
    </div>
  )
}

export default NameEdit;