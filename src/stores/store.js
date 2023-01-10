import { writable } from "svelte/store";

const percentage = writable('')

const socket = new WebSocket('ws://localhost:8080/ws')

socket.addEventListener("open", function (event) {
    // console.log(event);
})

socket.addEventListener("message", function ({data}) {
    // percentage.set(event.data);
    console.log("data from server ", data);
})

const sendMessage = (msg) => {
    if (socket.readyState <= 1) {
        socket.send(msg)
    }
}

export default {
    subscribe: percentage.subscribe,
    sendMessage
}
