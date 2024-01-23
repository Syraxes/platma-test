import { useState } from 'react';

const useUserForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return { isFormOpen, openForm, closeForm };
};

export default useUserForm;
