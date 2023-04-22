import { dataLength } from "ethers";
import React, { FC } from "react";
import { DetailsIcon, Unverified, Verified } from "../../assets";
import "./style.scss";

interface recordsProps {
	title: string;
	heading: Array<Array<string>>;
	item: Array<any>;
}

const Records: FC<recordsProps> = ({ title, heading, item }) => {
	return (
		<div id="records">
			<h3 className="record-heading">{title}</h3>
			<div className="record-table">
				<table>
					<thead>
						<tr>
							<th>{heading[0][0]}</th>
							<th>{heading[1][0]} </th>
							<th>{heading[2][0]}</th>
							<th>{heading[3][0]}</th>
							<th>{heading[4][0]}</th>
							<th>{heading[5][0]}</th>
						</tr>
					</thead>

					<tbody>
						{item?.map((ele) => {
							return (
								<tr key={ele[heading[0][1]]}>
									<td>{ele[heading[0][1]]}</td>
									<td>{ele[heading[1][1]]}</td>
									<td>{ele[heading[2][1]]}</td>
									<td>
										<div className="status">
											{ele[heading[3][1]] ? <img src={Verified} alt="" /> :  <img className = "unverified-badge" src={Unverified} alt="" /> }
										</div>
									</td>
									<td>
										{heading[4][0] === "Date"
											? ele[heading[4][1]]
											: ele[heading[4][1]]
											? "YES"
											: "NO"}
									</td>
									{
										<td onClick={() => console.log(ele[heading[0][1]])}>
											<img
												src={DetailsIcon}
												alt="view"
												className="record-btn"
											/>
										</td>
									}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Records;
