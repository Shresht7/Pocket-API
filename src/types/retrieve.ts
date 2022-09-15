import type { BasePayload } from './_auxiliary'

export interface RetrieveDetails extends BasePayload {
    /** Retrieve unread, archived or all items */
    state?: 'unread' | 'archive' | 'all'
    /** Retrieve favorite if 1 else return non-favorite items if 0 */
    favorite?: 0 | 1
    /** Return items with given tag name. Return all untagged items if _untagged_ */
    tag?: string | '_untagged_'
    /** Return only articles, video or images */
    contentType?: 'article' | 'video' | 'image'
    /** sort the results */
    sort?: 'newest' | 'oldest' | 'title' | 'site'
    /** Specify how much detail must be returned about the retrieved item */
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

export interface RetrieveResponse {
    status: 0 | 1 | 2
    complete: 0 | 1
    list: RetrieveItem[]
    error: string
    search_meta: { search_type: string }
    since: number
}

export interface RetrieveItem {
    /** A unique identifier matching the saved item. This id must be used to perform any actions through the v3/modify endpoint. */
    item_id: string
    /** A unique identifier similar to the item_id but is unique to the actual url of the saved item. The resolved_id identifies unique urls. For example a direct link to a New York Times article and a link that redirects (ex a shortened bit.ly url) to the same article will share the same resolved_id. If this value is 0, it means that Pocket has not processed the item. Normally this happens within seconds but is possible you may request the item before it has been resolved. */
    resolved_id: string
    /** The actual url that was saved with the item. This url should be used if the user wants to view the item. */
    given_url: string
    /** The final url of the item. For example if the item was a shortened bit.ly link, this will be the actual article the url linked to. */
    resolved_url: string
    /** The title that was saved along with the item. */
    given_title: string
    /** The title that Pocket found for the item when it was parsed */
    resolved_title: string
    /** 0 or 1 - 1 If the item is favorite */
    favorite: string
    /** 0, 1, 2 - 1 if the item is archived - 2 if the item should be deleted */
    status: string
    /** The first few lines of the item (articles only) */
    excerpt: string
    /** 0 or 1 - 1 if the item is an article */
    is_article: string
    /** 0, 1, or 2 - 1 if the item has images in it - 2 if the item is an image */
    has_image: string
    /** 0, 1, or 2 - 1 if the item has videos in it - 2 if the item is a video */
    has_video: string
    /** How many words are in the article */
    word_count: string
    /** A JSON object of the user tags associated with the item */
    tags: string
    /** A JSON object listing all of the authors associated with the item */
    authors: string
    /** A JSON object listing all of the images associated with the item */
    images: string
    /** A JSON object listing all of the videos associated with the item */
    videos: string
    /** Timestamp of when the resource was added */
    time_added: string
    /** Timestamp of when the resource was last updated */
    time_updated: string
    /** Timestamp of when the resource was last read */
    time_read: string
    /** Timestamp of when the resource was favorited */
    time_favorited: string
    /** Sorting ID number */
    sort_id: number
    is_index: string
    /** Language */
    lang: string | 'en'
    /** Estimated listening time in seconds */
    listen_duration_estimate: number
    /** Estimated reading time in seconds */
    time_to_read: number
    /** Image URL */
    top_image_url: string
}

