import React from 'react';
import './Table.css'

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.addAggregations = this.addAggregations.bind(this);
        this.state={aggRows:null}
    }
    findSum(colNo) {
        let sum = 0;
        for (let j = 1; j < this.props.dataArr.length; j++) {
            sum += Number(this.props.dataArr[j][colNo])
        }
        return sum
    }
    findAvg(colNo) {
        let sum = 0;
        for (let j = 1; j < this.props.dataArr.length; j++) {
            sum += Number(this.props.dataArr[j][colNo])
        }
        return sum / (this.props.dataArr.length - 1)
    }
    addAggregations() {
        let colNos = this.props.dataArr[0].length;
        //skip table header
        let sumRow = ["Sum"];
        let avgRow = ["Average"];
        for (let i = 1; i < colNos; i++) {
            let isNumericCol = true;
            for (let j = 1; j < this.props.dataArr.length; j++) {
                if (Number(this.props.dataArr[j][i]) === NaN) {
                    console.log(Number(this.props.dataArr[j][i]))
                    isNumericCol = false;
                }
            }
            if (isNumericCol) {
                sumRow[i] = this.findSum(i);
                avgRow[i] = this.findAvg(i);
            } else {
                sumRow[i] = "-";
                avgRow[i] = "-";
            }
        }
        return [sumRow,avgRow]
        console.log(sumRow)
        console.log(avgRow)
    }
    componentDidUpdate() {
        let aggArr = this.addAggregations();
        console.log("Component Updated")
    }
    render() {
        return (
            <div className="table-wrapper">
                <h2>Data from Google Sheet</h2>
                {
                    this.props.dataArr ?
                        <table>
                            <thead>
                                <tr>
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
                                    this.state.aggRows?this.state.aggRows.map((row, rowId) => {
                                        return <tr key={rowId}>
                                            {
                                                row.map((value, colId) => {
                                                    return <th key={`${rowId}-${colId}`}>{value}</th>
                                                })
                                            }
                                        </tr>
                                    }):null
                                }
                            </tbody>
                        </table> :
                        <p>No Data to show</p>
                }
            </div>
        )
    }
}