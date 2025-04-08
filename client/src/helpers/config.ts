export const ENV = import.meta.env.MODE;

export const isProduction = ENV === 'production';
export const isDevelopment = ENV === 'development';
export const isStaging = ENV === 'staging';

export const API_END_POINT = import.meta.env.VITE_API_URL;
