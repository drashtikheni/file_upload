import { Button, Form, Input } from 'antd'
import React, { memo } from 'react'

import { formFieldTypes } from '../description/login.description'
import { areEqualProps, equal } from '../utils/javascript'

const FUForm = ({
  labelCol,
  wrapperCol,
  style,
  onFinish,
  autoComplete,
  formFields,
  submitLabel,
  isSubmitLoading,
  linkLabel,
  onLinkClick,
}) => {
  return (
    <Form
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      style={style}
      onFinish={onFinish}
      autoComplete={autoComplete}
    >
      {formFields.map(field => (
        <Form.Item key={field.name} {...field}>
          {equal(field.type, formFieldTypes.input) ? (
            <Input />
          ) : (
            <Input.Password />
          )}
        </Form.Item>
      ))}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          disabled={isSubmitLoading}
          loading={isSubmitLoading}
        >
          {submitLabel}
        </Button>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="link" onClick={onLinkClick}>
          {linkLabel}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default memo(FUForm, areEqualProps)
