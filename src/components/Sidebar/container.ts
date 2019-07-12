import { connect } from "react-redux";
import Sidebar from './sidebar';
import { setView, closeApp, setIgnoreMouseEvent } from "../../store/Overall/actions";
import { AppState } from "../../store";

const mapStateToProps = (state:AppState) => {
  return {
    view: state.overall.view,
  }
}
export default connect(mapStateToProps, {setView, closeApp, setIgnoreMouseEvent})(Sidebar);

