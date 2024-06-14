import Category from '~/types/Category'
import { http } from '~/utils/http'

const categoryApi = {
  getAllCategories: () => {
    return http.get<Category[]>('/the-loai')
  }
}

export default categoryApi
