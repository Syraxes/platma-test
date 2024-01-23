import React from 'react';
import { UserSchema, UserData } from '../types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface UserTableProps {
  users: UserData[];
  schema: UserSchema;
}

const renderTableCell = (value: any): React.ReactNode => {
  if (typeof value === 'object') {
    return Object.values(value).map((v, index) => (
      <div key={index}>{renderTableCell(v)}</div>
    ));
  }
  return value;
};

const UserTable: React.FC<UserTableProps> = ({ users, schema }) => {
  return (
    <div>
      <h1>User Table</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(schema.properties).map(key => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id as number}>
                {Object.keys(schema.properties).map(key => (
                  <TableCell key={key}>{renderTableCell(user[key])}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
