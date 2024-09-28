<template>
  <div id="unreviewed" class="card unreviewed">
    <div class="card-header">
      Tools that have not yet been reviewed:
    </div>

    <div class="card-body">
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
  </div> <!-- end .card -->
</template>

<script>
export default {
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
          description: 'Doesn\'t really fit in with the rest of the tools on this site. Needs to be partnered with wxWidgets, NW.js, or Electron. More of just a UI library I think, similar to Quasar.'
        },
        {
          title: '.NET MAUI',
          url: 'https://github.com/dotnet/maui',
          description: 'Won\'t be released until Nov 2021. Waiting for a "getting started" guide to be published.'
        },
        {
          title: 'UNO Platform',
          url: 'https://platform.uno',
          description: 'C#/.NET. Bring UWP and WinUI to other platforms. Windows, OSX, iOS, Android, "Web" (via big chonky WASM). New. Linux support is experimental.'
        },
        {
          title: 'Fyne',
          url: 'https://fyne.io',
          description: 'Uses the Go programming language to produce cross-platform Mobile and Desktop apps (iOS, Android, Windows, OSX, Linux) without the use of an embedded browser.'
        },
        {
          title: 'Socket',
          url: 'https://socketsupply.co/guides',
          description: 'Looks very promising. Too early to review at time of writing.'
        },
        {
          title: 'Did we miss any?',
          url: 'https://github.com/xpdanet/xpdanet.github.io/issues',
          description: 'If there are any XPDA tools not included on this site, let us know on the GitHub issues.'
        }
      ]
    };
  }
};
</script>
