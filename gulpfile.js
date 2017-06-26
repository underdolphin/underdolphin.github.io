//    Copyright 2017 underdolphin(masato sueda)
// 
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
// 
//        http://www.apache.org/licenses/LICENSE-2.0
// 
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

const gulp = require('gulp');
const browserSync = require('browser-sync');
const cp = require('child_process');

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

gulp.task('jekyll-build', (done) => {
    browserSync.notify('Running: jekyll build');
    return cp.spawn(jekyll, ['build'], {
            stdio: 'inherit'
        })
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
    browserSync.reload();
});


gulp.task('browser-sync', ['jekyll-build'], () => {
    browserSync({
        server: {
            baseDir: '_site'
        },
        open: false
    });
});

gulp.task('watch', () => {
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);