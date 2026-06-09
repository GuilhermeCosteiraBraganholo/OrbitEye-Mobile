const fallbackBaseUrl = 'http://10.0.2.2:8080';

export const env = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? fallbackBaseUrl,
  commitHash: process.env.EXPO_PUBLIC_COMMIT_HASH ?? 'DEV-COMMIT-HASH',
};
