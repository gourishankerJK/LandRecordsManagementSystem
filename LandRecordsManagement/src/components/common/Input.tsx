import React from 'react'

interface InputProps {
  label: string
  value: string
  id: string
  onChange: (value: any) => void
  [x: string]: any
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  onChange,
  ...rest
}) => {
  return (
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
        {...rest}
        onChange={onChange}
        style={{
          padding: '0.5rem',
          fontSize: '15px',
          letterSpacing: '0.02em',
          border: '1px solid #FF8533',
          outline: '#FF8533',
          borderRadius:"5px"
        }}
      />
    </div>
  )
}

export default Input
