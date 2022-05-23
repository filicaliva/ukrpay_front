import React, {Component, useState} from 'react'

import { useTable } from 'react-table'

import makeData from './makeData'

// const c = ({
//                           value: initialValue,
//                           row: { index },
//                           column: { id },
//                           updateMyData, // This is a custom function that we supplied to our table instance
//                       }) => {
//     // We need to keep and update the state of the cell normally
//     const [value, setValue] = React.useState(initialValue)
//
//     const onChange = e => {
//         setValue(e.target.value)
//     }
//
//     // We'll only update the external data when the input is blurred
//     const onBlur = () => {
//         updateMyData(index, id, value)
//     }
//
//     // If the initialValue is changed external, sync it up with our state
//     React.useEffect(() => {
//         setValue(initialValue)
//     }, [initialValue])
//
//     return <input value={value} onChange={onChange} onBlur={onBlur} />
// }
//
// const defaultColumn = {
//     Cell: EditableCell,
// }
// const onBlur = () => {
//     updateMyData(index, id, value)
// }


function Table({ columns, data, updateMyData }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
        updateMyData,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

// function ReactTableTest() {
//     // const columns = React.useMemo(
//     //     () => [
//     //
//     //         {
//     //             Header: 'rr',
//     //             columns:
//     //             // [
//     //             //     {
//     //             //         Header: 'Age',
//     //             //         accessor: 'age',
//     //             //     },
//     //             //     {
//     //             //         Header: 'Visits',
//     //             //         accessor: 'visits',
//     //             //     },
//     //             //     {
//     //             //         Header: 'Status',
//     //             //         accessor: 'status',
//     //             //     },
//     //             //     {
//     //             //         Header: 'Profile Progress',
//     //             //         accessor: 'progress',
//     //             //     },
//     //             // ]
//     //                 [
//     //                     {
//     //                         Header: "id",
//     //                         accessor: "Product ID"
//     //                     },
//     //                     {
//     //                         Header: "name",
//     //                         accessor: "Product Name"
//     //                     },
//     //                     {
//     //                         Header: "price",
//     //                         accessor: "Product Price"
//     //                     }
//     //
//     //
//     //                 ]
//     //
//     //         }
//     //     ]
//     // )
//
//     const deleteQnA = (row) => {
//         console.log(fruit);
//         // for(let i = 0; i != rowKeys.length; i++){
//         //     this.state.rows = this.state.rows.filter((item) => {return item.id !==
//         //         rowKeys[i]})
//         // }
//         // const people = [
//         //     { id: 1, name: 'serdar' },
//         //     { id: 5, name: 'alex' },
//         //     { id: 300, name: 'brittany' }
//         // ];
//         //
//         // const idToRemove = 5;
//         setFruit('апельсин');
//
//         console.log(row.row);
//         // console.log(row.original);
//         // console.log(row.original.id);
//         console.log(data.data);
//         const filteredPeople = data.data.filter((item) => item.id !== row.row.original.id);
//         console.log(filteredPeople);
//         setData({data: filteredPeople});
//     }
//     const [fruit, setFruit] = useState('banana');
//     const [columns, setColumns] = useState({
//         columns:[
//             {
//                 Header: "id",
//                 accessor: "id"
//             },
//             {
//                 Header: "name",
//                 accessor: "name"
//             },
//             {
//                 Header: "price",
//                 accessor: "price"
//             },
//             {
//                 Header: "Actions",
//                 accessor: "Actions",
//                 Cell: ({row}) => (<div>
//                     <button onClick={()=>deleteQnA({row})}>Delete</button>
//                 </div> )
//             }
//         ]
//     });
//     // const columns = [
//     //     {
//     //         Header: "id",
//     //         accessor: "id"
//     //     },
//     //     {
//     //         Header: "name",
//     //         accessor: "name"
//     //     },
//     //     {
//     //         Header: "price",
//     //         accessor: "price"
//     //     },
//     //     {
//     //         Header: "Actions",
//     //         accessor: "Actions",
//     //         Cell: ({row}) => (<div>
//     //             <button onClick={()=>deleteQnA({row})}>Delete</button>
//     //         </div> )
//     //     }
//     // ]
//     const [data, setData] = useState({
//         data:[
//             { id: 1, name: "Item 1", price: 100 },
//             { id: 2, name: "Item 2", price: 702 },
//             { id: 3, name: "Item 3", price: 402 },
//             { id: 4, name: "Item 4", price: 152 }
//         ]
//     });
//     // const data = [
//     //     { id: 1, name: "Item 1", price: 100 },
//     //     { id: 2, name: "Item 2", price: 102 }
//     // ]
//
//      //const data = React.useMemo(() => makeData(4), [])
//     console.log(data);
//     console.log(fruit);
//     return (
//         <>
//             <button></button>
//             <Table columns={columns.columns} data={data.data} />
//         </>
//     )
// }
//
// export default ReactTableTest


class ReactTableTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[
                { id: 1, name: "Item 1", price: 100 },
                { id: 2, name: "Item 2", price: 702 },
                { id: 3, name: "Item 3", price: 402 },
                { id: 4, name: "Item 4", price: 152 },
                { id: 6, name: null, price: null }
            ],
            columns:[
                {
                    Header: "id",
                    accessor: "id"
                },
                {
                    Header: "name",
                    accessor: "name"
                },
                {
                    Header: "price",
                    accessor: "price"
                },
                {
                    Header: "Actions",
                    accessor: "Actions",
                    render: ({ row }) => (<button onClick={(e) => this.handleButtonClick(e, row)}>Click Me</button>),
                    Cell: ({row}) => (<div>
                        <button onClick={()=>this.delete({row})}>Delete</button>
                        <button onClick={()=>this.add()}>add new row</button>
                        <button onClick={(e) => this.handleButtonClick(e, row)}>Click Me</button>
                    </div> )
                }
            ]
        }
        //console.log(this.data.sort());
    }
    updateMyData = (rowIndex, columnId, value) => {
        console.log(rowIndex);
        console.log(columnId);
        console.log(value);
        // We also turn on the flag to not reset the page
        // setSkipPageReset(true)
        // setData(old =>
        //     old.map((row, index) => {
        //         if (index === rowIndex) {
        //             return {
        //                 ...old[rowIndex],
        //                 [columnId]: value,
        //             }
        //         }
        //         return row
        //     })
        // )
    }
    delete = (row) => {



        console.log(row.row);

        console.log(this.state.data);
        const filteredPeople = this.state.data.filter((item) => item.id !== row.row.original.id);
        console.log(filteredPeople);
        this.setState({ data: filteredPeople });
    }
    add = () => {
        this.state.data.push({ id: 6, name: "Item 5", price: 456 });
        //console.log(newRow);
        console.log(this.state.data);
        this.setState({ data: this.state.data });
    }
    handleButtonClick = (e, row) => {
        console.log(e);
        console.log(row);
    }
    render() {
        console.log(this.state.data);
        return(
           <>

               <Table columns={this.state.columns} data={this.state.data} updateMyData={this.updateMyData} />
           </>
        )
    }
}

export default ReactTableTest