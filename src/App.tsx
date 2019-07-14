import React from 'react';
import { connect } from 'react-redux';
import { fetchData, closeView } from "./store/Overall/actions";
import { State } from "./store/Overall/types";
import { AppState } from './store';
import "./App.css";
import Sidebar from "./components/Sidebar";
import Routes from "./Routes";
const { ipcRenderer } = window.require('electron');

interface AppProps {
  state:State,
  fetchData: Function,
  closeView: typeof closeView
}

class App extends React.Component<AppProps>  {

  componentDidMount() {
    this.props.fetchData();
  }

  onMouseLeave = () => {
    const autoHide = JSON.parse(ipcRenderer.sendSync("getAutoHide"))
    ipcRenderer.send('onMouseLeave');
    if (autoHide) {
      this.props.closeView();  
    }
  }

  onMouseEnter = () => {
    ipcRenderer.send('onMouseEnter');
  }

  render() {
    return (
      <div className="App" 
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave}>
        {
          this.props.state === State.IS_LOADING ? 
          <p>Loading</p> : 
          <React.Fragment>
            <Sidebar/>
            <Routes/>
          </React.Fragment>
        }
      </div>
    );  
  }
}

const mapStateToProps = (state:AppState) => ({
  state: state.overall.state,
})

export default connect(mapStateToProps, { fetchData, closeView })(App);
