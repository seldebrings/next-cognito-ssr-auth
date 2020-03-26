import React from "react"

import Layout from "../Layout"
import { useForm } from "react-hook-form"

const ForgotPasswordForm: React.FC = () => {
  const { register, handleSubmit, watch, errors, reset } = useForm()
  const onSubmit = (data: any, e: any) => {}
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        id="email"
        className="form-control"
        name="email"
        placeholder="Email"
        ref={register({
          required: true,
          pattern: /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        })}
      ></input>
      <input
        type="submit"
        className="form-control mt-2"
        value="Get Password"
      ></input>
    </form>
  )
}
export default ForgotPasswordForm
