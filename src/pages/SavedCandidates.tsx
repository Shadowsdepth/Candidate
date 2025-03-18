import React, { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface'; // Import the Candidate interface
import './SavedCandidates.css';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved); // Set the saved candidates to state
  }, []); // Empty dependency array ensures this runs once on component mount

  // Function to remove a candidate from the saved list
  const handleDelete = (index: number) => {
    const updatedSavedCandidates = [...savedCandidates];
    updatedSavedCandidates.splice(index, 1); // Remove the candidate at the given index
    setSavedCandidates(updatedSavedCandidates); // Update the state
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates)); // Update localStorage
  };

  return (
    <div>
      <h1>Potential Candidates</h1>

      {savedCandidates.length > 0 ? (
        <div className="saved-candidates-container">
          {savedCandidates.map((candidate, index) => (
            <div key={index} className="candidate-card">
              <p><strong>Name:</strong> {candidate.name || 'N/A'}</p>
              <p><strong>Username:</strong> {candidate.username || 'N/A'}</p>
              <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
              <img src={candidate.avatar || ''} alt={`${candidate.name}'s avatar` || 'N/A'} width="100" />
              <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
              <p>
                <strong>Profile:</strong> 
                <a href={candidate.html_url || ''} target="_blank" rel="noopener noreferrer">{candidate.html_url}</a>
              </p>
              <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
              {/* Delete button */}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved candidates available...</p>
      )}
    </div>
  );
};

export default SavedCandidates;
