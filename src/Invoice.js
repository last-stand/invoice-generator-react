import React, { Component } from 'react';
import './Invoice.css';

function Invoice(props) {
  return (
    <div id="invoice">
      <InvoiceTitle />
      <InvoiceInfo info={props.invoice}/>
      <InvoiceItemTable data={props.invoice}/>
      <TotalPrice total={props.invoice.total}/>
    </div>
  );
}

function InvoiceTitle() {
  return (
    <div id="title">
      <h2>Invoice</h2>
    </div>
  )
}

function InvoiceInfo(props) {
  return (
    <div>
      <div className="invoice-no">
        <b>InvoiceNo: </b> {props.info.id}
      </div>
      <div id="info">
        <div>
          <b>Customer: </b> {props.info.customer}
        </div>
        <div>
          <b>Date: </b> {props.info.date}
        </div>
      </div>
    </div>
  )
}

function InvoiceItemTable(props) {
  return (
    <div className="item-table">
      <InvoiceItemHeader />
      {props.data.invoiceItem.map((item, index) => (
        <InvoiceItemRow key={index} index={index+1} data={item}/>
      ))}
    </div>
  )
}

function InvoiceItemHeader(props) {
  return (
    <div className="item-row">
      <div className="header">S No.</div>
      <div className="header">Item Name</div>
      <div className="header">Unit Price</div>
      <div className="header">Quantiy</div>
      <div className="header">Price</div>
    </div>
  )
}

function InvoiceItemRow(props) {
  return (
    <div className="item-row">
      <div className="data">{props.index}</div>
      <div className="data">{props.data.product.name}</div>
      <div className="data">{props.data.product.unitPrice}</div>
      <div className="data">{props.data.quantity}</div>
      <div className="data">{props.data.product.unitPrice * props.data.quantity}</div>
    </div>
  )
}

function TotalPrice(props) {
  return (
    <div className="total">
      <b>Total: </b> {props.total}
    </div>
  )
}



export default Invoice;
