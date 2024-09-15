import { Button, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { IClientDetails, selectActiveStep, selectClientForm, setActiveStep, setClientDetails } from '../../../store/features/forms/clientFormSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { MaskedDOBInput } from '../../components/MaskedDOB';

type ClientDetailsStepProps = {
	onClose: () => void;
};

export const ClientDetailsStep: React.FC<ClientDetailsStepProps> = ({ onClose }) => {
	const dispatch = useAppDispatch();
	const activeStep = useAppSelector(selectActiveStep);
	const form = useAppSelector(selectClientForm);

	const validateDOB = (dob: string) => {
		// dd/mm/yyyy
		return new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/-]\d{4}$/).test(dob);
	};

	const interestHoldSchema = object({
		fullName: string().required('Name is required').max(512),
		dob: string()
			.required('DOB is required')
			// Only count user input if length is > 2 as the mask characters ("/") are counted
			.test('validateDOB', 'DOB must be in dd/mm/yyyy', (value) => (value && value.length > 2 ? validateDOB(value) : true)),
	});

	const initialValues: IClientDetails = {
		fullName: form.fullName || '',
		dob: form.dob || '',
	};

	const handleSubmit = async (values: IClientDetails) => {
		dispatch(setClientDetails(values));
		dispatch(setActiveStep(activeStep + 1));
	};

	return (
		<>
			<Formik initialValues={initialValues} validationSchema={interestHoldSchema} onSubmit={handleSubmit} validateOnChange validateOnBlur>
				{({ errors, handleBlur, handleChange, touched, values, setFieldTouched, setFieldValue }) => (
					<Form autoComplete="off">
						<Grid container spacing={2} mt={2}>
							<Grid size={{ xs: 12 }}>
								<Typography variant="subtitle2" gutterBottom>
									Client Name
								</Typography>
								<TextField
									error={Boolean(touched.fullName && errors.fullName)}
									fullWidth
									variant="outlined"
									name="fullName"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.fullName}
									helperText={touched.fullName && errors.fullName}
								/>
							</Grid>
							<Grid size={{ xs: 12 }}>
								<Typography variant="subtitle2" gutterBottom>
									Date of Birth
								</Typography>
								<TextField
									error={Boolean(touched.dob && errors.dob)}
									fullWidth
									helperText={touched.dob && errors.dob}
									name="dob"
									onBlur={() => setFieldTouched('dob', true)}
									onChange={(e) => {
										setFieldValue('dob', e.target.value);
									}}
									value={values.dob}
									slotProps={{
										input: {
											// eslint-disable-next-line @typescript-eslint/no-explicit-any
											inputComponent: MaskedDOBInput as any,
										},
										htmlInput: { type: 'tel' },
									}}
								/>
							</Grid>
						</Grid>
						<Stack direction="row" justifyContent="center" spacing={4} mt={6}>
							<Button fullWidth size="large" color="primary" variant="outlined" onClick={onClose}>
								Cancel
							</Button>
							<Button fullWidth size="large" color="primary" variant="contained" type="submit">
								Continue
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</>
	);
};
