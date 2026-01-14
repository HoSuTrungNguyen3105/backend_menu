export interface PaginationMeta {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    keyword?: string;
    sort_by?: string;
    sort_dir?: string;
    date_col?: string;
    from_date?: string;
    to_date?: string;
}

export interface ApiResponse<T = any> {
    status: boolean;
    code: number;
    msg: string;
    data?: T;
    pagination?: PaginationMeta;
    // Top-level pagination fields as requested
    current_page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
    keyword?: string;
    sort_by?: string;
    sort_dir?: string;
    date_col?: string;
    from_date?: string;
    to_date?: string;
    save_result?: any;
}

export const sendResponse = <T>(
    statusCode: number,
    options: Omit<ApiResponse<T>, 'status' | 'code'>
): ApiResponse<T> => {
    return {
        status: statusCode < 400,
        code: statusCode,
        ...options,
    };
};
