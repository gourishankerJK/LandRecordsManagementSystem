import React from 'react';


interface InputProps {
    label: string;
    value: string;
    id: string;
    onChange: (value: any) => void;
    [x: string]: any; 
  }

const Input: React.FC<InputProps> = ({ id , label, value, onChange , ...rest }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input {...rest} onChange={onChange} />
    </div>
  );
};
 
export default Input;
