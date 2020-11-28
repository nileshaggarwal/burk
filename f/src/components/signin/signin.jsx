import React, { Component } from "react";

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: "",
			data: {},
		};
	}

	onEmailChange = e => this.setState({ signInEmail: e.target.value });
	onPasswordChange = e => this.setState({ signInPassword: e.target.value });

	onSubmitSignIn = ev => {
		ev.preventDefault();
		fetch("http://localhost:2020/signin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword,
			}),
		})
			.then(resp => resp.json())
			.then(data => {
				if (data.id) this.setState({ data });
			});
	};
	render() {
		return (
			<>
				{this.state.data.name ? (
					`HI, ${this.state.data.name}!`
				) : (
					<>
						<label htmlFor="email-address">Email</label>
						<input
							onChange={this.onEmailChange}
							type="text"
							name="email"
							id="email-address"
						/>{" "}
						<br />
						<label htmlFor="password">Password</label>
						<input
							onChange={this.onPasswordChange}
							type="password"
							name="password"
							id="password"
						/>
						<br />
						<input
							onClick={this.onSubmitSignIn}
							type="submit"
							value="Sign in"
						/>
					</>
				)}
			</>
		);
	}
}

export default Signin;
