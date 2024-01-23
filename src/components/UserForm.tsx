import React, { ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Dialog, DialogContent, Typography, Grid } from '@mui/material';
import { UserSchema, UserData } from '../types';
import useUserForm from '../hooks/useUserForm';

interface UserFormProps {
  onSubmit: (userData: UserData) => void;
  schema: UserSchema;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, schema }) => {
  const { isFormOpen, openForm, closeForm } = useUserForm();
  const [formData, setFormData] = React.useState<UserData>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
    closeForm();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={openForm}>
        Open User Form
      </Button>

      <Dialog open={isFormOpen} onClose={closeForm} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography variant="h4" align="center" gutterBottom>
            Create User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {Object.keys(schema.properties).map(key => (
                <Grid item xs={12} key={key}>
                  <TextField
                    fullWidth
                    label={key}
                    type={schema.properties[key].type === 'integer' ? 'number' : 'text'}
                    name={key}
                    value={formData[key] || ''}
                    onChange={handleChange}
                    required
                    autoComplete="off"  // Отключил автокомплит что б не напрягали предупреждения в браузере, по хорошему должен быть настроен
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserForm;
