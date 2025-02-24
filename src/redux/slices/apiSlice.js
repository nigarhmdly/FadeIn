
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API konfiqurasiyası (Backend URL-iniz ilə uyğunlaşdırın)
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',  // Backend URL
    credentials: 'include',  // Cookie ilə tokeni göndərmək üçün
  }),
  endpoints: () => ({}),  // Dinamik olaraq endpoint-ləri buradan daxil edəcəyik
});

export default apiSlice;
