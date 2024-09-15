import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ClientFormSliceState } from '../forms/clientFormSlice';
import { IFundingListResponse } from '../funding/fundingApiSlice';

export interface IClientListResponse {
	Id: number;
	Name: string;
	DOB: string;
	PrimaryLanguage: string;
	SecondaryLanguage?: string;
	AddedDate: string;
	fundingSourceId: number;
	Funding: IFundingListResponse;
}

export const clientdsApiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
	reducerPath: 'clientsApi',
	// Tag types are used for caching and invalidation.
	tagTypes: ['Clients'],
	endpoints: (build) => ({
		getClients: build.query<IClientListResponse[], string | undefined>({
			query: () => `/clients`,
			providesTags: ['Clients'],
		}),
		addNewClient: build.mutation<IClientListResponse, ClientFormSliceState>({
			query: (initialPost) => ({
				url: '/clients',
				method: 'POST',
				body: initialPost,
			}),
			invalidatesTags: ['Clients'],
		}),
	}),
});

export const { useGetClientsQuery, useAddNewClientMutation } = clientdsApiSlice;
