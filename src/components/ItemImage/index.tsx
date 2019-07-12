import React from 'react';
import { getImageFromItemName } from '../../store/Items/selectors';
import { AppState } from '../../store';
import { connect } from 'react-redux';

type ItemImageProps = {
  baseName:string,
  imgSrc?:string,
  size?:number,
}

const ItemImage = ({imgSrc="", baseName="", size=30}:ItemImageProps) => {
  return (
    <img src={imgSrc} title={baseName} width={size} height={size}/>
  )
}

const mapStateToProps = (state:AppState, ownProps:ItemImageProps) => {
  return {
    imgSrc: getImageFromItemName(state.items, ownProps.baseName)
  }
}

export default connect(mapStateToProps)(ItemImage);