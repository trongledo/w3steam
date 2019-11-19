
import React from 'react';
import ReactDom from 'react-dom';
import './css/Loading.css';

class Loading extends React.Component{
	render(){
		return(
			<div id='overlay-loader' className="overlay-loader">
				<div id="loader">
					<div className="load-icon center">
						<span></span>
						<span></span>
						<span></span>
					</div>
		    		
				</div>
			</div>
		);
	}
}

export default Loading;