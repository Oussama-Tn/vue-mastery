<template>
  <div>
    <h2>Video List</h2>
    <ul v-if="videos" class="list-group">
      <VideoListItem
      v-for="video in videos"
      :key="video.etag"
      :video="video"
      @videoSelect="onVideoSelect"
      />
    </ul>
  </div>
</template>
<script>
import VideoListItem from '@/components/VideoListItem';

export default {
  components: {
    VideoListItem
  },
  name: "VideoList",
  props: {
    videos: Array
  },
  methods: {
    onVideoSelect(video) {
      this.$emit('videoSelect', video);
    }
  }
}
</script>
