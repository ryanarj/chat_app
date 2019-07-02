// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".


// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

import "phoenix_html"
import {Socket, Presence} from "phoenix"

let user = document.getElementById("user").innerText
let socket = new Socket("/socket", {params:{user: user}})
socket.connect()

let presences = {}

let formated_timestamp = (ts) => {
    let date = new Date(ts)
    return date.toLocaleString()
}

let user_time_list = (user, {metas: metas}) => {
    return {
        user: user,
        online_at: formated_timestamp(metas[0].online_at)
    }
}

let user_list = document.getElementById("userList")
let render = (presences) => {
    user_list.innerHTML = Presence.list(presences, user_time_list)
    .map(presence => `
        <li>
            ${presence.user}
            <br>
            <small>online since ${presence.online_at}</small>
        </li>
    `)
    .join("")
}

let room = socket.channel("room:lobby")
room.on("presence_state", state => {
    presences = Presence.syncState(presences, state)
    render(presences)
})

room.on("presence_diff", diff => {
    presences = Presence.syncDiff(presences, diff)
    render(presences)
})

room.join()

let message_input = document.getElementById("newMessage")
    message_input.addEventListener("keypress", (e) => {
        if(e.keyCode == 13 && message_input.value != ""){
            room.push("message:new", message_input.value)
            message_input.value = ""
        }
})

let message_list = document.getElementById("messageList")
let render_message = (message) => {
    let message_element = document.createElement("li")
    message_element.innerHTML = `
        <b>${message.user}</b>
        <i>${formated_timestamp(message.timestamp)}</i>
        <p>${message.body}</p>
    `
    message_list.appendChild(message_element)
    message_list.scrollTop = message_list.scrollHeight;
}

room.on("message:new", message => render_message(message))
