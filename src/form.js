import React, {Component} from 'react';

class Form extends Component{
	
	
	// state = {sol: "",
	// 				 camera: "",
	// 				 photos: []
	// };
	
	
	render(){
		return(
			<>
				<form id="search-form" onSubmit={this.onSubmit} >
					<div className="form-group">
						<label htmlFor="sol">Sol</label>
						<input
							type="text"
							name="sol"
							placeholder="Add the sol.."
							value={this.props.sol}
							onChange={this.props.onChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="camera">Camera</label>
						<select
							name="camera"
							id="camera"
							value={this.props.camera}
							onChange={this.props.onChange}
						>
							<option value="fhaz">FHAZ</option>
							<option value="navcam">NAVCAM</option>
							<option value="mast">MAST</option>
							<option value="chemcam">CHEMCAM</option>
							<option value="mahli">MAHLI</option>
							<option value="mardi">MARDI</option>
							<option value="rhaz">RHAZ</option>
						</select>
					</div>
					<div className="form-group">
						<input type="submit" value="Submit"/>
					</div>
				
				</form>
			
			</>
		);
	}
	
}

export default Form;