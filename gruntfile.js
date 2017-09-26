module.exports = function (grunt) {
    grunt.initConfig({
        express: {
            dev: {
                options: {
                    script: "app/bin/site.js"
                }
            }
        },
        watch: {
            files: ['**/*.ts'],
            tasks: ['ts', 'express:dev'],
            options: {
                spawn: false,
                livereload: true
            }
        },
        ts: {
            options: {
                fast: 'never',
            },
            default: {
                tsconfig: true
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-express-server');
    
    grunt.registerTask("deploy", ["ts", "express:dev"]);
    grunt.registerTask("default", ["ts", "express:dev", "watch"]);
};