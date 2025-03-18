// TODO: Create an interface for the Candidate objects returned by the API
// THEN the user should see a list of previously saved potential candidates with their name, username, location, avatar, email, html_url, and company

export interface Candidate {
  name: string | null;
  username: string | null;
  location: string | null;
  avatar: string | null;
  email: string | null;
  html_url: string | null;
  company: string | null;
}

