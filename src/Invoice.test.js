import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Invoice from './Invoice';

describe('Invoice component', () => {
  let invoiceProps;
  let wrapper;

  beforeEach(() => {
    invoiceProps = {
      "id": 376,
      "customer": "Customer Kumar",
      "invoiceItem": [
          {
              "id": 1,
              "product": {
                  "id": 2,
                  "name": "Bread",
                  "unitPrice": 20
              },
              "quantity": 1
          },
          {
              "id": 2,
              "product": {
                  "id": 3,
                  "name": "Cheese",
                  "unitPrice": 15.9
              },
              "quantity": 8
          }
      ],
      "date": "18-Jan-2019 11:36:09",
      "total": "147.2"
    };
  });

  afterEach(() => {
    if(wrapper) {
      wrapper.unmount();
    }
  });

  it('should render Invoice component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Invoice invoice={invoiceProps}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render one invoice div with invoice props', () => {
    wrapper = mount(<Invoice invoice={invoiceProps}/>);

    expect(wrapper.find('div#invoice').length).toEqual(1);
    expect(wrapper.prop('invoice')).toEqual(invoiceProps);
  });

  describe('InvoiceTitle component', () => {

    it('should render one InvoiceTitle component', () => {
      wrapper = shallow(<Invoice invoice={invoiceProps}/>);

      expect(wrapper.find('InvoiceTitle').length).toEqual(1);
    });

    it('should render InvoiceTitle component with "Invoice" text in h2', () => {
      wrapper = mount(<Invoice invoice={invoiceProps}/>);
      let invoiceTitleH2Wrapper = wrapper.find('InvoiceTitle').find('h2');

      expect(invoiceTitleH2Wrapper.length).toEqual(1);
      expect(invoiceTitleH2Wrapper.text()).toEqual('Invoice');
    });

  });

  describe('InvoiceInfo component', () => {

    it('should render one InvoiceInfo component with "info" props', () => {
      wrapper = shallow(<Invoice invoice={invoiceProps}/>);
      let invoiceInfoWrapper =  wrapper.find('InvoiceInfo');

      expect(invoiceInfoWrapper.length).toEqual(1);
      expect(invoiceInfoWrapper.prop('info')).toEqual(invoiceProps);
    });

    it('should render one div component with invoice number in it', () => {
      wrapper = mount(<Invoice invoice={invoiceProps}/>);
      let invoiceInfoWrapper = wrapper.find('InvoiceInfo').find('div.invoice-no');

      expect(invoiceInfoWrapper.length).toEqual(1);
      expect(invoiceInfoWrapper.childAt(0).contains(<b>InvoiceNo: </b>)).toBeTruthy();
      expect(invoiceInfoWrapper.text()).toBe("InvoiceNo:  376");
    });

    it('should render one div component with customer info in it', () => {
      wrapper = mount(<Invoice invoice={invoiceProps}/>);
      let infoWrapper = wrapper.find('InvoiceInfo').find('div#info');

      expect(infoWrapper.length).toEqual(1);
      expect(infoWrapper.childAt(0).contains(<b>Customer: </b>)).toBeTruthy();
      expect(infoWrapper.childAt(0).text()).toBe("Customer:  Customer Kumar");
    });

    it('should render one div component with date info in it', () => {
      wrapper = mount(<Invoice invoice={invoiceProps}/>);
      let infoWrapper = wrapper.find('InvoiceInfo').find('div#info');

      expect(infoWrapper.length).toEqual(1);
      expect(infoWrapper.childAt(1).contains(<b>Date: </b>)).toBeTruthy();
      expect(infoWrapper.childAt(1).text()).toBe("Date:  18-Jan-2019 11:36:09");
    });

  });

  describe('InvoiceItemTable', () => {

    it('should render one InvoiceItemTable component with "data" props', () => {
      wrapper = shallow(<Invoice invoice={invoiceProps}/>);
      let invoiceTableWrapper =  wrapper.find('InvoiceItemTable');

      expect(invoiceTableWrapper.length).toEqual(1);
      expect(invoiceTableWrapper.prop('data')).toEqual(invoiceProps);
    });

    it('should have one InvoiceItemHeader component as child', () => {
      wrapper = mount(<Invoice invoice={invoiceProps}/>);
      let invoiceTableWrapper =  wrapper.find('InvoiceItemTable');

      expect(invoiceTableWrapper.find('InvoiceItemHeader').length).toEqual(1);
    });

    it('should render two InvoiceItemRow component as child', () => {
      wrapper = mount(<Invoice invoice={invoiceProps}/>);
      let invoiceTableWrapper =  wrapper.find('InvoiceItemTable');

      expect(invoiceTableWrapper.find('InvoiceItemRow').length).toEqual(2);
    });

  });

  describe('InvoiceItemHeader', () => {

    it('should render five header divs', () => {
      wrapper = mount(<Invoice invoice={invoiceProps}/>);
      let invoiceHeaderWrapper =  wrapper.find('InvoiceItemHeader');

      expect(invoiceHeaderWrapper.find('div.header').length).toEqual(5);
    });

    it('should render header divs with header text', () => {
      wrapper = mount(<Invoice invoice={invoiceProps}/>);
      let invoiceHeaderWrapper =  wrapper.find('InvoiceItemHeader').find('div.item-row');

      expect(invoiceHeaderWrapper.childAt(0).text()).toEqual('S No.');
      expect(invoiceHeaderWrapper.childAt(1).text()).toEqual('Item Name');
      expect(invoiceHeaderWrapper.childAt(2).text()).toEqual('Unit Price');
      expect(invoiceHeaderWrapper.childAt(3).text()).toEqual('Quantiy');
      expect(invoiceHeaderWrapper.childAt(4).text()).toEqual('Price');
    });

  });

  describe('InvoiceItemRow', () => {

    it('should render one InvoiceItemRow component with "data" & "index" props', () => {
      wrapper = mount(<Invoice invoice={invoiceProps}/>);
      let invoiceDataWrapperFirst =  wrapper.find('InvoiceItemRow').first();
      let invoiceDataWrapperSecond =  wrapper.find('InvoiceItemRow').last();

      expect(invoiceDataWrapperFirst.prop('data')).toEqual(invoiceProps.invoiceItem[0]);
      expect(invoiceDataWrapperFirst.prop('index')).toEqual(1);
      expect(invoiceDataWrapperSecond.prop('data')).toEqual(invoiceProps.invoiceItem[1]);
      expect(invoiceDataWrapperSecond.prop('index')).toEqual(2);
    });

    it('should render five data divs for each InvoiceItemRow', () => {
      wrapper = mount(<Invoice invoice={invoiceProps}/>);
      let invoiceDataWrapperFirst =  wrapper.find('InvoiceItemRow').first();
      let invoiceDataWrapperSecond =  wrapper.find('InvoiceItemRow').last();

      expect(invoiceDataWrapperFirst.find('div.data').length).toEqual(5);
      expect(invoiceDataWrapperSecond.find('div.data').length).toEqual(5);
    });

    it('should render data for invoice item', () => {
      wrapper = mount(<Invoice invoice={invoiceProps}/>);
      let invoiceDataWrapperFirst =  wrapper.find('InvoiceItemRow').find('div.item-row').first();
      let invoiceDataWrapperSecond =  wrapper.find('InvoiceItemRow').find('div.item-row').last();

      expect(invoiceDataWrapperFirst.childAt(0).text()).toEqual('1');
      expect(invoiceDataWrapperFirst.childAt(1).text()).toEqual('Bread');
      expect(invoiceDataWrapperFirst.childAt(2).text()).toEqual('20');
      expect(invoiceDataWrapperFirst.childAt(3).text()).toEqual('1');
      expect(invoiceDataWrapperFirst.childAt(4).text()).toEqual('20');
      expect(invoiceDataWrapperSecond.childAt(0).text()).toEqual('2');
      expect(invoiceDataWrapperSecond.childAt(1).text()).toEqual('Cheese');
      expect(invoiceDataWrapperSecond.childAt(2).text()).toEqual('15.9');
      expect(invoiceDataWrapperSecond.childAt(3).text()).toEqual('8');
      expect(invoiceDataWrapperSecond.childAt(4).text()).toEqual('127.2');
    });

  });

  describe('TotalPrice', () => {

    it('should render one TotalPrice component with "total" props', () => {
      wrapper = shallow(<Invoice invoice={invoiceProps}/>);

      let invoiceTotalWrapper = wrapper.find('TotalPrice');
      expect(invoiceTotalWrapper.length).toEqual(1);
      expect(invoiceTotalWrapper.prop('total')).toEqual(invoiceProps.total);
    });

    it('should render total price with "Total" text in bold', () => {
      wrapper = mount(<Invoice invoice={invoiceProps}/>);

      let invoiceTotalWrapper = wrapper.find('TotalPrice');
      expect(invoiceTotalWrapper.contains(<b>Total: </b>)).toBeTruthy();
      expect(invoiceTotalWrapper.prop('total')).toEqual(invoiceProps.total);
    });

  });

});
