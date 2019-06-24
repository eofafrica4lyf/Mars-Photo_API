import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import request from 'request';
import './App.css';
import Nav from "./nav";
// import Form from "./form";
// import Photo from "./Photo.js"
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
		// console.log('After submitting form.');
		// console.log(this.state.sol,this.state.camera);
		this.addToQueryString(this.state.sol,this.state.camera);
		// console.log(window.location.search);
		
	};
  
  
  addToQueryString = (sol,camera) => {
    // console.log('After submitting form.');
    console.log(sol,camera);
    // const urlSearchParams = window.location.search;
    // console.log(urlSearchParams);
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
        // console.log("State");
        // console.log(this.state);
	      alert(`${data.length} photos found`);
        this.setState({photos: data});
        // console.log("State");
        // console.log(this.state);
        // console.log(this.state);
        // data.map(({img_src}) => {
        //   console.log(img_src);
        // });
        // let photoURL;
      }else if(error){
        // console.log('Error Message');
        // console.log(error);
      }
      
    });
    // console.log(url);
    
  };
  
  
  render(){
    return (
      <div className="container">
        <Nav />
        <main>
          <aside style={asideStyle}>
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
            {/*<img alt="gh" src="https://www.nairaland.com/vertipics/x72jc2buebsfvwgjr1ze33u4gonh21og.png" />*/}
            {/*<img alt="altText" src="http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00000/opgs/edr/fcam/FRA_397506068EDR_D0010008AUT_04096M_.JPG"/>*/}
            {
              // this.state.photos;
            }
            {
            this.state.photos.map(({img_src, id}) => {
              // console.log('What is supposed to display');
              // console.log(this.state.photos);
              // console.log(photoInfo);
              // console.log(photoInfo.img_src);
              // var p = photoInfo.img_src;
              // return <img key={Date.now} alt="hgjhgj" src="http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00000/opgs/edr/fcam/FRA_397506068EDR_D0010008AUT_04096M_.JPG" />
              return <>
	              {/*<div >*/}
	              <img key={id} alt="hgjhgj" src={img_src} />
	              {/*<p></p>*/}
	              {/*</div>*/}
	              </>
              // <div>
              //   photoInfo.img_url;
              // </div>
            })
            
            }
            
            
          </section>
        </main>
      </div>
    );
  }
  
  
  
}

let asideStyle = {
  // background: 'black'
};


export default App;
