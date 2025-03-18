import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';  // Import the existing searchGithub function
import { Candidate } from '../interfaces/Candidate.interface';
import './CandidateSearch.css';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // List of candidates
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Track the index of the current candidate

  const currentCandidate = candidates[currentIndex]; // Get the current candidate

  // Skip to the next candidate, looping back to the beginning
  function handleSkip() {
    if (candidates.length === 0) {
      // Display a message to the user
      console.log("No candidates available...");
      return;
    }

    // Remove the skipped candidate from the candidates array
    const updatedCandidates = candidates.filter((_, index) => index !== currentIndex);
    setCandidates(updatedCandidates);

    // Reset the currentIndex to 0 if the list is empty, otherwise keep it within bounds
    setCurrentIndex((prevIndex) => (updatedCandidates.length === 0 ? 0 : prevIndex % updatedCandidates.length));
  }

  // Save the current candidate to localStorage
  function handleSave() {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidates[currentIndex]);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    
    // Remove the saved candidate from the candidates array
    const updatedCandidates = candidates.filter((_, index) => index !== currentIndex);
    setCandidates(updatedCandidates);

    // Reset the currentIndex to 0 if the list is empty, otherwise keep it within bounds
    setCurrentIndex((prevIndex) => (updatedCandidates.length === 0 ? 0 : prevIndex % updatedCandidates.length));
  }

  // Map API response to Candidate interface
  const mapToCandidate = (apiData: any): Candidate => {
    return {
      name: apiData.name || null,
      username: apiData.login || null,
      location: apiData.location || null,
      avatar: apiData.avatar_url || null,
      email: apiData.email || null,
      html_url: apiData.html_url || null,
      company: apiData.company || null,
    };
  };

  // Fetch random candidates using the searchGithub function
  useEffect(() => {
    searchGithub().then((data) => {
      // Map API response to match Candidate interface
      const candidatesList = data.map((user: any) => mapToCandidate(user));
      setCandidates(candidatesList); // Set the list of candidates to the state
    });
  }, []); // Only run once on component mount

  return (
    <div>
      <h1>Candidate Search</h1>

      {/* Displaying the current candidate */}
      {candidates.length > 0 ? (
        <div className="candidate-info">
          <img src={currentCandidate.avatar || ''} alt={`${currentCandidate.name}'s avatar`} />
          <p><strong>Name:</strong> {currentCandidate.name || 'N/A'}</p>
          <p><strong>Username:</strong> {currentCandidate.username || 'N/A'}</p>
          <p><strong>Location:</strong> {currentCandidate.location || 'N/A'}</p>
          <p><strong>Email:</strong> {currentCandidate.email || 'N/A'}</p>
          <p>
            <strong>Profile:</strong> 
            <a href={currentCandidate.html_url || ''} target="_blank" rel="noopener noreferrer">{currentCandidate.html_url}</a>
          </p>
          <p><strong>Company:</strong> {currentCandidate.company || 'N/A'}</p>
        </div>
      ) : (
        <p>No candidates available...</p>
      )}

      {/* Buttons for saving or skipping the current candidate */}
      <button onClick={handleSave}>Save Candidate</button>
      <button onClick={handleSkip}>Skip Candidate</button>
    </div>
  );
};

export default CandidateSearch;
