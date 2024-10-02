import React, {useState} from 'react';

import displayIcon from '../assets/Display.svg'
import downIcon from '../assets/down.svg'
import '../../public/headerstyle.css'

const FilterMenu = ({ groupBy, orderBy, onGroupChange, onOrderChange }) => {
    const [displayOpen, setDisplayOpen] = useState(false);
    const handleDisplayClick = () => {
        setDisplayOpen(!displayOpen);
      };


  return (
    <div className="filter-menu" >
        <label className='display-box' onClick={handleDisplayClick}>
            <img src={displayIcon} className='icon'></img>
            Display
            <img src={downIcon} className='icon'></img>
        </label>
        {displayOpen && (
        <div className="dropdown-content">
            <div className="dropdown-section">
                <label htmlFor="grouping" className='text'>Grouping:</label>
                <select id="grouping" value={groupBy} onChange={(e) => onGroupChange(e.target.value)}>
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority" >Priority</option>
                </select>
            </div>
            <div className="dropdown-section"> 
                <label htmlFor="ordering" className='text'>Ordering:</label>
                <select id="ordering" value={orderBy} onChange={(e) => onOrderChange(e.target.value)}>
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                </select>
            </div>
        </div>
        )}
    </div>
  );
};

export default FilterMenu;


