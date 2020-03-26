import React from "react"
import { useForm } from "react-hook-form"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { AuthFormProps } from "../../utils/types"
import * as Yup from "yup"
import { useStyles } from "../../utils/consts"

const ConfirmPasswordFormSchema = Yup.object().shape({
  confirmationCode: Yup.string().required("Confirmation code is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  )
})

type ConfirmFormData = {
  confirmationCode: string
  password: string
  confirmPassword: string
}



const MaterialConfirmForm: React.FC<AuthFormProps> = ({
  onSubmitFunc,
  disabled
}) => {
  const classes = useStyles()
  const { register, handleSubmit, watch, errors, reset } = useForm<
    ConfirmFormData
  >({ validationSchema: ConfirmPasswordFormSchema })
  const onSubmit = (data: any, e: any) => {}
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmitFunc)}>
      <fieldset disabled={disabled}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="confirmationCode"
          label="Confirmation Code"
          name="confirmationCode"
          autoComplete="off"
          autoFocus
          inputRef={register({
            required: true
          })}
          helperText={
            errors.confirmationCode ? errors.confirmationCode.message : ""
          }
          error={errors.confirmationCode ? true : false}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="New Password"
          type="password"
          id="password"
          autoComplete="off"
          inputRef={register({
            required: true
          })}
          helperText={errors.password ? errors.password.message : ""}
          error={errors.password ? true : false}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="off"
          inputRef={register({
            required: true
          })}
          helperText={
            errors.confirmPassword ? errors.confirmPassword.message : ""
          }
          error={errors.confirmPassword ? true : false}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Confirm Change Password
        </Button>
      </fieldset>
    </form>
  )
}
export default MaterialConfirmForm
