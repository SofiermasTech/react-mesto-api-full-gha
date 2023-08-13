import { useState, useCallback } from 'react';

function useForm() {
   const [values, setValues] = useState({});

   const handleChange = (evt) => {
      const { value, name } = evt.target;

      setValues({
         ...values,
         [name]: value
      });
   };

   const resetForm = useCallback(
      (newValues = {}) => {
         setValues(newValues);
      },
      [setValues]
   );

   return { values, handleChange, setValues, resetForm };
}

export default useForm;