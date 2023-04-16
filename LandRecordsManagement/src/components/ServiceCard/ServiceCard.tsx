import React, { FC } from 'react'
import './style.scss'

interface cardInerfaceProps {
    imgSource: string;
    desc: string;
    cardHeading: string;
}
const ServiceCard: FC<cardInerfaceProps> = ({ imgSource, desc, cardHeading }) => {
    return (
        <div id="card">
            <div className="image">
                <img src={imgSource} alt="" />
            </div>
            <div className="card-content">
                <h3 className="card-heading">
                    {cardHeading}
                </h3>
                <p className="card-desc" >{desc}</p>
            </div>
        </div>
    )
}

export default ServiceCard