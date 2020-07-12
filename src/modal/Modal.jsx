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

            if (e.keyCode === 27) {
                this.handleEsc();
                return;
            }

            const allFocusableElements = this.getAllFocusableElements(this.refs);
            const firstFocusableElement = allFocusableElements[0];
            const lastFocusableElement = allFocusableElements[allFocusableElements.length - 1];

            if (e.keyCode !== 9) {
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
                }
            }
        });
    }

    componentDidUpdate() {
        if (this.props.show && this.refs) {
            const allFocusableElements = this.getAllFocusableElements(this.refs);

            if (allFocusableElements.length === 1) {
                allFocusableElements[0].focus();
            } else {
                allFocusableElements[1].focus();
            }
        }
    }

    getAllFocusableElements(refs) {
        const firstElement = ReactDOM.findDOMNode(refs[0]);
        const allFocusableElements = firstElement.parentElement.querySelectorAll(focusableElements);
        return allFocusableElements;
    }

    handleOutsideClick = (event) => {
        if (this.props.closeOnBlur === undefined || this.props.closeOnBlur === true) {
            this.props.onClose && this.props.onClose(event);
        }
    }

    handleEsc = () => {
        if (this.props.closeOnEsc === undefined || this.props.closeOnEsc === true) {
            this.handleClose();
        }
    }

    handleClose = (event) => {
        event = event || window.event;
        this.props.onClose && this.props.onClose(event);
    }

    handleCloseIconKeyDown = (event) => {
        if (event.keyCode && (event.keyCode === 13 || event.keyCode === 32)) {
            this.handleClose();
        }

    }

    handleModalContentClick = (event) => {
        event.stopPropagation();
    }

    render() {
        if (this.props.show === false) {
            return null;
        }


        return (
            <section className="modal-bg" role="dialog" onClick={this.handleOutsideClick}>
                <div style={{ height: this.props.height, width: this.props.width, top: this.props.top, left: this.props.left }} className="modal-content" onClick={this.handleModalContentClick}>
                    <div className="btn-close-container">
                        <span aria-hidden="true" onKeyDown={this.handleCloseIconKeyDown}
                            tabIndex={0} className="btn-close" onClick={this.handleClose}
                        >
                            &times;
                    </span>
                    </div>

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
    closeOnBlur: PropTypes.bool,
    closeOnEsc: PropTypes.bool,
    height: PropTypes.string,
    width: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string
}

export default Modal;