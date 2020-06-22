import React from 'react';
import './SheetIdAdd.css'
export default class SheetIdAdd extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state={sheetId:null}
        this.handleInputChange=this.handleInputChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleInputChange(event){
        this.setState({sheetId:event.target.value})
    }
    handleSubmit(){
        this.props.onSheetId(this.state.sheetId);
    }
    render(){
        return(
            <div className="input-wrapper">
                <p>Enter Google Sheet ID ( make sure it is public ) : </p><input onChange={this.handleInputChange} type="text"></input>
                <button onClick={this.handleSubmit}>Display Data</button>
            </div>
        )
    }
}