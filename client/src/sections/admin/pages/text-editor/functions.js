/*
Documentation

we need to build a deserialize function for the date coming out of the database

*/




import Axios from 'axios';


/*
Documentation

Return all article categories

*/
export function getAllCategories () {


    return new Promise(async function(resolve, reject) {


        try {
            let categories = await Axios({
              method:'get',
              url:'/api/article_categories_names/get/all',
            })
  
            categories = categories.data
            resolve({success: true, categories})
          
        } catch(e) {
          
            console.log('Error ', e)
            resolve({success: false, message: e})

        }
        
    });
      
}


/*
Documentation

values is every value needed to create or update an article

if values._id is empty we will try to create an article, if not we update the corresponding article/

*/

export function createOrUpdate (values) {

    return new Promise(async function(resolve, reject) {
        
        const _id = values._id;

        //we have an id so we are updating an article
        if(_id) {

            try {
                const updated = await Axios({
                    method:'post',
                    url:'/api/articles/update/' + _id,
                    data: {
                        ...values,
                        updated_at: Math.floor(Date.now() / 1000)

                    }
              })

              resolve({success: true, article: updated.data})
            
            } catch(e) {
            
                resolve({success: false, message: e})
            
            }

        } else {

            //delete id as its blank
            delete values._id

            try {
                const created = await Axios({
                    method:'post',
                    url:'/api/articles/create/',
                    data: {
                        ...values,
                        updated_at: Math.floor(Date.now() / 1000),
                        created_at:  Math.floor(Date.now() / 1000)
                    }
              })

              resolve({success: true, article: created.data})
            
            } catch(e) {
            
                resolve({success: false, message: e})
            
            }

        }

    });
      
}


/*
Documentation

this function takes an array of category names and the article id to add to

it starts by deleting all associated categories and then looking through the 
categoryArray argument to add each category to the categories collection

*/
export function updateArticleCategories (categoryArray, article_id) {

    return new Promise(async function(resolve, reject) {
        
         //delete all categories
        try {
            await Axios({
                method:'post',
                url:'/api/v1/articles_categories/delete/' + article_id,
            
            })
            
        } catch(e) {
        
            console.log('Error ', e)
            resolve({success: false, message: e})
            return;
        }
    
    
        if(categoryArray.length) {
    
            //for every category add to database
            categoryArray.forEach((cat) => {
    
                try {
                    Axios({
                        method:'post',
                        url:'/api/article_categories/create',
                        data: {
                        name: cat,
                        article_id
                        }
                    })

                    
                
                } catch(e) {
                    
                    console.log('Error ', e)
                    resolve({success: false, message: e})
                    return;
                
                }
    
            })
    
        } 

        resolve({success: true})
        
    });
      
}


/*
Documentation

This function creates a new article category

*/
export function addArticleCategory (category) {

    return new Promise(async function(resolve, reject) {
        
         //delete all categories
        try {
            const result = await Axios({
                method:'post',
                url:'/api/article_categories_names/create/',
                data: {
                    ...category
                }
            
            })

            resolve({success: true, category: result.data});
            return;
            
        } catch(e) {
        
            console.log('Error ', e)
            resolve({success: false, message: e})
            return;
        }
    

       
        
    });
      
}

/*
Documentation

this function deletes an article_caegory_name and article_cateogyr

*/

export function deleteArticleCategory (name) {

    return new Promise(async function(resolve, reject) {
        
         //delete all categories
        try {
            await Axios({
                method:'post',
                url:'/api/v1/article_categories/delete/' + name,
            })

            resolve({success: true});
            return;
            
        } catch(e) {
        
            console.log('Error ', e)
            resolve({success: false, message: e})
            return;
        }
    

       
        
    });
      
}