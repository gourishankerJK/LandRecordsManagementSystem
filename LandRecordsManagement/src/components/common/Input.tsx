import React from 'react'

interface InputProps {
  label: string
  name : string
  value: string
  id: string
  errors: any
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
  ...rest
}) => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label
          htmlFor={id}
          style={{
            padding: '0.5rem 0',
            fontSize: '15px',
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </label>
        <input

          name={name}
          {...rest}
          onChange={onChange}
          style={{
            padding: '0.5rem',
            fontSize: '15px',
            letterSpacing: '0.02em',
            border: '1px solid #FF8533',
            outline: '#FF8533',
            borderRadius: "5px"
          }}
        />

        {errors[name] && (<p style={{ fontSize: 10, color: 'red' }}>{errors[name]}</p>)}
      </div>


    </>
  )
}

export default Input
