// JavaScript Document
module.exports = function(grunt){
	'use strict';
    grunt.initConfig({
        concat: {
            options: {                                       //配置
                stripBanners:true,
                banner: '/*! This is the grunt test ' +      //添加自定义的banner
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            basic: {                                         //另一个任务
                files: {                                     //另一种更简便的写法
                    'dist/css/style.css': ['css/*.css']
                }
            },
			ui: {                                         //另一个任务
                files: {                                     //另一种更简便的写法
                    'dist/css/base/ui.css': ['css/base/*.css']
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! This is uglify test - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            common: {
                files: {
					'dist/js/zepto.js':['js/zepto/zepto.js','js/zepto/event.js','js/zepto/ajax.js','js/zepto/selector.js','js/zepto/detect.js'],
                    'dist/js/common.js': ['js/touch.js','js/easeljs-NEXT.combined.js','js/tweenjs-NEXT.combined.js','js/magazine.js']
                }
            }
        },

        watch: {
            another: {
                files: ['js/*.js'],
                tasks: ['uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify']);
}