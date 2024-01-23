import React, { ChangeEvent, FormEvent, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  Typography,
  Grid,
} from "@mui/material";
import { UserSchema, UserData } from "../types";
import useUserForm from "../hooks/useUserForm";
import axios from "axios";

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

  const handleUpdate = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setFormData(response.data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    if (isFormOpen) {
      setFormData({});
    }
  }, [isFormOpen]);

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
              {Object.keys(schema.properties).map((key) => (
                <Grid item xs={12} key={key}>
                  <TextField
                    fullWidth
                    label={key}
                    type={
                      schema.properties[key].type === "integer"
                        ? "number"
                        : "text"
                    }
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleUpdate}
                >
                  Update
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
