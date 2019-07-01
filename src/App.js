import React, {Component} from 'react';
import request from 'request';
import './App.css';
import Nav from "./nav";
import Loader from 'react-loader'
class App extends Component {
  
  constructor (props){
    super(props);
    this.state = {
        photos: [],
        sol: "",
				camera: "",
				loaded: true,
				form_filled: true,
				photos_found: true
    };
	  this.onChange = this.onChange.bind(this);
	  this.onSubmit = this.onSubmit.bind(this);
  }
  
	onChange = (event) => this.setState({[event.target.name]: event.target.value});
	
  onSubmit = (event) => {
		event.preventDefault();
		
		this.addToQueryString(this.state.sol,this.state.camera);
		
	};
  
  
  addToQueryString = (sol,camera) => {
	  //Ensure that the right parameters are assigned.
	  if(sol === "" || camera === "" || !(/\d/.test(sol)) ){
			// alert("Please select/fill in the right format/options");
			this.setState({form_filled: false})
	  	return;
		}
		this.setState({photos_found: true})
		this.setState({loaded: false});
    const url = `https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&page=1`;
    request({url, json: true}, (error,response) =>{
      if(response){
				const data = response.body.photos;
				if(data.length === 0){
					this.setState({photos_found: false})
				}
				this.setState({photos: data});
				this.setState({loaded: true})
      }else if(error){
        console.log(error);
      }
      
    });
    
  };
  
  
  render(){
    return (
      <div className="container">
        <Nav />
        <main>
          <aside>
            <div>
              <h1>Search</h1>
	            <form id="search-form" onSubmit={this.onSubmit} >
		            <div className="form-group">
			            <label htmlFor="sol">Sol</label>
			            <input
				            type="text"
				            name="sol"
				            placeholder="Add the sol.."
				            value={this.state.sol}
										onChange={this.onChange}
										onFocus={() => {this.setState({form_filled: true})}}
			            />
		            </div>
		            <div className="form-group">
			            <label htmlFor="camera">Camera</label>
			            <select
				            name="camera"
				            id="camera"
				            value={this.state.camera}
										onChange={this.onChange}
										onFocus={() => {this.setState({form_filled: true})}}
			            >
				            <option value="">Select Camera</option>
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
			            <input type="submit" value="Find Photos"/>
		            </div>
	
	            </form>
							{
							!this.state.form_filled &&	<span style={{padding: "0.5em", backgroundColor: "#ff000029",borderRadius: "5px",fontSize: "0.85em"}}>Please ensure that you select/fill in the right format/options</span>
							}
            </div>
          
          </aside>
          <section id="photo-display">
					<Loader loaded={this.state.loaded} options={options}>
						{
						!this.state.photos_found && <p style={{position: "relative", top: "50%", left: "45%", backgroundColor: "aliceblue", height: "22px", padding: "1em", borderRadius: "5px"}}>No photos were found!</p>
						}
            {
            this.state.photos.map(({img_src, id}) => {
              return <img key={id} alt="mars photos" src={img_src} />
            })
						}
					</Loader>
          </section>
        </main>
      </div>
    );
  }
  
}

var options = {
	lines: 25,
	length: 10,
	width: 3,
	radius: 20,
	scale: 1.00,
	corners: 1,
	color: '#000',
	opacity: 0.25,
	rotate: 0,
	direction: 1,
	speed: 0.5,
	trail: 60,
	fps: 30,
	zIndex: 2e9,
	top: '50%',
	left: '50%',
	shadow: false,
	hwaccel: false,
	position: 'relative'
};

export default App;
