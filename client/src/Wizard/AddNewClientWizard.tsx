import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Alert, Dialog, DialogContent, IconButton, MobileStepper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { selectActiveStep } from '../../store/features/forms/clientFormSlice';
import { useAppSelector } from '../../store/hooks';
import { ClientDetailsStep } from './steps/ClientDetailsStep';
import { ClientFundingStep } from './steps/ClientFundingStep';
import { ClientLanguageStep } from './steps/ClientLanguageStep';

export type AddNewClientWizardProps = {
	onClose: () => void;
};

export const AddNewClientWizard: React.FC<AddNewClientWizardProps> = ({ onClose }) => {
	const activeStep = useAppSelector(selectActiveStep);

	const renderStepSubtitle = (step: number) => {
		switch (step) {
			case 0:
				return 'Enter Client Details';
			case 1:
				return 'Enter Client Language';
			case 2:
				return 'Enter Client Funding Source';
			default:
				return '';
		}
	};

	const renderStepContent = (step: number) => {
		switch (step) {
			case 0:
				return <ClientDetailsStep onClose={onClose} />;
			case 1:
				return <ClientLanguageStep />;
			case 2:
				return <ClientFundingStep onClose={onClose} />;
			default:
				return <Alert severity="warning">Unknown step.</Alert>;
		}
	};

	return (
		<Dialog open onClose={onClose} maxWidth="sm" fullWidth>
			<IconButton
				aria-label="close"
				onClick={onClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent sx={{ p: 6 }}>
				<Stack mb={2}>
					<Grid container direction="row" justifyContent="center" alignItems="flex-start" mb={1}>
						<PersonAddIcon color="primary" sx={{ fontSize: 60 }} />
					</Grid>
					<Typography align="center" variant="h4">
						Add New Client
					</Typography>
					<Typography align="center" variant="subtitle1">
						{renderStepSubtitle(activeStep)}
					</Typography>
				</Stack>
				{renderStepContent(activeStep)}
				<Grid container justifyContent="center" spacing={2} mt={2}>
					<Grid>
						<MobileStepper
							variant="dots"
							steps={3}
							position="static"
							activeStep={activeStep}
							sx={{ maxWidth: 400, flexGrow: 1 }}
							backButton={undefined}
							nextButton={undefined}
						/>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};
