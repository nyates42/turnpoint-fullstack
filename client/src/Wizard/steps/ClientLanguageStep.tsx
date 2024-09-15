import { Button, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import {
	IClientLanguageDetails,
	selectActiveStep,
	selectClientForm,
	setActiveStep,
	setClientLanguage,
} from '../../../store/features/forms/clientFormSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export const ClientLanguageStep: React.FC = () => {
	const dispatch = useAppDispatch();
	const activeStep = useAppSelector(selectActiveStep);
	const form = useAppSelector(selectClientForm);

	const interestHoldSchema = object({
		primaryLanguage: string().required('Primary language required').max(512),
		secondaryLanguage: string().optional().max(512),
	});

	const initialValues: IClientLanguageDetails = {
		primaryLanguage: form.primaryLanguage || '',
		secondaryLanguage: form.secondaryLanguage || '',
	};

	const handleSubmit = async (values: IClientLanguageDetails) => {
		dispatch(setClientLanguage(values));
		dispatch(setActiveStep(activeStep + 1));
	};

	const handleBack = () => {
		dispatch(setActiveStep(activeStep - 1));
	};

	return (
		<>
			<Formik initialValues={initialValues} validationSchema={interestHoldSchema} onSubmit={handleSubmit} validateOnChange validateOnBlur>
				{({ errors, handleBlur, handleChange, touched, values }) => (
					<Form autoComplete="off">
						<Grid container spacing={2} mt={2}>
							<Grid size={{ xs: 12 }}>
								<Typography variant="subtitle2" gutterBottom>
									Primary Language
								</Typography>
								<TextField
									error={Boolean(touched.primaryLanguage && errors.primaryLanguage)}
									fullWidth
									variant="outlined"
									name="primaryLanguage"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.primaryLanguage}
									helperText={touched.primaryLanguage && errors.primaryLanguage}
								/>
							</Grid>
							<Grid size={{ xs: 12 }}>
								<Typography variant="subtitle2" gutterBottom>
									Secondary Language
								</Typography>
								<TextField
									error={Boolean(touched.secondaryLanguage && errors.secondaryLanguage)}
									fullWidth
									variant="outlined"
									name="secondaryLanguage"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.secondaryLanguage}
									helperText={touched.secondaryLanguage && errors.secondaryLanguage}
								/>
							</Grid>
						</Grid>
						<Stack direction="row" justifyContent="center" spacing={4} mt={6}>
							<Button fullWidth size="large" color="primary" variant="outlined" onClick={handleBack}>
								Back
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
