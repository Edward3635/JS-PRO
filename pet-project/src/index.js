import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/css/style.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

const App = function () {
	return (
		<div>
			Pet-project!
		</div>
	)
};
root.render(<App />);