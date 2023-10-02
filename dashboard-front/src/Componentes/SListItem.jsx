import React from 'react'
import { Link } from 'react-router-dom'

export default function SListItem(props) {
    return (
        <>
            <li>
            <i className={props.icon}></i>
                {/* <a href={props.url} className=' btn-collapse'>
                    {props.children}
                </a> */}
                <Link to={props.url} className=' btn-collapse'>{props.children}</Link>
            </li>

        </>
    )
}
