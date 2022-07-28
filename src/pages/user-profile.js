import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import ContactCard from '../components/ContactCard/ContactCard';
import { Rings } from 'react-loader-spinner'
import Grid from '@mui/material/Grid';
import '../styles/profile.scss'

function UserProfile() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const users = useSelector((state) => state.users.list);
  const [user, setUser] = useState(null)

  useEffect(() => {
     /* 
        Filter selected user from userlist in store according to id for display individual user details.
        Not available API for get individual user details ("https://randomuser.me").
        Due to that reason, I used this filteration for retrieve individual user details.
     */
    let filteredUser = users.length > 0 && users.filter(function (el) {
      return el.login.uuid == id
    });

    filteredUser.length > 0 && setUser(filteredUser[0])
  }, []);

  return (
    <div>
      <Header page="profile" />
      {
        user ?
          <div className="profile-container">
            <div className="avatar-wrapper">
              <img src={user.picture.large} className="avatar" alt="avatar" />
            </div>
            <div className="canvas">
              <div className="info-wrapper">
                <label className="username">{user.name.first + " " + user.name.last}</label>
                <div className="contact-info">
                  <ContactCard text={user.email} icon="email" />
                  <ContactCard text={user.location.country} icon="address" />
                  <ContactCard text={user.cell} icon="phone" />
                </div>
              </div>
            </div>
          </div>
          : <div className='loader'><Rings color="#878787" height={80} width={80} /></div>
      }
    </div>
  );
}

export default UserProfile;