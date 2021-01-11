import Axios from 'axios';


export default async (userId) => {
    const modules = await Axios({
        method:'get',
        url:'/api/v1/modules/get/' + userId,       
      })

      return modules.data

}