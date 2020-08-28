<template>
  <div class="card unreviewed">
    <div class="card-header">
      Tools that have not yet been reviewed:
    </div>

    <div class="card-body">
      <!-- Notable Projects -->
      <div>
        <strong>Here are additional tools that have not been reviewed yet, but may still be of use to those visiting XPDA.net</strong>
        <ul>
          <li
            v-for="(tool, toolIndex) in tools"
            :key="'tool' + toolIndex"
          >
            <a :href="tool.url" target="_blank" rel="noopener noreferrer">{{ tool.title }}</a>
            <template v-if="tool.description">
              - {{ tool.description }}
            </template>
          </li>
        </ul>
      </div>

    </div> <!-- end .card-body -->
  </div> <!-- end .card-unreviewed -->
</template>

<script>
module.exports = {
  name: 'unreviewed-card',
  data: function () {
    return {
      tools: [
        {
          title: 'JavaFX',
          url: 'https://openjfx.io',
          description: ''
        },
        {
          title: 'JSDB',
          url: 'http://www.jsdb.org',
          description: 'Very old. Author still answers questions in the google group. Can make executables that compress to under 1MB.'
        },
        {
          title: 'Avalonia UI',
          url: 'http://avaloniaui.net',
          description: ''
        },
        {
          title: 'DeskGap',
          url: 'http://deskgap.com',
          description: ''
        },
        {
          title: 'NodeGUI',
          url: 'https://github.com/nodegui/nodegui',
          description: 'Qt based Node.js aproach to native UI\'s, includes React framework'
        },
        {
          title: 'Flutter Desktop',
          url: 'https://github.com/flutter/flutter/wiki/Desktop-shells',
          description: 'Not ready yet'
        },
        {
          title: 'Tauri',
          url: 'https://tauri.studio',
          description: 'In alpha. Shows promise. Rust. Community around it is very excited.'
        },
        {
          title: 'Electrino',
          url: 'https://github.com/pojala/electrino',
          description: 'Similar to NeutralinoJS. Unfinished experimental project, possibly abandoned?'
        },
        {
          title: 'NodeKit',
          url: 'https://nodekit.io',
          description: ''
        },
        {
          title: 'Haxe',
          url: 'https://haxe.org/use-cases/desktop',
          description: 'Doesn\'t really fit in with the rest of the tools on this site. Needs to be partnered with wxWidgets, NW.js, or Electron. More of just a UI library I think, similar to .'
        },
        {
          title: '.NET MAUI',
          url: 'https://github.com/dotnet/maui',
          description: 'Won\'t be released until Nov 2021. Waiting for a "getting started" guide to be published.'
        }
      ]
    };
  }
};
</script>
