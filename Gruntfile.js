// Source files list
var src = [
    // 'common'
    'src/errors.js',

    // 'utils'
    'src/utils.js',


    // 'aes' (depends on 'common', 'utils')
    'src/aes/aes.asm.js', 'src/aes/aes.js',

    // 'aes-cbc' (depends on 'aes')
    'src/aes/aes-cbc.js',

    // 'aes-ccm' (depends on 'aes')
    'src/aes/aes-ccm.js',
/*
    // 'aes-cfb' (depends on 'aes', off by default)
    'src/aes/aes-cfb.js',
*/
    // 'exports-aes' (depends on 'aes')
    'src/aes/exports.js',

    // 'sha1' (depends on 'common', 'utils')
    'src/sha1/sha1.asm.js', 'src/sha1/sha1.js',

    // 'exports-sha1' (depends on 'sha1')
    'src/sha1/exports.js',

    // 'sha256' (depends on 'common', 'utils')
    'src/sha256/sha256.asm.js', 'src/sha256/sha256.js',

    // 'exports-sha256' (depends on 'sha256')
    'src/sha256/exports.js',

    // 'sha512' (depends on 'common', 'utils', off by default)
    'src/sha512/sha512.asm.js', 'src/sha512/sha512.js',

    // 'exports-sha256' (depends on 'sha512', off by default)
    'src/sha512/exports.js',

    // 'hmac' (depends on 'common', 'utils')
    'src/hmac/hmac.js',

    // 'hmac-sha1' (depends on 'hmac', 'sha1')
    'src/hmac/hmac-sha1.js',

    // 'hmac-sha256' (depends on 'hmac', 'sha256')
    'src/hmac/hmac-sha256.js',
/*
    // 'hmac-sha512' (depends on 'hmac', 'sha512', off by default)
    'src/hmac/hmac-sha512.js',
*/
    // 'exports-hmac' (depends on 'hmac')
    'src/hmac/exports.js',

    // 'pbkdf2' (depends on 'common', 'utils')
    'src/pbkdf2/pbkdf2.js',

    // 'pbkdf2-hmac-sha1' (depends on 'pbkdf2', 'hmac-sha1')
    'src/pbkdf2/pbkdf2-hmac-sha1.js',

    // 'pbkdf2-hmac-sha256' (depends on 'pbkdf2', 'hmac-sha256')
    'src/pbkdf2/pbkdf2-hmac-sha256.js',
/*
    // 'pbkdf2-hmac-sha512' (depends on 'pbkdf2', 'hmac-sha512', off by default)
    'src/pbkdf2/pbkdf2-hmac-sha512.js',
*/
    // 'exports-pbkdf2' (depends on 'pbkdf2')
    'src/pbkdf2/exports.js',

    // 'rng' (depends on 'common', 'utils')
    'src/random/isaac.js', 'src/random/random.js',

    // 'exports-rng' (depends on 'rng')
    'src/random/exports.js',

    // 'globals-rng' (depends on 'rng')
    'src/random/globals.js',

    // 'bn' (depends on 'common', 'rng')
    'src/bignum/bigint.asm.js', 'src/bignum/bignum.js', 'src/bignum/extgcd.js', 'src/bignum/modulus.js', 'src/bignum/prime.js',

    // 'exports-bn' (depends on 'bn')
    'src/bignum/exports.js',

    // 'rsa' (depends on 'bn', 'rng')
    'src/rsa/rsa.js', 'src/rsa/genkey.js',

    // 'rsa_raw' (depends on 'bn', 'rng', 'asn1)
    'src/rsa/rsa.js', 'src/rsa/genkey.js',

    // 'rsa-pkcs1' (depends on 'rsa')
    'src/rsa/pkcs1.js',

    // 'exports-rsa' (depends on 'rsa')
    'src/rsa/exports.js',

    // 'exports' (depends on 'utils')
    'src/exports.js',

    // 'globals' (depends on 'common')
    'src/globals.js'
];

// Supported browsers
var browsers = [
    // Latest browsers
    {
        browserName: 'Firefox',
    },
    {
        browserName: 'Chrome',
    },
    {
        browserName: 'Internet Explorer',
    },
    {
        browserName: 'Opera',
    },
    {
        browserName: 'Safari',
        platform: 'OS X 10.9'
    },
    // Legacy browsers
    {
        browserName: 'Firefox',
        version: '22'
    },
    {
        browserName: 'Internet Explorer',
        version: '10'
    },
    {
        browserName: 'Safari',
        platform: 'OS X 10.8'
    },
    {
        browserName: 'Safari',
        platform: 'OS X 10.6'
    }
];

// Grunt setup
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-saucelabs');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            devel: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true,
//                    sourceMap: 'asmcrypto.js.map',
                    wrap: 'asmCrypto'
                },
                files: {
                    'asmcrypto.js': src
                }
            },
            release: {
                options: {
                    mangle: true,
                    compress: true,
                    beautify: false,
                    sourceMap: 'asmcrypto.js.map',
                    wrap: 'asmCrypto'
                },
                files: {
                    'asmcrypto.js': src
                }
            }
        },

        qunit: {
            all: ['test/index.html']
        },

        'saucelabs-qunit': {
            all: {
                options: {
                    testname: "asmcrypto.js",
                    urls: [ 'http://localhost:9999/' ],
                    browsers: browsers,
                    build: process.env.TRAVIS_JOB_ID
                }
            }
        },

        connect: {
            all: {
                options: {
                    hostname: 'localhost',
                    port: 9999,
                    base: 'test'
                }
            }
        },

        watch: {
            all: {
                files: src,
                tasks: ['uglify:devel']
            }
        },

        clean: [
            'asmcrypto.js',
            'asmcrypto.js.map'
        ]
    });

    grunt.registerTask('default', ['uglify:release']);
    grunt.registerTask('devel', ['uglify:devel','connect','watch']);
    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('sauce', ['connect','saucelabs-qunit']);
};
