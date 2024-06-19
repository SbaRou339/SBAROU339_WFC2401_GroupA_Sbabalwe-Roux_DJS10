import { useState, useEffect } from 'react';
import './App.css';

// This is the main component of our React application.
// It fetches a list of blog posts from the JSONPlaceholder API,
// and displays them on the screen.
function App() {
  // Use the useState hook to create a state variable called 'posts'
  // which will hold the fetched blog posts.
  // The initial value of 'posts' is an empty array.
  const [posts, setPosts] = useState([]);
  // Use the useState hook to create a state variable called 'error'
  // which will hold any error messages that occur during the API call.
  // The initial value of 'error' is null.
  const [error, setError] = useState(null);

  // This useEffect hook runs only once when the component mounts.
  // It fetches the blog posts from the API and updates the 'posts' state variable.
  // If an error occurs during the API call, it updates the 'error' state variable.
  useEffect(() => {
    // Define an asynchronous function called 'fetchPosts'
    const fetchPosts = async () => {
      try {
        // Send a GET request to the JSONPlaceholder API to fetch the blog posts.
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        // If the response is not 'ok', throw an error.
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the response as JSON and store it in the 'data' variable.
        const data = await response.json();
        // Update the 'posts' state variable with the fetched data.
        setPosts(data);
      } catch (error) {
        // If an error occurs during the API call, update the 'error' state variable.
        setError(error.message);
      }
    };

    // Call the 'fetchPosts' function to start the API call.
    fetchPosts();
  }, []);

  // If there is an error, display it to the user.
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If the 'posts' state variable is empty, display a loading message.
  // Otherwise, display each blog post's title and body.
  return (
    <div>
      <h1>Posts</h1>
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
