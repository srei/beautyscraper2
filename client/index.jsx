import React from 'react';
import ReactDom from 'react-dom';

class Hello extends React.Component {
	render(){
		return <div> HELLO!! WORLD </div>
	}
}

//hook the component onto the actual DOM
ReactDom.render(<Hello />, document.getElementById('hellos'));
