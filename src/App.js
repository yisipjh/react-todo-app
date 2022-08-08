import React, { Component } from 'react';
import './App.css';

export default class App extends Component {

	state = {
		todoData : [
			{
				id: "1",
				title: "공부하기",
				completed: true
			},
			{
				id: "2",
				title: "청소하기",
				completed: false
			}
		]
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
	getStyle = () => {
		return {
			padding: "10px",
			borderBottom: "1px #ccc dotted",
			textDecoration: "none"
		}
	}	

	handleClick = (id) => {
		let newTodoData = this.state.todoData.filter(data => data.id !== id)
		console.log('newTodoData', newTodoData);

		this.setState({todoData: newTodoData});
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
						<div style={this.getStyle()} key={data.id}>
							<input type="checkbox" defaultChecked={false} />
							{data.title}
							<button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>x</button>
						</div>	
					))}

				</div>
			</div>
		)
	}
}