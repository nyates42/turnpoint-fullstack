import AddIcon from '@mui/icons-material/Add';
import {
	Alert,
	Button,
	Container,
	Paper,
	Portal,
	Snackbar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { useGetClientsQuery } from '../store/features/clients/clientsApiSlice';
import { resetClientForm } from '../store/features/forms/clientFormSlice';
import { useAppDispatch } from '../store/hooks';
import { TableLoader } from './components/TableLoader';
import { AddNewClientWizard } from './Wizard/AddNewClientWizard';

function App() {
	const dispatch = useAppDispatch();
	const { data, error, isLoading } = useGetClientsQuery(undefined, { refetchOnMountOrArgChange: true });
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Portal>
				<Snackbar open={Boolean(error)} autoHideDuration={8000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
					<Alert severity="error" variant="filled" sx={{ width: '100%' }}>
						<Typography>Loading clients failed</Typography>
					</Alert>
				</Snackbar>
			</Portal>
			<Container maxWidth="xl">
				<Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2} mb={1}>
					<Grid>
						<Typography variant="h3">Client List</Typography>
					</Grid>
					<Grid>
						<Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsOpen(true)}>
							Add Client
						</Button>
					</Grid>
				</Grid>
				<TableContainer component={Paper}>
					<Table aria-label="clients-table">
						<TableHead>
							<TableRow>
								<TableCell>Client Name</TableCell>
								<TableCell>Date of Birth</TableCell>
                <TableCell>Funding Source</TableCell>
								<TableCell>Primary Language</TableCell>
								<TableCell>Secondary Language</TableCell>
								<TableCell>Added Date</TableCell>
							</TableRow>
						</TableHead>
						{isLoading && <TableLoader rows={5} colSpan={6} />}
						{!isLoading && (
							<TableBody>
								{data &&
									data.map((row) => (
										<TableRow key={row.Id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
											<TableCell component="th" scope="row">
												{row.Name}
											</TableCell>
											<TableCell>{format(parseISO(row.DOB), 'd MMM yyyy')}</TableCell>
                      <TableCell>{row.Funding.Name}</TableCell>
											<TableCell>{row.PrimaryLanguage}</TableCell>
											<TableCell>{row?.SecondaryLanguage || '-'}</TableCell>
											<TableCell>{format(parseISO(row.AddedDate), 'd MMM yyyy, h:mm a')}</TableCell>
										</TableRow>
									))}
							</TableBody>
						)}
					</Table>
				</TableContainer>
			</Container>
			{isOpen && (
				<AddNewClientWizard
					onClose={() => {
						dispatch(resetClientForm());
						setIsOpen(false);
					}}
				/>
			)}
		</>
	);
}

export default App;
