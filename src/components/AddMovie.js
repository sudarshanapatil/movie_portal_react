import React, { Component } from 'react';
import Select from 'react-select';
import {
  Button,
  Row,
  Col,
  Form,
  Modal
} from 'react-bootstrap'

// const baseUrl = 'http://localhost:1337/'

let genre = [
  { value: 'Comedy', label: 'Comedy', },
  { value: 'Action', label: 'Action', },
  { value: 'Horror', label: 'Horror' }];

let languageData = ['English', 'Marathi', 'Hindi']
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
class AddMovie extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = (event) => {
    console.log(event.target.value, "val")
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = (event) => {
    console.log(this.state)
    event.preventDefault()
  }
  render() {
    return (
      <>
        <div>
          {this.state.showAlert &&
            <Modal show={true} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{this.state.alertHeading}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{this.state.alertMessage}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Ok
            </Button>
              </Modal.Footer>
            </Modal>
          }
        </div>
        <div>
          {
            formData.map(data => {
              return (
                <div>
                  {!(data.option) &&
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
                      </Col>
                    </Form.Group>
                  }
                  {(data.option)
                    && <Form.Group as={Row} >
                      <Form.Label column sm='3'>
                        {data.title}
                      </Form.Label>
                      <Col sm='6'>
                        <Select
                          closeMenuOnSelect={false}
                          isMulti
                          options={genre}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Form.Group>
                  }
                </div>
              )
            })
          }
          <Form.Group as={Row} >
            <Form.Label column sm='3'>
              {'Language'}
            </Form.Label>
            <Col sm='6'>
              <Form.Control as={'select'}
                className='formValues'
                type='select'
                placeholder={'Language'}
                name={'language'}
                onChange={this.handleChange}
              >
                {languageData.map((item) => {
                  return (<option>{item}</option>)
                })}
              </Form.Control>

            </Col>
          </Form.Group>
          <div>
            <Button onClick={() => this.saveMovie()}>Add Movie</Button>
          </div>
        </div >
      </>
    );
  }
}

export default AddMovie;
