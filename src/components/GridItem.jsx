import React from 'react';
import "./gridstyle.scss"

function GridItem({url,description}) {
  return (
    <div className='grid-item'>
        <img className='grid-item-media' src={url}/>
        <p>{description}</p>

    </div>
  )
}

export default GridItem