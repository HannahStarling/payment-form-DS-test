import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, DatePicker } from 'antd';
//import moment from 'moment';
import * as api from '../../api/api';
import { formItemLayout } from '../../utils/constans';
import { monthFormat } from '../../utils/validation/constants';

const PaymentForm = (props) => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('requiredMark');

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const onFinish = async (e) => {
    const {
      CardNumber,
      ExpDate: { _d },
      Cvv,
      Amount,
    } = e;
    // validation: Expiration Date
    const now = new Date();
    const expCondition = now.getMonth() + now.getFullYear() > _d.getMonth() + _d.getFullYear();
    // formatting date
    const month = _d.getMonth() >= 9 ? _d.getMonth() + 1 : `0${_d.getMonth() + 1}`;
    const expDate = `${month}/${_d.getFullYear()}`;
    try {
      if (expCondition) throw new Error('Card has expired');
      const data = await api.payment(CardNumber, expDate, Cvv, Amount);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Payment Form</h1>
      <Form
        {...formItemLayout}
        name='basicform'
        onFinishFailed={() => console.log('sorry')}
        onFinish={onFinish}
        initialValues={{ requiredMarkValue: requiredMark, remember: true }}
        form={form}
        layout='vertical'
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
      >
        <Form.Item
          label='Card Number'
          name='CardNumber'
          hasFeedback
          required
          tooltip='This is a required field'
          rules={[
            { required: true, message: 'Please, enter card number' },
            { len: 16, message: 'Card number must be exactly 16 characters' },
            { pattern: /^[0-9]{1,}$/gi, message: 'Only numbers' },
          ]}
        >
          <Input placeholder='0000000000000000' id='success' />
        </Form.Item>
        <Form.Item label='Expiration Date' name='ExpDate' hasFeedback required tooltip='This is a required field'>
          <DatePicker
            label='Expiration Date'
            //defaultValue={moment('01/2022', monthFormat)}
            format={monthFormat}
            picker='month'
            style={{ width: '100%' }}
            rules={[{ required: true, message: 'Please, enter expiration date' }]}
            hasFeedback
          />
        </Form.Item>
        <Form.Item
          label='CVV'
          name='Cvv'
          hasFeedback
          required
          tooltip='This is a required field'
          rules={[
            { required: true, message: 'Please, enter cvv' },
            { pattern: /^[0-9]{1,}$/gi, message: 'Only numbers' },
            { len: 3, message: 'CVV must be exactly 3 characters' },
          ]}
        >
          <Input placeholder='123' />
        </Form.Item>
        <Form.Item
          label='Amount'
          name='Amount'
          hasFeedback
          required
          tooltip='This is a required field'
          rules={[
            { required: true, message: 'Please, enter amount of payment' },
            { min: 1 },
            { pattern: /^[0-9]{1,}$/gi, message: 'Only numbers' },
          ]}
        >
          <Input placeholder='10000' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Оплатить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PaymentForm;
