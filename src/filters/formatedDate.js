const formatedDate = {}

function formatDate(timestamp) {
  let days = timestamp.toDate().getDate()
  let month = timestamp.toDate().getMonth()
  let year = timestamp.toDate().getFullYear()
  return `${days}/${month}/${year}`
}

formatedDate.install = function(Vue) {
  Vue.filter('formatedDate', val => {
    return formatDate(val)
  })
}

export default formatedDate
