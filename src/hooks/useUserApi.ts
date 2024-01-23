import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserSchema, UserData } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/users'

const useUserApi = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [schema, setSchema] = useState<UserSchema | null>(null);

  useEffect(() => {
    axios.get(`${API_URL}/1`)
      .then(response => {
        setSchema({
          type: 'object',
          properties: response.data,
          required: Object.keys(response.data),
        });
      })
      .catch(error => {
        console.error('Error fetching user schema:', error);
      });

    axios.get(API_URL)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const createUser = async (userData: UserData) => {
    try {
      const response = await axios.post<UserData>(API_URL, userData);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return { users, schema, createUser };
};

export default useUserApi;
