'use strict'

/**
 * Utility method(s) for working with strings
 */
export class StringUtil {

    static genPermalink(title: string, src: string, id: string): string {
        return title.toLowerCase()
                    .replace(":", "")   //This may need to update to url-ify-ish functionality
                    .split(" ", 9)
                    .join("-") + "-" + src + "-" + id;
    }
}