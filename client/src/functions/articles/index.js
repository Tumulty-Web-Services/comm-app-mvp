import Axios from 'axios';
import {createSystemLog} from '../db-helpers/system-logs';

export function incrementArticleViews(_id, viewsToSet) {
    try {
        Axios({
            method:'post',
            url:'/api/articles/update/' + _id,
            data: {
            views: viewsToSet
            }
        })
    
    } catch(e) {
    
      console.log('Error ', e)
      createSystemLog("an error was thrown updating an articles views: " + e, 0, 0)
    }
}