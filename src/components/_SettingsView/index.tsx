import React from "react";
import ClickableElement from "../ClickableElement";
const { ipcRenderer } = window.require("electron");

type SettingsState = {
  opacity:number,
  autoHide:boolean,
}

class Settings extends React.PureComponent {

  state:SettingsState = {
    opacity:0,
    autoHide:true,
  }

  componentWillMount() {
    const opacity = ipcRenderer.sendSync('getFocusOpacity');
    const autoHide = JSON.parse(ipcRenderer.sendSync('getAutoHide'));
    this.setState({opacity, autoHide});
  }


  opacityOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = Number(e.target.value);
    this.setState({
      opacity:value
    }, () => ipcRenderer.send("setFocusOpacity", value))
  }

  autoHideOnChange = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const value = !this.state.autoHide;
    this.setState({
      autoHide:value
    }, () => ipcRenderer.send("setAutoHide", value))  
  }

  render() {
    const { autoHide } = this.state;
    return (
      <div>
        <h2>Settings</h2>
        <hr/>
        <label>Focus Opacity</label>
        <ClickableElement>
          <input name="opacity" type="range" min={0.1} max={1} step={0.1} onChange={this.opacityOnChange} value={this.state.opacity}/>
        </ClickableElement>
        <hr/>
        <label>Auto Hide</label>
        {/* <div style={{display:"flex", justifyContent:"space-between"}}> */}
        <ClickableElement>
          <button type="button" onClick={this.autoHideOnChange}>{autoHide ? "Disabled" : "Enabled"}</button>
        </ClickableElement>
          {/* <div>
            <small>Disable</small>
            <ClickableElement>
              <input type="radio" name="autoHide" value="false" checked={!autoHide} onChange={this.autoHideOnChange}/>
            </ClickableElement>
          </div>
        </div> */}
      </div>
    )
  }
}

export default Settings;