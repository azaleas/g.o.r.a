!(function(e) {
    var t = {}
    function n(r) {
        if (t[r]) return t[r].exports
        var o = (t[r] = { i: r, l: !1, exports: {} })
        return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
    }
    ;(n.m = e),
        (n.c = t),
        (n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
        }),
        (n.r = function(e) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: 'Module'
                }),
                Object.defineProperty(e, '__esModule', { value: !0 })
        }),
        (n.t = function(e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e
            if (4 & t && 'object' == typeof e && e && e.__esModule) return e
            var r = Object.create(null)
            if (
                (n.r(r),
                Object.defineProperty(r, 'default', {
                    enumerable: !0,
                    value: e
                }),
                2 & t && 'string' != typeof e)
            )
                for (var o in e)
                    n.d(
                        r,
                        o,
                        function(t) {
                            return e[t]
                        }.bind(null, o)
                    )
            return r
        }),
        (n.n = function(e) {
            var t =
                e && e.__esModule
                    ? function() {
                          return e.default
                      }
                    : function() {
                          return e
                      }
            return n.d(t, 'a', t), t
        }),
        (n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }),
        (n.p = ''),
        n((n.s = 9))
})([
    function(e, t, n) {
        'use strict'
        var r = n(4),
            o = n(13),
            i = Object.prototype.toString
        function s(e) {
            return '[object Array]' === i.call(e)
        }
        function a(e) {
            return null !== e && 'object' == typeof e
        }
        function c(e) {
            return '[object Function]' === i.call(e)
        }
        function u(e, t) {
            if (null != e)
                if (('object' != typeof e && (e = [e]), s(e)))
                    for (var n = 0, r = e.length; n < r; n++)
                        t.call(null, e[n], n, e)
                else
                    for (var o in e)
                        Object.prototype.hasOwnProperty.call(e, o) &&
                            t.call(null, e[o], o, e)
        }
        e.exports = {
            isArray: s,
            isArrayBuffer: function(e) {
                return '[object ArrayBuffer]' === i.call(e)
            },
            isBuffer: o,
            isFormData: function(e) {
                return 'undefined' != typeof FormData && e instanceof FormData
            },
            isArrayBufferView: function(e) {
                return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
                    ? ArrayBuffer.isView(e)
                    : e && e.buffer && e.buffer instanceof ArrayBuffer
            },
            isString: function(e) {
                return 'string' == typeof e
            },
            isNumber: function(e) {
                return 'number' == typeof e
            },
            isObject: a,
            isUndefined: function(e) {
                return void 0 === e
            },
            isDate: function(e) {
                return '[object Date]' === i.call(e)
            },
            isFile: function(e) {
                return '[object File]' === i.call(e)
            },
            isBlob: function(e) {
                return '[object Blob]' === i.call(e)
            },
            isFunction: c,
            isStream: function(e) {
                return a(e) && c(e.pipe)
            },
            isURLSearchParams: function(e) {
                return (
                    'undefined' != typeof URLSearchParams &&
                    e instanceof URLSearchParams
                )
            },
            isStandardBrowserEnv: function() {
                return (
                    ('undefined' == typeof navigator ||
                        'ReactNative' !== navigator.product) &&
                    'undefined' != typeof window &&
                    'undefined' != typeof document
                )
            },
            forEach: u,
            merge: function e() {
                var t = {}
                function n(n, r) {
                    'object' == typeof t[r] && 'object' == typeof n
                        ? (t[r] = e(t[r], n))
                        : (t[r] = n)
                }
                for (var r = 0, o = arguments.length; r < o; r++)
                    u(arguments[r], n)
                return t
            },
            extend: function(e, t, n) {
                return (
                    u(t, function(t, o) {
                        e[o] = n && 'function' == typeof t ? r(t, n) : t
                    }),
                    e
                )
            },
            trim: function(e) {
                return e.replace(/^\s*/, '').replace(/\s*$/, '')
            }
        }
    },
    function(e, t, n) {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.getMoviesDataByTitle = function(e) {
                return i.default.get(s.OMDB_DATA_REQUEST_URL, {
                    params: { s: e, page: 1 }
                })
            }),
            (t.getMovieDataByImdbId = function(e) {
                return i.default.get(s.OMDB_DATA_REQUEST_URL, {
                    params: { i: e, plot: 'full' }
                })
            }),
            (t.getMovieImages = function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                return new Promise(function(e, t) {
                    e(s.MOVIE_IMAGES_LIST)
                })
            }),
            (t.getCastImages = function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                return new Promise(function(e, t) {
                    for (var n = [], r = 0; r < 25; r++) {
                        var o = {
                            actorImage: '//robohash.org/' + r,
                            actorName: s.CAST_NAMES[r],
                            actorPlayedRole: s.CAST_ROLES[r]
                        }
                        n.push(o)
                    }
                    e(n)
                })
            })
        var r,
            o = n(11),
            i = (r = o) && r.__esModule ? r : { default: r },
            s = n(31)
    },
    function(e, t, n) {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 })
        var r =
            Object.assign ||
            function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t]
                    for (var r in n)
                        Object.prototype.hasOwnProperty.call(n, r) &&
                            (e[r] = n[r])
                }
                return e
            }
        t.store = (function(e, t) {
            var n = {}
            return (
                (n.state = t),
                (n.listeners = []),
                (n.getState = function() {
                    return n.state
                }),
                (n.subscribe = function(e) {
                    return n.listeners.push(e)
                }),
                (n.dispatch = function(t) {
                    ;(n.state = e(n.state, t)),
                        n.listeners.forEach(function(e) {
                            e.name === t.type && e()
                        })
                }),
                n
            )
        })(function() {
            var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {
                              searchResults: [],
                              movie: {},
                              movieImages: [],
                              castImages: []
                          },
                t = arguments[1]
            switch (t.type) {
                case 'GET_SEARCH_RESULTS':
                    return r({}, e, { searchResults: t.payload })
                case 'GET_MOVIE_ITEM':
                    return r({}, e, { movie: t.payload })
                case 'GET_MOVIE_IMAGES':
                    return r({}, e, { movieImages: t.payload })
                case 'GET_CAST_IMAGES':
                    return r({}, e, { castImages: t.payload })
                default:
                    return e
            }
        })
    },
    function(e, t, n) {
        'use strict'
        ;(function(t) {
            var r = n(0),
                o = n(16),
                i = { 'Content-Type': 'application/x-www-form-urlencoded' }
            function s(e, t) {
                !r.isUndefined(e) &&
                    r.isUndefined(e['Content-Type']) &&
                    (e['Content-Type'] = t)
            }
            var a,
                c = {
                    adapter: ('undefined' != typeof XMLHttpRequest
                        ? (a = n(5))
                        : void 0 !== t && (a = n(5)),
                    a),
                    transformRequest: [
                        function(e, t) {
                            return (
                                o(t, 'Content-Type'),
                                r.isFormData(e) ||
                                r.isArrayBuffer(e) ||
                                r.isBuffer(e) ||
                                r.isStream(e) ||
                                r.isFile(e) ||
                                r.isBlob(e)
                                    ? e
                                    : r.isArrayBufferView(e)
                                    ? e.buffer
                                    : r.isURLSearchParams(e)
                                    ? (s(
                                          t,
                                          'application/x-www-form-urlencoded;charset=utf-8'
                                      ),
                                      e.toString())
                                    : r.isObject(e)
                                    ? (s(t, 'application/json;charset=utf-8'),
                                      JSON.stringify(e))
                                    : e
                            )
                        }
                    ],
                    transformResponse: [
                        function(e) {
                            if ('string' == typeof e)
                                try {
                                    e = JSON.parse(e)
                                } catch (e) {}
                            return e
                        }
                    ],
                    timeout: 0,
                    xsrfCookieName: 'XSRF-TOKEN',
                    xsrfHeaderName: 'X-XSRF-TOKEN',
                    maxContentLength: -1,
                    validateStatus: function(e) {
                        return e >= 200 && e < 300
                    }
                }
            ;(c.headers = {
                common: { Accept: 'application/json, text/plain, */*' }
            }),
                r.forEach(['delete', 'get', 'head'], function(e) {
                    c.headers[e] = {}
                }),
                r.forEach(['post', 'put', 'patch'], function(e) {
                    c.headers[e] = r.merge(i)
                }),
                (e.exports = c)
        }.call(this, n(15)))
    },
    function(e, t, n) {
        'use strict'
        e.exports = function(e, t) {
            return function() {
                for (
                    var n = new Array(arguments.length), r = 0;
                    r < n.length;
                    r++
                )
                    n[r] = arguments[r]
                return e.apply(t, n)
            }
        }
    },
    function(e, t, n) {
        'use strict'
        var r = n(0),
            o = n(17),
            i = n(19),
            s = n(20),
            a = n(21),
            c = n(6),
            u =
                ('undefined' != typeof window &&
                    window.btoa &&
                    window.btoa.bind(window)) ||
                n(22)
        e.exports = function(e) {
            return new Promise(function(t, l) {
                var f = e.data,
                    d = e.headers
                r.isFormData(f) && delete d['Content-Type']
                var p = new XMLHttpRequest(),
                    m = 'onreadystatechange',
                    v = !1
                if (
                    ('undefined' == typeof window ||
                        !window.XDomainRequest ||
                        'withCredentials' in p ||
                        a(e.url) ||
                        ((p = new window.XDomainRequest()),
                        (m = 'onload'),
                        (v = !0),
                        (p.onprogress = function() {}),
                        (p.ontimeout = function() {})),
                    e.auth)
                ) {
                    var h = e.auth.username || '',
                        g = e.auth.password || ''
                    d.Authorization = 'Basic ' + u(h + ':' + g)
                }
                if (
                    (p.open(
                        e.method.toUpperCase(),
                        i(e.url, e.params, e.paramsSerializer),
                        !0
                    ),
                    (p.timeout = e.timeout),
                    (p[m] = function() {
                        if (
                            p &&
                            (4 === p.readyState || v) &&
                            (0 !== p.status ||
                                (p.responseURL &&
                                    0 === p.responseURL.indexOf('file:')))
                        ) {
                            var n =
                                    'getAllResponseHeaders' in p
                                        ? s(p.getAllResponseHeaders())
                                        : null,
                                r = {
                                    data:
                                        e.responseType &&
                                        'text' !== e.responseType
                                            ? p.response
                                            : p.responseText,
                                    status: 1223 === p.status ? 204 : p.status,
                                    statusText:
                                        1223 === p.status
                                            ? 'No Content'
                                            : p.statusText,
                                    headers: n,
                                    config: e,
                                    request: p
                                }
                            o(t, l, r), (p = null)
                        }
                    }),
                    (p.onerror = function() {
                        l(c('Network Error', e, null, p)), (p = null)
                    }),
                    (p.ontimeout = function() {
                        l(
                            c(
                                'timeout of ' + e.timeout + 'ms exceeded',
                                e,
                                'ECONNABORTED',
                                p
                            )
                        ),
                            (p = null)
                    }),
                    r.isStandardBrowserEnv())
                ) {
                    var y = n(23),
                        _ =
                            (e.withCredentials || a(e.url)) && e.xsrfCookieName
                                ? y.read(e.xsrfCookieName)
                                : void 0
                    _ && (d[e.xsrfHeaderName] = _)
                }
                if (
                    ('setRequestHeader' in p &&
                        r.forEach(d, function(e, t) {
                            void 0 === f && 'content-type' === t.toLowerCase()
                                ? delete d[t]
                                : p.setRequestHeader(t, e)
                        }),
                    e.withCredentials && (p.withCredentials = !0),
                    e.responseType)
                )
                    try {
                        p.responseType = e.responseType
                    } catch (t) {
                        if ('json' !== e.responseType) throw t
                    }
                'function' == typeof e.onDownloadProgress &&
                    p.addEventListener('progress', e.onDownloadProgress),
                    'function' == typeof e.onUploadProgress &&
                        p.upload &&
                        p.upload.addEventListener(
                            'progress',
                            e.onUploadProgress
                        ),
                    e.cancelToken &&
                        e.cancelToken.promise.then(function(e) {
                            p && (p.abort(), l(e), (p = null))
                        }),
                    void 0 === f && (f = null),
                    p.send(f)
            })
        }
    },
    function(e, t, n) {
        'use strict'
        var r = n(18)
        e.exports = function(e, t, n, o, i) {
            var s = new Error(e)
            return r(s, t, n, o, i)
        }
    },
    function(e, t, n) {
        'use strict'
        e.exports = function(e) {
            return !(!e || !e.__CANCEL__)
        }
    },
    function(e, t, n) {
        'use strict'
        function r(e) {
            this.message = e
        }
        ;(r.prototype.toString = function() {
            return 'Cancel' + (this.message ? ': ' + this.message : '')
        }),
            (r.prototype.__CANCEL__ = !0),
            (e.exports = r)
    },
    function(e, t, n) {
        'use strict'
        n(10)
        var r = n(1),
            o = n(2),
            i = c(n(32)),
            s = c(n(33)),
            a = c(n(34))
        function c(e) {
            return e && e.__esModule ? e : { default: e }
        }
        var u = function(e) {
            var t = e.target.closest('.movies-list__item').dataset.imdbId
            t &&
                (0, r.getMovieDataByImdbId)(t).then(function(e) {
                    o.store.dispatch({
                        type: 'GET_MOVIE_ITEM',
                        payload: e.data
                    })
                })
        }
        o.store.subscribe(function() {
            var e = o.store.getState().searchResults,
                t = document.getElementById('moviesList'),
                n = document.getElementById('movieItem')
            e.length > 0 &&
                ((t.innerHTML = (0, s.default)({ moviesList: e })),
                n.classList.remove('shown'),
                n.classList.add('hidden'),
                t.classList.remove('hidden'),
                t.classList.add('shown'))
        }),
            o.store.subscribe(function() {
                var e = o.store.getState().movie,
                    t = document.getElementById('moviesList'),
                    n = document.getElementById('movieItem')
                Object.keys(e).length > 0 &&
                    ((n.innerHTML = (0, a.default)({ movie: e })),
                    t.classList.remove('shown'),
                    t.classList.add('hidden'),
                    n.classList.remove('hidden'),
                    n.classList.add('shown'))
            })
        var l =
            '\n    <div class="container container--full-height">\n        ' +
            (0, i.default)() +
            '\n        <div id="moviesList" class="movies-list">\n        </div>\n        <div id="movieItem" class="movie-item">\n        </div>\n    </div>\n'
        ;(document.getElementById('app').innerHTML = l),
            document.getElementById('moviesList').addEventListener('click', u)
    },
    function(e, t, n) {},
    function(e, t, n) {
        e.exports = n(12)
    },
    function(e, t, n) {
        'use strict'
        var r = n(0),
            o = n(4),
            i = n(14),
            s = n(3)
        function a(e) {
            var t = new i(e),
                n = o(i.prototype.request, t)
            return r.extend(n, i.prototype, t), r.extend(n, t), n
        }
        var c = a(s)
        ;(c.Axios = i),
            (c.create = function(e) {
                return a(r.merge(s, e))
            }),
            (c.Cancel = n(8)),
            (c.CancelToken = n(29)),
            (c.isCancel = n(7)),
            (c.all = function(e) {
                return Promise.all(e)
            }),
            (c.spread = n(30)),
            (e.exports = c),
            (e.exports.default = c)
    },
    function(e, t) {
        function n(e) {
            return (
                !!e.constructor &&
                'function' == typeof e.constructor.isBuffer &&
                e.constructor.isBuffer(e)
            )
        }
        /*!
         * Determine if an object is a Buffer
         *
         * @author   Feross Aboukhadijeh <https://feross.org>
         * @license  MIT
         */
        e.exports = function(e) {
            return (
                null != e &&
                (n(e) ||
                    (function(e) {
                        return (
                            'function' == typeof e.readFloatLE &&
                            'function' == typeof e.slice &&
                            n(e.slice(0, 0))
                        )
                    })(e) ||
                    !!e._isBuffer)
            )
        }
    },
    function(e, t, n) {
        'use strict'
        var r = n(3),
            o = n(0),
            i = n(24),
            s = n(25)
        function a(e) {
            ;(this.defaults = e),
                (this.interceptors = { request: new i(), response: new i() })
        }
        ;(a.prototype.request = function(e) {
            'string' == typeof e &&
                (e = o.merge({ url: arguments[0] }, arguments[1])),
                ((e = o.merge(
                    r,
                    { method: 'get' },
                    this.defaults,
                    e
                )).method = e.method.toLowerCase())
            var t = [s, void 0],
                n = Promise.resolve(e)
            for (
                this.interceptors.request.forEach(function(e) {
                    t.unshift(e.fulfilled, e.rejected)
                }),
                    this.interceptors.response.forEach(function(e) {
                        t.push(e.fulfilled, e.rejected)
                    });
                t.length;

            )
                n = n.then(t.shift(), t.shift())
            return n
        }),
            o.forEach(['delete', 'get', 'head', 'options'], function(e) {
                a.prototype[e] = function(t, n) {
                    return this.request(o.merge(n || {}, { method: e, url: t }))
                }
            }),
            o.forEach(['post', 'put', 'patch'], function(e) {
                a.prototype[e] = function(t, n, r) {
                    return this.request(
                        o.merge(r || {}, { method: e, url: t, data: n })
                    )
                }
            }),
            (e.exports = a)
    },
    function(e, t) {
        var n,
            r,
            o = (e.exports = {})
        function i() {
            throw new Error('setTimeout has not been defined')
        }
        function s() {
            throw new Error('clearTimeout has not been defined')
        }
        function a(e) {
            if (n === setTimeout) return setTimeout(e, 0)
            if ((n === i || !n) && setTimeout)
                return (n = setTimeout), setTimeout(e, 0)
            try {
                return n(e, 0)
            } catch (t) {
                try {
                    return n.call(null, e, 0)
                } catch (t) {
                    return n.call(this, e, 0)
                }
            }
        }
        !(function() {
            try {
                n = 'function' == typeof setTimeout ? setTimeout : i
            } catch (e) {
                n = i
            }
            try {
                r = 'function' == typeof clearTimeout ? clearTimeout : s
            } catch (e) {
                r = s
            }
        })()
        var c,
            u = [],
            l = !1,
            f = -1
        function d() {
            l &&
                c &&
                ((l = !1),
                c.length ? (u = c.concat(u)) : (f = -1),
                u.length && p())
        }
        function p() {
            if (!l) {
                var e = a(d)
                l = !0
                for (var t = u.length; t; ) {
                    for (c = u, u = []; ++f < t; ) c && c[f].run()
                    ;(f = -1), (t = u.length)
                }
                ;(c = null),
                    (l = !1),
                    (function(e) {
                        if (r === clearTimeout) return clearTimeout(e)
                        if ((r === s || !r) && clearTimeout)
                            return (r = clearTimeout), clearTimeout(e)
                        try {
                            r(e)
                        } catch (t) {
                            try {
                                return r.call(null, e)
                            } catch (t) {
                                return r.call(this, e)
                            }
                        }
                    })(e)
            }
        }
        function m(e, t) {
            ;(this.fun = e), (this.array = t)
        }
        function v() {}
        ;(o.nextTick = function(e) {
            var t = new Array(arguments.length - 1)
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n]
            u.push(new m(e, t)), 1 !== u.length || l || a(p)
        }),
            (m.prototype.run = function() {
                this.fun.apply(null, this.array)
            }),
            (o.title = 'browser'),
            (o.browser = !0),
            (o.env = {}),
            (o.argv = []),
            (o.version = ''),
            (o.versions = {}),
            (o.on = v),
            (o.addListener = v),
            (o.once = v),
            (o.off = v),
            (o.removeListener = v),
            (o.removeAllListeners = v),
            (o.emit = v),
            (o.prependListener = v),
            (o.prependOnceListener = v),
            (o.listeners = function(e) {
                return []
            }),
            (o.binding = function(e) {
                throw new Error('process.binding is not supported')
            }),
            (o.cwd = function() {
                return '/'
            }),
            (o.chdir = function(e) {
                throw new Error('process.chdir is not supported')
            }),
            (o.umask = function() {
                return 0
            })
    },
    function(e, t, n) {
        'use strict'
        var r = n(0)
        e.exports = function(e, t) {
            r.forEach(e, function(n, r) {
                r !== t &&
                    r.toUpperCase() === t.toUpperCase() &&
                    ((e[t] = n), delete e[r])
            })
        }
    },
    function(e, t, n) {
        'use strict'
        var r = n(6)
        e.exports = function(e, t, n) {
            var o = n.config.validateStatus
            n.status && o && !o(n.status)
                ? t(
                      r(
                          'Request failed with status code ' + n.status,
                          n.config,
                          null,
                          n.request,
                          n
                      )
                  )
                : e(n)
        }
    },
    function(e, t, n) {
        'use strict'
        e.exports = function(e, t, n, r, o) {
            return (
                (e.config = t),
                n && (e.code = n),
                (e.request = r),
                (e.response = o),
                e
            )
        }
    },
    function(e, t, n) {
        'use strict'
        var r = n(0)
        function o(e) {
            return encodeURIComponent(e)
                .replace(/%40/gi, '@')
                .replace(/%3A/gi, ':')
                .replace(/%24/g, '$')
                .replace(/%2C/gi, ',')
                .replace(/%20/g, '+')
                .replace(/%5B/gi, '[')
                .replace(/%5D/gi, ']')
        }
        e.exports = function(e, t, n) {
            if (!t) return e
            var i
            if (n) i = n(t)
            else if (r.isURLSearchParams(t)) i = t.toString()
            else {
                var s = []
                r.forEach(t, function(e, t) {
                    null != e &&
                        (r.isArray(e) ? (t += '[]') : (e = [e]),
                        r.forEach(e, function(e) {
                            r.isDate(e)
                                ? (e = e.toISOString())
                                : r.isObject(e) && (e = JSON.stringify(e)),
                                s.push(o(t) + '=' + o(e))
                        }))
                }),
                    (i = s.join('&'))
            }
            return i && (e += (-1 === e.indexOf('?') ? '?' : '&') + i), e
        }
    },
    function(e, t, n) {
        'use strict'
        var r = n(0),
            o = [
                'age',
                'authorization',
                'content-length',
                'content-type',
                'etag',
                'expires',
                'from',
                'host',
                'if-modified-since',
                'if-unmodified-since',
                'last-modified',
                'location',
                'max-forwards',
                'proxy-authorization',
                'referer',
                'retry-after',
                'user-agent'
            ]
        e.exports = function(e) {
            var t,
                n,
                i,
                s = {}
            return e
                ? (r.forEach(e.split('\n'), function(e) {
                      if (
                          ((i = e.indexOf(':')),
                          (t = r.trim(e.substr(0, i)).toLowerCase()),
                          (n = r.trim(e.substr(i + 1))),
                          t)
                      ) {
                          if (s[t] && o.indexOf(t) >= 0) return
                          s[t] =
                              'set-cookie' === t
                                  ? (s[t] ? s[t] : []).concat([n])
                                  : s[t]
                                  ? s[t] + ', ' + n
                                  : n
                      }
                  }),
                  s)
                : s
        }
    },
    function(e, t, n) {
        'use strict'
        var r = n(0)
        e.exports = r.isStandardBrowserEnv()
            ? (function() {
                  var e,
                      t = /(msie|trident)/i.test(navigator.userAgent),
                      n = document.createElement('a')
                  function o(e) {
                      var r = e
                      return (
                          t && (n.setAttribute('href', r), (r = n.href)),
                          n.setAttribute('href', r),
                          {
                              href: n.href,
                              protocol: n.protocol
                                  ? n.protocol.replace(/:$/, '')
                                  : '',
                              host: n.host,
                              search: n.search
                                  ? n.search.replace(/^\?/, '')
                                  : '',
                              hash: n.hash ? n.hash.replace(/^#/, '') : '',
                              hostname: n.hostname,
                              port: n.port,
                              pathname:
                                  '/' === n.pathname.charAt(0)
                                      ? n.pathname
                                      : '/' + n.pathname
                          }
                      )
                  }
                  return (
                      (e = o(window.location.href)),
                      function(t) {
                          var n = r.isString(t) ? o(t) : t
                          return n.protocol === e.protocol && n.host === e.host
                      }
                  )
              })()
            : function() {
                  return !0
              }
    },
    function(e, t, n) {
        'use strict'
        var r =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        function o() {
            this.message = 'String contains an invalid character'
        }
        ;(o.prototype = new Error()),
            (o.prototype.code = 5),
            (o.prototype.name = 'InvalidCharacterError'),
            (e.exports = function(e) {
                for (
                    var t, n, i = String(e), s = '', a = 0, c = r;
                    i.charAt(0 | a) || ((c = '='), a % 1);
                    s += c.charAt(63 & (t >> (8 - (a % 1) * 8)))
                ) {
                    if ((n = i.charCodeAt((a += 0.75))) > 255) throw new o()
                    t = (t << 8) | n
                }
                return s
            })
    },
    function(e, t, n) {
        'use strict'
        var r = n(0)
        e.exports = r.isStandardBrowserEnv()
            ? {
                  write: function(e, t, n, o, i, s) {
                      var a = []
                      a.push(e + '=' + encodeURIComponent(t)),
                          r.isNumber(n) &&
                              a.push('expires=' + new Date(n).toGMTString()),
                          r.isString(o) && a.push('path=' + o),
                          r.isString(i) && a.push('domain=' + i),
                          !0 === s && a.push('secure'),
                          (document.cookie = a.join('; '))
                  },
                  read: function(e) {
                      var t = document.cookie.match(
                          new RegExp('(^|;\\s*)(' + e + ')=([^;]*)')
                      )
                      return t ? decodeURIComponent(t[3]) : null
                  },
                  remove: function(e) {
                      this.write(e, '', Date.now() - 864e5)
                  }
              }
            : {
                  write: function() {},
                  read: function() {
                      return null
                  },
                  remove: function() {}
              }
    },
    function(e, t, n) {
        'use strict'
        var r = n(0)
        function o() {
            this.handlers = []
        }
        ;(o.prototype.use = function(e, t) {
            return (
                this.handlers.push({ fulfilled: e, rejected: t }),
                this.handlers.length - 1
            )
        }),
            (o.prototype.eject = function(e) {
                this.handlers[e] && (this.handlers[e] = null)
            }),
            (o.prototype.forEach = function(e) {
                r.forEach(this.handlers, function(t) {
                    null !== t && e(t)
                })
            }),
            (e.exports = o)
    },
    function(e, t, n) {
        'use strict'
        var r = n(0),
            o = n(26),
            i = n(7),
            s = n(3),
            a = n(27),
            c = n(28)
        function u(e) {
            e.cancelToken && e.cancelToken.throwIfRequested()
        }
        e.exports = function(e) {
            return (
                u(e),
                e.baseURL && !a(e.url) && (e.url = c(e.baseURL, e.url)),
                (e.headers = e.headers || {}),
                (e.data = o(e.data, e.headers, e.transformRequest)),
                (e.headers = r.merge(
                    e.headers.common || {},
                    e.headers[e.method] || {},
                    e.headers || {}
                )),
                r.forEach(
                    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
                    function(t) {
                        delete e.headers[t]
                    }
                ),
                (e.adapter || s.adapter)(e).then(
                    function(t) {
                        return (
                            u(e),
                            (t.data = o(
                                t.data,
                                t.headers,
                                e.transformResponse
                            )),
                            t
                        )
                    },
                    function(t) {
                        return (
                            i(t) ||
                                (u(e),
                                t &&
                                    t.response &&
                                    (t.response.data = o(
                                        t.response.data,
                                        t.response.headers,
                                        e.transformResponse
                                    ))),
                            Promise.reject(t)
                        )
                    }
                )
            )
        }
    },
    function(e, t, n) {
        'use strict'
        var r = n(0)
        e.exports = function(e, t, n) {
            return (
                r.forEach(n, function(n) {
                    e = n(e, t)
                }),
                e
            )
        }
    },
    function(e, t, n) {
        'use strict'
        e.exports = function(e) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
        }
    },
    function(e, t, n) {
        'use strict'
        e.exports = function(e, t) {
            return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e
        }
    },
    function(e, t, n) {
        'use strict'
        var r = n(8)
        function o(e) {
            if ('function' != typeof e)
                throw new TypeError('executor must be a function.')
            var t
            this.promise = new Promise(function(e) {
                t = e
            })
            var n = this
            e(function(e) {
                n.reason || ((n.reason = new r(e)), t(n.reason))
            })
        }
        ;(o.prototype.throwIfRequested = function() {
            if (this.reason) throw this.reason
        }),
            (o.source = function() {
                var e
                return {
                    token: new o(function(t) {
                        e = t
                    }),
                    cancel: e
                }
            }),
            (e.exports = o)
    },
    function(e, t, n) {
        'use strict'
        e.exports = function(e) {
            return function(t) {
                return e.apply(null, t)
            }
        }
    },
    function(e, t, n) {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 })
        ;(t.OMDB_DATA_REQUEST_URL = 'http://www.omdbapi.com/?apikey=133fdd6f&'),
            (t.OMDB_POSTER_REQUEST_URL =
                'http://img.omdbapi.com/?apikey=133fdd6f&'),
            (t.MOVIE_IMAGES_LIST = [
                'https://www.fillmurray.com/g/200/300',
                'https://www.placecage.com/200/500',
                'https://www.fillmurray.com/600/400',
                'https://www.placecage.com/250/400',
                'https://www.fillmurray.com/g/200/400',
                'https://www.placecage.com/g/400/500',
                'https://www.fillmurray.com/300/400',
                'https://www.placecage.com/300/500',
                'https://www.fillmurray.com/g/200/500',
                'https://www.placecage.com/200/600',
                'https://www.fillmurray.com/300/400',
                'https://www.placecage.com/g/600/300',
                'https://www.fillmurray.com/400/500',
                'https://www.placecage.com/g/800/300',
                'https://www.fillmurray.com/250/300',
                'https://www.placecage.com/g/200/500'
            ]),
            (t.CAST_NAMES = [
                'Ice cream Hnads',
                'Soap Floppy Disk',
                'Ice cream cone Dog',
                'Shelf Solar',
                'Plus Trees',
                'BBQ Poop',
                'Water Post office',
                'Breakfast Light saber',
                'Cone Flowers',
                'Kitty Printer',
                'Settings BBQ',
                'BBQ Rollers',
                'Shoes Breakfast',
                'BBQ Rollers',
                'Dog Floppy Disk',
                'Shoes Soda',
                'Trees Post office',
                'Body Android',
                'Rollers Monster',
                'Ice cream cone Elevator',
                'Puppy Whale',
                'Websites Laptop',
                'Robot Sink',
                'BBQ Dog',
                'Elevator Running'
            ]),
            (t.CAST_ROLES = [
                'Shoe System',
                'Leash Ice cream',
                'Urine Soda',
                'Cat Ice cream cone',
                'Dog Website',
                'Post office Bird',
                'Cone Laptop',
                'Rollers Shower',
                'Shelf Toilet',
                'Plus Light saber',
                'Breakfast Nuclear',
                'Dog Running',
                'Nuclear Leash',
                'Mail Boat',
                'Leash Printer',
                'Printer System',
                'Puppy Robot',
                'Kitty Plants',
                'Settings Fence',
                'Robot Websites',
                'Urine Cone',
                'Cone Websites',
                'Soap Horse',
                'Puppy Urine',
                'Sink Plants'
            ])
    },
    function(e, t, n) {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 })
        var r = n(1),
            o = n(2),
            i = function(e) {
                e.preventDefault()
                var t = e.target.querySelector('[name=search-input]').value
                t &&
                    (0, r.getMoviesDataByTitle)(t).then(function(e) {
                        o.store.dispatch({
                            type: 'GET_SEARCH_RESULTS',
                            payload: e.data.Search
                        })
                    })
            }
        o.store.subscribe(function() {
            document
                .getElementById('searchForm')
                .classList.remove('center--vertical')
        })
        t.default = function() {
            return (
                setTimeout(function() {
                    document
                        .getElementById('searchForm')
                        .addEventListener('submit', i)
                }, 0),
                '\n        <form id="searchForm" class="form center--vertical full-width">\n            <input name="search-input" class="form-input" type="text" placeholder="Search..."/>\n            <button type="submit" class="form-submit-btn">\n                Search\n            </button>\n        </form>\n    '
            )
        }
    },
    function(e, t, n) {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 })
        t.default = function(e) {
            return e.moviesList
                .map(function(e) {
                    return (
                        '\n                <div class="movies-list__item" data-imdb-id=' +
                        e.imdbID +
                        '>\n                    ' +
                        ('N/A' !== e.Poster
                            ? '<img src="' +
                              e.Poster +
                              '" alt="' +
                              e.Title +
                              ' poster"/>'
                            : '') +
                        '\n                    <p class="movies-list__movie-title">\n                        ' +
                        e.Title +
                        '\n                    </p>\n                    <p class="movies-list__movie-info">\n                        Released year: <span>' +
                        e.Year +
                        '</span> <br/>\n                        Type: <span>' +
                        e.Type +
                        '</span> <br/>\n                    </p>\n                </div>\n            '
                    )
                })
                .join('')
        }
    },
    function(e, t, n) {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 })
        var r = i(n(35)),
            o = i(n(36))
        function i(e) {
            return e && e.__esModule ? e : { default: e }
        }
        var s = {
            onTabItemLeft: function(e) {
                e.target.nextElementSibling.classList.remove('active'),
                    e.target.classList.add('active'),
                    this._transitionsliderElement('0%')
                var t = document.querySelector('.js-tab-content__slider--left')
                t.nextElementSibling.classList.remove('shown'),
                    t.nextElementSibling.classList.add('hidden'),
                    t.classList.remove('hidden'),
                    t.classList.add('shown')
            },
            onTabItemRight: function(e) {
                e.target.previousElementSibling.classList.remove('active'),
                    e.target.classList.add('active'),
                    this._transitionsliderElement('-50%')
                var t = document.querySelector('.js-tab-content__slider--right')
                t.previousElementSibling.classList.remove('shown'),
                    t.previousElementSibling.classList.add('hidden'),
                    t.classList.remove('hidden'),
                    t.classList.add('shown')
            },
            _transitionsliderElement: function(e) {}
        }
        t.default = function(e) {
            var t = e.movie
            return (
                setTimeout(function() {
                    document
                        .querySelector('.js-tab-nav__item--left')
                        .addEventListener('click', s.onTabItemLeft.bind(s)),
                        document
                            .querySelector('.js-tab-nav__item--right')
                            .addEventListener('click', s.onTabItemRight.bind(s))
                }, 0),
                '\n        <nav class="tab-nav js-tab-nav">\n            <div class="tab-nav__item active tab-nav__item--left js-tab-nav__item--left">\n                Overview\n            </div>\n            <div class="tab-nav__item tab-nav__item--right js-tab-nav__item--right">\n                Cast details\n            </div>\n            <div class="tab-nav__indicator"></div>\n        </nav>\n        <div class="tab-content">\n            <div class="tab-content__slider js-tab-content__slider">\n                <div class="tab-content__panel tab-content__slider--left js-tab-content__slider--left">\n                    ' +
                    (0, r.default)({ movie: t }) +
                    '\n                </div>\n                <div class="tab-content__panel tab-content__slider--right js-tab-content__slider--right">\n                    ' +
                    (0, o.default)({ movie: t }) +
                    '\n                </div>\n            </div>\n        </div>\n    '
            )
        }
    },
    function(e, t, n) {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 })
        var r = n(1),
            o = n(2),
            i = function() {
                ;(0, r.getMovieImages)().then(function(e) {
                    o.store.dispatch({ type: 'GET_MOVIE_IMAGES', payload: e })
                })
            }
        o.store.subscribe(function() {
            var e = o.store.getState().movieImages,
                t = document.getElementById('movieImagesslider')
            e.length > 0 &&
                (t.innerHTML = e
                    .map(function(e) {
                        return (
                            '\n                    <div class=".images-slider__item">\n                        <img src="' +
                            e +
                            '" alt="Movie Images"/>\n                    </div>\n                '
                        )
                    })
                    .join(''))
        })
        t.default = function(e) {
            var t = e.movie
            return (
                setTimeout(function() {
                    i()
                }, 0),
                '\n        <div class="movie-short-information">\n            <p class="movie-short-information__title">' +
                    t.Title +
                    '</p>\n            <p class="movie-short-information__general-information">\n                <span class="movie-short-information__release-year">' +
                    t.Year +
                    '</span> ·\n                <span class="movie-short-information__genre">' +
                    t.Genre +
                    '</span> ·\n                <span class="movie-short-information__runtime">' +
                    t.Runtime +
                    '</span>\n            </p>\n        </div>\n        <div class=".images-slider" id="movieImagesslider">\n\n        </div>\n        <div class="movie-more-information-card">\n            <div class="movie-ratings">\n                ' +
                    t.Ratings.map(function(e) {
                        return (
                            '\n                        <div class="movie-ratings-item">\n                            <p class="movie-rating__score">' +
                            e.Value +
                            '</p>\n                            <p class="movie-rating__source">' +
                            ('Internet Movie Database' === e.Source
                                ? 'IMDb'
                                : e.Source) +
                            '</p>\n                        </div>\n                    '
                        )
                    }).join('') +
                    '\n            </div>\n            <div class="movie-votes">\n                <div class="movie-votes-information">\n                    <p class="movie-votes__count">' +
                    t.imdbVotes +
                    ' people voted for this film</p>\n                    <p class="movie-votes__source">IMDb</p>\n                </div>\n                <div class="movie-votes-vote-btn-group">\n                    <input type="button" value="Up"/>\n                    <input type="button" value="Down"/>\n                </div>\n            </div>\n            <div class="movie-more-information">\n                <p class="movie-more-information__movie-plot">\n                    ' +
                    t.Plot +
                    '\n                </p>\n                <p class="movie-more-information__movie-director">\n                    Director: <span>' +
                    t.Director +
                    '</span>\n                </p>\n                <p class="movie-more-information__movie-release-information">Release date: <span class="movie-more-information__release-year">' +
                    t.Released +
                    '</span> <span>(' +
                    t.Country +
                    ')</span></p>\n                <p class="movie-more-information__movie-screenplay">\n                    Story by: ' +
                    t.Writer +
                    '\n                </p>\n                <p class="movie-more-information__movie-awards">\n                    Awards & Nominations: ' +
                    t.Awards +
                    '\n                </p>\n            </div>\n        </div>\n    '
            )
        }
    },
    function(e, t, n) {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 })
        var r = n(1),
            o = n(2),
            i = function() {
                ;(0, r.getCastImages)().then(function(e) {
                    o.store.dispatch({ type: 'GET_CAST_IMAGES', payload: e })
                })
            }
        o.store.subscribe(function() {
            var e = o.store.getState().castImages,
                t = document.getElementById('movieCastImages')
            e.length > 0 &&
                (t.innerHTML = e
                    .map(function(e) {
                        return (
                            '\n                    <div class="movie-cast-images__item">\n                        <img class="img-responsive mar-hor--auto" src="' +
                            e.actorImage +
                            '" alt="' +
                            e.actorName +
                            '"/>\n                        <div class="movie-cast-images__actor-information">\n                            <p class="movie-cast-images__actor-name">' +
                            e.actorName +
                            '</p>\n                            <p class="movie-cast-images__actor-role">' +
                            e.actorPlayedRole +
                            '</p>\n                        </div>\n                    </div>\n                '
                        )
                    })
                    .join(''))
        })
        t.default = function(e) {
            e.movie
            return (
                setTimeout(function() {
                    i()
                }, 0),
                '\n        <div class="movie-cast-images" id="movieCastImages">\n        \n        </div>\n    '
            )
        }
    }
])
