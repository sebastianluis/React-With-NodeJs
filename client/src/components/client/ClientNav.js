import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import SearchBox from './SearchBox'
class ClientNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMenu: "home"
        }
    }
    handleClick(e, value) {
        this.setState({
            activeMenu: value 
        })
    }
    render() {
        const menuItemsData =[
            {
                id: 'home',
                title: 'Home',
                navTo: '/'
            },
            {
                id: 'products',
                title: 'Products',
                navTo: '/products'
            }
        ] 
        const menuItems = 
        menuItemsData.map(item =>
            <Link key={ item.id }
                  className={ this.state.activeMenu === item.id ? "bg-turquoise text-white hover:bg-turquoise-dark px-3 py-2 rounded-md text-sm font-medium" : "text-white hover:bg-turquoise hover:text-white px-3 py-2 rounded-md text-sm font-medium" }
                  onClick={ (e) => this.handleClick(this, item.id) } 
                  to={item.navTo}>
              { item.title }
            </Link>                    
          )
        return (
            <div>
                <nav class="bg-blue">
                    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div class="relative flex items-center justify-between h-16">
                            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                {/* Logo */}
                                <div class="flex-shrink-0 flex items-center">
                                    <img
                                        class="block lg:hidden h-8 w-auto"
                                        src="./logo192.png"
                                        alt="Logo"
                                    ></img>
                                    <img
                                        class="hidden lg:block h-8 w-auto"
                                        src="./logo192.png"
                                        alt="logo"
                                    ></img>
                                </div>
                                {/* Nav Items */}
                                <div class="hidden sm:block sm:ml-6">
                                    <div class="flex space-x-4">
                                       {menuItems}
                                    </div>
                                </div>
                            </div>
                            <SearchBox></SearchBox>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(ClientNav)
