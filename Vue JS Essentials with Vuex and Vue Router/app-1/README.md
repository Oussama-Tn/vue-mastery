## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Course



* Interpolated values in templates can have simple Javascript expressions.
  ```javascript
  {{ myStringVar.split('').reverse().join('') }}
  ```
* Lesson 27: Vuejs app structure
* Lesson 31: Recreate a view app (src/mains.js and src/App.vue)
* Lesson 32:
  ```javascript
  export default {
    name: 'App'
  };
  ```
  * It's a good practice to name your component using `name`. This would be helpful when using some debug tools!

* Lesson 33:
  * import `App.vue` inside our `main.js`
  ```javascript
  import Vue from 'vue';
  import App from './App';

  new Vue({
    render: function (createElement) {
      return createElement(App);
    }
  });
  ```
  * This how it looks when creating new app using VueCli
  ```javascript
  new Vue({
    render: h => h(App)
  })
  ```

* Lesson 36:
  * Wire components using this syntax `components: { SearchBar, OtherComponent, CoolComponent }`
  ```javascript
  import SearchBar from "@/components/SearchBar.vue";

  export default {
    name: "App",
    components: {
      SearchBar
    }
  }
  ```

* Lesson 37:
  ```javascript
  `<input @input="onInput" />`
  onInput(event) {
    console.log(event.target.value);
  }
  ```

* Lesson 40: How components communicate:
  * Child -----(event)----> Parent
  * Parent ----(props)----> Child

* Lesson 48:
  * Inside a view instance, `data` can be an object or function
  * Inside a view component, `data` must be a function that returns an object

* Lesson 50:
  * Parent:
  ```vue
  <template>
    <div>
        <SearchBar @termChange="onTermChange" />
        <VideoList :videos="videos"/>
    </div>
  </template>
  ```
    * This `<VideoList :videos="videos"/>` is the same as `<VideoList v-bind:videos="videos"/>`

  * Child:
  ```javascript
  <template>
    <div>
      <h2>Video List</h2>
      <ul v-if="videos">
        <li v-for="video in videos" :key="video.key">{{ video.snippet.title }}</li>
      </ul>
    </div>
  </template>
  <script>
  export default {
    name: "VideoList",
    props: [
      'videos'
    ]
  }
  </script>
  ```

* Lesson 55:
  * Adding a `:key` to `v-for` will enhance the performance of our app.
  ```javascript
    `<VideoListItem v-for="video in videos" :key="video.etag" :video="video" />`
  ```

* Lesson 57:
  * Add `css` that affects only the containing component. Just add `scoped` to `style` tag.
  ```html
  <style scoped>
  // ...
  </style>
  ```

* Lesson 60: Computed properties: Example `thumbnailUrl`
  ```javascript
  <template>
    <li class="list-group-item">
      <img :src="thumbnailUrl" alt="video.snippet.title" />
      {{ video.snippet.title }}
    </li>
  </template>
  <script>
  export default {
    name: "VideoListItem",
    props: ['video'],
    computed: {
      thumbnailUrl() {
        return this.video.snippet.thumbnails.default.url;
      }
    }
  }
  </script>
  ```
