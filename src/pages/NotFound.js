import { Button } from 'react-bootstrap';

export default function NotFound () {

	return (

		<div>
			<h1>Error 404 - Page Not Found</h1>
			<p>The page you are looking for cannot be found</p>
			<Button variant="primary" href="/">Back to Home</Button>
		</div>
		
	)
}