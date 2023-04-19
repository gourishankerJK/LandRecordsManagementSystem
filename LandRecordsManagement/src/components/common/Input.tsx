import React from 'react'
import './Input.scss';
interface InputProps {
  label: string
  name: string
  value?: string
  id: string
  errors?: any
  classes?: any
  onChange: (value: any) => void
  [x: string]: any
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  errors,
  classes,
  ...rest
}) => {
  return (
    <>
      <div className={`box-input ${classes}`}  >
        <label
          htmlFor={id}
          className="label-input"
        >
          {label}
        </label>
        <input
          name={name}
          {...rest}
          onChange={onChange}
          className= 'input'
        />

        {errors && errors[name] && (<p style={{ fontSize: 10, color: 'red' }}>{errors[name]}</p>)}
      </div>


    </>
  )
}

export default Input
