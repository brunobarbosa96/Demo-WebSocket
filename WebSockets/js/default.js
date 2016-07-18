/// <reference path="_references.js" />
var wsUri = 'ws://echo.websocket.org/';

var webSocket ;

function connect(){
	webSocket = new WebSocket(wsUri);
	webSocket.onopen = function(evt){onOpen(evt)};
	webSocket.onclose = function(evt){onClose(evt)};
	webSocket.onmessage = function(evt){onMessage(evt)};
	webSocket.onerror = function(evt){onError(evt)};
}

function doSend(){
	if(webSocket.readyState != webSocket.OPEN) {
		writeOutPut("NOT OPEN: " + $("#txtMessage").val());
		return;
	}
	writeOutPut("SENT: " + $("#txtMessage").val());
	webSocket.send($("#txtMessage").val());
}

function onOpen(evt){
	writeOutPut("CONNECTED");
}

function onClose(evt){
	writeOutPut("DISCONNECTED");
}

function onMessage(evt){
	writeOutPut("RESPONSE: " + evt.data);
}

function onError(evt){
	writeOutPut("ERROR: " + evt.data);
}

function dispose(){
	webSocket.close();
}

$(document).ready(function(){
	if(checkSupported()){
		connect();
		$("#btnSend").click(doSend);
		$("#btnCloseConnection").click(dispose);
	}
});

function writeOutPut(message){
	var output = $("#divOutput");
	output.html(output.html() + '<br/ >' + message);
}

function checkSupported(){
	if(window.WebSocket){
		writeOutPut('WebSockets supported!');
		return true;
	}
	else{
		writeOutPut('WebSockets NOT supported!');
		$("#btnSend").attr('disabled', 'disabled');
		return false;
	}

}