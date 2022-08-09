import React, { Component } from 'react';
import './App.css';

export default class App extends Component {

	state = {
		todoData : [],
		value: ""
	}

	btnStyle = {
		color: "#fff",
		border: "none",
		padding: "5px 9px",
		borderRadius: "50%",
		cursor: "pointer",
		float: "right"
	}

	// 동적 스타일을 위해 함수로 구현
	getStyle = (completed) => {
		return {
			padding: "10px",
			borderBottom: "1px #ccc dotted",
			textDecoration: completed ? "line-through" : "none"
		}
	}	

	handleClick = (id) => {
		let newTodoData = this.state.todoData.filter(data => data.id !== id)
		console.log('newTodoData', newTodoData);

		this.setState({ todoData: newTodoData });
	}

	handleChange = (e) => {
		this.setState({ value: e.target.value });
	}

	handleSubmit = (e) => {
		// form 안에 input을 전송할 때 페이지 리로드 되는 것을 막아줌
		e.preventDefault();

		// 새로운 할일 데이터
		let newTodo = {
			id: Date.now(),
			title: this.state.value,
			completed: false,
		};

		// 원래 있던 할 일에 새로운 할 일 더해주기
		this.setState({ todoData: [...this.state.todoData, newTodo], value: "" })
	}

	// 체크 박스 클릭해서 완료상태 바꾸기
	handleCompleChane = (id) => {
		let newTodoData = this.state.todoData.map((data) => {
			if(data.id === id) {
				// 본래의 것에 반대되는 것을 입력
				data.completed = !data.completed;
			}
			return data;
		});
		this.setState({ todoData: newTodoData });
	}

	render() {
		return (
			<div className="container">
				<div className="todoBlock">
					<div className="title">
						<h1>할일 목록</h1>
					</div>

					{this.state.todoData.map((data) => (
						// 아래의 key가 있어야 다시 rendering할때 기존 부분은 재 렌더링 되지 않는다.
						<div style={this.getStyle(data.completed)} key={data.id}>
							<input 
								type="checkbox"
								onChange={() => this.handleCompleChane(data.id)}
								defaultChecked={false} />
							{data.title}
							<button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>x</button>
						</div>	
					))}
					<p></p>
					<form style={{ displahy: 'flex'}} onSubmit={this.handleSubmit}>
						<input 
							type="text"
							name="value"
							style={{ flex: '10', padding: '5px' }}
							placeholder="해야 할 일을 입력하세요."
							value={this.state.value}
							onChange={this.handleChange}
						/>
						<input
							type="submit"
							value="입력"
							className="btn"
							style={{ flex: '1' }}
						/>
					</form>
				</div>
			</div>
		)
	}
}