import Country from '~/types/Country'
import { http } from '~/utils/http'

const countryApi = {
  getAllCountries: () => {
    return http.get<Country[]>('/quoc-gia')
  }
}

export default countryApi
