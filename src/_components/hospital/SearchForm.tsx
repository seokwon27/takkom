import { getHospitals } from '@/utils/hospital/server-action'

const SearchForm = async () => {
  const params  = {
    pageNo: '1',
    numOfRows: '2',
    brtcCd: '1100000000',
    sggCd: '11680',
  }
  const brtcArray = await getHospitals(params)
  console.log(brtcArray)

  return (
    <div>SearchForm</div>
  )
}

export default SearchForm

