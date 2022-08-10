import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from './List';

export default function Lists({ todoData, setTodoData }) {
// export default function List(props) {
	
	const handleEnd = (result) => {
		// console.log('result', result);
		// result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함

		// 목적지가 없으면(이벤트 취소) 이 함수를 종료;
		if (!result.destination) return;

		// 리액트 불변성을 지켜주기 위해 새로운 todoData를 생성
		const newTodoData = todoData;

		// 1. 변경시키는 아이템을 배열에서 지워준다.
		// 2. return 값으로 지워진 아이템을 잡아준다.
		const [reorderedItem] = newTodoData.splice(result.source.index, 1);

		// 원하는 자리에 reorderedItem을 insert 해줍니다.
		newTodoData.splice(result.destination.index, 0, reorderedItem);
		setTodoData(newTodoData);
	};

	return (
		<div>
			<DragDropContext onDragEnd={handleEnd}>				
				<Droppable droppableId='todo'>
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{todoData.map((data, index) => (
								<Draggable
									key={data.id}
									draggableId={data.id.toString()}
									index={index}
								>
									{(provided, snapshot) => (
										<List 
											key={data.id}
											id={data.id}
											title={data.title}
											completed={data.completed}
											todoData={todoData}
											setTodoData={setTodoData}
											provided={provided}
											snapshot={snapshot}
										/>
									)}
								</Draggable>						
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}