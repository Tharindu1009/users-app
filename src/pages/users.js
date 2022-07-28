import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersAsync } from "../redux/features/users";
import Header from '../components/Header/Header';
import {Grid} from '@mui/material';
import Button from '../components/Button/Button'
import { useNavigate } from 'react-router-dom';
import { Rings } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import '../styles/users.scss'


function Users() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.list);
  const errorMessage = useSelector((state) => state.users.errorMessage);
  const loading = useSelector((state) => state.users.loading);

  const [selectedUserType,setSelectedUserType] = useState("All");
  const [urlFilters,setUrlFilters] = useState({});

  useEffect(() => {
    dispatch(getUsersAsync(urlFilters));
  }, [urlFilters]);

  const generateNewUsers = () => {
    dispatch(getUsersAsync(urlFilters));
  }

  const filterUsers = (type,text) => {
    setSelectedUserType(text)
    const tmpFilters = {...urlFilters,gender: text};
    delete tmpFilters['seed'];
    setUrlFilters(tmpFilters);
  }

  /* Redirect to user-profile page */
  const goToUserProfile = (id) => {
      /* 
        Here used user uuid as a unique id for redirect to profile page. 
        Because sometimes userId getting null values from APIs 
      */
      navigate(`/user/${id}`);
  }
  
  if (errorMessage) toast.error(`Error: ${errorMessage}`);

  return (
    <div>
      <ToastContainer />
      <Header page="users" generateNewUsers={generateNewUsers}/>
      <div className="users-container">
        <Grid container rowSpacing={1}>
          <Grid item xs={12} sm={4} md={6} textAlign="left">
            <label className="counter-text">{users ? users.length : 0} new faces</label>
          </Grid>
          <Grid item xs={12} sm={8} md={6} textAlign="right" >
            <label className="filter-text">Show : </label>
            <Button type="curved" isSelected={selectedUserType == "All" ? true : false} text="All" handleClick={filterUsers}/>
            <Button type="curved" isSelected={selectedUserType == "Gents" ? true : false} text="Gents" handleClick={filterUsers}/>
            <Button type="curved" isSelected={selectedUserType == "Ladies" ? true : false} text="Ladies" handleClick={filterUsers}/>
          </Grid>
        </Grid>
        <Grid container marginTop={1} justifyContent="center">
          {loading && <div className='loader'><Rings color="#878787" height={80} width={80} /></div>}
            {
              users ?
                users.length > 0 ?
                  users.map((user, i) => (
                    <img key={i} src={user.picture.large} className="thumbnail" alt="thumbnail" loading="lazy" onClick={()=>goToUserProfile(user.login.uuid)}/>
                  ))
                  : null
                : null
            }
        </Grid>
      </div>
    </div>
  );
}

export default Users;