import React, { Component } from 'react'
import '../styles/AdminHome.css';
import Select from 'react-select';

// import UserContext from '../UserContext';
import {
	Table,
	FormControl,
	InputGroup,
	Button,
	Container,
	Row,
	Col,
	Form,
	Image,
	Modal
} from 'react-bootstrap';

const baseUrl = 'http://localhost:4000/';
let genre = [{ value: 'All Genres', label: 'All Genres' },
{ value: 'Comedy', label: 'Comedy', },
{ value: 'Action', label: 'Action', },
{ value: 'Horror', label: 'Horror' }]
let formData = [
	{
		title: 'Movie Name',
		name: 'movieName'
	},
	{
		title: 'Rating',
		name: 'rating',
	},
	{
		title: 'Release Year',
		name: 'releaseYear'
	},
	{
		title: 'language',
		name: 'language',
		as: 'select',
		option: ['English', 'Hindi', 'Marathi'],
	},

	{
		title: 'Actor Name',
		name: 'actors'
	},

	{
		title: 'Genre',
		name: 'genre',
		as: 'select',
		option: ['Action', 'Comedy'],

	},
	{
		title: 'Duration',
		name: 'duration',
		// button: 'add'
	}

]

class AdminHome extends Component {
	constructor(props) {
		super(props)
		this.state = {
			movies: [],
			showAddMoviePage: false,
			currentUser: this.props.username
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}
	handleSubmit(event) {
		console.log(this.state)
		event.preventDefault()
	}

	componentDidMount() {
		console.log("current user", this.state.currentUser)
		fetch(`${baseUrl}admin/getall`)
			.then(res => res.json())
			.then(movies => {
				console.log(movies.length);
				this.setState({ movies: movies.data })
			})
			.catch(err => {
				console.log(err)
			})
	}
	addMovie() {
		this.setState({
			showAddMoviePage: true
		})
		// fetch(`${baseUrl}addrecipe`, {
		//     method: 'post',
		//     headers: { 'Content-Type': 'application/json' },
		//     body: JSON.stringify()
		// })
		//     .then(res => res.json())
		//     .then((res) => {
		//         console.log("after adding")
		//         this.setState({
		//             showAlert: true,
		//             alertMessage: 'Successfully saved your recipe!',
		//             alertHeading: 'Success!',
		//             authorRecipes: res.authorRecipes
		//         })
		//         console.log(res, "API Response")
		//     })
		//     .catch(err => {
		//         console.log(err)
		//         this.setState({
		//             ingredients: []
		//         })
		//     })
	}
	closeDetails = () => {
		this.setState({
			showDetailedRecipe: false
		})
	}
	handleClose = () => {
		console.log("in close")
		this.setState({
			showAlert: false
		})
	}
	render() {
		return (
			<div className='container-fluid adminShowMovie'>
				{
					this.state.showAddMoviePage === false &&
					<>
						<div>
							<Button onClick={() => this.addMovie()}>Add Movie</Button>
						</div>
						<div className='row movieTableContainer'>
							<Table striped bordered hover>
								<thead>
									<tr className="tableTitle">
										<th>Movie Image</th>
										<th>Movie Name</th>
										<th >Rating</th>
										<th>Actor Name</th>
										<th>Director Name</th>
										<th>Genre</th>
										<th>Edit</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{this.state.movies.map((item =>
										<tr className="tableTitle" onClick={() => this.showRecipe(item)}>
											<td></td>
											<td>{item.movieName}</td>
											<td>{item.rating}</td>
											<td>{item.actors.join(',')}</td>
											<td>{item.director}</td>
											<td>{item.genres.join(',')}</td>
											<td><Button>Edit</Button></td>
											<td><Button>Delete</Button></td>
										</tr>))}
								</tbody>
							</Table>
						</div>
					</>}
				<div className='addMovieForm'>
					{formData.map(data => {
						return (
							<div>
								{(this.state.showAddMoviePage) && !(data.option) &&
									<Form.Group as={Row} >
										<Form.Label column sm='3'>
											{data.title}
										</Form.Label>
										<Col sm='6'>
											<Form.Control as={data.as}
												className='formValues'
												type='input'
												placeholder={data.title}
												name={data.name}
												onChange={this.handleChange}
											>
											</Form.Control>
										</Col> </Form.Group>
								}
								{(data.option) && (this.state.showAddMoviePage) && <Form.Group as={Row} >
									<Form.Label column sm='3'>
										{data.title}
									</Form.Label>
									<Col sm='6'>
										<Select
											closeMenuOnSelect={false}
											defaultValue={[{ label: 'all genre' }]}
											isMulti
											options={genre}
											onChange={this.selectGenre}
										/>I

                                    </Col> </Form.Group>
								}
							</div>
						)
					})}
					<div>
						<Button onClick={() => this.saveMovie()}>Add Movie</Button>
					</div>
				</div>
			</div >
		)
	}
}

// const withContext = () => (
//     <UserContext.Consumer>
//         {(contextProps) => (<AddMovie {...contextProps} />)}
//     </UserContext.Consumer>
// );

// export default withContext;
export default AdminHome;




