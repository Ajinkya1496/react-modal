import React from 'react';

class Modal extends React.Component {
    defaultStyle = {
        position: 'fixed',
        zIndex: 500,
        backgroundColor: 'white',
        width: '70%',
        border: '1px solid #ccc',
        boxShadow: '1px 1px 1px black',
        padding: 16,
        left: '15%',
        top: '30%',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease-out',
    }
    
    render() {
        if(this.props.show === false) {
            return null;
        }
        return (
            <div style={this.props.modalStyle ? this.props.modalStyle : this.defaultStyle}>
                {this.props.children}
            </div>
        )
    }
}

export default Modal;