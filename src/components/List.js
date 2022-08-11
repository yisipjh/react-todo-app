import React, { useState } from 'react'


const List = React.memo(
	({
		id, 
		title, 
		completed, 
		todoData,
		setTodoData, 
		provided, 
		snapshot, 
		handleClick
	}) => {
	
	// console.log('List Component rendering');

	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);

	const handleCompleChane = (id) => {
		let newTodoData = todoData.map((data) => {
			if(data.id === id) {
				// 본래의 것에 반대되는 것을 입력
				data.completed = !data.completed;
			}
			return data;
		});
		
		setTodoData(newTodoData)
		localStorage.setItem('todoData', JSON.stringify(newTodoData));
	};

	const handleEditChange = (event) => {
		setEditedTitle(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		let newTodoData = todoData.map((data) => {
			if(data.id === id) {
				data.title = editedTitle;
			}
			return data;
		})
		setTodoData(newTodoData);
		localStorage.setItem('todoData', JSON.stringify(newTodoData));
		setIsEditing(false);
	}

	if(isEditing) {
		return(
			<div>
				<div
					className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
				>
					<div className="items-center">
						<form onSubmit={handleSubmit}>
							<input
								value={editedTitle}
								onChange={handleEditChange}
								className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
							/>
						</form>						
					</div>
					<div className="items-center">
						<button className="px-4 py-2 float-right" onClick={() => handleClick(id)}>x</button>
						<button className="px-4 py-2 float-right" type="submit" onClick={handleSubmit}>save</button>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div>
				<div 
					key={id}
					{...provided.draggableProps}
					ref={provided.innerRef}
					{...provided.dragHandleProps}
					className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
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
						<button className="px-4 py-2 float-right" onClick={() => setIsEditing(true)}>edit</button>
					</div>
				</div>
			</div>
		)
	}

	
});

export default List