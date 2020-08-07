import React, { Component } from 'react'
// import '../styles/AddRecipe.css';
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
} from 'react-bootstrap'

const baseUrl = 'http://localhost:1337/'

class AddMovie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [{
                "genres": [
                    "Action",
                    "Adventure",
                    "Comedy",
                    "Family",
                    "Fantasy",
                    "Sci-Fi"
                ],
                "actors": [
                    "Will Smith",
                    "Michael Stuhlbarg",
                    "Nicole Scherzinger"
                ],
                "contentId": "1bxyz94h1kdj2akec",
                "movieName": "Men in Black 3 ",
                "director": "Barry Sonnenfeld",
                "rating": "6.8",
                "releaseYear": "2012",
                "language": "English",
                "duration": "106",
            }],
            recipes: [],
            selected: [],
            detailRecipe: '',
            showDetailedRecipe: false,
            recipesData: 'Add your recipe!!',
            showAlert: false,
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
        fetch(`${baseUrl}getallingredients`)
            .then(res => res.json())
            .then(ingredients => {

            })
            .catch(err => {
                console.log(err)
                this.setState({
                    ingredients: []
                })
            })
    }
    addProcedure() {
        console.log("add procedure", this.state.procedure, this.state.recipeStep)
        this.state.procedure.push(this.state.recipeStep)
        this.setState({ procedure: this.state.procedure, recipeStep: '' })
    }

    addMovie() {      

        fetch(`${baseUrl}addrecipe`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then((res) => {
                console.log("after adding")
                this.setState({
                    showAlert: true,
                    alertMessage: 'Successfully saved your recipe!',
                    alertHeading: 'Success!',
                    authorRecipes: res.authorRecipes
                })
                console.log(res, "API Response")
            })

            .catch(err => {
                console.log(err)
                this.setState({
                    ingredients: []
                })
            })


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
            <Container fluid>
                <Button onClick={() => this.addRecipe()}>Add Movie</Button>
                <Row>
                    {
                        !this.state.showDetailedRecipe &&
                        (<Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Movie Name</th>
                                    <th>Rating</th>
                                    <th>Actor Name</th>
                                    <th>Director Name</th>
                                    <th>Genre</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.movies.map((item =>
                                    <tr onClick={() => this.showRecipe(item)}>
                                        <td>{item.movieName}</td>
                                        <td>{item.rating}</td>
                                        <td>{item.actor}</td>
                                        <td>{item.preparationTime}</td>
                                        <td>{item.actor}</td>
                                        <td><Button>Edit</Button></td>
                                        <td><Button>Delete</Button></td>
                                    </tr>))}
                            </tbody>
                        </Table>)
                    }
                </Row>
            </Container >
        )
    }
}

// const withContext = () => (
//     <UserContext.Consumer>
//         {(contextProps) => (<AddMovie {...contextProps} />)}
//     </UserContext.Consumer>
// );

// export default withContext;
export default AddMovie;




