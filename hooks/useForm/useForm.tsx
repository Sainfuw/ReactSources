import { useState } from "react";

export const useForm = <T extends Object>(formFields: T) => {
  const [form, setForm] = useState(formFields);

  const reset = () => {
    setForm(formFields);
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  return { form, handleInputChange, reset };
};
