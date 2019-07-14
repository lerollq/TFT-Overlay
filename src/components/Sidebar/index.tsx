import React from 'react';
import { connect } from "react-redux";

import { setView, closeApp, setIgnoreMouseEvent } from '../../store/Overall/actions';
import { Views } from '../../store/Overall/types';
import ClickableElement from "../ClickableElement";
import { AppState } from "../../store";

type SidebarProps = {
  view: Views | null,
  setView: typeof setView
  closeApp: typeof closeApp,
  setIgnoreMouseEvent: typeof setIgnoreMouseEvent
}

const Sidebar = ({view, setView, closeApp}:SidebarProps) => {
  return (
    <div className="sidebar">

      <ClickableElement>
        <span id="btn-items" className="btn" onClick={() => setView(Views.ITEMS)} title="Items">
          <i className="fas fa-tools" />
        </span>
      </ClickableElement>


      <ClickableElement>
        <span id="btn-items" className="btn" onClick={() => setView(Views.ITEM_BUILDER)} title="Item Builder">
          <i className="fas fa-hammer" />
        </span>
      </ClickableElement>

      <ClickableElement>
        <span id="btn-items" className="btn" onClick={() => setView(Views.SETTINGS)} title="Settings">
          <i className="fas fa-cogs" />
        </span>
      </ClickableElement>

      <hr className="separator"/>
      <ClickableElement>
        <span id="btn-items" className="btn" onClick={() => setView(Views.INFO)} title="Info">
          <i className="fas fa-info-circle" />
        </span>
      </ClickableElement>

      <ClickableElement>
        <span id="btn-items2" className="btn" onClick={() => closeApp()} title="Close">
          <i className="far fa-times-circle"/>
        </span>
      </ClickableElement>
    </div>
  )
}

const mapStateToProps = (state:AppState) => {
  return {
    view: state.overall.view,
  }
}

export default connect(mapStateToProps, {setView, closeApp, setIgnoreMouseEvent})(Sidebar);