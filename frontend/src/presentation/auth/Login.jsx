import React, { memo } from 'react'

import loginContainer from '../../container/login.container'
import {
  createAnAccount,
  formFields,
  loginLabel,
} from '../../description/login.description'
import FUForm from '../../shared/FUForms'
import AuthLayout from './AuthLayout'

import './Auth.css'

const Login = () => {
  const { isLoading, login, goToSignup } = loginContainer()

  return (
    <AuthLayout>
      <FUForm
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={login}
        autoComplete="off"
        formFields={formFields}
        isSubmitLoading={isLoading}
        submitLabel={loginLabel}
        linkLabel={createAnAccount}
        onLinkClick={goToSignup}
      />
    </AuthLayout>
  )
}

export default memo(Login)
