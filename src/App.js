import React, {Component} from 'react';
import request from 'request';
import './App.css';
import Nav from "./nav";
class App extends Component {
  
  constructor (props){
    super(props);
    this.state = {
        photos: [],
        sol: "",
        camera: "",
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
    console.log(sol,camera);
	  //Ensure that the right parameters are assigned.
	  if(sol === "" || camera === "" || !(/\d/.test(sol)) ){
	  	alert("Please select/fill in the right format/options");
	  	return;
	  }
	  console.log(sol,camera);
    const url = `https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&page=1`;
    console.log(url);
    request({url, json: true}, (error,response) =>{
      if(response){
        const data = response.body.photos;
        console.log(data);
	      alert(`${data.length} photos found`);
        this.setState({photos: data});
      }else if(error){
        // console.log('Error Message');
        alert(error);
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
			            />
		            </div>
		            <div className="form-group">
			            <label htmlFor="camera">Camera</label>
			            <select
				            name="camera"
				            id="camera"
				            value={this.state.camera}
				            onChange={this.onChange}
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
            </div>
          
          </aside>
          <section id="photo-display">
            {
            this.state.photos.map(({img_src, id}) => {
              return <>
	              <img key={id} alt="hgjhgj" src={img_src} />
	              </>
            })
            
            }
          </section>
        </main>
      </div>
    );
  }
  
}

export default App;
