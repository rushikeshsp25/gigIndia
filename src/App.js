import React from 'react';
import './App.css';
import { loadSpreadSheet } from './helpers/spreadsheet'
import config from './config'
import Header from './components/Header';
import Table from './components/Table';
import SheetIdAdd from './components/SheetIdAdd';
/* global gapi */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initClient = this.initClient.bind(this);
    this.getSheetId = this.getSheetId.bind(this);
    this.state = { sheetData: null }
  }

  onLoad = (data) => {
    console.log("onLoad is called", data)
    if (data) {
      this.setState({ sheetData: data });
    }
  };

  initClient() {
    gapi.client.init({
      apiKey: config.API_KEY,
      clientId: config.CLIENT_ID,
      discoveryDocs: config.DISCOVERY_DOCS,
    }).then(() => {
      console.log("working")
      loadSpreadSheet(this.onLoad);
    }, (error) => {
      console.log(JSON.stringify(error, null, 2));
    });
  }

  componentDidMount() {
    window.gapi.load("client", this.initClient);
  }

  getSheetId(id){
    console.log("Sheet ID received : ",id)
    loadSpreadSheet(this.onLoad,id);
    // this.setState({sheetId:id});
  }
  render() {
    return (
      <>
        <Header></Header>
        <SheetIdAdd onSheetId={this.getSheetId}></SheetIdAdd>
        <Table dataArr={this.state.sheetData}></Table>
      </>
    );
  }
}

export default App;
