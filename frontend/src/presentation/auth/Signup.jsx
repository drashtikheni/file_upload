import React from 'react'
import AuthLayout from './AuthLayout'
import FUForm from '../../shared/FUForms'
import signupContainer from '../../container/signup.container'
import { formFields } from '../../description/login.description'
import {
  alreadyHaveAccount,
  signupLabel,
} from '../../description/signup.description'

import './Auth.css'

const Signup = () => {
  const { isLoading, signup, gotoLogin } = signupContainer()

  return (
    <AuthLayout>
      <FUForm
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={signup}
        autoComplete="off"
        formFields={formFields}
        isSubmitLoading={isLoading}
        submitLabel={signupLabel}
        linkLabel={alreadyHaveAccount}
        onLinkClick={gotoLogin}
      />
    </AuthLayout>
  )
}

export default Signup
