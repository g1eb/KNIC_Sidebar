import * as React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
// Next up: Increasing div sizes in Sidebar.css so buttons and search bar are bigger and so that content in section 1-3 will fit 


export default props => {
  return (
    <Menu>
      <div>
      <a className="menu-item">
      <b>Current Task/State</b>
      </a>
      </div>

      <div>
      <a className="menu-item">
        <b>General Q&A</b>
      </a>
      </div>

      <div>
      <a className="menu-item">
      <b>Situation Specific Q&A</b>
      </a>
      </div>

      <div>
      <a className="menu-item" id="personalized_queries">
         <TextField
        type="search"
        variant="outlined"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: 'white' }}/>
            </InputAdornment>
          )
        }}
        />
      </a>
      </div>
      
      <div id="query_history"> 
      <a className="menu-item"></a>
      <Button style={{
        borderRadius: 10,
        backgroundColor:  "#ffc72c",
        fontSize: "18px",
        color: "black"}} variant="contained" size="small" 
          onClick={() => {
          alert('Query History Popup Somehow');}}>Query History</Button>
      </div>
    </Menu>
  );
};