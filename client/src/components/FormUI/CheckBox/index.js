import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel
} from '@material-ui/core'
import { useField, useFormikContext } from 'formik'

const CheckboxWrapper = ({
  name,
  label,
  legend,
  ...otherProps
}) => {

  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(name)

  const handleChange = e => {
    const { checked } = e.target
    setFieldValue(name, checked)
  }
  const configCheckbox = {
    ...field,
    onChange: handleChange
  }

  const configFormControl = {}
  if (meta.touched && meta.error) {
    configFormControl.error = true
  }

  return (
    <FormControl>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...configCheckbox} />}
          label={
            label
          }
        />
      </FormGroup>
    </FormControl>
  )
}

export default CheckboxWrapper