import { useState } from 'react';
import { useEffect} from 'react';
import { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Register () {

	const { user } = useContext(UserContext);

	const navigate = useNavigate()

	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [isActive, setIsActive] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');

	//console.log(email, password1, password2)

	fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`,{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email
				})
			})
			.then(res => res.json())
			.then(data => {
				if(data	=== true) 
				{
					Swal.fire({
					title: "Duplicate email found",
					icon: "error",
					text: "Please provide a different email"
				})
				setIsActive(false)	
				}
			})

	function registerUser(e) {
		e.preventDefault()

		fetch(`${process.env.REACT_APP_API_URL}/users/register`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				mobileNo: mobileNumber,
				password: password1
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data.access)

			if(data !== "undefined") {
				Swal.fire({
					title: "Registration sucessful",
					icon: "success",
					text: "Welcome to Zuitt"
				})

				navigate("/login")

			} else {
				Swal.fire({
					title: "Duplicate email found",
					icon: "error",
					text: "Please provide a different email"
				})

				navigate("/register")
			}
		})

		
				
		


		setEmail("");
		setPassword1("");
		setPassword2("");
		setFirstName("");
		setLastName("");
		setMobileNumber("");

		alert("Thank you for registering!")
	}

	useEffect(() => {
		if((email !== "" && password1 !== "" && password2 !== "" && firstName !== "" && lastName !== "" && mobileNumber !== "") && (password1 === password2)) {
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [email, password1, password2, firstName, lastName, mobileNumber]);

	return (
		
		
		(user.id !== null) ?
			<Navigate to="/courses" />
			:
		<Form onSubmit={e => registerUser(e)}>
			  <Form.Group className="mb-3">
		        <Form.Label>First Name</Form.Label>
		        <Form.Control 
		        	type="name" 
		        	placeholder="First Name" 
		        	value={firstName}
		        	onChange={e => setFirstName(e.target.value)}
		        	required
		        />
		      </Form.Group>
		      <Form.Group className="mb-3">
		        <Form.Label>Last Name</Form.Label>
		        <Form.Control 
		        	type="name" 
		        	placeholder="Last Name" 
		        	value={lastName}
		        	onChange={e => setLastName(e.target.value)}
		        	required
		        />
		      </Form.Group>
		      <Form.Group className="mb-3" controlId="userEmail">
		        <Form.Label>Email address</Form.Label>
		        <Form.Control 
		        	type="email" 
		        	placeholder="Enter email" 
		        	value={email}
		        	onChange={e => setEmail(e.target.value)}
		        	required
		        />
		      </Form.Group>

		      <Form.Group className="mb-3">
		        <Form.Label>Mobile Number</Form.Label>
		        <Form.Control
		        required={true}
		      	onChange={e => setMobileNumber(e.target.value)}
		      	type="number"
		      	value={mobileNumber}
		      	placeholder="09xxxxxxxxx"
		        />
		      </Form.Group>

		      <Form.Group className="mb-3" controlId="password1">
		        <Form.Label>Password</Form.Label>
		        <Form.Control 
		        	type="password" 
		        	placeholder="Password"
		        	value={password1}
		        	onChange={e => setPassword1(e.target.value)}
		        	required
		        />
		      </Form.Group>

		      <Form.Group className="mb-3" controlId="password2">
		        <Form.Label>Verify Password</Form.Label>
		        <Form.Control 
		        	type="password" 
		        	placeholder="Verify Password"
		        	value={password2}
		        	onChange={e => setPassword2(e.target.value)}
		        	required
		        />
		      </Form.Group>
		      

		      {
		      	isActive ? 
		      		<Button variant="primary" type="submit" id="submitBtn">
		      		  Submit
		      		</Button>
		      		:
		      		<Button variant="primary" type="submit" disabled>
		      		  Submit
		      		</Button>
		      }


		 </Form>
	)
}