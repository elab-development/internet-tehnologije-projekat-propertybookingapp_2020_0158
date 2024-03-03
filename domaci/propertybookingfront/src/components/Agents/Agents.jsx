import React from 'react';
import useAgents from '../Hooks/useAgents';
import './Agents.css'; // Import CSS datoteke
import Footer from '../Footer/Footer';
import NavBar from '../Navbar/Navbar';

const Agents = () => {
  const { agents, loading, error } = useAgents('http://127.0.0.1:8000/api/agents');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <NavBar/>
    <div className="agents-container">
      <h2 className="agents-title">Lista agenata koji pružaju usluge:</h2>
      <ul className="agents-list">
        {agents.map(agent => (
          <li key={agent.id} className="agent-card">
            <p className="agent-name">{agent.ime}</p>
            <p className="agent-info">Adresa: {agent.adresa}</p>
            <p className="agent-info">Telefon: {agent.telefon}</p>
            <p className="agent-info">Godine iskustva: {agent.godineIskustva}</p>
          </li>
        ))}
      </ul>
    </div>
    <Footer/>
    </>
  );
};

export default Agents;