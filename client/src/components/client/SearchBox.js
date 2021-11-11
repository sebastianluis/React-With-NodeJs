import React, { Component } from 'react'
import { withRouter } from "react-router";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        searchTitle: ''
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleSearchKeyword(value) {
   this.props.history.replace(`/products?q=${value}`);
  }
  handleChange(e) {
    this.setState({searchTitle: e.target.value});
   
    if(e.target.value=="") {
        if(this.props.location.pathname !=="/" )
        this.props.history.replace(`/products`);
    }
  }
  handleClick() {
    this.handleSearchKeyword(this.state.searchTitle)
  }

  onKeyUp(event) {
    //   On Enter key
    if (event.charCode === 13) {
      this.handleSearchKeyword(this.state.searchTitle)
    }
  }
render() {
    return(<div class="relative text-gray-600 focus-within:text-gray-400">
    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
      <button type="submit" class="p-1 focus:outline-none focus:shadow-outline" onClick={this.handleClick}>
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </button>
    </span>
    <input type="search" name="q" class="py-2 text-sm bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." autocomplete="off" value={this.state.searchTitle}
        onChange={(e) => this.handleChange(e)} onKeyPress={this.onKeyUp}/>
  </div>);
}
}

export default withRouter(SearchBox);