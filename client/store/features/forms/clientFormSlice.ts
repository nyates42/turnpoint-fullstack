import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../createAppSlice';

export interface IClientDetails {
	fullName: string;
	dob: string;
}

export interface IClientLanguageDetails {
	primaryLanguage: string;
	secondaryLanguage: string;
}

export interface IFundingDetails {
	fundingID: number;
}

export interface ClientFormSliceState extends IClientDetails, IClientLanguageDetails, IFundingDetails {
	activeStep: number;
}

const initialState: ClientFormSliceState = {
	activeStep: 0,
	fullName: '',
	dob: '',
	primaryLanguage: '',
	secondaryLanguage: '',
	fundingID: 0,
};

export const clientFormSlice = createAppSlice({
	name: 'clientForm',
	initialState,
	reducers: (create) => ({
		setActiveStep: create.reducer((state, action: PayloadAction<number>) => {
			state.activeStep = action.payload;
		}),
		setClientDetails: create.reducer((state, action: PayloadAction<IClientDetails>) => {
			return {
				...state,
				...action.payload,
			};
		}),
		setClientLanguage: create.reducer((state, action: PayloadAction<IClientLanguageDetails>) => {
			return {
				...state,
				...action.payload,
			};
		}),
		resetClientForm: create.reducer(() => {
			return initialState;
		}),
	}),
	selectors: {
		selectActiveStep: (clientForm) => clientForm.activeStep,
		selectClientForm: (clientForm) => clientForm,
	},
});

export const { setActiveStep, setClientDetails, setClientLanguage, resetClientForm } = clientFormSlice.actions;
export const { selectActiveStep, selectClientForm } = clientFormSlice.selectors;
