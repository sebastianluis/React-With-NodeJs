import React, { Component } from "react";
import ClientNav from './ClientNav';
import productTypeService from "../../services/productTypes.service";
import {Link} from 'react-router-dom';

export default class ClientHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsTypes: []
    
    };
  }

  componentDidMount() {
   
    this.retrieveProducts();
  }

  retrieveProducts() {

    productTypeService.getAll()
      .then((response) => {
        this.setState({
            productsTypes: response.data
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }


  render() {
    const {
        productsTypes
    } = this.state;

    const content = productsTypes.map((ptype) =>
    <div  className="bg-white shadow-lg rounded m-8 p-8 flex md:bg-orange" key={ptype.id}>
        <Link to={{ 
 pathname: "/products", 
 state: {selectedType: ptype.id}
}}>
 {ptype.name}
</Link>
     
    </div>
    );

    return (
        <div>
             <ClientNav />
           
             <div class="my-8 mx-8 "><h2><b>Browse By Product Type</b></h2></div>
       
        <div class="h-48 flex flex-wrap content-start">
        {content}
           </div>
  
    </div>
    );
  }
}
