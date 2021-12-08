import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography } from '@material-ui/core'
import Textfield from '../FormUI/TextFields'
import Select from '../FormUI/Select'
import DateTimePicker from '../FormUI/DateTimePicker'
import Checkbox from '../FormUI/CheckBox'
import Button from '../FormUI/Button'

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(18)
  }
}))

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  country: 'NGN',
  arrivalDate: '',
  departureDate: '',
  message: '',
  termsOfService: false
}

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid Email').required('Required'),
  phone: Yup
    .number()
    .integer()
    .typeError('Enter a valid phone number')
    .required('Required'),
  address1: Yup.string().required('Required'),
  address2: Yup.string(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  arrivalDate: Yup.date().required('Required'),
  departureDate: Yup.date().required('Required'),
  message: Yup.string(),
  termsOfService: Yup.boolean()
    .oneOf([true], 'The terms and conditions must be accepted before proceding')
    .required('The terms and conditions must be accepted before proceding')
})

const countryOptions = {
  "NGN": "Nigeria",
  "CHF": "Switzeland",
}

const Home = () => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth='xs'>
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={val => console.log(val)}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>Your Details</Typography>
                  </Grid>
                  <Grid item xs={6}><Textfield size='small' name='firstName' label='FirstName' /></Grid>
                  <Grid item xs={6}><Textfield size='small' name='lastName' label='LastName' /></Grid>
                  <Grid item xs={12}><Textfield size='small' name='email' label='Email' /></Grid>
                  <Grid item xs={12}><Textfield size='small' name='phone' label='Phone' /></Grid>
                  <Grid item xs={12}>
                    <Typography>Address</Typography>
                  </Grid>

                  <Grid item xs={12}><Textfield size='small' name='address1' label='Address1' /></Grid>
                  <Grid item xs={12}><Textfield size='small' name='address2' label='Address2' /></Grid>

                  <Grid item xs={6}><Textfield size='small' name='city' label='City' /></Grid>
                  <Grid item xs={6}><Textfield size='small' name='state' label='State' /></Grid>
                  <Grid item xs={12}><Select size='small' name='country' label='Country' options={countryOptions} /></Grid>

                  <Grid item xs={12}>
                    <Typography>Booking Infomation</Typography>
                  </Grid>
                  <Grid item xs={6}><DateTimePicker size='small' name='arrivalDate' label='Arrival Date' /></Grid>
                  <Grid item xs={6}><DateTimePicker size='small' name='departureDate' label='Departure Date' /></Grid>
                  <Grid item xs={12}>
                    <Typography>Any other annoying $#!%</Typography>
                  </Grid>
                  <Grid item xs={12}><Textfield size='small' name='message' label='message' multiline={true} rows={4} /></Grid>
                  <Grid item xs={12}><Checkbox size='small' name='termsOfService' legend='Terms of Service' label='I agree' /></Grid>
                  <Grid item xs={12}><Button>Submit</Button></Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  )
}

export default Home
