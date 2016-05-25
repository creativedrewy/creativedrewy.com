'use strict'

/**
 * Utility method(s) for working with date stuff
 */
export class DateUtil {
    
    /**
     * Convert the blogger publish date to a readable string
     */
    static bloggerDateReadable(sourceDate: string):string {
        var dateSubstring:string = sourceDate.substring(0, sourceDate.indexOf("T"));
        var dateParts:string[] = dateSubstring.split('-');
        
        return dateParts[1] + '\/' + dateParts[2] + '\/' +  dateParts[0];
    }
    
}