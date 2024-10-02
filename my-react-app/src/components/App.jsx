import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanganBoard.jsx';
import FilterMenu from './FilterMenu.jsx';
import './index.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [orderBy, setOrderBy] = useState('priority');

  useEffect(() => {
    // Fetch tickets from the API
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
      } catch (error) {
        console.error("Error fetching tickets", error);
      }
    };
    const fetchUsers = async () => {
        try {
          const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
          const data = await response.json();
          setUsers(data.users);
        } catch (error) {
          console.error("Error fetching tickets", error);
        }
      };
    fetchUsers();
    fetchTickets();
  }, []);

  const handleGroupingChange = (group) => {
    setGroupBy(group);
  };

  const handleOrderingChange = (order) => {
    setOrderBy(order);
  };

  return (
    <div className="App">
      <FilterMenu 
        groupBy={groupBy} 
        orderBy={orderBy} 
        onGroupChange={handleGroupingChange} 
        onOrderChange={handleOrderingChange} 
      />
      <KanbanBoard tickets={tickets} users = {users} groupBy={groupBy} orderBy={orderBy} />
    </div>
  );
}

export default App;
