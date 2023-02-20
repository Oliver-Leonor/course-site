import { Row, Col, Card } from 'react-bootstrap'

export default function Highlights() {
	return (

		<Row className="mt-3 mb-3">
			<Col xs={12} md={4} >
				<Card className="cardHighlight p-3">
				   <Card.Body>
				     <Card.Title>Learn From Home</Card.Title>				     
				     <Card.Text>
				       Some quick example text to build on the card title and make up the
				       bulk of the card's content.
				     </Card.Text>
				   </Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={4} >
				<Card className="cardHighlight p-3">
				   <Card.Body>
				     <Card.Title>Study Now, Pay Later</Card.Title>
				     <Card.Text>
				       Some quick example text to build on the card title and make up the
				       bulk of the card's content.
				       Some quick example text to build on the card title and make up the
				       bulk of the card's content.
				     </Card.Text>
				   </Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={4} >
				<Card className="cardHighlight p-3">
				   <Card.Body>
				     <Card.Title>Be Part of Our Community</Card.Title>
				     <Card.Text>
				       Some quick example text to build on the card title and make up the
				       bulk of the card's content.
				     </Card.Text>
				   </Card.Body>
				</Card>
			</Col>
		</Row>
		
	)
}