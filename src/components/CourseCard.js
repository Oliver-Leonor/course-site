import { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CourseCard({courseProp}) {

	// console.log(props, typeof props, courseProp)

	/*
		Use the state hook for this component to be able to store its state. States are used to keep track of the information related to individual components
		
		Syntax:
			const [getter, setter] = useState(initialGetterValue)
	*/

	const [count, setCount] = useState(0);
	const [seats, setSeats] = useState(30);
	// console.log(useState(0))
	

	/*function enroll() {
		
		if (seat === 0) {
			alert("No more seats")
		} else {
			setCount(count + 1)
			seatCount(seat - 1)
		}
	}*/

	function enroll() {
		if(count < 30) {
			setCount(count + 1)
			//console.log('Enrollee: ' + count)
			setSeats(seats - 1)
			//console.log('Seats: ' + seats)
		} // else {
		// 	alert("No more seats available.")
		// }
	}

	useEffect(() => {
		if(seats === 0) {
			alert("No more seats available.")
		}
	}, [seats])

	

	const { name, description, price, _id } = courseProp;

	return (


		<Row>
			<Col xs={12} md={6} >
				<Card className="cardHighlight2 p-3">
				      <Card.Body>
				        <Card.Title>{name}</Card.Title>
				        <Card.Subtitle>Description:</Card.Subtitle>
				        <Card.Text>{description}</Card.Text>
				        <Card.Subtitle>Price:</Card.Subtitle>
				        <Card.Text>PhP {price}</Card.Text>
				        <Button className="bg-primary" as={Link} to={`/courses/${_id}`}>Details</Button>
				      </Card.Body>
				</Card>
			</Col>
		</Row>

	)
}