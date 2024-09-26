import React from "react"
export default function Contact(){
    return(
        <div className="container my-4">
            <h2 className="my-4">Contact info about customer</h2>
            <ul>
                <li>
                    <img src='icons8-mail-50.png' alt='mail' className="mx-3"></img>
                    customer@gmail.com
                </li>
                <li>
                    <img src='icons8-telegram-50.png' alt='tg' className="mx-3"></img>
                    @customer
                </li>
                <li>
                    <img src='icons8-vk-50.png' alt='vk' className="mx-3"></img>
                    @customer
                </li>
            </ul>
        </div>
    )
}