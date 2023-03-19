
let startMovies = [257091, 370172, 762, 315635, 597, 546554, 37799, 346364, 157336]

export default async function handler(req, res) {
  if(req.method === "GET"){
    let data = []
    for(let i = 0; i < startMovies.length; i++){
        const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASEURL}/movie/${startMovies[i]}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&append_to_response=videos,release_dates,credits,keywords,watch/providers`)
        const result = await response.json()
        data.push(result)

    }
    console.log('data is', data)
    return res.status(200).json(data)
  }
}