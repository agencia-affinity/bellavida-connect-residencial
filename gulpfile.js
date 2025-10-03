import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import {spawn} from 'child_process';

const sass = gulpSass(dartSass);

const paths = {
    scss: 'assets/scss/**/*.scss', // Corrigido para incluir subpastas
    cssLibs: 'assets/css/lib/*.css',
    jsLibs: 'assets/js/lib/*.js',
    jsScripts: 'assets/js/scripts/*.js',
    php: ['*.php', '**/*.php'],
};

// Copiar webfonts do Font Awesome
function fontAwesomeFonts() {
    return gulp
        .src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('assets/webfonts/'));
}

// Copiar CSS do Font Awesome
function fontAwesomeCSS() {
    return gulp
        .src('node_modules/@fortawesome/fontawesome-free/css/all.min.css')
        .pipe(gulp.dest('assets/css/lib/')); // vai para a mesma pasta de libs
}

gulp.task('fa-fonts', fontAwesomeFonts);
gulp.task('fa-css', fontAwesomeCSS);
gulp.task('fontawesome', gulp.parallel('fa-fonts', 'fa-css'));


// Compilar Sass
function compilaSass() {
    return gulp
        .src(paths.scss)
        .pipe(
            sass({
                outputStyle: 'compressed',
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions'],
                cascade: false,
            })
        )
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.stream());
}

gulp.task('sass', compilaSass);

// Concatenar arquivos CSS
function pluginsCSS() {
    return gulp
        .src(paths.cssLibs)
        .pipe(concat('plugins.css'))
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.stream());
}

gulp.task('plugincss', pluginsCSS);

// Concatenar e transpilar scripts JS
function gulpJs() {
    return gulp
        .src(paths.jsScripts)
        .pipe(concat('all.js'))
        .pipe(
            babel({
                presets: ['@babel/env'],
            }),
        )
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'))
        .pipe(browserSync.stream());
}

gulp.task('alljs', gulpJs);

// Concatenar JS externos
function pluginsJs() {
    return gulp
        .src(paths.jsLibs)
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('assets/js/'))
        .pipe(browserSync.stream());
}

gulp.task('pluginjs', pluginsJs);

// Inicia servidor PHP e BrowserSync
function phpServer(cb) {
    const php = spawn('php', ['-S', 'localhost:8000'], {stdio: 'inherit'});
    process.on('exit', () => php.kill());
    cb();
}

function browser() {
    browserSync.init({
        proxy: 'http://localhost:8000',
        open: true,
        notify: false,
    });
}

gulp.task('server', gulp.series(phpServer, browser));

// Watch
function watch() {
    gulp.watch(paths.scss, compilaSass); // Corrigido para usar a variável 'paths.scss'
    gulp.watch(paths.cssLibs, pluginsCSS);
    gulp.watch(paths.php).on('change', browserSync.reload);
    gulp.watch(paths.jsScripts, gulpJs);
    gulp.watch(paths.jsLibs, pluginsJs);
}

gulp.task('watch', watch);

// Default
gulp.task('default', gulp.parallel('watch', 'server', 'sass', 'plugincss', 'alljs', 'pluginjs'));