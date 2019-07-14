import React from 'react';
import { setView, closeApp, setIgnoreMouseEvent } from '../../store/Overall/actions';
import { Views } from '../../store/Overall/types';
import ClickableElement from "../ClickableElement";
import "./sidebar.css";

type SidebarProps = {
  view: Views | null,
  setView: typeof setView
  closeApp: typeof closeApp,
  setIgnoreMouseEvent: typeof setIgnoreMouseEvent
}

export default ({view, setView, closeApp}:SidebarProps) => {
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