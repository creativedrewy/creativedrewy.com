'use strict'

var urlify = require('urlify').create({
  toLower: true,
  spaces: " ",
  nonPrintable: "",
  trim:true
});

/**
 * Utility method(s) for working with strings
 */
export class StringUtil {
    
    /**
     * Generate the accepted permalink format
     */
    static genPermalink(title: string, src: string, id: string): string {
        return urlify(title)
                .split(" ", 9)
                .join("-") + "-" + src + "-" + id;
    }
}