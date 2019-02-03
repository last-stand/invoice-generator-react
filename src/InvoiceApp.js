import React from 'react';
import Invoice from './Invoice';

class InvoiceApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      invoice: {}
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/invoice/1")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("result" + result);
          updateTotalPrice(result)
          this.setState({
            isLoaded: true,
            invoice: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, invoice } = this.state;
    console.log(this.state);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Invoice invoice={invoice}/>
      );
    }
  }
}

function updateTotalPrice(invoiceData) {
  invoiceData.total = invoiceData.invoiceItem.reduce((accumulator, item) => {
    return accumulator + (item.product.unitPrice * item.quantity)
  }, 0);
}

export default InvoiceApp;