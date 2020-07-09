import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

class Modal extends React.Component {

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
            <section className="modal-bg" role="dialog" onClick={this.handleClose}>
                <div className="modal-content">
                    <span tabIndex={0} className="btn-close" onClick={this.handleClose}>X</span>
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