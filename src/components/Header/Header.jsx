import logo from '../../assets/images/logo.png'
import Grid from '@mui/material/Grid';
import Button from '../Button/Button'
import './Header.scss';
import { useNavigate } from 'react-router-dom';

function Header({page,generateNewUsers}) {
  const navigate = useNavigate();

  const onGenerateNewUsers = () => {
    generateNewUsers();
  }

   /* Redirect to previous page */
   const onGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="header">
      <div className="header__wrapper">
        <Grid container rowSpacing={1}>
          <Grid item xs={12} sm={6} md={6} textAlign="left">
            <img src={logo} className="logo" alt="logo"/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} textAlign="right">
            {page == "users" && <Button type="primary" text="Generate New Users" handleClick={onGenerateNewUsers}/>}
            {page == "profile" && <Button type="back" text="Back" handleClick={onGoBack}/>}
          </Grid>
        </Grid>
      </div>
      <div className="header__bottom" />
    </div>
  );
}

export default Header;