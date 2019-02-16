module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                options: {                       
                    style: 'expanded'
                },
                files: {                         
                    'public/style.css': 'sass/style.scss'  // 'destination': 'source'
                }
            }
        },
        postcss: {
            options: {
              map: true, // inline sourcemaps
              processors: [
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
              ]
            },
            dist: {
              src: 'public/style.css'
            }
          },
          watch: {
              css: {
                files: ["sass/*.scss"],
                tasks: ["compile-css", "post-css"]
              }
          }        
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask("compile-css", ["sass"]);
    grunt.registerTask("post-css", ["postcss"]);

    grunt.registerTask("default", [
        "compile-css", 
        "post-css"
    ]);

};

