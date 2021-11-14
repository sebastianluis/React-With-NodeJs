import React, { Component } from 'react'
import { withRouter } from 'react-router'
import _ from 'lodash'
import Table, { StatusPill } from './Table' // new
import ClientNav from './ClientNav'
import productService from '../../services/product.service'
import productTypeService from '../../services/productTypes.service'

class Products extends Component {
    constructor(props) {
        super(props)
        // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        // this.refreshList = this.refreshList.bind(this);
        // this.handlePageChange = this.handlePageChange.bind(this);
        // this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

        this.state = {
            products: [],
            productsTypes: [],
            selectedTypeIdList: [],
            selectedProductStatusList: [],
            productStates: ['Active', 'Inactive'],
            statusCheckedState: [false, false],
            setStatusCheckedState: [false, false],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            _.get(prevProps, 'location.search') !==
            _.get(this, 'props.location.search')
        ) {
            const params = new URLSearchParams(
                _.get(this.props, 'location.search')
            ).get('q')
            const data = {
                filter: {
                    typeIds: null,
                    status: null,
                    searchTitle: params,
                },
            }
            this.retrieveProducts(data)
            this.clearProductTypeCheckBoxes();
            this.clearProductStatusCheckBoxes();
        }
    }
    componentDidMount() {
        this.loadProductTypes()
    }
    async loadProductTypes() {
        productTypeService
            .getAll()
            .then((response) => {
                if (response.data) {
                    const typeCheckedStateObj = new Array(
                        _.get(response, 'data.length')
                    )
                    const setTypeCheckedStateObj = new Array(
                        _.get(response, 'data.length')
                    )
                    response.data.forEach((element, index) => {
                        typeCheckedStateObj[index] = {
                            id: element.id,
                            checked: false,
                        }
                        setTypeCheckedStateObj[index] = {
                            id: element.id,
                            checked: false,
                        }
                    })

                    console.log(typeCheckedStateObj)
                    this.setState({
                        productsTypes: response.data,
                        typeCheckedStateObj: typeCheckedStateObj,
                        setTypeCheckedStateObj: setTypeCheckedStateObj,
                    })

                    if (
                        _.get(this.props, 'location.state') &&
                        _.get(this.props, 'location.state.selectedType')
                    ) {
                        const {
                            typeCheckedStateObj,
                            setTypeCheckedStateObj,
                            selectedTypeIdList,
                        } = this.state
                        const targetId = _.get(
                            this.props,
                            'location.state.selectedType'
                        )
                        console.log(typeCheckedStateObj)
                        const targetProductTypeIndex = typeCheckedStateObj
                            .map((e) => e.id)
                            .indexOf(targetId)
                        typeCheckedStateObj[
                            targetProductTypeIndex
                        ].checked = true
                        setTypeCheckedStateObj[
                            targetProductTypeIndex
                        ].checked = true
                        selectedTypeIdList.push(
                            _.get(this.props, 'location.state.selectedType')
                        )
                        const data = {
                            filter: {
                                typeIds:
                                    selectedTypeIdList.length === 0
                                        ? null
                                        : selectedTypeIdList,
                                status: null,
                                searchTitle: null,
                            },
                        }
                        window.history.replaceState(null, '')
                        this.retrieveProducts(data)
                    } else if (this.props.location.search) {
                        const params = new URLSearchParams(
                            this.props.location.search
                        ).get('q')
                        const data = {
                            filter: {
                                typeIds: null,
                                status: null,
                                searchTitle: params,
                            },
                        }
                        this.retrieveProducts(data)
                    } else {
                        const data = {
                            filter: {
                                typeIds: null,
                                status: null,
                                searchTitle: null,
                            },
                        }
                        this.retrieveProducts(data)
                    }
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }
    retrieveProducts(data) {
        productService
            .search({}, data)
            .then((response) => {
                this.setState({
                    products: response.data,
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }
    onProductTypeCheckChange(e, position) {
        const {
            typeCheckedStateObj,
            setTypeCheckedStateObj,
            selectedTypeIdList,
            selectedProductStatusList,
        } = this.state
        if (_.get(e, 'target.checked') && _.get(e, 'target.value')) {
            if (
                !selectedTypeIdList.includes(parseInt(_.get(e, 'target.value')))
            ) {
                selectedTypeIdList.push(parseInt(_.get(e, 'target.value')))
            }
        } else {
            if (
                selectedTypeIdList.includes(parseInt(_.get(e, 'target.value')))
            ) {
                const index = selectedTypeIdList.indexOf(
                    parseInt(_.get(e, 'target.value'))
                )
                if (index > -1) {
                    selectedTypeIdList.splice(index, 1)
                }
            }
        }
        //console.log(e.target.value);
        setTypeCheckedStateObj[position].checked = !typeCheckedStateObj[
            position
        ].checked
        //updating state
        this.setState({
            typeCheckedStateObj: setTypeCheckedStateObj,
        })
        console.log(setTypeCheckedStateObj)
        const data = {
            filter: {
                typeIds:
                    selectedTypeIdList.length === 0 ? null : selectedTypeIdList,
                status:
                    selectedProductStatusList.length === 0
                        ? null
                        : selectedProductStatusList,
                searchTitle: null,
            },
        }
        this.retrieveProducts(data)
    }
    clearProductTypeCheckBoxes() {
        const tempArrObj = []
        const { productsTypes } = this.state
        productsTypes.forEach((element, index) => {
            tempArrObj[index] = { id: element.id, checked: false }
        })
        this.setState({
            typeCheckedStateObj: tempArrObj,
            setTypeCheckedStateObj: tempArrObj,
            selectedTypeIdList: [],
        })
    }
    onProductTypeSelectionClear() {
        this.clearProductTypeCheckBoxes()
        const { selectedProductStatusList } = this.state
        const data = {
            filter: {
                typeIds: null,
                status:
                    selectedProductStatusList.length === 0
                        ? null
                        : selectedProductStatusList,
                searchTitle: null,
            },
        }
        this.retrieveProducts(data)
    }
    clearProductStatusCheckBoxes() {
        this.setState({
            statusCheckedState: [false, false],
            setStatusCheckedState: [false, false],
            selectedProductStatusList: [],
        })
    }
    onProductStatusSelectionClear() {
        this.clearProductStatusCheckBoxes()
        const { selectedTypeIdList } = this.state;
        const data = {
            filter: {
                typeIds:
                    selectedTypeIdList.length === 0 ? null : selectedTypeIdList,
                status: null,
                searchTitle: null,
            },
        }
        this.retrieveProducts(data)
    }
    onProductStatusCheckChange(e, position) {
        const {
            statusCheckedState,
            setStatusCheckedState,
            selectedProductStatusList,
            selectedTypeIdList,
        } = this.state
        if (_.get(e, 'target.checked')) {
            if (!selectedProductStatusList.includes(_.get(e, 'target.value'))) {
                selectedProductStatusList.push(_.get(e, 'target.value'))
            }
        } else {
            if (selectedProductStatusList.includes(_.get(e, 'target.value'))) {
                const index = selectedProductStatusList.indexOf(
                    _.get(e, 'target.value')
                )
                if (index > -1) {
                    selectedProductStatusList.splice(index, 1)
                }
            }
        }
        setStatusCheckedState[position] = !statusCheckedState[position]
        //updating state
        this.setState({
            statusCheckedState: setStatusCheckedState,
        })

        const data = {
            filter: {
                typeIds:
                    selectedTypeIdList.length === 0 ? null : selectedTypeIdList,
                status:
                    selectedProductStatusList.length === 0
                        ? null
                        : selectedProductStatusList,
                searchTitle: null,
            },
        }
        this.retrieveProducts(data)
    }

    render() {
        const {
            products,
            productsTypes,
            productStates,
            typeCheckedStateObj,
            statusCheckedState,
        } = this.state

        const productTypesList = productsTypes.map((ptype, index) => (
            <div>
                <label class="flex justify-start items-start">
                    <div class="bg-white border-2 rounded border-gray w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-gray">
                        <input
                            type="checkbox"
                            class="text-turquoise"
                            id={`ptype-checkbox-${index}`}
                            name={ptype.name}
                            value={ptype.id}
                            checked={typeCheckedStateObj[index].checked}
                            onChange={(e) =>
                                this.onProductTypeCheckChange(e, index)
                            }
                        ></input>
                        <svg
                            class="fill-current hidden w-4 h-4 text-turquoise pointer-events-none"
                            viewBox="0 0 20 20"
                        >
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                    </div>
                    <label
                        class="select-none text-sm"
                        htmlFor={`ptype-checkbox-${index}`}
                    >
                        {ptype.name}
                    </label>
                </label>
            </div>
        ))

        const productStateList = productStates.map((pstate, index) => (
            <div>
                <label class="flex justify-start items-start">
                    <div class="bg-white border-2 rounded border-gray w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-gray">
                        <input
                            type="checkbox"
                            class="text-turquoise"
                            id={`pstate-checkbox-${index}`}
                            name={pstate}
                            value={pstate}
                            checked={statusCheckedState[index]}
                            onChange={(e) =>
                                this.onProductStatusCheckChange(e, index)
                            }
                        ></input>
                        <svg
                            class="fill-current hidden w-4 h-4 text-turquoise pointer-events-none"
                            viewBox="0 0 20 20"
                        >
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                    </div>
                    <label
                        class="select-none text-sm"
                        htmlFor={`pstate-checkbox-${index}`}
                    >
                        {pstate}
                    </label>
                </label>
            </div>
        ))

        return (
            <div>
                <ClientNav />
                <div class="my-5"></div>
                <div class="flex">
                    <div class="w-1/5 mx-5">
                        <div>
                            <div class="flex">
                                <div class="w-3/5">
                                    <h3>
                                        <b>Product Types</b>
                                    </h3>
                                </div>
                                <div class="w-2/5">
                                    <button class="bg-blue-light text-black hover:bg-blue-dark hover:text-white py-1 px-3 rounded-full"
                                        type="submit"
                                        onClick={() =>
                                            this.onProductTypeSelectionClear()
                                        }
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                            {productTypesList}
                        </div>
                        <div class="my-8"></div>
                        <div class="items-center">
                            <div class="flex">
                                <div class="w-3/5">
                                    <h3>
                                        <b>Product Status</b>
                                    </h3>
                                </div>
                                <div class="w-2/5">
                                    <button class="bg-blue-light text-black hover:bg-blue-dark hover:text-white py-1 px-3 rounded-full"
                                        type="submit"
                                        onClick={() =>
                                            this.onProductStatusSelectionClear()
                                        }
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>

                            {productStateList}
                        </div>
                    </div>
                    <div class="w-4/5 mr-5">
                        <Table
                            columns={[
                                {
                                    Header: 'Material Name',
                                    accessor: 'name',
                                },
                                {
                                    Header: 'Product Type',
                                    accessor: 'type.name',
                                },
                                {
                                    Header: 'Description',
                                    accessor: 'description',
                                },
                                {
                                    Header: 'Status',
                                    accessor: 'status',
                                    Cell: StatusPill,
                                },
                            ]}
                            data={products}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const productWithRouter = withRouter(Products)
export default productWithRouter
