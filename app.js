// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  data: {
    tools: [
      {
        title: 'NW.js',
        url: 'https://nwjs.io',
        deprecated: false,
        languages: [
          'HTML',
          'CSS',
          'JS',
          'Node.js'
        ],
        platforms: [
          'Windows',
          'Linux',
          'OSX'
        ],
        pros: [
          'Very wide OS support (about twice as many OS\'s as Electron)',
          'Legacy OS support to OSX 10.6 and XP (via NW.js 0.14.7 LTS)',
          'Actually cares about proper Linux support',
          'Allows for protected source code (important for proprietary/closed source code)',
          'Backed by Intel',
          'Updated within 24 hours of a Chromium or Node release',
          'Still a resource hog, but uses less RAM and disk space than Electron',
          'Distribution sizes can be as small as 25MB (Windows Installer)',
          'Been around 5 years longer/used by thousands of projects',
          'Assumes you want to create a desktop app, and not a node script with an optional UI.',
          'Super easy to get started with and a no-nonsense API',
          'Can use node_modules',
          'Has Vue, React, Etc. boilerplates available',
          'Plays nicely with Gulp, Webpack, etc.',
          'Ability to share code across Mobile/Web/Desktop if project is setup correctly'
        ],
        cons: [
          'Terrible Name/Branding/Marketing',
          'Small-Medium ecosystem',
          'Basically one person behind most of the code',
          'Everything you need from the documentation is available, but the site is clunky'
        ],
        frameworks: [],
        tools: []
      },
      {
        title: 'Electron',
        url: 'https://electronjs.org',
        deprecated: false,
        languages: [
          'HTML',
          'CSS',
          'JS',
          'Node.js'
        ],
        platforms: [
          'Windows',
          'Linux',
          'OSX'
        ],
        pros: [
          'Great name/marketing/branding',
          'Big ecosystem',
          'Good documentation',
          'Used by a few big name projects',
          'Backed by GitHub',
          'Can use node_modules',
          'Has Vue, React, Etc. boilerplates available',
          'Plays nicely with Gulp, Webpack, etc.',
          'Ability to share code across Mobile/Web/Desktop if project setup correctly'
        ],
        cons: [
          'Basically one person behind most of the code',
          'Doesn\'t take Linux support seriously',
          'Does not support any legacy OS\'s',
          'Resource Hog',
          'No way to protect your source code',
          'Perpetually out of date, releases typically ship with versions of Node/Chromium from 3-6 months ago'
        ],
        frameworks: [],
        tools: []
      },
      {
        title: 'Xamarin',
        url: 'https://visualstudio.microsoft.com/xamarin',
        deprecated: false,
        languages: [],
        platforms: [],
        pros: [],
        cons: []
      },
      {
        title: 'Ultralight',
        url: 'https://ultralig.ht',
        deprecated: false,
        languages: [
          'C++',
          'HTML',
          'CSS'
        ],
        platforms: [
          'Windows',
          'OSX',
          'Linux'
        ],
        pros: [
          'Distribution sizes are as low as ~8MB',
          'Low memory usage',
          'GPU-Accelerated, drivers for Direct3D, Metal, and OpenGL (optimized for games)',
          'Ultralight is designed for C++ developers, however it plans to add bindings for C, C#, .NET, Node.js, and Python',
          'Free for non-commercial use, educational use, and commercial use by indie devs making less than US$100,000 a year'
        ],
        cons: [
          'Currently in beta and missing many features',
          'Not free for all commercial use',
          'Mostly closed source',
          'Basically one person behind most of the code',
          'Currently requires the end user have a GPU',
          'Lacking full support for CSS3, especially around SVG, filters, and dropshadows',
          'Limited JavaScript interaction through C++',
          'Internal Webkit is based off of Safari with many features disabled, notably WebWorkers, WebAudio and Video'
        ],
        frameworks: [],
        tools: []
      },
      {
        title: 'Adobe AIR',
        url: 'http://www.adobe.com/products/air.html',
        deprecated: false,
        languages: [
          'HTML',
          'JS',
          'ActionScript'
        ],
        platforms: [
          'iOS',
          'Android',
          'Windows',
          'OSX'
        ],
        pros: [
          'Backed by Adobe',
          'Simple development environment'
        ],
        cons: [
          'Poor Linux support',
          'Requires end users to install Adobe Air runtime separately',
          'Limited documentation around desktop app development'
        ],
        frameworks: [],
        tools: []
      },
      {
        title: 'LibUI-Node',
        url: 'https://github.com/parro-it/libui-node',
        deprecated: false,
        languages: [
          'JS',
          'Node.js'
        ],
        platforms: [],
        pros: [
          'Uses minimal amounts of resources, much less than NW.js and Electron',
          'Built package can be as small as ~20MB (compared to ~70MB (NW) and ~120MB (Electron))',
          'Distribution sizes can be as low as 10MB (packaged installer)',
          'Can use node_modules',
          'Has Vue, React, Etc. boilerplates available',
          'Plays nicely with Gulp, Webpack, etc.',
          'Ability to share code across Mobile/Web/Desktop if project setup correctly'
        ],
        cons: [
          'Limited-to-no styling options, all apps look like vanilla form fields',
          'Very new, not out of beta',
          'Not great OS support, or build tools yet',
          'Builds tools aren\'t very robust yet',
          'Dev tooling is pretty non-existent',
          'Lots of unknowns'
        ],
        frameworks: [
          {
            framework: 'React',
            title: 'Proton-Native',
            url: 'https://proton-native.js.org'
          },
          {
            framework: 'Vue.js',
            title: 'Vuido',
            url: 'https://vuido.mimec.org'
          }
        ],
        tools: []
      },
      {
        title: 'Sciter',
        url: 'https://sciter.com',
        deprecated: false,
        languages: [
          'HTML',
          'CSS',
          'TIScript'
        ],
        platforms: [
          'Windows',
          'Linux',
          'OSX'
        ],
        pros: [
          'Supports Windows XP+ and OSX 10.7+',
          'Distribution can be as small as 4MB for an installer',
          'Uses very little resources to give similar UI experience as that of a browser',
          'Source code is customizable for those wanting to tweak the build (at a cost)'
        ],
        cons: [
          'Has a limited free version, can become expensive in some scenarios',
          'Does not support all of CSS3 features',
          'Uses a proprietary scripting language that is based off of the 1996-2011 version of JavaScript (v1.x))',
          'Documentation is very lacking'
        ],
        frameworks: [],
        tools: []
      },
      {
        title: 'Carlo',
        url: 'https://github.com/GoogleChromeLabs/carlo',
        deprecated: false,
        languages: [
          'HTML',
          'CSS',
          'JS',
          'Node.js'
        ],
        platforms: [
          'Windows',
          'Linux',
          'OSX'
        ],
        pros: [
          'Made by Google',
          'Uses the user\'s installed copy of Chrome so you don\'t need to package and ship the browser in your distrubtion making dist sizes fairly small',
          'Uses the Puppeteer API for communicating between Node and browser'
        ],
        cons: [
          'Though made by Google, it is part of their Chrome Lab experiments, which often become abandoned',
          'Requires the end user has Chrome 70+ installed on their system (released 2018-10-16)',
          'You do not control the browser version, meaning usage of some new browser features in your app will require fallbacks to what Chrome 70 supported',
          'The packaging for general distribution pipeline does not exist. You are told to use pkg and to manually handle customizing your app icon, etc.',
          'No established paths for setting up auto updates'
        ],
        frameworks: [],
        tools: []
      },
      {
        title: 'PyQt',
        url: 'https://www.riverbankcomputing.com/software/pyqt',
        deprecated: false,
        languages: [
          'Python'
        ],
        platforms: [
          'Windows',
          'Linux',
          'OSX',
          'iOS',
          'Android'
        ],
        pros: [
          'Qt is built with C++ which can be cumbersome, the Python bindings simplify interacting with it'
        ],
        cons: [
          'If your project is not licensed under GPLV2, GPLV3, or LGPL3 then Qt costs $459/developer/month'
        ],
        frameworks: [],
        tools: [
          {
            type: 'Build System',
            title: 'fman',
            url: 'https://build-system.fman.io'
          }
        ]
      },
      {
        title: 'Lorca',
        url: 'https://github.com/zserge/lorca',
        deprecated: false,
        languages: [],
        platforms: [],
        pros: [],
        cons: [],
        frameworks: [],
        tools: []
      },
      {
        title: 'Chromium Embedded Framework (CEF)',
        url: 'https://bitbucket.org/chromiumembedded/cef',
        deprecated: false,
        languages: [
          'C',
          'C++',
          'Java'
        ],
        platforms: [
          'Windows',
          'Linux',
          'OSX'
        ],
        pros: [
          'High amount of control',
          'Good if you need to add in a browser view to an existing application',
          'Relied on by a ton of projects/tools, making it likely to be around a long time',
          'Has been ported to different languages for those that prefer .Net, Go, Delphi, or Python'
        ],
        cons: [
          'Considerably more complex than other options on this list',
          'This is as barebones as it gets, many other projects listed on this site are built on top of CEF to simplify it and make development faster/easier'
        ],
        frameworks: [],
        tools: [
          {
            type: 'Port',
            title: '.Net CEF#',
            url: 'https://github.com/cefsharp/CefSharp'
          },
          {
            type: 'Port',
            title: '.Net/Mono CEF Glue',
            url: 'https://bitbucket.org/xilium/xilium.cefglue'
          },
          {
            type: 'Port',
            title: '.Net CEF ChromiumFX',
            url: 'https://bitbucket.org/chromiumfx/chromiumfx'
          },
          {
            type: 'Port',
            title: 'Delphi CEF',
            url: 'https://github.com/hgourvest/dcef3'
          },
          {
            type: 'Port',
            title: 'CEF4Delphi',
            url: 'https://github.com/salvadordf/CEF4Delphi'
          },
          {
            type: 'Port',
            title: 'Go CEF',
            url: 'https://github.com/CzarekTomczak/cef2go'
          },
          {
            type: 'Port',
            title: 'Official Java CEF port',
            url: 'https://bitbucket.org/chromiumembedded/java-cef'
          },
          {
            type: 'Port',
            title: 'JavaCEF',
            url: 'http://code.google.com/p/javacef'
          },
          {
            type: 'Port',
            title: 'Python CEF',
            url: 'http://code.google.com/p/cefpython'
          }
        ]
      },
      {
        title: 'Brackets-Shell',
        url: 'https://github.com/adobe/brackets-shell',
        deprecated: false,
        languages: [
          'HTML',
          'CSS',
          'JS'
        ],
        platforms: [
          'Windows',
          'Linux',
          'OSX'
        ],
        pros: [
          'Maintained by Adobe'
        ],
        cons: [
          'No documentation',
          'Only designed for Brackets text editor, not for general purpose use',
          'They recommend using NW.js or Electron instead'
        ],
        frameworks: [],
        tools: []
      },
      {
        title: 'Tint2',
        url: 'https://github.com/trueinteractions/tint2',
        deprecated: true,
        languages: [
          'HTML',
          'CSS',
          'JS',
          'Node.js'
        ],
        platforms: [],
        pros: [
          'Similar approach to that of NW.js or Electron'
        ],
        cons: [
          'Project is deprecated (last release was in 2016)'
        ],
        frameworks: [],
        tools: []
      },
      {
        title: 'AppJS',
        url: 'http://appjs.com',
        deprecated: true,
        languages: [
          'HTML',
          'CSS',
          'JS'
        ],
        platforms: [
          'Windows',
          'Linux',
          'OSX'
        ],
        pros: [],
        cons: [
          'Project has been deprecated for many years'
        ],
        frameworks: [],
        tools: []
      }
    ]
  }
});
