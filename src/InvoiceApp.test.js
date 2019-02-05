import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon'
import axios from 'axios';
import InvoiceApp from './InvoiceApp';

describe('InvoiceApp', () => {
  let result = {
    "id": 1,
    "customer": "Customer Kumar",
    "invoiceItem": [
      {
        "id": 2,
        "product": {
          "id": 3,
          "name": "Cheese",
          "unitPrice": 10
        },
        "quantity": 5
      }
    ],
    "date": "18-Jan-2019 11:36:09",
    "total": "147.2"
  };

  const promise = Promise.resolve({data: result});
  let sinonStub;
  beforeAll(() => {
    sinonStub = sinon
      .stub(axios, 'get')
      .withArgs('http://localhost:8080/api/invoice/1');
  });

  afterAll(() => {
    axios.get.restore();
  });

  describe('componentDidMount', () => {

    it('should call componentDidMount once', () => {
      sinonStub.returns(promise);
      const componentDidMountSpy = sinon.spy(InvoiceApp.prototype, 'componentDidMount');
      const wrapper = shallow(<InvoiceApp/>);

      expect(InvoiceApp.prototype.componentDidMount.calledOnce).toBe(true);
      componentDidMountSpy.restore();
    });

    it('sets the state componentDidMount', (done) => {
      sinonStub.returns(promise);

      const wrapper = mount(<InvoiceApp/>);
      expect(wrapper.state().invoice).toEqual({});

      promise.then(() => {
        wrapper.update();

        expect(wrapper.state().invoice).toEqual(result);
        expect(wrapper.state().isLoaded).toEqual(true);
        expect(wrapper.state().error).toEqual(null);
        done();
      });
    });

    it('renders invoice component with its props when data fetched successfully', (done) => {
      sinonStub.returns(promise);
      const wrapper = mount(<InvoiceApp/>);

      expect(wrapper.find('div').text()).toEqual('Loading...');

      promise.then(() => {
        wrapper.update();

        const invoiceWrapper = wrapper.find('Invoice');
        expect(invoiceWrapper).toHaveLength(1);
        expect(invoiceWrapper.prop('invoice')).toEqual(result);
        done();
      });
    });

    it('renders error when throws error', (done) => {
      var rejectedPromise = Promise.reject(new Error("OOPS!"));
      sinonStub.returns(rejectedPromise);
      const wrapper = mount(<InvoiceApp/>);

      expect(wrapper.find('div').text()).toEqual('Loading...');

      promise.then(() => {
        wrapper.update();

        expect(wrapper.state().error.message).toEqual('OOPS!');
        expect(wrapper.state().isLoaded).toEqual(true);
        expect(wrapper.state().invoice).toEqual({});
        expect(wrapper.find('div').text()).toEqual('Error: OOPS!');
        done();
      });
    });

  });

});
