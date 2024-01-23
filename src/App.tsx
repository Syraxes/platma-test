import React from 'react';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import useUserApi from './hooks/useUserApi';

const App: React.FC = () => {
  const { users, schema, createUser } = useUserApi();

  return (
    <div>
      {schema && (
        <>
          <UserForm onSubmit={createUser} schema={schema} />
          <UserTable users={users} schema={schema} />
        </>
      )}
    </div>
  );
};

export default App;
