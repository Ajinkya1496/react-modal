import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

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
        document.addEventListener('keydown', (e) => {
            if (!this.props.show) return;

            this.handleClose();
            const firstElement = ReactDOM.findDOMNode(this.refs[0])
            if (!firstElement) return;
            const allFocusableElements = firstElement.parentElement.querySelectorAll(focusableElements);
            const firstFocusableElement = firstElement.parentElement.querySelectorAll(focusableElements)[0];
            const lastFocusableElement = allFocusableElements[allFocusableElements.length - 1];


            if (allFocusableElements.length < 1) return;

            let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                } else if (!Array.from(allFocusableElements).includes(document.activeElement)) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });
    }

    handleClose = (event) => {
        event = event || window.event;
        if (event.keyCode === 27 || event.nativeEvent instanceof MouseEvent) {
            this.props.onClose && this.props.onClose(event);
        }
    }

    render() {
        if (this.props.show === false) {
            return null;
        }
        return (
            <section style={this.backgroundBlur} role="dialog">
                <div style={this.modalContent}>
                    <span tabIndex={0} style={this.btnClose} onClick={this.handleClose}>X</span>
                    {React.Children.map(this.props.children, (element, idx) => {
                        return React.cloneElement(element, { ref: idx });
                    })}
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