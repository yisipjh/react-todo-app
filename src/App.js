import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Lists from './components/Lists';

export default function App() {

	const [todoData, setTodoData] = useState([]);
	const [value, setValue] = useState("");

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
		setValue("");
	}

	// 체크 박스 클릭해서 완료상태 바꾸기

	return (
		<div className="flex items-center justify-center w-screen h-screen bg-blue-100">
			<div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
				<div className="flex justify-between mb-3">
					<h1>할일 목록</h1>
				</div>
				<Lists todoData={todoData} setTodoData={setTodoData} />

				<Form handleSubmit={handleSubmit} value={value} setValue={setValue} />				
			</div>
		</div>
	)

}