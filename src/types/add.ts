import type { BasePayload } from './_auxiliary'

export interface AddDetails extends BasePayload {
    /** The URL of the item you want to save */
    url: string
    /**
     * Title of the item. This can be included for cases where the item does not have a title,
     * which is typical for image or PDF URLs. If Pocket detects a title from the contents of 
     * the page, this parameter will be ignored
     */
    title?: string
    /** A comma separated list of tags to apply to the item */
    tags?: string
    /**
     * If you are adding Pocket support to a Twitter client, please send along a reference to
     * the tweet status id. This allows pocket to show the original tweet alongside the article.
     */
    tweet_id?: string
}

export interface AddResponse {
    item: {
        /** A unique identifier for the added item */
        item_id: string
        /** The original url for the added item */
        normal_url: string
        /** A unique identifier for the resolved item */
        resolved_id: string
        /** The resolved url for the added item. The easiest way to think about the resolved_url - if you add a bit.ly link, the resolved_url will be the url of the page the bit.ly link points to */
        resolved_url: string
        /** A unique identifier for the domain of the resolved_url */
        domain_id: string
        /** A unique identifier for the domain of the normal_url */
        origin_domain_id: string
        /** The response code received by the Pocket parser when it tried to access the item */
        response_code: string
        /** The MIME type returned by the item */
        mime_type: string
        /** The content length of the item */
        content_length: string
        /** The encoding of the item */
        encoding: string
        /** The date the item was resolved */
        date_resolved: string
        /** The date the item was published (if the parser was able to find one) */
        date_published: string
        /** The title of the resolved_url */
        title: string
        /** The excerpt of the resolved_url */
        excerpt: string
        /** For an article, the number of words */
        word_count: string
        /** 0: no image; 1: has an image in the body of the article; 2: is an image */
        has_image: string
        /** 0: no video; 1: has a video in the body of the article; 2: is a video */
        has_video: string
        /** 0 or 1; If the parser thinks this item is an index page it will be set to 1 */
        is_index: string
        /** 0 or 1; If the parser thinks this item is an article it will be set to 1 */
        is_article: string
        /** Array of author data (if author(s) were found) */
        authors: any[]
        /** Array of image data (if image(s) were found) */
        images: any[]
        /** Array of video data (if video(s) were found) */
        videos: any[]
    },
    status: 0 | 1
}
