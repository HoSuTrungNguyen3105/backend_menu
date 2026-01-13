import { defineQueryConfig } from "./query.dto";

export const QUERY_CONFIG = {
    staff: defineQueryConfig('staff', 's', {
        allowed_sort: [
            's.id',
            's.name',
            's.email',
            's.role',
            's.status',
            's.createdAt',
            's.updatedAt',
        ],

        allowed_date_cols: ['hireDate', 'lastLoginDate', 'createdAt', 'updatedAt'],

        bool_fields: {
            isDeleted: 's.isDeleted',
            mfaEnabled: 's.mfaEnabledYn',
        },

        multi_fields: {
            role_ids: 's.role',
            department_ids: 's.department',
        },

        range_fields: {
            id: 's.id',
            salary: 's.baseSalary',
        },
    }),
    category: defineQueryConfig('category', 'cat', {
        allowed_sort: ['cat.id', 'cat.name'],
        allowed_date_cols: ['createdAt', 'updatedAt'],
    }),
} as const;
