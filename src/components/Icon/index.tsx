import React from 'react';
import { getIconImageFromName } from '../../store/Icons/selectors';
import { AppState } from '../../store';
import { connect } from 'react-redux';

type IconProps = {
  baseName: string,
  imgSrc?: any,
  size?:number,
}

const Icon = ({imgSrc ="", size=16}:IconProps) => <img src={imgSrc} width={size} height={size}/>

const mapStateToProps = (state:AppState, ownProps:IconProps) => {
  return {
    imgSrc: getIconImageFromName(state.icons, ownProps.baseName)
  }
}

export default connect(mapStateToProps)(Icon);