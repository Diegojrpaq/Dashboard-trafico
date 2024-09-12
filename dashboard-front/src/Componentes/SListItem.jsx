import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SListItem(props) {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(props.url)
    }
    return (
        <>
            <li onClick={onClick} className='li-sub mt-5 h5'>
                <i className={props.icon}></i>
                {props.children}
            </li>
        </>
    )
}
