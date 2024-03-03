// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('date');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/api/customers?page=${page}&sort=${sort}&search=${search}`);
      setData(result.data.customers);
      setTotal(result.data.total);
    };

    fetchData();
  }, [page, sort, search]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Zithara Customers Database</h1>
        <p>REACT and NODE JS application with PostgreSQL database</p>
        <div className="input-container">
          <input className="input" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search user or location..." />
          <select className="input" value={sort} onChange={e => setSort(e.target.value)}>
  <option value="date">Date</option>
  <option value="time">Time</option>
  <optgroup label="Advanced Sorting Options">
    <option value="date_desc">Date High to Low</option>
    <option value="date_asc">Date Low to High</option>
    <option value="time_desc">Time High to Low</option>
    <option value="time_asc">Time Low to High</option>
    <option value="name_desc">Name Z-A</option>
    <option value="name_asc">Name A-Z</option>
    <option value="age_desc">Age High to Low</option>
    <option value="age_asc">Age Low to High</option>
    <option value="sno_desc">S.No High to Low</option>
    <option value="sno_asc">S.No Low to High</option>
  </optgroup>
</select>
        </div>
      </header>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Sno</th>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.sno}>
                <td>{row.sno}</td>
                <td>{row.customer_name}</td>
                <td>{row.age}</td>
                <td>{row.phone}</td>
                <td>{row.location}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="App-footer">
      <div className="record-count">
        {((page - 1) * 20) + 1}-
        {Math.min(page * 20, total)} out of {total} on page {page}
      </div>
        <div className="button-container">
          <button className="button" onClick={() => setPage(prevPage => prevPage - 1)} disabled={page === 1}>Previous</button>
          <button className="button" onClick={() => setPage(prevPage => prevPage + 1)} disabled={page * 20 >= total}>Next</button>
        </div>
        <p>© Preethika B</p>
      </footer>
    </div>
  );
}

export default App;