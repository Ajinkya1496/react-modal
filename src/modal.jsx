import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
    backgroundBlur = {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 1,
        transform: 'scale(1.0)',
        transition: 'visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s',
    }

    modalContent = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '1rem 1.5rem',
        width: '24rem',
        borderRadius: '0.5rem',
    }

    btnClose = {
        float: 'right',
        width: '1.5rem',
        lineHeight: '1.5rem',
        textAalign: 'center',
        cursor: 'pointer',
        borderRadius: '0.25rem',
        backgroundColor: 'lightgray',
    }

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
            <section style={this.backgroundBlur} role="dialog">
                <div style={this.modalContent}>
                    <span style={this.btnClose} onClick={this.handleClose}>X</span>
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