import React, { Component } from "react";
import User from './User';

class Home extends Component {
	_isMounted = false;

	state = {
		users: [],
	};

	componentDidMount() {
		this._isMounted = true;
		this.fetchData();
	}

	componentDidUpdate() {
		this.fetchData();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	fetchData() {
		// const url = './users.php';
		const url = './users.json';
		fetch(url)
			.then(res => res.json())
			.then(res => {
				if (this._isMounted) {
					this.setState({
						users: res
					})
				}
			});
	}

  render() {
    return (
		<div className="d-flex flex-wrap">
			{this.state.users.map((user, index) =>
				<User index={ (index + 1) } user={ user } key={ user.id }></User>
			)}
		</div>
	);
  }
}

export default Home;
