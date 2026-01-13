import { Prisma } from '@prisma/client';

export type UncapitalizedModelName = Uncapitalize<Prisma.ModelName>;

export type ModelScalarFields<M extends UncapitalizedModelName> =
    keyof Prisma.TypeMap['model'][Capitalize<M> extends Prisma.ModelName ? Capitalize<M> : never]['payload']['scalars'] & string;

export type QueryConfig<M extends UncapitalizedModelName, A extends string = string> = {
    model: M;
    alias: A;
    joins?: {
        alias: string;
        relation: string;
    }[];
    allowed_sort: (`${A}.${ModelScalarFields<M>}` | string)[];
    allowed_date_cols?: ModelScalarFields<M>[];
    bool_fields?: Record<string, string>;
    multi_fields?: Record<string, string>;
    range_fields?: Record<string, string>;
};

export function defineQueryConfig<M extends UncapitalizedModelName, A extends string>(
    model: M,
    alias: A,
    config: Omit<QueryConfig<M, A>, 'model' | 'alias'>
): QueryConfig<M, A> {
    return { model, alias, ...config } as QueryConfig<M, A>;
}

export class ListQueryDto {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_dir?: 'asc' | 'desc';
    from_date?: string;
    to_date?: string;
    [key: string]: string | number | string[] | undefined;
}

export interface PrismaListQuery {
    where: Record<string, unknown>;
    orderBy: Record<string, 'asc' | 'desc'>[];
    skip: number;
    take: number;
    page: number;
    limit: number;
}
