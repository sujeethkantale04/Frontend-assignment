import React, { Profiler } from 'react';
import '../../public/cardstyle.css'

// Priority Icons
import noPriorityIcon from '../assets/No-priority.svg'  
import urgentPriorityIcon from '../assets/SVG - Urgent Priority grey.svg'   
import highPriorityIcon from '../assets/Img - High Priority.svg'    
import mediumPriorityIcon from '../assets/Img - Medium Priority.svg'
import lowPriorityIcon from '../assets/Img - Low Priority.svg'

const priorityIcons = {
    4: urgentPriorityIcon,
    3: highPriorityIcon,
    2: mediumPriorityIcon,
    1: lowPriorityIcon,
    0: noPriorityIcon,
};
// status Icons
import todoIcon from '../assets/To-do.svg'; 
import inProgressIcon from '../assets/in-progress.svg'; 
import doneIcon from '../assets/Done.svg'; 
import canceledIcon from '../assets/Cancelled.svg'; 
import backlogIcon from '../assets/Backlog.svg';

import profileIcon from '../assets/profile-picture.png';

const statusIcons = {
    Todo: todoIcon,
    InProgress: inProgressIcon,
    Done: doneIcon,
    Canceled: canceledIcon,
    Backlog: backlogIcon,
};


const Card = ({ ticket, groupBy }) => {
  const { id, title, priority, status, userId, tag } = ticket;
  
  const getImage = () => {
    if(groupBy === 'status'){
        return priorityIcons[priority];
    }else if(groupBy == 'user'){
        return priorityIcons[priority];
    }else if(groupBy == 'priority'){
        if(status === 'In progress'){
            return inProgressIcon;
        }
        return statusIcons[status];
    }
  }
  const profileHandler = () => {
    if(groupBy === 'user'){
        return false;
    }
    return true;
    
  }
  const LimitedText = ({ charLimit }) => {
    // Limit the number of characters and add ellipsis if exceeded
    const truncatedText = title.length > charLimit ? title.slice(0, charLimit) + '...' : title;
    return <h3 className="task-title">{truncatedText}</h3>;
  };
  


  return (
    <div className="task-card">
        <div className="task-header">
            <span className = "task-idx">{id}</span>
            {profileHandler() ? <img src={profileIcon} alt="User profile" className="task-avatar" /> : <span></span> }
        </div>
        <LimitedText charLimit={50}/>
        <h3 className="task-title">
            
        </h3>
        <div className = "task-footer">
            <img src={getImage()} alt="image" className="box" />
            <div className="box">
                <span className="dot"></span>
                {tag}
            </div>
        </div>
    </div>
  );
};

export default Card;
