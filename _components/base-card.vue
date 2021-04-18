<template>
  <div
    :class="tool.deprecated ? 'deprecated' : ''"
    class="card"
  >
    <div class="card-header">
      <a v-if="tool.url" :href="tool.url" target="_blank" rel="noopener noreferrer">{{ tool.title }}</a>
      <span v-else>{{ tool.title }}</span>
      <span class="expand" @click="$emit('expandcard', tool)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          role="img"
          aria-label="Expand this card, hiding the rest. Updates URL for linking to this tool."
        >
          <path d="M16 0H9.5L12 2.5l-3 3L10.5 7l3-3L16 6.5zM16 16V9.5L13.5 12l-3-3L9 10.5l3 3L9.5 16zM0 16h6.5L4 13.5l3-3L5.5 9l-3 3L0 9.5zM0 0v6.5L2.5 4l3 3L7 5.5l-3-3L6.5 0z"/>
        </svg>
      </span>
      <span class="shrink" @click="$emit('shrinkcard')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          role="img"
          aria-label="Shrink the size of the card and show other tools. Updates URL to no longer be just for this tool."
        >
          <path d="M9 7h6.5L13 4.5l3-3L14.5 0l-3 3L9 .5zM9 9v6.5l2.5-2.5 3 3 1.5-1.5-3-3L15.5 9zM7 9H.5L3 11.5l-3 3L1.5 16l3-3L7 15.5zM7 7V.5L4.5 3l-3-3L0 1.5l3 3L.5 7z"/>
        </svg>
      </span>
    </div>

    <div class="card-body">
      <a
        v-if="tool.logo && tool.url"
        :href="tool.url" target="_blank" rel="noopener noreferrer"
      ><img
        :src="'_imgs/logos/' + tool.logo"
        :alt="tool.title + ' logo'"
        class="logo"
      /></a>
      <img
        v-else-if="tool.logo"
        :src="'_imgs/logos/' + tool.logo"
        :alt="tool.title + ' logo'"
        class="logo"
      />

      <div v-if="tool.languages.length" class="section">
        <strong>Languages:</strong> {{ tool.languages.join(', ') }}
      </div>

      <!-- Platforms/OS's -->
      <div v-if="tool.platforms && tool.platforms.length" class="section">
        <strong>Supported platforms:</strong> {{ tool.platforms.join(', ') }}
      </div>

      <!-- Pros and Cons -->
      <div v-if="tool.pros && tool.pros.length" class="section">
        <strong>Pros:</strong>
        <ul>
          <li v-for="(pro, proIndex) in tool.pros" :key="'pro' + proIndex">
            {{ pro }}
          </li>
        </ul>
      </div>
      <div v-if="tool.cons && tool.cons.length" class="section">
        <strong>Cons:</strong>
        <ul>
          <li v-for="(con, conIndex) in tool.cons" :key="'con' + conIndex">
            {{ con }}
          </li>
        </ul>
      </div>

      <!-- Notable Projects -->
      <div v-if="tool.notableTrailingLink || tool.notableProjects && tool.notableProjects.length">
        <strong>Notable Projects made with {{ tool.title }}:</strong>
        <ul>
          <li
            v-for="(notableProject, notableProjectIndex) in tool.notableProjects"
            :key="'notableProject' + notableProjectIndex"
          >
            <template v-if="notableProject.url">
              <a :href="notableProject.url" target="_blank" rel="noopener noreferrer">{{ notableProject.title }}</a>
            </template>
            <template v-else>
              {{ notableProject.title }}
            </template>
            <template v-if="notableProject.description">
              - {{ notableProject.description }}
            </template>
          </li>
          <li v-if="tool.notableTrailingLink">
            <a
              :href="'https://github.com/xpdanet/xpdanet.github.io/issues/new?title=Notable+project+made+with+' + encodeURI(tool.title) + '&body=*+**Name:**+%0A*+**URL:**+%0A*+**Description:**+'"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add a notable project made with this tool
            </a>
          </li>
        </ul>
      </div>

      <!-- Frameworks and boilerplates -->
      <div v-if="tool.frameworks && tool.frameworks.length" class="section">
        <strong>Frameworks:</strong>
        <ul>
          <li
            v-for="(framework, frameworkIndex) in tool.frameworks"
            :key="'framework' + frameworkIndex"
          >
            {{ framework.framework }} -
            <a v-if="framework.url" :href="framework.url" target="_blank" rel="noopener noreferrer">{{ framework.title }}</a>
            <span v-else>{{ framework.title }}</span>
          </li>
        </ul>
      </div>

      <!-- Tools,  build systems -->
      <div v-if="tool.tools && tool.tools.length" class="section">
        <strong>Tools:</strong>
        <ul>
          <li
            v-for="(subTool, subToolIndex) in tool.tools"
            :key="'subTool' + subToolIndex"
          >
            {{ subTool.type }} -
            <a v-if="subTool.url" :href="subTool.url" target="_blank" rel="noopener noreferrer">{{ subTool.title }}</a>
            <span v-else>{{ subTool.title }}</span>
          </li>
        </ul>
      </div>

      <!-- Tutorials -->
      <div v-if="tool.tutorials && tool.tutorials.length" class="section">
        <strong>Tutorials:</strong>
        <ul>
          <li
            v-for="(tutorial, tutorialIndex) in tool.tutorials"
            :key="'tutorial' + tutorialIndex"
          >
            <strong>{{ tutorial.site }}</strong> -
            <a v-if="tutorial.url" :href="tutorial.url" target="_blank" rel="noopener noreferrer">{{ tutorial.title }}</a>
            <span v-else>{{ tutorial.title }}</span>
            {{ ' ' }}
            <em v-if="tutorial.author">by {{ tutorial.author }}</em>
          </li>
        </ul>
      </div>

    </div> <!-- end .card-body -->
  </div> <!-- end .card -->
</template>

<script>
export default {
  name: 'base-card',
  props: {
    tool: {
      type: Object,
      required: true
    }
  }
};
</script>
