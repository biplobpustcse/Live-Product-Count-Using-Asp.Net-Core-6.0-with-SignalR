"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/productHub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

//connection.on("ReceiveProduct", function (user, message) {
//    var li = document.createElement("li");
//    document.getElementById("messagesList").appendChild(li);
//    // We can assign user-supplied strings to an element's textContent because it
//    // is not interpreted as markup. If you're assigning in any other way, you 
//    // should be aware of possible script injection concerns.
//    li.textContent = `${user} says ${message}`;
//});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var productName = document.getElementById("productName").value;
    connection.invoke("SendProduct", productName).then(function () {
        document.getElementById("productName").value = "";
        document.getElementById("productName").focus();
    }).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("resetButton").addEventListener("click", function (event) {
    connection.invoke("ResetProduct").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});