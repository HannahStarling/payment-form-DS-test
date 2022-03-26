import React, { useState } from 'react';
import * as api from '../../api/api';
import 'antd/dist/antd.css';
import { Form, Input, Button, DatePicker } from 'antd';
import { formItemLayout } from '../../utils/constans';
import { monthFormat } from '../../utils/validation/constants';

const PaymentForm = () => {
  const [form] = Form.useForm();
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = async (e) => {
    const {
      CardNumber,
      ExpDate: { _d },
      Cvv,
      Amount,
    } = e;
    // validation: Expiration Date
    const now = new Date();
    const expCondition = now.getMonth() + now.getFullYear() > _d.getMonth() + _d.getFullYear();
    // formatting date to MM/YYYY
    const month = _d.getMonth() >= 9 ? _d.getMonth() + 1 : `0${_d.getMonth() + 1}`;
    const ExpDate = `${month}/${_d.getFullYear()}`;
    try {
      if (expCondition) throw new Error('Card has expired');
      return await api.payment({ CardNumber, ExpDate, Cvv, Amount });
    } catch (err) {
      console.error(err);
    }
  };

  const onFieldsChange = () => {
    const values = form.getFieldsValue();
    const isDisabled =
      !form.isFieldsTouched() ||
      (form.isFieldsTouched() &&
        (form.getFieldsError().filter(({ errors }) => errors.length).length > 0 ||
          Object.keys(values).filter((key) => values[key] === undefined).length > 0));

    setButtonDisabled(isDisabled);
  };

  return (
    <>
      <h1>Payment Form</h1>
      <Form
        {...formItemLayout}
        name='basicform'
        onFieldsChange={onFieldsChange}
        onFinishFailed={() => console.error('Invalid data, try again')}
        onFinish={handleSubmit}
        form={form}
        layout='vertical'
      >
        <Form.Item
          label='Card Number'
          name='CardNumber'
          tooltip='Payment card numbers are composed of 16 digits'
          rules={[
            { required: true, message: 'Please, enter card number' },
            { len: 16, message: 'Card number must be exactly 16 characters' },
            { pattern: /^[0-9]{1,}$/gi, message: 'Only numbers' },
          ]}
          hasFeedback
        >
          <Input placeholder='0000000000000000' maxLength={16} />
        </Form.Item>
        <Form.Item
          label='Expiration Date'
          name='ExpDate'
          tooltip='The expiration date can be found on the card, written as XX/XX, and hasnt been expired on payment day'
          hasFeedback
        >
          <DatePicker
            label='Expiration Date'
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
          tooltip='CVV number is a three-digit number on the back of the card'
          rules={[
            { required: true, message: 'Please, enter cvv' },
            { pattern: /^[0-9]{1,}$/gi, message: 'Only numbers' },
            { len: 3, message: 'CVV must be exactly 3 characters' },
          ]}
        >
          <Input placeholder='123' maxLength={3} />
        </Form.Item>
        <Form.Item
          label='Amount'
          name='Amount'
          hasFeedback
          rules={[
            { required: true, message: 'Please, enter amount of payment' },
            { min: 1 },
            { pattern: /^[0-9]{1,}$/gi, message: 'Only numbers' },
          ]}
        >
          <Input placeholder='10000' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' disabled={isButtonDisabled}>
            Оплатить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PaymentForm;
