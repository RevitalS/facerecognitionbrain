import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your picture. Give it a try'}
            </p>
            <p className='f5'>
                {'Insert a picture link. For example:'}
            </p>
            <a href='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfXy0z0FtaFv5x0Ko1LYrvArpu5bMLRfTnRQ&usqp=CAU'>https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfXy0z0FtaFv5x0Ko1LYrvArpu5bMLRfTnRQ&usqp=CAU</a>
            <p/>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 bg-washed-yellow center' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-hot-pink' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;