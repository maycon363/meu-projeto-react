const getPosterPath = (path) => {
    if (!path) {
      return 'https://via.placeholder.com/500x750?text=Sem+Imagem'
    }
    return `https://image.tmdb.org/t/p/w500${path}`
  }
  
  export default getPosterPath
  