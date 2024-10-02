import React from 'react';
import Card from './Card';

// Import other Icons
import addIcon from '../assets/add.svg'  
import dotIcon from '../assets/3 dot menu.svg'  

// Priority Icons
import noPriorityIcon from '../assets/No-priority.svg'  
import urgentPriorityIcon from '../assets/SVG - Urgent Priority colour.svg'   
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

const statusIcons = {
    Todo: todoIcon,
    InProgress: inProgressIcon,
    Done: doneIcon,
    Canceled: canceledIcon,
    Backlog: backlogIcon,
};



const KanbanBoard = ({ tickets, groupBy, orderBy }) => {
  // Function to group and order tickets
  const groupTickets = (tickets) => {
    let groupedTickets = {};
    
    if (groupBy === 'status') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
        return acc;
      }, {});
    } else if (groupBy === 'user') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        (acc[ticket.userId] = acc[ticket.userId] || []).push(ticket);
        return acc;
      }, {});
    } else if (groupBy === 'priority') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        (acc[ticket.priority] = acc[ticket.priority] || []).push(ticket);
        return acc;
      }, {});
    }

    return groupedTickets;
  };

  // Function to sort tickets
  const sortTickets = (tickets) => {
    if (orderBy === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (orderBy === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groupedTickets = groupTickets(tickets);

  const getImage = (group) => {
    if(groupBy === 'status'){
        if(group === 'In progress'){
            return inProgressIcon;
        }
        return statusIcons[group];
    }else if(groupBy == 'user'){
        return priorityIcons[group];
    }else if(groupBy == 'priority'){
        return priorityIcons[group];
    }
  }
  const getName = (group) => {
    if(group == 0){
        return "No Priority"
    }else if(group == 1){
        return "Low";
    }else if(group == 2){
        return "Medium";
    }else if(group == 3){
        return "High";
    }else if(group == 4){
        return "Urgent";
    }else if(group == "In progress"){
        return "In Progress";
    }
    return group;
  }
  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group, index) => (
        <div key={index} className="kanban-column">
            <div className='column-header'>
                <div className='left-header'>
                    <img src={getImage(group)} alt='image'></img>
                    {/* <h3>{group}</h3> */}
                    <h3>{getName(group)}</h3>
                    <h4>{groupedTickets[group].length}</h4>
                </div>
                <div className='right-header'>
                    <img src={addIcon}></img>
                    <img src={dotIcon}></img>
                </div>
            </div>
            {sortTickets(groupedTickets[group]).map(ticket => (
                <Card key={ticket.id} ticket={ticket} groupBy={groupBy} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
