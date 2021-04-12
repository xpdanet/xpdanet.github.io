<template>
  <div class="news">
    <h2>XPDA News: ({{ formatDate(story.date) }})</h2>
    <h3><a :href="story.url" target="_blank" rel="nofollow">{{ story.headline }}</a></h3>
    <p><strong>Summary:</strong> <span v-html="story.summary"></span> (<a :href="story.url" target="_blank" rel="nofollow">Read more</a>)</p>
    <div class="news-controls">
      «
      <span :class="{ 'news-link': !latestStory }" @click="nextStory">Next Story</span>
      |
      <span :class="{ 'news-link': !oldestStory }" @click="previousStory">Previous story</span>
      »
    </div>
  </div>
</template>

<script>
export default {
  name: 'news-alerts',
  data: function () {
    return {
      currentStory: 0,
      stories: [
        {
          date: '2020-08-26T19:39:17.000Z',
          headline: 'Electron drops ESM support',
          summary: 'Electron has stated that it will be dropping support for JavaScript\'s modern, native, import/export. The popular <code>import module from \'./module.js\'</code> pattern will be removed from Electron.',
          url: 'https://github.com/electron/electron/issues/21457#issuecomment-647728163'
        },
        {
          date: '2020-02-28T00:01:38.000Z',
          headline: 'Carlo no longer maintained',
          summary: 'The Google Chrome Lab experimental project, Carlo, will no longer be maintained. A similar project, inspired by Carlo, called Lorca is still maintained.',
          url: 'https://github.com/GoogleChromeLabs/carlo'
        },
        {
          date: '2019-11-13T14:00:00.000Z',
          headline: 'Big news for NW.js',
          summary: 'The NW NewWin (NW2) refactor is no longer behind a flag, it is now the default in v0.42.4! This will allow for many new features and access to aspects of the Chromium browser in your own apps that was previously not possible. More details at the blog post.',
          url: 'https://nwjs.io/blog/nw2-mode/'
        },
        {
          date: '2019-11-09T00:02:00.000Z',
          headline: 'Apple blocking Electron',
          summary: '(UPDATED) Electron 8.0.2 and 9.0.0-beta3 was released on 2020-02-25, and apps report being let through again. Previously, dozens of Electron apps reported being blocked by Apple\'s App Store due to the Electron framework using private APIs, with mixed reports of Apple letting some apps through anyway.',
          url: 'https://github.com/electron/electron/issues/20027#issuecomment-591458648'
        }
      ]
    };
  },
  methods: {
    nextStory: function () {
      if (!this.latestStory) {
        this.currentStory = this.currentStory - 1;
      }
    },
    previousStory: function () {
      if (!this.oldestStory) {
        this.currentStory = this.currentStory + 1;
      }
    },
    formatDate: function (value) {
      return (new Date(value)).toLocaleDateString();
    }
  },
  computed: {
    story: function () {
      return this.stories[this.currentStory];
    },
    latestStory: function () {
      return this.currentStory === 0;
    },
    oldestStory: function () {
      return this.currentStory === (this.stories.length - 1);
    }
  }
};
</script>
