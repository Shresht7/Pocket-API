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

interface BasicAction<T extends keyof ModifyAction> {
    /** The kind of operation to perform */
    action: T
    /** The id of the item to perform the action on */
    item_id: number
    /** The time the action occurred */
    time?: number
}

export interface ModifyAction {

    /** Add a new item to the user's list */
    add: {
        /** A Twitter status id; this is used to show tweet attribution */
        ref_id?: number
        /** A comma delimited list of one or more tags */
        tags?: string
        /** The title of the item */
        title?: string
        /** The url of the item. provide this if only you do not have an item_id */
        url?: string
    } & BasicAction<'add'>

    /** Move an item to the user's archive */
    archive: BasicAction<'archive'>

    /** Move an item from the user's archive back to their unread list */
    readd: BasicAction<'readd'>

    /** Mark an item as favorite */
    favorite: BasicAction<'favorite'>

    /** Remove an item from the user's favorites */
    unfavorite: BasicAction<'unfavorite'>

    /** Permanently remove an item from the user's account */
    delete: BasicAction<'delete'>

    /** Add one or more tags to an item */
    tags_add: {
        /** A comma delimited list of one or more tags */
        tags?: string
    } & BasicAction<'tags_add'>

    /** Remove one or more tags from the item */
    tags_remove: {
        /** A comma delimited list of one or more tags */
        tags?: string
    } & BasicAction<'tags_remove'>

    /** Replace all of the tags for an item with one or more provided tags */
    tags_replace: {
        /** A comma delimited list of one or more tags */
        tags?: string
    } & BasicAction<'tags_replace'>

    /** Remove all tags from an item */
    tags_clear: BasicAction<'tags_clear'>

    /** Rename a tag. This affects all items with this tag */
    tag_rename: {
        /** The tag name that will be replaced */
        old_tag: string
        /** The new tag name that will be added */
        new_tag: string
    } & Omit<BasicAction<'tag_rename'>, 'item_id'>

    /** Delete a tag. This affects all items with this tag */
    tag_delete: {
        /** The tag name that will be deleted */
        tag: string
    } & Omit<BasicAction<'tag_delete'>, 'item_id'>

}

