import React from 'react'

export default function SHeaderList(props) {
    return (
        <>
            <div>
                <a
                    href={'#' + props.idcollapse}
                    className='btn-collapse d-flex bd-highlight'
                    data-bs-toggle="collapse"
                    role="button"

                    aria-controls={props.idcollapse}>
                    <i className={props.icon+' bd.highlight'} ></i>
                    <p className='bd.highlight'>{props.title}</p>
                    <i className="bi bi-chevron-right bd.highlight ms-auto"></i>

                </a>
            </div>
            <div className="collapse" id={props.idcollapse}>
                <ul>
                    {props.children}
                </ul>
            </div>

            {/*  <div>
                <a
                    href="#collapseExample"
                    className='btn-collapse'
                    data-bs-toggle="collapse"
                    role="button"

                    aria-controls="collapseExample">
                    <h5><i className={props.icon}></i>{props.title}</h5></a>
            </div>
            <div className="collapse" id="collapseExample">
                <ul>
                    {props.children}
                </ul>
            </div> */}
        </>
    )
}
