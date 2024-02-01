export const  recursiveSearch = (value: any, match_key: string, ignore_keys?: string[]): any => {
    if(!value) return;
    
    let result_matched: any =  undefined;

    const result = Object.entries(value).find(([key, value], index) => {
      if(ignore_keys?.includes(key)) return false;

      if(key === match_key) return true;

      if(typeof value === 'object'){
        const matched = recursiveSearch(value, match_key, ignore_keys);
        if(matched){
          result_matched = matched;
          return true;
        }
      }

      return false;
    });

    if(result_matched) return result_matched;

    if(!result) return undefined;

    return result[1];
  }