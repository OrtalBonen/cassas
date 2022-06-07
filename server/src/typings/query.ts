import { Request } from 'express'

export type ReqDictionary = {}
export type ReqQuery = {
    departmentId: number | undefined
    categoryId: number | undefined,
    searchWord: string,
    offset: number,
    rowCount: number
}

export type SomeHandlerRequest = Request<ReqDictionary, ReqQuery>
