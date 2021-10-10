import { gql, GraphQLClient } from 'graphql-request'
import Section from "../components/Section";
import NavBar from "../components/NavBar";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : process.env.GRAPH_CMS_TOKEN
    }
  })

  const videosQuery = gql`
  query {
    videos {
      createdAt,
      id,
      title,
      description,
      seen,
      slug,
      tags,
      thumbnail {
        url
      },
      mp4 {
        url
      }
    }
  }
  `

  const accountQuery = gql`
  query {
    userProfile(where: { id: "ckuk5wkdkr4350c71ojla0bcx"}) {
      username
      avatar {
        url
      }
    }
  }
  `

  const data = await graphQLClient.request(videosQuery)
  const videos = data.videos
  const accountData = await graphQLClient.request(accountQuery)
  const account = accountData.userProfile

  return {
    props: {
      videos,
      account
    }
  }
}


const Home =  ({ videos, account }) => {

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  //Filter videos by genre
  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  //Generate recommended videos
  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen ==  false || video.seen == null)
  }

  return (
    <>
      <NavBar account = {account}/>
      <div className = "app">
        <div className = "main-video">
          <img src = {randomVideo(videos).thumbnail.url}
          alt={randomVideo(videos).title}/>
        </div>

        <div className = "video-feed">
          <Section genre={'Recommended for you'} videos = {unSeenVideos(videos)}/>
          <Section genre={'Drama'} videos = {filterVideos(videos, 'Drama')}/>
          <Section genre={'TV Series'} videos = {filterVideos(videos, 'Series')}/>
          <Section genre={'Gritty'} videos = {filterVideos(videos, 'Gritty')}/>
          <Section genre={'Dark'} videos = {filterVideos(videos, 'Dark')}/>
        </div>

      </div>



    </>
  )
}

export default Home