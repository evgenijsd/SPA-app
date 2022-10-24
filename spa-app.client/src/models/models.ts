export interface IMessage {
    id: string
    messageId: string
    layer: number
    name: string
    email: string
    homePage?: string
    text: string
    created: Date
    loadFile?: string
    token: string
}

export enum ESortingMessagesType {
    None,
    ByName,
    ByEmail,
    ByDate,    
}

export interface ServerResponse<T> {
    currentPage: number
    totalPages: number
    pageSize: number
    totalCount: number

    hasPrevious: boolean
    hasNext: boolean

    result: T[]
  }

export const ITEMS_PER_PAGE = 25
export const PAGE_DEFAULT = 1