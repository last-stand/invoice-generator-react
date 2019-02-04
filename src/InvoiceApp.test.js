import React from 'react';
import ReactDOM from 'react-dom';
import InvoiceApp from './InvoiceApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InvoiceApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
