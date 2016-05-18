module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            files: ['**/*'],
            tasks: ['ts'],
            options: {
                livereload: true
            }
        },
        ts: {
            default: {
                tsconfig: true
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts", "watch"]);
};