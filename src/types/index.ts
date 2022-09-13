//  ================
//  TYPE DEFINITIONS
//  ================

export interface AddDetails {
    title?: string
    tags?: string
    tweet_id?: string
}

export interface RetrieveDetails {
    state?: 'unread' | 'archive' | 'all'
    favorite?: 0 | 1
    tag?: string | '_untagged_'
    contentType?: 'article' | 'video' | 'image'
    sort?: 'newest' | 'oldest' | 'title' | 'site'
    detailType?: 'simple' | 'complete'
    /** Only returns items whose title or url contains the search string */
    search?: string
    /** Only return items from a particular domain */
    domain?: string
    /** Only return items modified since the given unix timestamp */
    since?: number
    /** Only return count number of items */
    count?: number
    /** Only used with count; start returning from offset position of results */
    offset?: number
}
