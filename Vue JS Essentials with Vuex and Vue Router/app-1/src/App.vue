<template>
  <div class="container">
      <SearchBar @termChange="onTermChange" />
      <VideoDetail :video="selectedVideo" />
      <VideoList :videos="videos" @videoSelect="onVideoSelect" />
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "@/components/SearchBar";
import VideoList from "@/components/VideoList";
import VideoDetail from "@/components/VideoDetail";
const API_KEY="PutYourKeyHere...ThankYou";

export default {
  name: "App",
  components: {
    SearchBar,
    VideoList,
    VideoDetail
  },
  data() {
    return {
      videos: [],
      selectedVideo: null
    }
  },
  methods: {
    onTermChange(searchTerm) {
      //const GOOGLE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
      const GOOGLE_API_URL = 'http://localhost:3000/videos';
      axios.get(GOOGLE_API_URL, {
        params: {
          key: API_KEY,
          type: 'video',
          part: 'snippet',
          q: searchTerm
        }
      })
      .then(response => {
        this.videos = response.data.items;
      });
    },
    onVideoSelect(video) {
        this.selectedVideo = video;
    }
  }
}
</script>
