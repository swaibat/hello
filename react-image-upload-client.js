import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faImage, faImages, faTimesCircle, faSpinner 
} from '@fortawesome/free-solid-svg-icons'
import { API_URL } from './config'
import './App.css'

export default class App extends Component {
  
  state = {
    uploading: false,
    images: []
  }

  onChange = e => {
    const files = Array.from(e.target.files)
    const formData = new FormData()
    this.setState({ uploading: true })

    files.forEach((file, i) => {
      formData.append(i, file)
    })

    fetch(`${API_URL}/image-upload`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      this.setState({ 
        uploading: false,
        images
      })
    })
  }

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    })
  }
  
  render() {
    const { uploading, images } = this.state

    const spinner = (
      <div className='spinner fadein'>
        <FontAwesomeIcon icon={faSpinner} size='5x' color='#3B5998' />
      </div>
    )

    const displayImages = images.map(image => {
      const id = image.public_id
      return (
        <div key={id} className='fadein'>
          <div onClick={() => this.removeImage(id)} className='delete'>
            <FontAwesomeIcon icon={faTimesCircle} size='2x' />
          </div>
          <img src={image.secure_url} alt='' />
        </div>
      )
    })    

    const buttons = (
      <div className='buttons fadein'>
        <div className='button'>
          <label htmlFor='single'>
            <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x' />
          </label>
          <input type='file' id='single' onChange={this.onChange} /> 
        </div>
        
        <div className='button'>
          <label htmlFor='multi'>
            <FontAwesomeIcon icon={faImages} color='#6d84b4' size='10x' />
          </label>
          <input type='file' id='multi' onChange={this.onChange} multiple />
        </div>
      </div>
    )

    const content = () => {
      switch(true) {
        case uploading:
          return spinner
        case images.length > 0:
          return displayImages
        default:
          return buttons
      }
    }

    return (
      <div>
        <div className='buttons'>
          {content()}
        </div>
      </div>
    )
  }
}