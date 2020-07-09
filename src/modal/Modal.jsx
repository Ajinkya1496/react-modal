import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

class Modal extends React.Component {

    componentDidMount() {
        document.onkeydown = this.handleClose;
    }

    handleClose = (event) => {
        event = event || window.event;
        if(event.keyCode === 27 || event.nativeEvent instanceof MouseEvent) {
            this.props.onClose && this.props.onClose(event);
        }
    }

    render() {
        if(this.props.show === false) {
            return null;
        }
        return (
            <section className="modal-bg" role="dialog" onClick={this.handleClose}>
                <div className="modal-content">
                    <span className="btn-close" onClick={this.handleClose}>X</span>
                    {this.props.children}
                </div>
            </section>
        )
    }
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Modal;