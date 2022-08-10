import React from 'react'


const List = ({id, title, completed, todoData,setTodoData, provided, snapshot}) => {
	
	const handleCompleChane = (id) => {
		let newTodoData = todoData.map((data) => {
			if(data.id === id) {
				// 본래의 것에 반대되는 것을 입력
				data.completed = !data.completed;
			}
			return data;
		});
		
		setTodoData(newTodoData)
	}
	
	const handleClick = (id) => {
		let newTodoData = todoData.filter(data => data.id !== id)
		// console.log('newTodoData', newTodoData);
	
		setTodoData(newTodoData)
	}

	return (
		<div>
			<div 
				key={id}
				{...provided.draggableProps}
				ref={provided.innerRef}
				{...provided.dragHandleProps}
				className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
			>
				<div className="items-center">
					<input 
						type="checkbox"
						onChange={() => handleCompleChane(id)}
						defaultChecked={false} />
					<span className={completed ? "line-through" : undefined}>{title}</span>
				</div>
				<div className="items-center">
					<button className="px-4 py-2 float-right" onClick={() => handleClick(id)}>x</button>
				</div>
			</div>
		</div>
	)
}

export default List