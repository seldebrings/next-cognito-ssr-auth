import React from "react"
import { useForm } from "react-hook-form"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import * as Yup from "yup"
import { useStyles } from "../../utils/consts"

interface EmailFormProps {
  onSubmitFunc: any
  disabled: boolean
  label: string
}

type EmailFormData = {
  email: string
}

const EmailFormSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email")
})



const EmailForm: React.FC<EmailFormProps> = ({
  onSubmitFunc,
  disabled,
  label
}) => {
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm<EmailFormData>({
    validationSchema: EmailFormSchema
  })
  const onSubmit = (data: any, e: any) => {}
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmitFunc)}>
      <fieldset disabled={disabled}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          helperText={errors.email ? errors.email.message : ""}
          inputRef={register({
            required: true
          })}
          error={errors.email ? true : false}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {label}
        </Button>
      </fieldset>
    </form>
  )
}
export default EmailForm
