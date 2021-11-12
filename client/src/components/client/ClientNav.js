import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SearchBox from './SearchBox'
class ClientNav extends Component {
    constructor(props) {
        super(props)
    }
    render() {
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
                                        <a
                                            href="/"
                                            class="bg-turquoise text-white hover:bg-turquoise-dark px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Home
                                        </a>
                                        <a
                                            href="/products"
                                            class="text-white hover:bg-turquoise hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Products
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <SearchBox></SearchBox>
                        </div>
                    </div>
                    <div class="hidden sm:hidden">
                        <div class="px-2 pt-2 pb-3 space-y-1">
                            <a
                                href="/"
                                class="bg-blue text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Home
                            </a>
                            <a
                                href="/products"
                                class="text-white hover:bg-turquoise hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Products
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(ClientNav)
