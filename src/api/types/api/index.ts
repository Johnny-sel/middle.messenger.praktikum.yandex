export interface API {
  baseUrl: string;
  headers: Record<string, string>;
  get: (url: string, data?: unknown) => Promise<any>;
  post: (url: string, data?: unknown) => Promise<any>;
  put: (url: string, data?: unknown) => Promise<any>;
  delete: (url: string, data?: unknown) => Promise<any>;
}
