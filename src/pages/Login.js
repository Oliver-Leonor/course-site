import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function Login () {

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false);

	function login (e) {
		
		e.preventDefault()

		fetch(`${process.env.REACT_APP_API_URL}/users/login`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			// We will receive either a token or a false response
		//	console.log(data)

			if(typeof data.access !== "undefined") {
				localStorage.setItem('token', data.access)
				retrieveUserDetails(data.access)

				Swal.fire({
					title: "Login Successful",
					icon: "success",
					text: "Welcome to Zuitt!"
				})
			} else {
				Swal.fire({
					title: "Authentication failed",
					icon: "error",
					text: "Please, check your login details and try again."
				})
			}

			

		})

		// Set email of the authenticated user in the local storage.
		/*
			Syntax:
				localStorage.setItem("propertyName", value)
		*/

		// localStorage.setItem("email", email);

		// setUser ({email: localStorage.getItem('email')})

		setEmail("");
		setPassword("");

		//alert("You are logged in")
	}

	const retrieveUserDetails = (token) => {
		
		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			// Global user for validation across the whole app
			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})
		})
		
	}

	useEffect(() => {
		if((email !== "" && password !== "")) {
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [email, password]);

	return (

		(user.id !== null) ?
			<Navigate to="/courses" />
			:
			<Form onSubmit={e => login(e)}>
			      <Form.Group className="mb-3" controlId="email">
			        <Form.Label>Email address</Form.Label>
			        <Form.Control type="email" 
			        	placeholder="Enter email"
			        	value={email}
			        	onChange={e => setEmail(e.target.value)}
			        	required
			        />
			        
			      </Form.Group>

			      <Form.Group className="mb-3" controlId="password">
			        <Form.Label>Password</Form.Label>
			        <Form.Control 
			        	type="password" 
			        	placeholder="Password"
			        	value={password}
			        	onChange={e => setPassword(e.target.value)}
			        	required
			        />
			      </Form.Group>
			      
			      {
			      	isActive ?
				      	<Button variant="success" type="submit">
				      	  Submit
				      	</Button>
				      	:
				       <Button variant="success" type="submit" disabled>
				        Submit
				       </Button>
			      }
			 </Form>
	)
}