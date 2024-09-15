import { LoadingButton } from '@mui/lab';
import { Alert, Button, MenuItem, Portal, Snackbar, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { format, parse } from 'date-fns';
import { Form, Formik } from 'formik';
import { number, object } from 'yup';
import { useAddNewClientMutation } from '../../../store/features/clients/clientsApiSlice';
import { IFundingDetails, selectActiveStep, selectClientForm, setActiveStep } from '../../../store/features/forms/clientFormSlice';
import { useGetFundingSourceQuery } from '../../../store/features/funding/fundingApiSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

type ClientFundingStepProps = {
	onClose: () => void;
};

export const ClientFundingStep: React.FC<ClientFundingStepProps> = ({ onClose }) => {
	const dispatch = useAppDispatch();
	const { data } = useGetFundingSourceQuery();
	const activeStep = useAppSelector(selectActiveStep);
	const form = useAppSelector(selectClientForm);

	const [addNewClient, { error }] = useAddNewClientMutation();

	const interestHoldSchema = object({
		fundingID: number().min(1, 'Required').required('Required'),
	});

	const initialValues: IFundingDetails = {
		fundingID: form.fundingID || 0,
	};

	const handleSubmit = async (values: IFundingDetails) => {
		try {
			const res = await addNewClient({ ...form, ...values, dob: format(parse(form.dob, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd') }).unwrap();
			if (res && res.Id) {
				return onClose();
			}
		} catch (err) {
			console.error('Failed to save the client: ', err);
		}
	};

	const handleBack = () => {
		dispatch(setActiveStep(activeStep - 1));
	};

	return (
		<>
			<Portal>
				<Snackbar open={Boolean(error)} autoHideDuration={8000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
					<Alert severity="error" variant="filled" sx={{ width: '100%' }}>
						<Typography>Failed to save new client</Typography>
					</Alert>
				</Snackbar>
			</Portal>
			<Formik initialValues={initialValues} validationSchema={interestHoldSchema} onSubmit={handleSubmit} validateOnChange validateOnBlur>
				{({ errors, handleBlur, handleChange, touched, values, isSubmitting }) => (
					<Form autoComplete="off">
						<Grid container spacing={2} mt={2}>
							<Grid size={{ xs: 12 }}>
								<Typography variant="subtitle2" gutterBottom>
									Funding Source
								</Typography>
								<TextField
									select
									error={Boolean(touched.fundingID && errors.fundingID)}
									fullWidth
									helperText={touched.fundingID && errors.fundingID}
									value={values.fundingID}
									name="fundingID"
									onBlur={handleBlur}
									onChange={handleChange}
									slotProps={{ select: { displayEmpty: true } }}
								>
									<MenuItem disabled sx={{ display: 'none' }} value={0} />
									{data &&
										data.length > 0 &&
										data.map((type) => (
											<MenuItem key={type.Id} value={type.Id}>
												{type.Name}
											</MenuItem>
										))}
								</TextField>
							</Grid>
						</Grid>
						<Stack direction="row" justifyContent="center" spacing={4} mt={6}>
							<Button fullWidth size="large" color="primary" variant="outlined" onClick={handleBack}>
								Back
							</Button>
							<LoadingButton fullWidth size="large" color="primary" variant="contained" type="submit" loading={isSubmitting}>
								Add Client
							</LoadingButton>
						</Stack>
					</Form>
				)}
			</Formik>
		</>
	);
};
