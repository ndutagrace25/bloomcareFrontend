import React from "react";
const NewTable = props => {
	return (
	<div className="table-responsive">
		<table className="table bg-white table-hover table-sm">
		<thead className="bg-purple text-white">{props.tableHead ? props.tableHead : null}</thead>
		<tbody>{props.tableBody ? props.tableBody : null}</tbody>
		</table>
	</div>
	);
};

export default NewTable;
