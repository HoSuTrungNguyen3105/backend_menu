export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    meta?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const sendResponse = <T>(
    statusCode: number,
    options: Omit<ApiResponse<T>, 'success'>
): ApiResponse<T> => {
    return {
        success: statusCode < 400,
        ...options,
    };
};