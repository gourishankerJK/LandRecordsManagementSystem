import React from 'react';


interface InputProps {
    label: string;
    value: string;
    id: string;
    onChange: (value: string) => void;
    [x: string]: any; 
  }

const Input: React.FC<InputProps> = ({ id , label, value, onChange , ...rest }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input {...rest} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
};
 
export default Input;
