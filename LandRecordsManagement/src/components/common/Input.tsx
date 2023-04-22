import React from "react";
import "./Input.scss";
interface InputProps {
	label: string;
	name: string;
	value?: any;
	id: string;
	errors?: any;
	classes?: any;
	onChange: (value: any) => void;
	[x: string]: any;
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
	let temp = name.split(".").slice(-1)[0];
	return (
		<>
			<div className={`box-input ${classes}`}>
				<label htmlFor={id} className="label-input">
					{label}
				</label>
				<input name={name} {...rest} onChange={onChange} className="input" />

				{errors && errors[temp] && (
					<p style={{ fontSize: 10, color: "red" }}>{errors[temp]}</p>
				)}
			</div>
		</>
	);
};

export default Input;
