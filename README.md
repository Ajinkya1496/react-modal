# React Modal Component
React Modal Component is a stand-alone react component that can be used to display content on a popup like - 
alerts, confirmation box etc.

## Usage
Use it by directly from the relative path to 
```src\modal\Modal.jsx```

## Implementation
```
import Modal from '../modal/Modal';

state = {
  showModal: false
}

toggleModalVisibility = () => {
  this.setState({ showModal: !this.state.showModal });
}
    
<Modal show={this.state.showModal} onClose={this.toggleModalVisibility}>
  This is the modal content.
</Modal>
```

# API Reference

| Property        | Description                                 | Default |   Required
| -------------   |:-------------:                              | -----:  |   -----:|
| `show : boolean`        |if true, will make the Modal visible    | NA      | Yes
| `onClose : function`     |will be triggered when Modal is closed  | NA      | Yes
| `closeOnBlur : boolean` |if true, will close the Modal when clicked outside      |    true | No
| `closeOnEsc : boolean` |if true, will close the Modal when Esc key is pressed      |    true | No
| `height : string` |will override the default height of the Modal.<br>Example- `height = '500px'` (can be in px,rem,%)     |  Auto | No
| `width : string` |will override the default width of the Modal.<br>Example- `width = '500px'` (can be in px,rem,%)     |  24rem | No
| `top : string` |will override the default position(top) of the Modal.<br>Example- `top = '500px'` (can be in px,rem,%)     |  50% | No
| `left : string` |will override the default position(left) of the Modal.<br>Example- `left = '500px'` (can be in px,rem,%)     |  50% | No
