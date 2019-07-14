import React from 'react';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { OverallInfoState } from '../../store/Overall/types';
import ClickableElement from '../ClickableElement';
import { openBrowserToUrl } from '../../store/Overall/actions';

type InfoProps = {
  info:OverallInfoState,
}

const Info = ({info}:InfoProps) => {
  return (
    <div className="info-container">
      <h3>Current Version</h3>
      <span>v{info.currentVersion}</span>
      <hr className="separator"/>
      <h3>Latest Version</h3>
      <ClickableElement>
        <span className="link" onClick={() => openBrowserToUrl(info.htmlUrl)}> {info.latestVersion}</span>
      </ClickableElement>
    </div>
  )
}

const mapStateToProps = (state:AppState) => {
  return {
    info:state.overall.info
  }
}

export default connect(mapStateToProps)(Info);