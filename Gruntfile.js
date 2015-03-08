module.exports = function (grunt) {
	grunt.initConfig({
		autoprefixer: {
			dist: {
				files: {
					'build/style.css': 'style.css'
				}
			}
		},
	watch: {
		styles: {
			files: ['style.css']
		tasks: ['autoprefixer']
		}
	}
	});
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loaadNpmTasks('grunt-contrib-watch');
};
