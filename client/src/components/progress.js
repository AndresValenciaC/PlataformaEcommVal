import React from 'react'
import PropTypes from 'prop-types'
import { prototype } from 'module'

const progress = ({percentage}) => {
    return (
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped bg-success"
          role="progressbar"
          style={{width:`${percentage}%`}}>
           {percentage}%
        </div>
       
      </div>
    );
}

progress.propTypes = {
percentage: PropTypes.number.isRequired,
}

export default progress
