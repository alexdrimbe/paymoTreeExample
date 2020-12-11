import React from 'react'

const PaymoItem = ({ name, items = [] }) => {
	return (
		<li>
			<div>{name}</div>
			<ul>
				{items.map(({ id, name, items }) => {
					return (
						<PaymoItem
							key={id}
							name={name}
							items={items}
						/>
					)
				})}
			</ul>
		</li>
	)
}
export default PaymoItem
