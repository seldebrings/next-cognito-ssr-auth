import React from "react"
import { useForm } from "react-hook-form"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import { AuthFormProps } from "../../utils/types"
import * as Yup from "yup"
import { useStyles } from "../../utils/consts"



const ConfirmRegisterFormSchema = Yup.object().shape({
  confirmationCode: Yup.string().required("Confirmation code is required")
})

type ConfirmFormData = {
  confirmationCode: string
}

const ConfirmRegisterForm: React.FC<AuthFormProps> = ({
  onSubmitFunc,
  disabled
}) => {
  const classes = useStyles()
  const { register, handleSubmit, watch, errors, reset } = useForm<
    ConfirmFormData
  >({ validationSchema: ConfirmRegisterFormSchema })
  const onSubmit = (data: any, e: any) => {}
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmitFunc)}>
      <fieldset disabled={disabled}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="confirmationCode"
          label="Confirmation Code"
          name="confirmationCode"
          autoComplete="Confirmation Code"
          autoFocus
          inputRef={register({
            required: true
          })}
          helperText={
            errors.confirmationCode ? errors.confirmationCode.message : ""
          }
          error={errors.confirmationCode ? true : false}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Confirm Registration
        </Button>
      </fieldset>
    </form>
  )
}
export default ConfirmRegisterForm
