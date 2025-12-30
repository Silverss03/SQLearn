export declare namespace APIResponseCommon {
    export interface ResponseCommon<T> {
        data: T
        message: string
        success: boolean
    }

    export interface ListResponseCommon<T> {
        current_page: 1
        data: T[]
        from: string
        last_page: number
        next_page_url: any
        per_page: number
        prev_page_url: any
        to: number
        total: number
        message: string
        success: boolean
    }
}
