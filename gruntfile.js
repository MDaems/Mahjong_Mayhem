module.exports = function(grunt)
{
  grunt.initConfig(
  {
    sass: {
      dist: {
        options: {
          style: "expanded"
        },
        files: {
          "dist/css/app.css": "app/css/app.scss"
        }
      }
    },
    browserify:
    {
      all:
      {
        src: "app/app.js",
        dest: "dist/app.js",
        options:
        {
          external: ["angular"],
          debug: true,
          browserifyOptions:
          {
            debug: true
          }
        }
      }
    },
    copy:
    {
      all:
      {
        expand: true,
        cwd: "app/",
        src: ["**/*.html", "**/*.css"],
        dest: "dist/"
      }
    },
    watch:
    {
      js:
      {
        files: "app/**/*.js",
        tasks: "browserify"
      },
      html:
      {
        files: "app/**/*.html",
        tasks: "copy"
      },
      css:
      {
        files: "app/**/*.scss",
        tasks: "sass"
      }
    },
    "http-server":
    {
      dev:
      {
        root: "./dist",           
        port: 3000,
        openBrowser : true,
        runInBackground: true
      }
    }
  });

  // Load the npm installed tasks.
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-http-server");
  grunt.loadNpmTasks("grunt-contrib-sass");

  // The default tasks to run when you type: 'grunt'.
  grunt.registerTask("default", ["browserify", "copy", "http-server", "sass", "watch"]);
};
