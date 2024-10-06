import { getCurrentUser } from '@aws-amplify/auth';
import axios from 'axios';
import { useEffect, useState } from 'react';
type Forum = {
    name: string;
    description: string;
    created_by: string;
  };
export default function ForumList() {
  const [forumData, setForumData] = useState({
    name: '',
    description: '',
    created_by: ''
  });
  const [forums, setForums] = useState<Forum[]>([]);
  const [currUser, setCurrUser] = useState('');
  const getAuthenticatedUser = async () => {
    try{
        const user = await getCurrentUser();
        setCurrUser(user?.username || '');
        setForumData({
            ...forumData,
            created_by: user?.username || ''
        })
    }catch(e){}
  }
  // Fetch forums from the API
  const fetchForums = async () => {
    try {
      const result = await axios.get('https://6fd92qzz05.execute-api.us-west-1.amazonaws.com/getForums');
      setForums(result.data);
    } catch (error) {
      console.error('Error fetching forums:', error);
    }
  };

  // Call fetchForums when component mounts
  useEffect(() => {
    fetchForums();
    getAuthenticatedUser();
  }, []);
  
  const handleChange = (e:any) => {
    setForumData({
      ...forumData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axios.post('https://6fd92qzz05.execute-api.us-west-1.amazonaws.com/createForums', forumData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchForums(); 
    } catch (error) { }
  };

  return (
    <div>
        <h2>List of Forums</h2>

        <ul>
            {forums.length > 0 ? (
            forums.map((forum, index) => (
                <li key={index}>
                <strong>{forum.name}</strong> - {forum.description} (Created by: {forum.created_by})
                </li>
            ))
            ) : (
            <p>No forums found</p>
            )}
        </ul>
      <h2>Create Forum</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={forumData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={forumData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Forum</button>
      </form>
    </div>
  );
}
