import React from 'react'

export default function SListItem(props) {
    return (
        <>
            <li>
            <i className={props.icon}></i>
                <a href="#" className=' btn-collapse'>
                    {props.children}
                </a>
            </li>

        </>
    )
}
