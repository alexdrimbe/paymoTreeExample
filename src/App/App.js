import React, { useState, useEffect } from 'react'
import PaymoItem from './PaymoItem'

const App = () => {
	const [data, setData] = useState([])

	useEffect(() => {
		const requestParams = {
			headers: {
				'X-Session': '5059fe5ba060edfd2e29cf241a40d1fd'
			},
		}

		Promise.all([
			fetch('https://app.paymoapp.com/api/projects/', requestParams).then(res => res.json()),
			fetch('https://app.paymoapp.com/api/tasklists/', requestParams).then(res => res.json()),
			fetch('https://app.paymoapp.com/api/tasks/', requestParams).then(res => res.json())
		]).then(([projectsResponse, tasklistsResponse, tasksResponse]) => {
			const data = projectsResponse.projects.map(project => {
				return {
					...project,
					items: tasklistsResponse.tasklists
						.filter(tasklist => tasklist.project_id === project.id)
						.map(tasklist => {
							return {
								...tasklist,
								items: tasksResponse.tasks
									.filter(task => task.tasklist_id === tasklist.id)
							}
						})
				}
			})

			setData(data)
		})

	}, [])

	return <div>
		<h1>PaymoApp Tasks as a tree</h1>
		<ul>
			{data.map(({ id, name, items }) => {
				return (
					<PaymoItem
						key={id}
						name={name}
						items={items}
					/>
				)
			})}
		</ul>
	</div>
}

export default App
