import React, {Component} from 'react';

class Photo extends Component{
	
	render(){
		return(
			<img alt={this.props.alt} src={this.props.src} />
		)
	}
	
}
	export default Photo;