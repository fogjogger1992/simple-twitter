import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow (datetime) {
      return datetime ? moment.utc(datetime, "YYYY-MM-DD, h:mm:ss a").local().calendar() : '-'
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://via.placeholder.com/800x800/FF6602/FFFFFF?text=No+Image'
    }
  }
}