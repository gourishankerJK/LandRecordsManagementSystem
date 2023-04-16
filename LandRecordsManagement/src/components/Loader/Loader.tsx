import React from 'react'
import { LoaderIcon } from '../../assets';
import './style.scss';
const Loader = () => {
  return (
    <div id="loader">
        <div className="content">
            <img src={LoaderIcon} alt="loader" />
        </div>
    </div>
  )
}

export default Loader;