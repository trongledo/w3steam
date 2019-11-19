import React from 'react';
import './css/ConfirmPage.css';
import $ from 'jquery';

import {Support} from './Support.js';


class ConfirmPage extends React.Component{
	constructor(props){
        super(props);
		this.state = {
            notice: "",
		}	
		this.confirmSuccess = this.confirmSuccess.bind(this);
	}

	componentWillMount(){
		$("body").css("overflow","hidden");
	}

	componentWillUnmount() {
		$("body").css("overflow","auto");
	}

	componentDidMount(){
		console.log('load confirm');
		var that = this;
		$(document).ready(function() {
			"use strict";
	
			// UTILITY
			function getRandomInt(min, max) {
					return Math.floor(Math.random() * (max - min)) + min;
			}
			// END UTILITY
	
			// COMMANDS
			function clear() {
					terminal.text("");
			}
	
			function help() {
					terminal.append("There is no help... MUAHAHAHAHA. >:D\n");
			}
		
			function echo(args) {
					var str = args.join(" ");
					terminal.append(str + "\n");
			}
	
			function fortune() {
					var xhr = new XMLHttpRequest();
					xhr.open('GET', 'https://cdn.rawgit.com/bmc/fortunes/master/fortunes', false);
					xhr.send(null);
	
					if (xhr.status === 200) {
							var fortunes = xhr.responseText.split("%");
							var fortune = fortunes[getRandomInt(0, fortunes.length)].trim();
							terminal.append(fortune + "\n");
					}
			}
			// END COMMANDS

			var pass = "";
			
			Support.parseObjectFormFile('config/config.json')
			.then( response => {
				pass = (response.data && response.data.password) ? response.data.password: "";
				console.log('pass: ' , response, pass)
			});

			var title = $(".title");
			var terminal = $(".terminal");
			var prompt = "➜";
			var path = "w3steam$";
			var levelToSaySorry = 0;
			var commandHistory = [];
			var historyIndex = 0;
	
			var command = "";		
	
			function processCommand() {
					var isValid = false;
			
					// Create args list by splitting the command
					// by space characters and then shift off the
					// actual command.
			
					var args = command.split(" ");
					var cmd = args[0];
					args.shift();
			
					console.log(cmd);
					// Iterate through the available commands to find a match.
					// Then call that command and pass in any arguments.


					// for (var i = 0; i < commands.length; i++) {
					// 		if (cmd === commands[i].name) {
					// 				commands[i].function(args);12

					// 				isValid = true;
					// 				break;
					// 		}
					// }

					if(cmd == pass){
						isValid = true;
						setInterval(function(){ terminal.append('<span class="fa fa-heart" style="color:#00ff2d"> </span>') }, 50);
						setTimeout( that.confirmSuccess, 1500);
						return true;
					}

					// No match was found...
					if (!isValid) {	
											
						terminal.append('~bath: <span style="color:red; font-weight: bold"><span class="fa fa-bomb"> </span>' + Support.temirnalNotices[levelToSaySorry] + '</span>'  + "\n");
						(levelToSaySorry < Support.temirnalNotices.length - 1) ? levelToSaySorry++ : levelToSaySorry;
					}
			
					//Add to command history and clean up.
					commandHistory.push(command);
					historyIndex = commandHistory.length;
					command = "";
					return false;
			}
			
			function displayPrompt() {
					//terminal.append("<span class=\"prompt\">" + prompt + "</span> ");
					terminal.append("<span class=\"path\">" + path + "</span> ");
			}
			
			// Delete n number of characters from the end of our output
			function erase(n) {
					command = command.slice(0, -n);
					terminal.html(terminal.html().slice(0, -n));
			}
			
			function clearCommand() {
					if (command.length > 0) {
							erase(command.length);
					}
			}
			
			function appendCommand(str) {
					terminal.append('*');
					command += str;
			}

			function scrollBottom(){
				terminal.scrollTop(terminal[0].scrollHeight);
			}
			
			/*
				//	Keypress doesn't catch special keys,
				//	so we catch the backspace here and
				//	prevent it from navigating to the previous
				//	page. We also handle arrow keys for command history.
				*/
			
			$(document).keydown(function(e) {
				e = e || window.event;
				var keyCode = typeof e.which === "number" ? e.which : e.keyCode;
		
				// BACKSPACE
				if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
						e.preventDefault();
						if (command !== "") {
								erase(1);
						}
				}
		
				// UP or DOWN
				if (keyCode === 38 || keyCode === 40) {
						// Move up or down the history
						if (keyCode === 38) {
								// UP
								historyIndex--;
								if (historyIndex < 0) {
										historyIndex++;
								}
						} else if (keyCode === 40) {
								// DOWN
								historyIndex++;
								if (historyIndex > commandHistory.length - 1) {
										historyIndex--;
								}
						}
		
						// Get command
						var cmd = commandHistory[historyIndex];
						if (cmd !== undefined) {
								clearCommand();
								appendCommand(cmd);
						}
					}
			});
			
			$(document).keypress(function(e) {
					// Make sure we get the right event
					e = e || window.event;
					var keyCode = typeof e.which === "number" ? e.which : e.keyCode;
			
					// Which key was pressed?
					switch (keyCode) {
							// ENTER
							case 13:
									{
											terminal.append("\n");
											if(!processCommand()){
												displayPrompt();
												scrollBottom();
											}
											break;
									}
							default:
									{
											appendCommand(String.fromCharCode(keyCode));
									}
					}
			});
			
			// Set the window title
			title.text("w3team: w3steam$ (~bath)");
			
			// Get the date for our fake last-login
			var date = new Date().toString(); date = date.substr(0, date.indexOf("GMT") - 1);
			
			// Display last-login and promt
			terminal.append("<span>Last access: " + date + " on w3steam</span>\n"); 
			

			terminal.append('Nhập pass đi nè (づ｡◕‿‿◕｡)づ \n'); displayPrompt();
		});
    }

    confirmSuccess(){
		
			let permissionKey = Support.generateKey();
			// let path = (MenuList[this.props.match.params.id] && MenuList[this.props.match.params.id].link)?MenuList[this.props.match.params.id].link:'';
			let path = ((this.props.location.state && this.props.location.state.page)? this.props.location.state.page : "");
			window.permission = permissionKey;
			sessionStorage.setItem("permission", permissionKey);

			if(Support.isValidURL(path)){
				window.location.assign(path);
			}else{
				let url = path?path + "?k=" + permissionKey: '/error';			
				this.props.history.push(url);
				
			}
		
	}
	
	render(){
		
		return(
			<div className = "main-content-inner confirm-page">
					<div className="window">
						<div className="handle">
							<div className="buttons">
								<button className="close-btn">
								</button>
								<button className="minimize">
								</button>
								<button className="maximize">
								</button>
							</div>
							<span className="title"></span>
						</div>
						<div className="terminal"></div>
					</div>
				
			</div>
			
		);
		
	}
}

export default ConfirmPage;