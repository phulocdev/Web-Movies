export default interface FilmFiltered {
  modified: {
    time: string
  }
  _id: string
  name: string
  slug: string
  origin_name: string
  type: string
  poster_url: string
  thumb_url: string
  sub_docquyen: boolean
  chieurap: boolean
  time: string
  episode_current: string
  quality: string
  lang: string
  year: number
  category: {
    id: string
    name: string
    slug: string
  }[]
  country: {
    id: string
    name: string
    slug: string
  }[]
}

export interface ParamsFilmFilterd {
  limit: number
}

// const b = {
//   modified: {
//     time: '2024-06-12T16:45:48.000Z'
//   },
//   _id: '8eb3926a025bb86899f452f3dd675f04',
//   name: 'Gia Đạo Trung Nhị',
//   slug: 'gia-dao-trung-nhi',
//   origin_name: '家道中二',
//   type: 'hoathinh',
//   poster_url: 'upload/vod/20240522-1/2fed507c6e707c0b332d87405b070f47.jpg',
//   thumb_url: 'upload/vod/20240522-1/8f72503e2f9a91c42d776c415589e88c.jpg',
//   sub_docquyen: false,
//   chieurap: false,
//   time: '7 phút/tập',
//   episode_current: 'Tập 22',
//   quality: 'FHD',
//   lang: 'Vietsub',
//   year: 2024,
//   category: [
//     {
//       id: 'd72b9939ba77f7d6d1ce88673bd1f18f',
//       name: 'Hài Hước',
//       slug: 'hai-huoc'
//     }
//   ],
//   country: [
//     {
//       id: '92aa3c93de523a414a520399bb6a4304',
//       name: 'Trung Quốc',
//       slug: 'trung-quoc'
//     }
//   ]
// }
