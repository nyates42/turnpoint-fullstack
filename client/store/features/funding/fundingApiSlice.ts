import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IFundingListResponse {
	Id: number;
	Name: string;
	AddedDate: string;
}

export const fundingApiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
	reducerPath: 'fundingApi',
	// Tag types are used for caching and invalidation.
	tagTypes: ['Funding'],
	endpoints: (build) => ({
		getFundingSource: build.query<IFundingListResponse[], void>({
			query: () => '/funding',
			providesTags: ['Funding'],
		}),
	}),
});

export const { useGetFundingSourceQuery } = fundingApiSlice;
