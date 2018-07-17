import './bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './Components/App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
