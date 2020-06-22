import React from 'react';
import './Table.css'

function findSum(arr, colNo) {
    let sum = 0;
    for (let j = 1; j < arr.length; j++) {
        sum += Number(arr[j][colNo])
    }
    return sum
}
function findAvg(arr, colNo) {
    let sum = 0;
    for (let j = 1; j < arr.length; j++) {
        sum += Number(arr[j][colNo])
    }
    return sum / (arr.length - 1)
}
function addAggregations(arr) {
    let colNos = arr[0].length;
    //skip table header
    let sumRow = ["Sum"];
    let avgRow = ["Average"];
    for (let i = 1; i < colNos; i++) {
        let isNumericCol = true;
        for (let j = 1; j < arr.length; j++) {
            if (Number(arr[j][i]) === NaN) {
                isNumericCol = false;
            }
        }
        if (isNumericCol) {
            sumRow[i] = findSum(arr, i);
            avgRow[i] = findAvg(arr, i);
        } else {
            sumRow[i] = "-";
            avgRow[i] = "-";
        }
    }
    return [sumRow, avgRow]
}

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = { aggRows: null }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps, prevState)
        if (nextProps.dataArr) {
            return {
                aggRows: addAggregations(nextProps.dataArr)
            };
        } else {
            return {};
        }
    }
    render() {
        return (
            <div className="table-wrapper">
                <h2>Data from Google Sheet</h2>
                {
                    this.props.dataArr ?
                        <table>
                            <thead>
                                <tr style={{backgroundColor:"green"}}>
                                    {
                                        this.props.dataArr[0].map((heading, index) => {
                                            return <th key={`head_${index}`}>{heading}</th>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.dataArr.slice(1).map((row, rowId) => {
                                        return <tr key={rowId}>
                                            {
                                                row.map((value, colId) => {
                                                    return <th key={`${rowId}-${colId}`}>{value}</th>
                                                })
                                            }
                                        </tr>
                                    })
                                }
                                {
                                    this.state.aggRows ? this.state.aggRows.map((row, rowId) => {
                                        return <tr key={rowId} style={{backgroundColor:"yellow"}}>
                                            {
                                                row.map((value, colId) => {
                                                    return <th key={`${rowId}-${colId}`}>{value}</th>
                                                })
                                            }
                                        </tr>
                                    }) : null
                                }
                            </tbody>
                        </table> :
                        <p>No Data to show</p>
                }
            </div>
        )
    }
}