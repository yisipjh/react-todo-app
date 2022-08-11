import React, { useCallback, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Lists from './components/Lists';

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

export default function App() {

	// console.log('App Component rendering');

	const [todoData, setTodoData] = useState(initialTodoData);
	const [value, setValue] = useState("");

	const handleClick = useCallback((id) => {
		let newTodoData = todoData.filter(data => data.id !== id)
		// console.log('newTodoData', newTodoData);
	
		setTodoData(newTodoData)
		// save local storage
		localStorage.setItem('todoData', JSON.stringify(newTodoData));

	}, [todoData]);

	const handleSubmit = (e) => {
		// form 안에 input을 전송할 때 페이지 리로드 되는 것을 막아줌
		e.preventDefault();

		// 새로운 할일 데이터
		let newTodo = {
			id: Date.now(),
			title: value,
			completed: false,
		};

		// 원래 있던 할 일에 새로운 할 일 더해주기
		setTodoData(prev => [...prev, newTodo]);
		// save local storage
		localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
		setValue("");
	}

	const handleRemoveClick = () => {
		setTodoData([]);
		localStorage.setItem('todoData', JSON.stringify([]));
	}

	// 체크 박스 클릭해서 완료상태 바꾸기

	return (
		<div className="flex items-center justify-center w-screen h-screen bg-blue-100">
			<div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
				<div className="flex justify-between mb-3">
					<h1>할일 목록</h1>
					<button onClick={handleRemoveClick}>Delete All</button>
				</div>
				<Lists handleClick={handleClick} todoData={todoData} setTodoData={setTodoData} />

				<Form handleSubmit={handleSubmit} value={value} setValue={setValue} />				
			</div>
		</div>
	)

}