var Mc = (e) => {
  throw TypeError(e);
};
var hl = (e, t, n) => t.has(e) || Mc('Cannot ' + n);
var R = (e, t, n) => (
    hl(e, t, 'read from private field'),
    n ? n.call(e) : t.get(e)
  ),
  X = (e, t, n) =>
    t.has(e)
      ? Mc('Cannot add the same private member more than once')
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, n),
  K = (e, t, n, r) => (
    hl(e, t, 'write to private field'),
    r ? r.call(e, n) : t.set(e, n),
    n
  ),
  Te = (e, t, n) => (hl(e, t, 'access private method'), n);
var hi = (e, t, n, r) => ({
  set _(o) {
    K(e, t, o, n);
  },
  get _() {
    return R(e, t, r);
  },
});
function gy(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != 'string' && !Array.isArray(r)) {
      for (const o in r)
        if (o !== 'default' && !(o in e)) {
          const i = Object.getOwnPropertyDescriptor(r, o);
          i &&
            Object.defineProperty(
              e,
              o,
              i.get ? i : { enumerable: !0, get: () => r[o] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' })
  );
}
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === 'childList')
        for (const s of i.addedNodes)
          s.tagName === 'LINK' && s.rel === 'modulepreload' && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : o.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
function Bf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var Wf = { exports: {} },
  Ds = {},
  Hf = { exports: {} },
  Q = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var oi = Symbol.for('react.element'),
  yy = Symbol.for('react.portal'),
  wy = Symbol.for('react.fragment'),
  xy = Symbol.for('react.strict_mode'),
  Sy = Symbol.for('react.profiler'),
  Cy = Symbol.for('react.provider'),
  Ey = Symbol.for('react.context'),
  ky = Symbol.for('react.forward_ref'),
  Py = Symbol.for('react.suspense'),
  Ty = Symbol.for('react.memo'),
  Ny = Symbol.for('react.lazy'),
  Dc = Symbol.iterator;
function Ry(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Dc && e[Dc]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var Kf = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Qf = Object.assign,
  Gf = {};
function qr(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Gf),
    (this.updater = n || Kf));
}
qr.prototype.isReactComponent = {};
qr.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
    );
  this.updater.enqueueSetState(this, e, t, 'setState');
};
qr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
};
function Yf() {}
Yf.prototype = qr.prototype;
function fu(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Gf),
    (this.updater = n || Kf));
}
var pu = (fu.prototype = new Yf());
pu.constructor = fu;
Qf(pu, qr.prototype);
pu.isPureReactComponent = !0;
var Ic = Array.isArray,
  Xf = Object.prototype.hasOwnProperty,
  hu = { current: null },
  qf = { key: !0, ref: !0, __self: !0, __source: !0 };
function Zf(e, t, n) {
  var r,
    o = {},
    i = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (i = '' + t.key),
    t))
      Xf.call(t, r) && !qf.hasOwnProperty(r) && (o[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) o.children = n;
  else if (1 < l) {
    for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
    o.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) o[r] === void 0 && (o[r] = l[r]);
  return {
    $$typeof: oi,
    type: e,
    key: i,
    ref: s,
    props: o,
    _owner: hu.current,
  };
}
function by(e, t) {
  return {
    $$typeof: oi,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function mu(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === oi;
}
function _y(e) {
  var t = { '=': '=0', ':': '=2' };
  return (
    '$' +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Lc = /\/+/g;
function ml(e, t) {
  return typeof e == 'object' && e !== null && e.key != null
    ? _y('' + e.key)
    : t.toString(36);
}
function $i(e, t, n, r, o) {
  var i = typeof e;
  (i === 'undefined' || i === 'boolean') && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (i) {
      case 'string':
      case 'number':
        s = !0;
        break;
      case 'object':
        switch (e.$$typeof) {
          case oi:
          case yy:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (o = o(s)),
      (e = r === '' ? '.' + ml(s, 0) : r),
      Ic(o)
        ? ((n = ''),
          e != null && (n = e.replace(Lc, '$&/') + '/'),
          $i(o, t, n, '', function (u) {
            return u;
          }))
        : o != null &&
          (mu(o) &&
            (o = by(
              o,
              n +
                (!o.key || (s && s.key === o.key)
                  ? ''
                  : ('' + o.key).replace(Lc, '$&/') + '/') +
                e
            )),
          t.push(o)),
      1
    );
  if (((s = 0), (r = r === '' ? '.' : r + ':'), Ic(e)))
    for (var l = 0; l < e.length; l++) {
      i = e[l];
      var a = r + ml(i, l);
      s += $i(i, t, n, a, o);
    }
  else if (((a = Ry(e)), typeof a == 'function'))
    for (e = a.call(e), l = 0; !(i = e.next()).done; )
      ((i = i.value), (a = r + ml(i, l++)), (s += $i(i, t, n, a, o)));
  else if (i === 'object')
    throw (
      (t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]'
            ? 'object with keys {' + Object.keys(e).join(', ') + '}'
            : t) +
          '). If you meant to render a collection of children, use an array instead.'
      )
    );
  return s;
}
function mi(e, t, n) {
  if (e == null) return e;
  var r = [],
    o = 0;
  return (
    $i(e, r, '', '', function (i) {
      return t.call(n, i, o++);
    }),
    r
  );
}
function Oy(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ze = { current: null },
  Ui = { transition: null },
  Ay = {
    ReactCurrentDispatcher: ze,
    ReactCurrentBatchConfig: Ui,
    ReactCurrentOwner: hu,
  };
function Jf() {
  throw Error('act(...) is not supported in production builds of React.');
}
Q.Children = {
  map: mi,
  forEach: function (e, t, n) {
    mi(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      mi(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      mi(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!mu(e))
      throw Error(
        'React.Children.only expected to receive a single React element child.'
      );
    return e;
  },
};
Q.Component = qr;
Q.Fragment = wy;
Q.Profiler = Sy;
Q.PureComponent = fu;
Q.StrictMode = xy;
Q.Suspense = Py;
Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ay;
Q.act = Jf;
Q.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' +
        e +
        '.'
    );
  var r = Qf({}, e.props),
    o = e.key,
    i = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (s = hu.current)),
      t.key !== void 0 && (o = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (a in t)
      Xf.call(t, a) &&
        !qf.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var u = 0; u < a; u++) l[u] = arguments[u + 2];
    r.children = l;
  }
  return { $$typeof: oi, type: e.type, key: o, ref: i, props: r, _owner: s };
};
Q.createContext = function (e) {
  return (
    (e = {
      $$typeof: Ey,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Cy, _context: e }),
    (e.Consumer = e)
  );
};
Q.createElement = Zf;
Q.createFactory = function (e) {
  var t = Zf.bind(null, e);
  return ((t.type = e), t);
};
Q.createRef = function () {
  return { current: null };
};
Q.forwardRef = function (e) {
  return { $$typeof: ky, render: e };
};
Q.isValidElement = mu;
Q.lazy = function (e) {
  return { $$typeof: Ny, _payload: { _status: -1, _result: e }, _init: Oy };
};
Q.memo = function (e, t) {
  return { $$typeof: Ty, type: e, compare: t === void 0 ? null : t };
};
Q.startTransition = function (e) {
  var t = Ui.transition;
  Ui.transition = {};
  try {
    e();
  } finally {
    Ui.transition = t;
  }
};
Q.unstable_act = Jf;
Q.useCallback = function (e, t) {
  return ze.current.useCallback(e, t);
};
Q.useContext = function (e) {
  return ze.current.useContext(e);
};
Q.useDebugValue = function () {};
Q.useDeferredValue = function (e) {
  return ze.current.useDeferredValue(e);
};
Q.useEffect = function (e, t) {
  return ze.current.useEffect(e, t);
};
Q.useId = function () {
  return ze.current.useId();
};
Q.useImperativeHandle = function (e, t, n) {
  return ze.current.useImperativeHandle(e, t, n);
};
Q.useInsertionEffect = function (e, t) {
  return ze.current.useInsertionEffect(e, t);
};
Q.useLayoutEffect = function (e, t) {
  return ze.current.useLayoutEffect(e, t);
};
Q.useMemo = function (e, t) {
  return ze.current.useMemo(e, t);
};
Q.useReducer = function (e, t, n) {
  return ze.current.useReducer(e, t, n);
};
Q.useRef = function (e) {
  return ze.current.useRef(e);
};
Q.useState = function (e) {
  return ze.current.useState(e);
};
Q.useSyncExternalStore = function (e, t, n) {
  return ze.current.useSyncExternalStore(e, t, n);
};
Q.useTransition = function () {
  return ze.current.useTransition();
};
Q.version = '18.3.1';
Hf.exports = Q;
var c = Hf.exports;
const tn = Bf(c),
  ep = gy({ __proto__: null, default: tn }, [c]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jy = c,
  My = Symbol.for('react.element'),
  Dy = Symbol.for('react.fragment'),
  Iy = Object.prototype.hasOwnProperty,
  Ly = jy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Fy = { key: !0, ref: !0, __self: !0, __source: !0 };
function tp(e, t, n) {
  var r,
    o = {},
    i = null,
    s = null;
  (n !== void 0 && (i = '' + n),
    t.key !== void 0 && (i = '' + t.key),
    t.ref !== void 0 && (s = t.ref));
  for (r in t) Iy.call(t, r) && !Fy.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return {
    $$typeof: My,
    type: e,
    key: i,
    ref: s,
    props: o,
    _owner: Ly.current,
  };
}
Ds.Fragment = Dy;
Ds.jsx = tp;
Ds.jsxs = tp;
Wf.exports = Ds;
var y = Wf.exports,
  np = { exports: {} },
  tt = {},
  rp = { exports: {} },
  op = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(N, _) {
    var I = N.length;
    N.push(_);
    e: for (; 0 < I; ) {
      var $ = (I - 1) >>> 1,
        J = N[$];
      if (0 < o(J, _)) ((N[$] = _), (N[I] = J), (I = $));
      else break e;
    }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var _ = N[0],
      I = N.pop();
    if (I !== _) {
      N[0] = I;
      e: for (var $ = 0, J = N.length, je = J >>> 1; $ < je; ) {
        var ge = 2 * ($ + 1) - 1,
          kt = N[ge],
          Me = ge + 1,
          F = N[Me];
        if (0 > o(kt, I))
          Me < J && 0 > o(F, kt)
            ? ((N[$] = F), (N[Me] = I), ($ = Me))
            : ((N[$] = kt), (N[ge] = I), ($ = ge));
        else if (Me < J && 0 > o(F, I)) ((N[$] = F), (N[Me] = I), ($ = Me));
        else break e;
      }
    }
    return _;
  }
  function o(N, _) {
    var I = N.sortIndex - _.sortIndex;
    return I !== 0 ? I : N.id - _.id;
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var s = Date,
      l = s.now();
    e.unstable_now = function () {
      return s.now() - l;
    };
  }
  var a = [],
    u = [],
    d = 1,
    h = null,
    v = 3,
    x = !1,
    S = !1,
    p = !1,
    w = typeof setTimeout == 'function' ? setTimeout : null,
    m = typeof clearTimeout == 'function' ? clearTimeout : null,
    f = typeof setImmediate < 'u' ? setImmediate : null;
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(N) {
    for (var _ = n(u); _ !== null; ) {
      if (_.callback === null) r(u);
      else if (_.startTime <= N)
        (r(u), (_.sortIndex = _.expirationTime), t(a, _));
      else break;
      _ = n(u);
    }
  }
  function C(N) {
    if (((p = !1), g(N), !S))
      if (n(a) !== null) ((S = !0), L(E));
      else {
        var _ = n(u);
        _ !== null && V(C, _.startTime - N);
      }
  }
  function E(N, _) {
    ((S = !1), p && ((p = !1), m(P), (P = -1)), (x = !0));
    var I = v;
    try {
      for (
        g(_), h = n(a);
        h !== null && (!(h.expirationTime > _) || (N && !z()));

      ) {
        var $ = h.callback;
        if (typeof $ == 'function') {
          ((h.callback = null), (v = h.priorityLevel));
          var J = $(h.expirationTime <= _);
          ((_ = e.unstable_now()),
            typeof J == 'function' ? (h.callback = J) : h === n(a) && r(a),
            g(_));
        } else r(a);
        h = n(a);
      }
      if (h !== null) var je = !0;
      else {
        var ge = n(u);
        (ge !== null && V(C, ge.startTime - _), (je = !1));
      }
      return je;
    } finally {
      ((h = null), (v = I), (x = !1));
    }
  }
  var T = !1,
    k = null,
    P = -1,
    A = 5,
    j = -1;
  function z() {
    return !(e.unstable_now() - j < A);
  }
  function D() {
    if (k !== null) {
      var N = e.unstable_now();
      j = N;
      var _ = !0;
      try {
        _ = k(!0, N);
      } finally {
        _ ? U() : ((T = !1), (k = null));
      }
    } else T = !1;
  }
  var U;
  if (typeof f == 'function')
    U = function () {
      f(D);
    };
  else if (typeof MessageChannel < 'u') {
    var O = new MessageChannel(),
      H = O.port2;
    ((O.port1.onmessage = D),
      (U = function () {
        H.postMessage(null);
      }));
  } else
    U = function () {
      w(D, 0);
    };
  function L(N) {
    ((k = N), T || ((T = !0), U()));
  }
  function V(N, _) {
    P = w(function () {
      N(e.unstable_now());
    }, _);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (N) {
      N.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      S || x || ((S = !0), L(E));
    }),
    (e.unstable_forceFrameRate = function (N) {
      0 > N || 125 < N
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
          )
        : (A = 0 < N ? Math.floor(1e3 / N) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return v;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (N) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var _ = 3;
          break;
        default:
          _ = v;
      }
      var I = v;
      v = _;
      try {
        return N();
      } finally {
        v = I;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (N, _) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var I = v;
      v = N;
      try {
        return _();
      } finally {
        v = I;
      }
    }),
    (e.unstable_scheduleCallback = function (N, _, I) {
      var $ = e.unstable_now();
      switch (
        (typeof I == 'object' && I !== null
          ? ((I = I.delay), (I = typeof I == 'number' && 0 < I ? $ + I : $))
          : (I = $),
        N)
      ) {
        case 1:
          var J = -1;
          break;
        case 2:
          J = 250;
          break;
        case 5:
          J = 1073741823;
          break;
        case 4:
          J = 1e4;
          break;
        default:
          J = 5e3;
      }
      return (
        (J = I + J),
        (N = {
          id: d++,
          callback: _,
          priorityLevel: N,
          startTime: I,
          expirationTime: J,
          sortIndex: -1,
        }),
        I > $
          ? ((N.sortIndex = I),
            t(u, N),
            n(a) === null &&
              N === n(u) &&
              (p ? (m(P), (P = -1)) : (p = !0), V(C, I - $)))
          : ((N.sortIndex = J), t(a, N), S || x || ((S = !0), L(E))),
        N
      );
    }),
    (e.unstable_shouldYield = z),
    (e.unstable_wrapCallback = function (N) {
      var _ = v;
      return function () {
        var I = v;
        v = _;
        try {
          return N.apply(this, arguments);
        } finally {
          v = I;
        }
      };
    }));
})(op);
rp.exports = op;
var zy = rp.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $y = c,
  Je = zy;
function b(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
    n < arguments.length;
    n++
  )
    t += '&args[]=' + encodeURIComponent(arguments[n]);
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
var ip = new Set(),
  Mo = {};
function tr(e, t) {
  ($r(e, t), $r(e + 'Capture', t));
}
function $r(e, t) {
  for (Mo[e] = t, e = 0; e < t.length; e++) ip.add(t[e]);
}
var Ht = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  na = Object.prototype.hasOwnProperty,
  Uy =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Fc = {},
  zc = {};
function Vy(e) {
  return na.call(zc, e)
    ? !0
    : na.call(Fc, e)
      ? !1
      : Uy.test(e)
        ? (zc[e] = !0)
        : ((Fc[e] = !0), !1);
}
function By(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0;
    case 'boolean':
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-');
    default:
      return !1;
  }
}
function Wy(e, t, n, r) {
  if (t === null || typeof t > 'u' || By(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function $e(e, t, n, r, o, i, s) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = s));
}
var ke = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    ke[e] = new $e(e, 0, !1, e, null, !1, !1);
  });
[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0];
  ke[t] = new $e(t, 1, !1, e[1], null, !1, !1);
});
['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  ke[e] = new $e(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  'autoReverse',
  'externalResourcesRequired',
  'focusable',
  'preserveAlpha',
].forEach(function (e) {
  ke[e] = new $e(e, 2, !1, e, null, !1, !1);
});
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    ke[e] = new $e(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  ke[e] = new $e(e, 3, !0, e, null, !1, !1);
});
['capture', 'download'].forEach(function (e) {
  ke[e] = new $e(e, 4, !1, e, null, !1, !1);
});
['cols', 'rows', 'size', 'span'].forEach(function (e) {
  ke[e] = new $e(e, 6, !1, e, null, !1, !1);
});
['rowSpan', 'start'].forEach(function (e) {
  ke[e] = new $e(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var vu = /[\-:]([a-z])/g;
function gu(e) {
  return e[1].toUpperCase();
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(vu, gu);
    ke[t] = new $e(t, 1, !1, e, null, !1, !1);
  });
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(vu, gu);
    ke[t] = new $e(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
  });
['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(vu, gu);
  ke[t] = new $e(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
});
['tabIndex', 'crossOrigin'].forEach(function (e) {
  ke[e] = new $e(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ke.xlinkHref = new $e(
  'xlinkHref',
  1,
  !1,
  'xlink:href',
  'http://www.w3.org/1999/xlink',
  !0,
  !1
);
['src', 'href', 'action', 'formAction'].forEach(function (e) {
  ke[e] = new $e(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function yu(e, t, n, r) {
  var o = ke.hasOwnProperty(t) ? ke[t] : null;
  (o !== null
    ? o.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== 'o' && t[0] !== 'O') ||
      (t[1] !== 'n' && t[1] !== 'N')) &&
    (Wy(t, n, o, r) && (n = null),
    r || o === null
      ? Vy(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : o.mustUseProperty
        ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : '') : n)
        : ((t = o.attributeName),
          (r = o.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((o = o.type),
              (n = o === 3 || (o === 4 && n === !0) ? '' : '' + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var qt = $y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  vi = Symbol.for('react.element'),
  ur = Symbol.for('react.portal'),
  cr = Symbol.for('react.fragment'),
  wu = Symbol.for('react.strict_mode'),
  ra = Symbol.for('react.profiler'),
  sp = Symbol.for('react.provider'),
  lp = Symbol.for('react.context'),
  xu = Symbol.for('react.forward_ref'),
  oa = Symbol.for('react.suspense'),
  ia = Symbol.for('react.suspense_list'),
  Su = Symbol.for('react.memo'),
  sn = Symbol.for('react.lazy'),
  ap = Symbol.for('react.offscreen'),
  $c = Symbol.iterator;
function ao(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = ($c && e[$c]) || e['@@iterator']),
      typeof e == 'function' ? e : null);
}
var fe = Object.assign,
  vl;
function wo(e) {
  if (vl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      vl = (t && t[1]) || '';
    }
  return (
    `
` +
    vl +
    e
  );
}
var gl = !1;
function yl(e, t) {
  if (!e || gl) return '';
  gl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == 'string') {
      for (
        var o = u.stack.split(`
`),
          i = r.stack.split(`
`),
          s = o.length - 1,
          l = i.length - 1;
        1 <= s && 0 <= l && o[s] !== i[l];

      )
        l--;
      for (; 1 <= s && 0 <= l; s--, l--)
        if (o[s] !== i[l]) {
          if (s !== 1 || l !== 1)
            do
              if ((s--, l--, 0 > l || o[s] !== i[l])) {
                var a =
                  `
` + o[s].replace(' at new ', ' at ');
                return (
                  e.displayName &&
                    a.includes('<anonymous>') &&
                    (a = a.replace('<anonymous>', e.displayName)),
                  a
                );
              }
            while (1 <= s && 0 <= l);
          break;
        }
    }
  } finally {
    ((gl = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : '') ? wo(e) : '';
}
function Hy(e) {
  switch (e.tag) {
    case 5:
      return wo(e.type);
    case 16:
      return wo('Lazy');
    case 13:
      return wo('Suspense');
    case 19:
      return wo('SuspenseList');
    case 0:
    case 2:
    case 15:
      return ((e = yl(e.type, !1)), e);
    case 11:
      return ((e = yl(e.type.render, !1)), e);
    case 1:
      return ((e = yl(e.type, !0)), e);
    default:
      return '';
  }
}
function sa(e) {
  if (e == null) return null;
  if (typeof e == 'function') return e.displayName || e.name || null;
  if (typeof e == 'string') return e;
  switch (e) {
    case cr:
      return 'Fragment';
    case ur:
      return 'Portal';
    case ra:
      return 'Profiler';
    case wu:
      return 'StrictMode';
    case oa:
      return 'Suspense';
    case ia:
      return 'SuspenseList';
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case lp:
        return (e.displayName || 'Context') + '.Consumer';
      case sp:
        return (e._context.displayName || 'Context') + '.Provider';
      case xu:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        );
      case Su:
        return (
          (t = e.displayName || null),
          t !== null ? t : sa(e.type) || 'Memo'
        );
      case sn:
        ((t = e._payload), (e = e._init));
        try {
          return sa(e(t));
        } catch {}
    }
  return null;
}
function Ky(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return 'Cache';
    case 9:
      return (t.displayName || 'Context') + '.Consumer';
    case 10:
      return (t._context.displayName || 'Context') + '.Provider';
    case 18:
      return 'DehydratedFragment';
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ''),
        t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      );
    case 7:
      return 'Fragment';
    case 5:
      return t;
    case 4:
      return 'Portal';
    case 3:
      return 'Root';
    case 6:
      return 'Text';
    case 16:
      return sa(t);
    case 8:
      return t === wu ? 'StrictMode' : 'Mode';
    case 22:
      return 'Offscreen';
    case 12:
      return 'Profiler';
    case 21:
      return 'Scope';
    case 13:
      return 'Suspense';
    case 19:
      return 'SuspenseList';
    case 25:
      return 'TracingMarker';
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == 'function') return t.displayName || t.name || null;
      if (typeof t == 'string') return t;
  }
  return null;
}
function Pn(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return e;
    case 'object':
      return e;
    default:
      return '';
  }
}
function up(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === 'input' &&
    (t === 'checkbox' || t === 'radio')
  );
}
function Qy(e) {
  var t = up(e) ? 'checked' : 'value',
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = '' + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < 'u' &&
    typeof n.get == 'function' &&
    typeof n.set == 'function'
  ) {
    var o = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (s) {
          ((r = '' + s), i.call(this, s));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = '' + s;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function gi(e) {
  e._valueTracker || (e._valueTracker = Qy(e));
}
function cp(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = '';
  return (
    e && (r = up(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function os(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u'))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function la(e, t) {
  var n = t.checked;
  return fe({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Uc(e, t) {
  var n = t.defaultValue == null ? '' : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = Pn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === 'checkbox' || t.type === 'radio'
          ? t.checked != null
          : t.value != null,
    }));
}
function dp(e, t) {
  ((t = t.checked), t != null && yu(e, 'checked', t, !1));
}
function aa(e, t) {
  dp(e, t);
  var n = Pn(t.value),
    r = t.type;
  if (n != null)
    r === 'number'
      ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
      : e.value !== '' + n && (e.value = '' + n);
  else if (r === 'submit' || r === 'reset') {
    e.removeAttribute('value');
    return;
  }
  (t.hasOwnProperty('value')
    ? ua(e, t.type, n)
    : t.hasOwnProperty('defaultValue') && ua(e, t.type, Pn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function Vc(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type;
    if (
      !(
        (r !== 'submit' && r !== 'reset') ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    ((t = '' + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== '' && (e.name = n));
}
function ua(e, t, n) {
  (t !== 'number' || os(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
}
var xo = Array.isArray;
function Sr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t['$' + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      ((o = t.hasOwnProperty('$' + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0));
  } else {
    for (n = '' + Pn(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        ((e[o].selected = !0), r && (e[o].defaultSelected = !0));
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function ca(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(b(91));
  return fe({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  });
}
function Bc(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(b(92));
      if (xo(n)) {
        if (1 < n.length) throw Error(b(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ''), (n = t));
  }
  e._wrapperState = { initialValue: Pn(n) };
}
function fp(e, t) {
  var n = Pn(t.value),
    r = Pn(t.defaultValue);
  (n != null &&
    ((n = '' + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = '' + r));
}
function Wc(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t);
}
function pp(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function da(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? pp(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : e;
}
var yi,
  hp = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
      e.innerHTML = t;
    else {
      for (
        yi = yi || document.createElement('div'),
          yi.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = yi.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Do(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var ko = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Gy = ['Webkit', 'ms', 'Moz', 'O'];
Object.keys(ko).forEach(function (e) {
  Gy.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ko[t] = ko[e]));
  });
});
function mp(e, t, n) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : n || typeof t != 'number' || t === 0 || (ko.hasOwnProperty(e) && ko[e])
      ? ('' + t).trim()
      : t + 'px';
}
function vp(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf('--') === 0,
        o = mp(n, t[n], r);
      (n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, o) : (e[n] = o));
    }
}
var Yy = fe(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function fa(e, t) {
  if (t) {
    if (Yy[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(b(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(b(60));
      if (
        typeof t.dangerouslySetInnerHTML != 'object' ||
        !('__html' in t.dangerouslySetInnerHTML)
      )
        throw Error(b(61));
    }
    if (t.style != null && typeof t.style != 'object') throw Error(b(62));
  }
}
function pa(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string';
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1;
    default:
      return !0;
  }
}
var ha = null;
function Cu(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var ma = null,
  Cr = null,
  Er = null;
function Hc(e) {
  if ((e = li(e))) {
    if (typeof ma != 'function') throw Error(b(280));
    var t = e.stateNode;
    t && ((t = $s(t)), ma(e.stateNode, e.type, t));
  }
}
function gp(e) {
  Cr ? (Er ? Er.push(e) : (Er = [e])) : (Cr = e);
}
function yp() {
  if (Cr) {
    var e = Cr,
      t = Er;
    if (((Er = Cr = null), Hc(e), t)) for (e = 0; e < t.length; e++) Hc(t[e]);
  }
}
function wp(e, t) {
  return e(t);
}
function xp() {}
var wl = !1;
function Sp(e, t, n) {
  if (wl) return e(t, n);
  wl = !0;
  try {
    return wp(e, t, n);
  } finally {
    ((wl = !1), (Cr !== null || Er !== null) && (xp(), yp()));
  }
}
function Io(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = $s(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === 'button' ||
          e === 'input' ||
          e === 'select' ||
          e === 'textarea'
        ))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != 'function') throw Error(b(231, t, typeof n));
  return n;
}
var va = !1;
if (Ht)
  try {
    var uo = {};
    (Object.defineProperty(uo, 'passive', {
      get: function () {
        va = !0;
      },
    }),
      window.addEventListener('test', uo, uo),
      window.removeEventListener('test', uo, uo));
  } catch {
    va = !1;
  }
function Xy(e, t, n, r, o, i, s, l, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (d) {
    this.onError(d);
  }
}
var Po = !1,
  is = null,
  ss = !1,
  ga = null,
  qy = {
    onError: function (e) {
      ((Po = !0), (is = e));
    },
  };
function Zy(e, t, n, r, o, i, s, l, a) {
  ((Po = !1), (is = null), Xy.apply(qy, arguments));
}
function Jy(e, t, n, r, o, i, s, l, a) {
  if ((Zy.apply(this, arguments), Po)) {
    if (Po) {
      var u = is;
      ((Po = !1), (is = null));
    } else throw Error(b(198));
    ss || ((ss = !0), (ga = u));
  }
}
function nr(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Cp(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Kc(e) {
  if (nr(e) !== e) throw Error(b(188));
}
function e0(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = nr(e)), t === null)) throw Error(b(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var o = n.return;
    if (o === null) break;
    var i = o.alternate;
    if (i === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === i.child) {
      for (i = o.child; i; ) {
        if (i === n) return (Kc(o), e);
        if (i === r) return (Kc(o), t);
        i = i.sibling;
      }
      throw Error(b(188));
    }
    if (n.return !== r.return) ((n = o), (r = i));
    else {
      for (var s = !1, l = o.child; l; ) {
        if (l === n) {
          ((s = !0), (n = o), (r = i));
          break;
        }
        if (l === r) {
          ((s = !0), (r = o), (n = i));
          break;
        }
        l = l.sibling;
      }
      if (!s) {
        for (l = i.child; l; ) {
          if (l === n) {
            ((s = !0), (n = i), (r = o));
            break;
          }
          if (l === r) {
            ((s = !0), (r = i), (n = o));
            break;
          }
          l = l.sibling;
        }
        if (!s) throw Error(b(189));
      }
    }
    if (n.alternate !== r) throw Error(b(190));
  }
  if (n.tag !== 3) throw Error(b(188));
  return n.stateNode.current === n ? e : t;
}
function Ep(e) {
  return ((e = e0(e)), e !== null ? kp(e) : null);
}
function kp(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = kp(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Pp = Je.unstable_scheduleCallback,
  Qc = Je.unstable_cancelCallback,
  t0 = Je.unstable_shouldYield,
  n0 = Je.unstable_requestPaint,
  me = Je.unstable_now,
  r0 = Je.unstable_getCurrentPriorityLevel,
  Eu = Je.unstable_ImmediatePriority,
  Tp = Je.unstable_UserBlockingPriority,
  ls = Je.unstable_NormalPriority,
  o0 = Je.unstable_LowPriority,
  Np = Je.unstable_IdlePriority,
  Is = null,
  jt = null;
function i0(e) {
  if (jt && typeof jt.onCommitFiberRoot == 'function')
    try {
      jt.onCommitFiberRoot(Is, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var gt = Math.clz32 ? Math.clz32 : a0,
  s0 = Math.log,
  l0 = Math.LN2;
function a0(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((s0(e) / l0) | 0)) | 0);
}
var wi = 64,
  xi = 4194304;
function So(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function as(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    i = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var l = s & ~o;
    l !== 0 ? (r = So(l)) : ((i &= s), i !== 0 && (r = So(i)));
  } else ((s = n & ~o), s !== 0 ? (r = So(s)) : i !== 0 && (r = So(i)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & o) &&
    ((o = r & -r), (i = t & -t), o >= i || (o === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      ((n = 31 - gt(t)), (o = 1 << n), (r |= e[n]), (t &= ~o));
  return r;
}
function u0(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function c0(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      o = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var s = 31 - gt(i),
      l = 1 << s,
      a = o[s];
    (a === -1
      ? (!(l & n) || l & r) && (o[s] = u0(l, t))
      : a <= t && (e.expiredLanes |= l),
      (i &= ~l));
  }
}
function ya(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Rp() {
  var e = wi;
  return ((wi <<= 1), !(wi & 4194240) && (wi = 64), e);
}
function xl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ii(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - gt(t)),
    (e[t] = n));
}
function d0(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - gt(n),
      i = 1 << o;
    ((t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i));
  }
}
function ku(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - gt(n),
      o = 1 << r;
    ((o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o));
  }
}
var Z = 0;
function bp(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var _p,
  Pu,
  Op,
  Ap,
  jp,
  wa = !1,
  Si = [],
  gn = null,
  yn = null,
  wn = null,
  Lo = new Map(),
  Fo = new Map(),
  an = [],
  f0 =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' '
    );
function Gc(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      gn = null;
      break;
    case 'dragenter':
    case 'dragleave':
      yn = null;
      break;
    case 'mouseover':
    case 'mouseout':
      wn = null;
      break;
    case 'pointerover':
    case 'pointerout':
      Lo.delete(t.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      Fo.delete(t.pointerId);
  }
}
function co(e, t, n, r, o, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o],
      }),
      t !== null && ((t = li(t)), t !== null && Pu(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function p0(e, t, n, r, o) {
  switch (t) {
    case 'focusin':
      return ((gn = co(gn, e, t, n, r, o)), !0);
    case 'dragenter':
      return ((yn = co(yn, e, t, n, r, o)), !0);
    case 'mouseover':
      return ((wn = co(wn, e, t, n, r, o)), !0);
    case 'pointerover':
      var i = o.pointerId;
      return (Lo.set(i, co(Lo.get(i) || null, e, t, n, r, o)), !0);
    case 'gotpointercapture':
      return (
        (i = o.pointerId),
        Fo.set(i, co(Fo.get(i) || null, e, t, n, r, o)),
        !0
      );
  }
  return !1;
}
function Mp(e) {
  var t = Ln(e.target);
  if (t !== null) {
    var n = nr(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Cp(n)), t !== null)) {
          ((e.blockedOn = t),
            jp(e.priority, function () {
              Op(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Vi(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = xa(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((ha = r), n.target.dispatchEvent(r), (ha = null));
    } else return ((t = li(n)), t !== null && Pu(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function Yc(e, t, n) {
  Vi(e) && n.delete(t);
}
function h0() {
  ((wa = !1),
    gn !== null && Vi(gn) && (gn = null),
    yn !== null && Vi(yn) && (yn = null),
    wn !== null && Vi(wn) && (wn = null),
    Lo.forEach(Yc),
    Fo.forEach(Yc));
}
function fo(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    wa ||
      ((wa = !0),
      Je.unstable_scheduleCallback(Je.unstable_NormalPriority, h0)));
}
function zo(e) {
  function t(o) {
    return fo(o, e);
  }
  if (0 < Si.length) {
    fo(Si[0], e);
    for (var n = 1; n < Si.length; n++) {
      var r = Si[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    gn !== null && fo(gn, e),
      yn !== null && fo(yn, e),
      wn !== null && fo(wn, e),
      Lo.forEach(t),
      Fo.forEach(t),
      n = 0;
    n < an.length;
    n++
  )
    ((r = an[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < an.length && ((n = an[0]), n.blockedOn === null); )
    (Mp(n), n.blockedOn === null && an.shift());
}
var kr = qt.ReactCurrentBatchConfig,
  us = !0;
function m0(e, t, n, r) {
  var o = Z,
    i = kr.transition;
  kr.transition = null;
  try {
    ((Z = 1), Tu(e, t, n, r));
  } finally {
    ((Z = o), (kr.transition = i));
  }
}
function v0(e, t, n, r) {
  var o = Z,
    i = kr.transition;
  kr.transition = null;
  try {
    ((Z = 4), Tu(e, t, n, r));
  } finally {
    ((Z = o), (kr.transition = i));
  }
}
function Tu(e, t, n, r) {
  if (us) {
    var o = xa(e, t, n, r);
    if (o === null) (_l(e, t, r, cs, n), Gc(e, r));
    else if (p0(o, e, t, n, r)) r.stopPropagation();
    else if ((Gc(e, r), t & 4 && -1 < f0.indexOf(e))) {
      for (; o !== null; ) {
        var i = li(o);
        if (
          (i !== null && _p(i),
          (i = xa(e, t, n, r)),
          i === null && _l(e, t, r, cs, n),
          i === o)
        )
          break;
        o = i;
      }
      o !== null && r.stopPropagation();
    } else _l(e, t, r, null, n);
  }
}
var cs = null;
function xa(e, t, n, r) {
  if (((cs = null), (e = Cu(r)), (e = Ln(e)), e !== null))
    if (((t = nr(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Cp(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((cs = e), null);
}
function Dp(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1;
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4;
    case 'message':
      switch (r0()) {
        case Eu:
          return 1;
        case Tp:
          return 4;
        case ls:
        case o0:
          return 16;
        case Np:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var mn = null,
  Nu = null,
  Bi = null;
function Ip() {
  if (Bi) return Bi;
  var e,
    t = Nu,
    n = t.length,
    r,
    o = 'value' in mn ? mn.value : mn.textContent,
    i = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === o[i - r]; r++);
  return (Bi = o.slice(e, 1 < r ? 1 - r : void 0));
}
function Wi(e) {
  var t = e.keyCode;
  return (
    'charCode' in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Ci() {
  return !0;
}
function Xc() {
  return !1;
}
function nt(e) {
  function t(n, r, o, i, s) {
    ((this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = s),
      (this.currentTarget = null));
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(i) : i[l]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Ci
        : Xc),
      (this.isPropagationStopped = Xc),
      this
    );
  }
  return (
    fe(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
          (this.isDefaultPrevented = Ci));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
          (this.isPropagationStopped = Ci));
      },
      persist: function () {},
      isPersistent: Ci,
    }),
    t
  );
}
var Zr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Ru = nt(Zr),
  si = fe({}, Zr, { view: 0, detail: 0 }),
  g0 = nt(si),
  Sl,
  Cl,
  po,
  Ls = fe({}, si, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: bu,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== po &&
            (po && e.type === 'mousemove'
              ? ((Sl = e.screenX - po.screenX), (Cl = e.screenY - po.screenY))
              : (Cl = Sl = 0),
            (po = e)),
          Sl);
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : Cl;
    },
  }),
  qc = nt(Ls),
  y0 = fe({}, Ls, { dataTransfer: 0 }),
  w0 = nt(y0),
  x0 = fe({}, si, { relatedTarget: 0 }),
  El = nt(x0),
  S0 = fe({}, Zr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  C0 = nt(S0),
  E0 = fe({}, Zr, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  k0 = nt(E0),
  P0 = fe({}, Zr, { data: 0 }),
  Zc = nt(P0),
  T0 = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  N0 = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  R0 = {
    Alt: 'altKey',
    Control: 'ctrlKey',
    Meta: 'metaKey',
    Shift: 'shiftKey',
  };
function b0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = R0[e]) ? !!t[e] : !1;
}
function bu() {
  return b0;
}
var _0 = fe({}, si, {
    key: function (e) {
      if (e.key) {
        var t = T0[e.key] || e.key;
        if (t !== 'Unidentified') return t;
      }
      return e.type === 'keypress'
        ? ((e = Wi(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
          ? N0[e.keyCode] || 'Unidentified'
          : '';
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: bu,
    charCode: function (e) {
      return e.type === 'keypress' ? Wi(e) : 0;
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === 'keypress'
        ? Wi(e)
        : e.type === 'keydown' || e.type === 'keyup'
          ? e.keyCode
          : 0;
    },
  }),
  O0 = nt(_0),
  A0 = fe({}, Ls, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Jc = nt(A0),
  j0 = fe({}, si, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: bu,
  }),
  M0 = nt(j0),
  D0 = fe({}, Zr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  I0 = nt(D0),
  L0 = fe({}, Ls, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return 'deltaY' in e
        ? e.deltaY
        : 'wheelDeltaY' in e
          ? -e.wheelDeltaY
          : 'wheelDelta' in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  F0 = nt(L0),
  z0 = [9, 13, 27, 32],
  _u = Ht && 'CompositionEvent' in window,
  To = null;
Ht && 'documentMode' in document && (To = document.documentMode);
var $0 = Ht && 'TextEvent' in window && !To,
  Lp = Ht && (!_u || (To && 8 < To && 11 >= To)),
  ed = ' ',
  td = !1;
function Fp(e, t) {
  switch (e) {
    case 'keyup':
      return z0.indexOf(t.keyCode) !== -1;
    case 'keydown':
      return t.keyCode !== 229;
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0;
    default:
      return !1;
  }
}
function zp(e) {
  return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
}
var dr = !1;
function U0(e, t) {
  switch (e) {
    case 'compositionend':
      return zp(t);
    case 'keypress':
      return t.which !== 32 ? null : ((td = !0), ed);
    case 'textInput':
      return ((e = t.data), e === ed && td ? null : e);
    default:
      return null;
  }
}
function V0(e, t) {
  if (dr)
    return e === 'compositionend' || (!_u && Fp(e, t))
      ? ((e = Ip()), (Bi = Nu = mn = null), (dr = !1), e)
      : null;
  switch (e) {
    case 'paste':
      return null;
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case 'compositionend':
      return Lp && t.locale !== 'ko' ? null : t.data;
    default:
      return null;
  }
}
var B0 = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function nd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === 'input' ? !!B0[e.type] : t === 'textarea';
}
function $p(e, t, n, r) {
  (gp(r),
    (t = ds(t, 'onChange')),
    0 < t.length &&
      ((n = new Ru('onChange', 'change', null, n, r)),
      e.push({ event: n, listeners: t })));
}
var No = null,
  $o = null;
function W0(e) {
  qp(e, 0);
}
function Fs(e) {
  var t = hr(e);
  if (cp(t)) return e;
}
function H0(e, t) {
  if (e === 'change') return t;
}
var Up = !1;
if (Ht) {
  var kl;
  if (Ht) {
    var Pl = 'oninput' in document;
    if (!Pl) {
      var rd = document.createElement('div');
      (rd.setAttribute('oninput', 'return;'),
        (Pl = typeof rd.oninput == 'function'));
    }
    kl = Pl;
  } else kl = !1;
  Up = kl && (!document.documentMode || 9 < document.documentMode);
}
function od() {
  No && (No.detachEvent('onpropertychange', Vp), ($o = No = null));
}
function Vp(e) {
  if (e.propertyName === 'value' && Fs($o)) {
    var t = [];
    ($p(t, $o, e, Cu(e)), Sp(W0, t));
  }
}
function K0(e, t, n) {
  e === 'focusin'
    ? (od(), (No = t), ($o = n), No.attachEvent('onpropertychange', Vp))
    : e === 'focusout' && od();
}
function Q0(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
    return Fs($o);
}
function G0(e, t) {
  if (e === 'click') return Fs(t);
}
function Y0(e, t) {
  if (e === 'input' || e === 'change') return Fs(t);
}
function X0(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var wt = typeof Object.is == 'function' ? Object.is : X0;
function Uo(e, t) {
  if (wt(e, t)) return !0;
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!na.call(t, o) || !wt(e[o], t[o])) return !1;
  }
  return !0;
}
function id(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function sd(e, t) {
  var n = id(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = id(n);
  }
}
function Bp(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Bp(e, t.parentNode)
          : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Wp() {
  for (var e = window, t = os(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == 'string';
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = os(e.document);
  }
  return t;
}
function Ou(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  );
}
function q0(e) {
  var t = Wp(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Bp(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Ou(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        'selectionStart' in n)
      )
        ((n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length)));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = n.textContent.length,
          i = Math.min(r.start, o);
        ((r = r.end === void 0 ? i : Math.min(r.end, o)),
          !e.extend && i > r && ((o = r), (r = i), (i = o)),
          (o = sd(n, i)));
        var s = sd(n, r);
        o &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var Z0 = Ht && 'documentMode' in document && 11 >= document.documentMode,
  fr = null,
  Sa = null,
  Ro = null,
  Ca = !1;
function ld(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ca ||
    fr == null ||
    fr !== os(r) ||
    ((r = fr),
    'selectionStart' in r && Ou(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Ro && Uo(Ro, r)) ||
      ((Ro = r),
      (r = ds(Sa, 'onSelect')),
      0 < r.length &&
        ((t = new Ru('onSelect', 'select', null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = fr))));
}
function Ei(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n['Webkit' + e] = 'webkit' + t),
    (n['Moz' + e] = 'moz' + t),
    n
  );
}
var pr = {
    animationend: Ei('Animation', 'AnimationEnd'),
    animationiteration: Ei('Animation', 'AnimationIteration'),
    animationstart: Ei('Animation', 'AnimationStart'),
    transitionend: Ei('Transition', 'TransitionEnd'),
  },
  Tl = {},
  Hp = {};
Ht &&
  ((Hp = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete pr.animationend.animation,
    delete pr.animationiteration.animation,
    delete pr.animationstart.animation),
  'TransitionEvent' in window || delete pr.transitionend.transition);
function zs(e) {
  if (Tl[e]) return Tl[e];
  if (!pr[e]) return e;
  var t = pr[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Hp) return (Tl[e] = t[n]);
  return e;
}
var Kp = zs('animationend'),
  Qp = zs('animationiteration'),
  Gp = zs('animationstart'),
  Yp = zs('transitionend'),
  Xp = new Map(),
  ad =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' '
    );
function _n(e, t) {
  (Xp.set(e, t), tr(t, [e]));
}
for (var Nl = 0; Nl < ad.length; Nl++) {
  var Rl = ad[Nl],
    J0 = Rl.toLowerCase(),
    ew = Rl[0].toUpperCase() + Rl.slice(1);
  _n(J0, 'on' + ew);
}
_n(Kp, 'onAnimationEnd');
_n(Qp, 'onAnimationIteration');
_n(Gp, 'onAnimationStart');
_n('dblclick', 'onDoubleClick');
_n('focusin', 'onFocus');
_n('focusout', 'onBlur');
_n(Yp, 'onTransitionEnd');
$r('onMouseEnter', ['mouseout', 'mouseover']);
$r('onMouseLeave', ['mouseout', 'mouseover']);
$r('onPointerEnter', ['pointerout', 'pointerover']);
$r('onPointerLeave', ['pointerout', 'pointerover']);
tr(
  'onChange',
  'change click focusin focusout input keydown keyup selectionchange'.split(' ')
);
tr(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
    ' '
  )
);
tr('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
tr(
  'onCompositionEnd',
  'compositionend focusout keydown keypress keyup mousedown'.split(' ')
);
tr(
  'onCompositionStart',
  'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
);
tr(
  'onCompositionUpdate',
  'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
);
var Co =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    ),
  tw = new Set('cancel close invalid load scroll toggle'.split(' ').concat(Co));
function ud(e, t, n) {
  var r = e.type || 'unknown-event';
  ((e.currentTarget = n), Jy(r, t, void 0, e), (e.currentTarget = null));
}
function qp(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var l = r[s],
            a = l.instance,
            u = l.currentTarget;
          if (((l = l.listener), a !== i && o.isPropagationStopped())) break e;
          (ud(o, l, u), (i = a));
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((l = r[s]),
            (a = l.instance),
            (u = l.currentTarget),
            (l = l.listener),
            a !== i && o.isPropagationStopped())
          )
            break e;
          (ud(o, l, u), (i = a));
        }
    }
  }
  if (ss) throw ((e = ga), (ss = !1), (ga = null), e);
}
function le(e, t) {
  var n = t[Na];
  n === void 0 && (n = t[Na] = new Set());
  var r = e + '__bubble';
  n.has(r) || (Zp(t, e, 2, !1), n.add(r));
}
function bl(e, t, n) {
  var r = 0;
  (t && (r |= 4), Zp(n, e, r, t));
}
var ki = '_reactListening' + Math.random().toString(36).slice(2);
function Vo(e) {
  if (!e[ki]) {
    ((e[ki] = !0),
      ip.forEach(function (n) {
        n !== 'selectionchange' && (tw.has(n) || bl(n, !1, e), bl(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[ki] || ((t[ki] = !0), bl('selectionchange', !1, t));
  }
}
function Zp(e, t, n, r) {
  switch (Dp(t)) {
    case 1:
      var o = m0;
      break;
    case 4:
      o = v0;
      break;
    default:
      o = Tu;
  }
  ((n = o.bind(null, t, n, e)),
    (o = void 0),
    !va ||
      (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
      (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
        ? e.addEventListener(t, n, { passive: o })
        : e.addEventListener(t, n, !1));
}
function _l(e, t, n, r, o) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var l = r.stateNode.containerInfo;
        if (l === o || (l.nodeType === 8 && l.parentNode === o)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var a = s.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = s.stateNode.containerInfo),
              a === o || (a.nodeType === 8 && a.parentNode === o))
            )
              return;
            s = s.return;
          }
        for (; l !== null; ) {
          if (((s = Ln(l)), s === null)) return;
          if (((a = s.tag), a === 5 || a === 6)) {
            r = i = s;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  Sp(function () {
    var u = i,
      d = Cu(n),
      h = [];
    e: {
      var v = Xp.get(e);
      if (v !== void 0) {
        var x = Ru,
          S = e;
        switch (e) {
          case 'keypress':
            if (Wi(n) === 0) break e;
          case 'keydown':
          case 'keyup':
            x = O0;
            break;
          case 'focusin':
            ((S = 'focus'), (x = El));
            break;
          case 'focusout':
            ((S = 'blur'), (x = El));
            break;
          case 'beforeblur':
          case 'afterblur':
            x = El;
            break;
          case 'click':
            if (n.button === 2) break e;
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            x = qc;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            x = w0;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            x = M0;
            break;
          case Kp:
          case Qp:
          case Gp:
            x = C0;
            break;
          case Yp:
            x = I0;
            break;
          case 'scroll':
            x = g0;
            break;
          case 'wheel':
            x = F0;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            x = k0;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            x = Jc;
        }
        var p = (t & 4) !== 0,
          w = !p && e === 'scroll',
          m = p ? (v !== null ? v + 'Capture' : null) : v;
        p = [];
        for (var f = u, g; f !== null; ) {
          g = f;
          var C = g.stateNode;
          if (
            (g.tag === 5 &&
              C !== null &&
              ((g = C),
              m !== null && ((C = Io(f, m)), C != null && p.push(Bo(f, C, g)))),
            w)
          )
            break;
          f = f.return;
        }
        0 < p.length &&
          ((v = new x(v, S, null, n, d)), h.push({ event: v, listeners: p }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((v = e === 'mouseover' || e === 'pointerover'),
          (x = e === 'mouseout' || e === 'pointerout'),
          v &&
            n !== ha &&
            (S = n.relatedTarget || n.fromElement) &&
            (Ln(S) || S[Kt]))
        )
          break e;
        if (
          (x || v) &&
          ((v =
            d.window === d
              ? d
              : (v = d.ownerDocument)
                ? v.defaultView || v.parentWindow
                : window),
          x
            ? ((S = n.relatedTarget || n.toElement),
              (x = u),
              (S = S ? Ln(S) : null),
              S !== null &&
                ((w = nr(S)), S !== w || (S.tag !== 5 && S.tag !== 6)) &&
                (S = null))
            : ((x = null), (S = u)),
          x !== S)
        ) {
          if (
            ((p = qc),
            (C = 'onMouseLeave'),
            (m = 'onMouseEnter'),
            (f = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((p = Jc),
              (C = 'onPointerLeave'),
              (m = 'onPointerEnter'),
              (f = 'pointer')),
            (w = x == null ? v : hr(x)),
            (g = S == null ? v : hr(S)),
            (v = new p(C, f + 'leave', x, n, d)),
            (v.target = w),
            (v.relatedTarget = g),
            (C = null),
            Ln(d) === u &&
              ((p = new p(m, f + 'enter', S, n, d)),
              (p.target = g),
              (p.relatedTarget = w),
              (C = p)),
            (w = C),
            x && S)
          )
            t: {
              for (p = x, m = S, f = 0, g = p; g; g = ir(g)) f++;
              for (g = 0, C = m; C; C = ir(C)) g++;
              for (; 0 < f - g; ) ((p = ir(p)), f--);
              for (; 0 < g - f; ) ((m = ir(m)), g--);
              for (; f--; ) {
                if (p === m || (m !== null && p === m.alternate)) break t;
                ((p = ir(p)), (m = ir(m)));
              }
              p = null;
            }
          else p = null;
          (x !== null && cd(h, v, x, p, !1),
            S !== null && w !== null && cd(h, w, S, p, !0));
        }
      }
      e: {
        if (
          ((v = u ? hr(u) : window),
          (x = v.nodeName && v.nodeName.toLowerCase()),
          x === 'select' || (x === 'input' && v.type === 'file'))
        )
          var E = H0;
        else if (nd(v))
          if (Up) E = Y0;
          else {
            E = Q0;
            var T = K0;
          }
        else
          (x = v.nodeName) &&
            x.toLowerCase() === 'input' &&
            (v.type === 'checkbox' || v.type === 'radio') &&
            (E = G0);
        if (E && (E = E(e, u))) {
          $p(h, E, n, d);
          break e;
        }
        (T && T(e, v, u),
          e === 'focusout' &&
            (T = v._wrapperState) &&
            T.controlled &&
            v.type === 'number' &&
            ua(v, 'number', v.value));
      }
      switch (((T = u ? hr(u) : window), e)) {
        case 'focusin':
          (nd(T) || T.contentEditable === 'true') &&
            ((fr = T), (Sa = u), (Ro = null));
          break;
        case 'focusout':
          Ro = Sa = fr = null;
          break;
        case 'mousedown':
          Ca = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          ((Ca = !1), ld(h, n, d));
          break;
        case 'selectionchange':
          if (Z0) break;
        case 'keydown':
        case 'keyup':
          ld(h, n, d);
      }
      var k;
      if (_u)
        e: {
          switch (e) {
            case 'compositionstart':
              var P = 'onCompositionStart';
              break e;
            case 'compositionend':
              P = 'onCompositionEnd';
              break e;
            case 'compositionupdate':
              P = 'onCompositionUpdate';
              break e;
          }
          P = void 0;
        }
      else
        dr
          ? Fp(e, n) && (P = 'onCompositionEnd')
          : e === 'keydown' && n.keyCode === 229 && (P = 'onCompositionStart');
      (P &&
        (Lp &&
          n.locale !== 'ko' &&
          (dr || P !== 'onCompositionStart'
            ? P === 'onCompositionEnd' && dr && (k = Ip())
            : ((mn = d),
              (Nu = 'value' in mn ? mn.value : mn.textContent),
              (dr = !0))),
        (T = ds(u, P)),
        0 < T.length &&
          ((P = new Zc(P, e, null, n, d)),
          h.push({ event: P, listeners: T }),
          k ? (P.data = k) : ((k = zp(n)), k !== null && (P.data = k)))),
        (k = $0 ? U0(e, n) : V0(e, n)) &&
          ((u = ds(u, 'onBeforeInput')),
          0 < u.length &&
            ((d = new Zc('onBeforeInput', 'beforeinput', null, n, d)),
            h.push({ event: d, listeners: u }),
            (d.data = k))));
    }
    qp(h, t);
  });
}
function Bo(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ds(e, t) {
  for (var n = t + 'Capture', r = []; e !== null; ) {
    var o = e,
      i = o.stateNode;
    (o.tag === 5 &&
      i !== null &&
      ((o = i),
      (i = Io(e, n)),
      i != null && r.unshift(Bo(e, i, o)),
      (i = Io(e, t)),
      i != null && r.push(Bo(e, i, o))),
      (e = e.return));
  }
  return r;
}
function ir(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function cd(e, t, n, r, o) {
  for (var i = t._reactName, s = []; n !== null && n !== r; ) {
    var l = n,
      a = l.alternate,
      u = l.stateNode;
    if (a !== null && a === r) break;
    (l.tag === 5 &&
      u !== null &&
      ((l = u),
      o
        ? ((a = Io(n, i)), a != null && s.unshift(Bo(n, a, l)))
        : o || ((a = Io(n, i)), a != null && s.push(Bo(n, a, l)))),
      (n = n.return));
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var nw = /\r\n?/g,
  rw = /\u0000|\uFFFD/g;
function dd(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      nw,
      `
`
    )
    .replace(rw, '');
}
function Pi(e, t, n) {
  if (((t = dd(t)), dd(e) !== t && n)) throw Error(b(425));
}
function fs() {}
var Ea = null,
  ka = null;
function Pa(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Ta = typeof setTimeout == 'function' ? setTimeout : void 0,
  ow = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  fd = typeof Promise == 'function' ? Promise : void 0,
  iw =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof fd < 'u'
        ? function (e) {
            return fd.resolve(null).then(e).catch(sw);
          }
        : Ta;
function sw(e) {
  setTimeout(function () {
    throw e;
  });
}
function Ol(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === '/$')) {
        if (r === 0) {
          (e.removeChild(o), zo(t));
          return;
        }
        r--;
      } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
    n = o;
  } while (n);
  zo(t);
}
function xn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
      if (t === '/$') return null;
    }
  }
  return e;
}
function pd(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === '$' || n === '$!' || n === '$?') {
        if (t === 0) return e;
        t--;
      } else n === '/$' && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Jr = Math.random().toString(36).slice(2),
  Ot = '__reactFiber$' + Jr,
  Wo = '__reactProps$' + Jr,
  Kt = '__reactContainer$' + Jr,
  Na = '__reactEvents$' + Jr,
  lw = '__reactListeners$' + Jr,
  aw = '__reactHandles$' + Jr;
function Ln(e) {
  var t = e[Ot];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Kt] || n[Ot])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = pd(e); e !== null; ) {
          if ((n = e[Ot])) return n;
          e = pd(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function li(e) {
  return (
    (e = e[Ot] || e[Kt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function hr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(b(33));
}
function $s(e) {
  return e[Wo] || null;
}
var Ra = [],
  mr = -1;
function On(e) {
  return { current: e };
}
function ae(e) {
  0 > mr || ((e.current = Ra[mr]), (Ra[mr] = null), mr--);
}
function re(e, t) {
  (mr++, (Ra[mr] = e.current), (e.current = t));
}
var Tn = {},
  Oe = On(Tn),
  Be = On(!1),
  Qn = Tn;
function Ur(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Tn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    i;
  for (i in n) o[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function We(e) {
  return ((e = e.childContextTypes), e != null);
}
function ps() {
  (ae(Be), ae(Oe));
}
function hd(e, t, n) {
  if (Oe.current !== Tn) throw Error(b(168));
  (re(Oe, t), re(Be, n));
}
function Jp(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != 'function'))
    return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(b(108, Ky(e) || 'Unknown', o));
  return fe({}, n, r);
}
function hs(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Tn),
    (Qn = Oe.current),
    re(Oe, e),
    re(Be, Be.current),
    !0
  );
}
function md(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(b(169));
  (n
    ? ((e = Jp(e, t, Qn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      ae(Be),
      ae(Oe),
      re(Oe, e))
    : ae(Be),
    re(Be, n));
}
var Ut = null,
  Us = !1,
  Al = !1;
function eh(e) {
  Ut === null ? (Ut = [e]) : Ut.push(e);
}
function uw(e) {
  ((Us = !0), eh(e));
}
function An() {
  if (!Al && Ut !== null) {
    Al = !0;
    var e = 0,
      t = Z;
    try {
      var n = Ut;
      for (Z = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((Ut = null), (Us = !1));
    } catch (o) {
      throw (Ut !== null && (Ut = Ut.slice(e + 1)), Pp(Eu, An), o);
    } finally {
      ((Z = t), (Al = !1));
    }
  }
  return null;
}
var vr = [],
  gr = 0,
  ms = null,
  vs = 0,
  ot = [],
  it = 0,
  Gn = null,
  Vt = 1,
  Bt = '';
function Dn(e, t) {
  ((vr[gr++] = vs), (vr[gr++] = ms), (ms = e), (vs = t));
}
function th(e, t, n) {
  ((ot[it++] = Vt), (ot[it++] = Bt), (ot[it++] = Gn), (Gn = e));
  var r = Vt;
  e = Bt;
  var o = 32 - gt(r) - 1;
  ((r &= ~(1 << o)), (n += 1));
  var i = 32 - gt(t) + o;
  if (30 < i) {
    var s = o - (o % 5);
    ((i = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (o -= s),
      (Vt = (1 << (32 - gt(t) + o)) | (n << o) | r),
      (Bt = i + e));
  } else ((Vt = (1 << i) | (n << o) | r), (Bt = e));
}
function Au(e) {
  e.return !== null && (Dn(e, 1), th(e, 1, 0));
}
function ju(e) {
  for (; e === ms; )
    ((ms = vr[--gr]), (vr[gr] = null), (vs = vr[--gr]), (vr[gr] = null));
  for (; e === Gn; )
    ((Gn = ot[--it]),
      (ot[it] = null),
      (Bt = ot[--it]),
      (ot[it] = null),
      (Vt = ot[--it]),
      (ot[it] = null));
}
var qe = null,
  Xe = null,
  ue = !1,
  vt = null;
function nh(e, t) {
  var n = st(5, null, null, 0);
  ((n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function vd(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (qe = e), (Xe = xn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (qe = e), (Xe = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Gn !== null ? { id: Vt, overflow: Bt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = st(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (qe = e),
            (Xe = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function ba(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function _a(e) {
  if (ue) {
    var t = Xe;
    if (t) {
      var n = t;
      if (!vd(e, t)) {
        if (ba(e)) throw Error(b(418));
        t = xn(n.nextSibling);
        var r = qe;
        t && vd(e, t)
          ? nh(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (ue = !1), (qe = e));
      }
    } else {
      if (ba(e)) throw Error(b(418));
      ((e.flags = (e.flags & -4097) | 2), (ue = !1), (qe = e));
    }
  }
}
function gd(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  qe = e;
}
function Ti(e) {
  if (e !== qe) return !1;
  if (!ue) return (gd(e), (ue = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== 'head' && t !== 'body' && !Pa(e.type, e.memoizedProps))),
    t && (t = Xe))
  ) {
    if (ba(e)) throw (rh(), Error(b(418)));
    for (; t; ) (nh(e, t), (t = xn(t.nextSibling)));
  }
  if ((gd(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(b(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === '/$') {
            if (t === 0) {
              Xe = xn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
        }
        e = e.nextSibling;
      }
      Xe = null;
    }
  } else Xe = qe ? xn(e.stateNode.nextSibling) : null;
  return !0;
}
function rh() {
  for (var e = Xe; e; ) e = xn(e.nextSibling);
}
function Vr() {
  ((Xe = qe = null), (ue = !1));
}
function Mu(e) {
  vt === null ? (vt = [e]) : vt.push(e);
}
var cw = qt.ReactCurrentBatchConfig;
function ho(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(b(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(b(147, e));
      var o = r,
        i = '' + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == 'function' &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (s) {
            var l = o.refs;
            s === null ? delete l[i] : (l[i] = s);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != 'string') throw Error(b(284));
    if (!n._owner) throw Error(b(290, e));
  }
  return e;
}
function Ni(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      b(
        31,
        e === '[object Object]'
          ? 'object with keys {' + Object.keys(t).join(', ') + '}'
          : e
      )
    )
  );
}
function yd(e) {
  var t = e._init;
  return t(e._payload);
}
function oh(e) {
  function t(m, f) {
    if (e) {
      var g = m.deletions;
      g === null ? ((m.deletions = [f]), (m.flags |= 16)) : g.push(f);
    }
  }
  function n(m, f) {
    if (!e) return null;
    for (; f !== null; ) (t(m, f), (f = f.sibling));
    return null;
  }
  function r(m, f) {
    for (m = new Map(); f !== null; )
      (f.key !== null ? m.set(f.key, f) : m.set(f.index, f), (f = f.sibling));
    return m;
  }
  function o(m, f) {
    return ((m = kn(m, f)), (m.index = 0), (m.sibling = null), m);
  }
  function i(m, f, g) {
    return (
      (m.index = g),
      e
        ? ((g = m.alternate),
          g !== null
            ? ((g = g.index), g < f ? ((m.flags |= 2), f) : g)
            : ((m.flags |= 2), f))
        : ((m.flags |= 1048576), f)
    );
  }
  function s(m) {
    return (e && m.alternate === null && (m.flags |= 2), m);
  }
  function l(m, f, g, C) {
    return f === null || f.tag !== 6
      ? ((f = zl(g, m.mode, C)), (f.return = m), f)
      : ((f = o(f, g)), (f.return = m), f);
  }
  function a(m, f, g, C) {
    var E = g.type;
    return E === cr
      ? d(m, f, g.props.children, C, g.key)
      : f !== null &&
          (f.elementType === E ||
            (typeof E == 'object' &&
              E !== null &&
              E.$$typeof === sn &&
              yd(E) === f.type))
        ? ((C = o(f, g.props)), (C.ref = ho(m, f, g)), (C.return = m), C)
        : ((C = qi(g.type, g.key, g.props, null, m.mode, C)),
          (C.ref = ho(m, f, g)),
          (C.return = m),
          C);
  }
  function u(m, f, g, C) {
    return f === null ||
      f.tag !== 4 ||
      f.stateNode.containerInfo !== g.containerInfo ||
      f.stateNode.implementation !== g.implementation
      ? ((f = $l(g, m.mode, C)), (f.return = m), f)
      : ((f = o(f, g.children || [])), (f.return = m), f);
  }
  function d(m, f, g, C, E) {
    return f === null || f.tag !== 7
      ? ((f = Hn(g, m.mode, C, E)), (f.return = m), f)
      : ((f = o(f, g)), (f.return = m), f);
  }
  function h(m, f, g) {
    if ((typeof f == 'string' && f !== '') || typeof f == 'number')
      return ((f = zl('' + f, m.mode, g)), (f.return = m), f);
    if (typeof f == 'object' && f !== null) {
      switch (f.$$typeof) {
        case vi:
          return (
            (g = qi(f.type, f.key, f.props, null, m.mode, g)),
            (g.ref = ho(m, null, f)),
            (g.return = m),
            g
          );
        case ur:
          return ((f = $l(f, m.mode, g)), (f.return = m), f);
        case sn:
          var C = f._init;
          return h(m, C(f._payload), g);
      }
      if (xo(f) || ao(f))
        return ((f = Hn(f, m.mode, g, null)), (f.return = m), f);
      Ni(m, f);
    }
    return null;
  }
  function v(m, f, g, C) {
    var E = f !== null ? f.key : null;
    if ((typeof g == 'string' && g !== '') || typeof g == 'number')
      return E !== null ? null : l(m, f, '' + g, C);
    if (typeof g == 'object' && g !== null) {
      switch (g.$$typeof) {
        case vi:
          return g.key === E ? a(m, f, g, C) : null;
        case ur:
          return g.key === E ? u(m, f, g, C) : null;
        case sn:
          return ((E = g._init), v(m, f, E(g._payload), C));
      }
      if (xo(g) || ao(g)) return E !== null ? null : d(m, f, g, C, null);
      Ni(m, g);
    }
    return null;
  }
  function x(m, f, g, C, E) {
    if ((typeof C == 'string' && C !== '') || typeof C == 'number')
      return ((m = m.get(g) || null), l(f, m, '' + C, E));
    if (typeof C == 'object' && C !== null) {
      switch (C.$$typeof) {
        case vi:
          return (
            (m = m.get(C.key === null ? g : C.key) || null),
            a(f, m, C, E)
          );
        case ur:
          return (
            (m = m.get(C.key === null ? g : C.key) || null),
            u(f, m, C, E)
          );
        case sn:
          var T = C._init;
          return x(m, f, g, T(C._payload), E);
      }
      if (xo(C) || ao(C)) return ((m = m.get(g) || null), d(f, m, C, E, null));
      Ni(f, C);
    }
    return null;
  }
  function S(m, f, g, C) {
    for (
      var E = null, T = null, k = f, P = (f = 0), A = null;
      k !== null && P < g.length;
      P++
    ) {
      k.index > P ? ((A = k), (k = null)) : (A = k.sibling);
      var j = v(m, k, g[P], C);
      if (j === null) {
        k === null && (k = A);
        break;
      }
      (e && k && j.alternate === null && t(m, k),
        (f = i(j, f, P)),
        T === null ? (E = j) : (T.sibling = j),
        (T = j),
        (k = A));
    }
    if (P === g.length) return (n(m, k), ue && Dn(m, P), E);
    if (k === null) {
      for (; P < g.length; P++)
        ((k = h(m, g[P], C)),
          k !== null &&
            ((f = i(k, f, P)),
            T === null ? (E = k) : (T.sibling = k),
            (T = k)));
      return (ue && Dn(m, P), E);
    }
    for (k = r(m, k); P < g.length; P++)
      ((A = x(k, m, P, g[P], C)),
        A !== null &&
          (e && A.alternate !== null && k.delete(A.key === null ? P : A.key),
          (f = i(A, f, P)),
          T === null ? (E = A) : (T.sibling = A),
          (T = A)));
    return (
      e &&
        k.forEach(function (z) {
          return t(m, z);
        }),
      ue && Dn(m, P),
      E
    );
  }
  function p(m, f, g, C) {
    var E = ao(g);
    if (typeof E != 'function') throw Error(b(150));
    if (((g = E.call(g)), g == null)) throw Error(b(151));
    for (
      var T = (E = null), k = f, P = (f = 0), A = null, j = g.next();
      k !== null && !j.done;
      P++, j = g.next()
    ) {
      k.index > P ? ((A = k), (k = null)) : (A = k.sibling);
      var z = v(m, k, j.value, C);
      if (z === null) {
        k === null && (k = A);
        break;
      }
      (e && k && z.alternate === null && t(m, k),
        (f = i(z, f, P)),
        T === null ? (E = z) : (T.sibling = z),
        (T = z),
        (k = A));
    }
    if (j.done) return (n(m, k), ue && Dn(m, P), E);
    if (k === null) {
      for (; !j.done; P++, j = g.next())
        ((j = h(m, j.value, C)),
          j !== null &&
            ((f = i(j, f, P)),
            T === null ? (E = j) : (T.sibling = j),
            (T = j)));
      return (ue && Dn(m, P), E);
    }
    for (k = r(m, k); !j.done; P++, j = g.next())
      ((j = x(k, m, P, j.value, C)),
        j !== null &&
          (e && j.alternate !== null && k.delete(j.key === null ? P : j.key),
          (f = i(j, f, P)),
          T === null ? (E = j) : (T.sibling = j),
          (T = j)));
    return (
      e &&
        k.forEach(function (D) {
          return t(m, D);
        }),
      ue && Dn(m, P),
      E
    );
  }
  function w(m, f, g, C) {
    if (
      (typeof g == 'object' &&
        g !== null &&
        g.type === cr &&
        g.key === null &&
        (g = g.props.children),
      typeof g == 'object' && g !== null)
    ) {
      switch (g.$$typeof) {
        case vi:
          e: {
            for (var E = g.key, T = f; T !== null; ) {
              if (T.key === E) {
                if (((E = g.type), E === cr)) {
                  if (T.tag === 7) {
                    (n(m, T.sibling),
                      (f = o(T, g.props.children)),
                      (f.return = m),
                      (m = f));
                    break e;
                  }
                } else if (
                  T.elementType === E ||
                  (typeof E == 'object' &&
                    E !== null &&
                    E.$$typeof === sn &&
                    yd(E) === T.type)
                ) {
                  (n(m, T.sibling),
                    (f = o(T, g.props)),
                    (f.ref = ho(m, T, g)),
                    (f.return = m),
                    (m = f));
                  break e;
                }
                n(m, T);
                break;
              } else t(m, T);
              T = T.sibling;
            }
            g.type === cr
              ? ((f = Hn(g.props.children, m.mode, C, g.key)),
                (f.return = m),
                (m = f))
              : ((C = qi(g.type, g.key, g.props, null, m.mode, C)),
                (C.ref = ho(m, f, g)),
                (C.return = m),
                (m = C));
          }
          return s(m);
        case ur:
          e: {
            for (T = g.key; f !== null; ) {
              if (f.key === T)
                if (
                  f.tag === 4 &&
                  f.stateNode.containerInfo === g.containerInfo &&
                  f.stateNode.implementation === g.implementation
                ) {
                  (n(m, f.sibling),
                    (f = o(f, g.children || [])),
                    (f.return = m),
                    (m = f));
                  break e;
                } else {
                  n(m, f);
                  break;
                }
              else t(m, f);
              f = f.sibling;
            }
            ((f = $l(g, m.mode, C)), (f.return = m), (m = f));
          }
          return s(m);
        case sn:
          return ((T = g._init), w(m, f, T(g._payload), C));
      }
      if (xo(g)) return S(m, f, g, C);
      if (ao(g)) return p(m, f, g, C);
      Ni(m, g);
    }
    return (typeof g == 'string' && g !== '') || typeof g == 'number'
      ? ((g = '' + g),
        f !== null && f.tag === 6
          ? (n(m, f.sibling), (f = o(f, g)), (f.return = m), (m = f))
          : (n(m, f), (f = zl(g, m.mode, C)), (f.return = m), (m = f)),
        s(m))
      : n(m, f);
  }
  return w;
}
var Br = oh(!0),
  ih = oh(!1),
  gs = On(null),
  ys = null,
  yr = null,
  Du = null;
function Iu() {
  Du = yr = ys = null;
}
function Lu(e) {
  var t = gs.current;
  (ae(gs), (e._currentValue = t));
}
function Oa(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Pr(e, t) {
  ((ys = e),
    (Du = yr = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ve = !0), (e.firstContext = null)));
}
function at(e) {
  var t = e._currentValue;
  if (Du !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), yr === null)) {
      if (ys === null) throw Error(b(308));
      ((yr = e), (ys.dependencies = { lanes: 0, firstContext: e }));
    } else yr = yr.next = e;
  return t;
}
var Fn = null;
function Fu(e) {
  Fn === null ? (Fn = [e]) : Fn.push(e);
}
function sh(e, t, n, r) {
  var o = t.interleaved;
  return (
    o === null ? ((n.next = n), Fu(t)) : ((n.next = o.next), (o.next = n)),
    (t.interleaved = n),
    Qt(e, r)
  );
}
function Qt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var ln = !1;
function zu(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function lh(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function Wt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Sn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), Y & 2)) {
    var o = r.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (r.pending = t),
      Qt(e, n)
    );
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), Fu(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    Qt(e, n)
  );
}
function Hi(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), ku(e, n));
  }
}
function wd(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (i === null ? (o = i = s) : (i = i.next = s), (n = n.next));
      } while (n !== null);
      i === null ? (o = i = t) : (i = i.next = t);
    } else o = i = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
function ws(e, t, n, r) {
  var o = e.updateQueue;
  ln = !1;
  var i = o.firstBaseUpdate,
    s = o.lastBaseUpdate,
    l = o.shared.pending;
  if (l !== null) {
    o.shared.pending = null;
    var a = l,
      u = a.next;
    ((a.next = null), s === null ? (i = u) : (s.next = u), (s = a));
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (l = d.lastBaseUpdate),
      l !== s &&
        (l === null ? (d.firstBaseUpdate = u) : (l.next = u),
        (d.lastBaseUpdate = a)));
  }
  if (i !== null) {
    var h = o.baseState;
    ((s = 0), (d = u = a = null), (l = i));
    do {
      var v = l.lane,
        x = l.eventTime;
      if ((r & v) === v) {
        d !== null &&
          (d = d.next =
            {
              eventTime: x,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var S = e,
            p = l;
          switch (((v = t), (x = n), p.tag)) {
            case 1:
              if (((S = p.payload), typeof S == 'function')) {
                h = S.call(x, h, v);
                break e;
              }
              h = S;
              break e;
            case 3:
              S.flags = (S.flags & -65537) | 128;
            case 0:
              if (
                ((S = p.payload),
                (v = typeof S == 'function' ? S.call(x, h, v) : S),
                v == null)
              )
                break e;
              h = fe({}, h, v);
              break e;
            case 2:
              ln = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (v = o.effects),
          v === null ? (o.effects = [l]) : v.push(l));
      } else
        ((x = {
          eventTime: x,
          lane: v,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          d === null ? ((u = d = x), (a = h)) : (d = d.next = x),
          (s |= v));
      if (((l = l.next), l === null)) {
        if (((l = o.shared.pending), l === null)) break;
        ((v = l),
          (l = v.next),
          (v.next = null),
          (o.lastBaseUpdate = v),
          (o.shared.pending = null));
      }
    } while (!0);
    if (
      (d === null && (a = h),
      (o.baseState = a),
      (o.firstBaseUpdate = u),
      (o.lastBaseUpdate = d),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do ((s |= o.lane), (o = o.next));
      while (o !== t);
    } else i === null && (o.shared.lanes = 0);
    ((Xn |= s), (e.lanes = s), (e.memoizedState = h));
  }
}
function xd(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != 'function'))
          throw Error(b(191, o));
        o.call(r);
      }
    }
}
var ai = {},
  Mt = On(ai),
  Ho = On(ai),
  Ko = On(ai);
function zn(e) {
  if (e === ai) throw Error(b(174));
  return e;
}
function $u(e, t) {
  switch ((re(Ko, t), re(Ho, e), re(Mt, ai), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : da(null, '');
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = da(t, e)));
  }
  (ae(Mt), re(Mt, t));
}
function Wr() {
  (ae(Mt), ae(Ho), ae(Ko));
}
function ah(e) {
  zn(Ko.current);
  var t = zn(Mt.current),
    n = da(t, e.type);
  t !== n && (re(Ho, e), re(Mt, n));
}
function Uu(e) {
  Ho.current === e && (ae(Mt), ae(Ho));
}
var ce = On(0);
function xs(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!')
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var jl = [];
function Vu() {
  for (var e = 0; e < jl.length; e++)
    jl[e]._workInProgressVersionPrimary = null;
  jl.length = 0;
}
var Ki = qt.ReactCurrentDispatcher,
  Ml = qt.ReactCurrentBatchConfig,
  Yn = 0,
  de = null,
  ye = null,
  xe = null,
  Ss = !1,
  bo = !1,
  Qo = 0,
  dw = 0;
function Ne() {
  throw Error(b(321));
}
function Bu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!wt(e[n], t[n])) return !1;
  return !0;
}
function Wu(e, t, n, r, o, i) {
  if (
    ((Yn = i),
    (de = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ki.current = e === null || e.memoizedState === null ? mw : vw),
    (e = n(r, o)),
    bo)
  ) {
    i = 0;
    do {
      if (((bo = !1), (Qo = 0), 25 <= i)) throw Error(b(301));
      ((i += 1),
        (xe = ye = null),
        (t.updateQueue = null),
        (Ki.current = gw),
        (e = n(r, o)));
    } while (bo);
  }
  if (
    ((Ki.current = Cs),
    (t = ye !== null && ye.next !== null),
    (Yn = 0),
    (xe = ye = de = null),
    (Ss = !1),
    t)
  )
    throw Error(b(300));
  return e;
}
function Hu() {
  var e = Qo !== 0;
  return ((Qo = 0), e);
}
function Nt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (xe === null ? (de.memoizedState = xe = e) : (xe = xe.next = e), xe);
}
function ut() {
  if (ye === null) {
    var e = de.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ye.next;
  var t = xe === null ? de.memoizedState : xe.next;
  if (t !== null) ((xe = t), (ye = e));
  else {
    if (e === null) throw Error(b(310));
    ((ye = e),
      (e = {
        memoizedState: ye.memoizedState,
        baseState: ye.baseState,
        baseQueue: ye.baseQueue,
        queue: ye.queue,
        next: null,
      }),
      xe === null ? (de.memoizedState = xe = e) : (xe = xe.next = e));
  }
  return xe;
}
function Go(e, t) {
  return typeof t == 'function' ? t(e) : t;
}
function Dl(e) {
  var t = ut(),
    n = t.queue;
  if (n === null) throw Error(b(311));
  n.lastRenderedReducer = e;
  var r = ye,
    o = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (o !== null) {
      var s = o.next;
      ((o.next = i.next), (i.next = s));
    }
    ((r.baseQueue = o = i), (n.pending = null));
  }
  if (o !== null) {
    ((i = o.next), (r = r.baseState));
    var l = (s = null),
      a = null,
      u = i;
    do {
      var d = u.lane;
      if ((Yn & d) === d)
        (a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action)));
      else {
        var h = {
          lane: d,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        (a === null ? ((l = a = h), (s = r)) : (a = a.next = h),
          (de.lanes |= d),
          (Xn |= d));
      }
      u = u.next;
    } while (u !== null && u !== i);
    (a === null ? (s = r) : (a.next = l),
      wt(r, t.memoizedState) || (Ve = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = a),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do ((i = o.lane), (de.lanes |= i), (Xn |= i), (o = o.next));
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Il(e) {
  var t = ut(),
    n = t.queue;
  if (n === null) throw Error(b(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    i = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var s = (o = o.next);
    do ((i = e(i, s.action)), (s = s.next));
    while (s !== o);
    (wt(i, t.memoizedState) || (Ve = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i));
  }
  return [i, r];
}
function uh() {}
function ch(e, t) {
  var n = de,
    r = ut(),
    o = t(),
    i = !wt(r.memoizedState, o);
  if (
    (i && ((r.memoizedState = o), (Ve = !0)),
    (r = r.queue),
    Ku(ph.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (xe !== null && xe.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Yo(9, fh.bind(null, n, r, o, t), void 0, null),
      Se === null)
    )
      throw Error(b(349));
    Yn & 30 || dh(n, t, o);
  }
  return o;
}
function dh(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = de.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (de.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function fh(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), hh(t) && mh(e));
}
function ph(e, t, n) {
  return n(function () {
    hh(t) && mh(e);
  });
}
function hh(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !wt(e, n);
  } catch {
    return !0;
  }
}
function mh(e) {
  var t = Qt(e, 1);
  t !== null && yt(t, e, 1, -1);
}
function Sd(e) {
  var t = Nt();
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Go,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = hw.bind(null, de, e)),
    [t.memoizedState, e]
  );
}
function Yo(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = de.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (de.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function vh() {
  return ut().memoizedState;
}
function Qi(e, t, n, r) {
  var o = Nt();
  ((de.flags |= e),
    (o.memoizedState = Yo(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Vs(e, t, n, r) {
  var o = ut();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (ye !== null) {
    var s = ye.memoizedState;
    if (((i = s.destroy), r !== null && Bu(r, s.deps))) {
      o.memoizedState = Yo(t, n, i, r);
      return;
    }
  }
  ((de.flags |= e), (o.memoizedState = Yo(1 | t, n, i, r)));
}
function Cd(e, t) {
  return Qi(8390656, 8, e, t);
}
function Ku(e, t) {
  return Vs(2048, 8, e, t);
}
function gh(e, t) {
  return Vs(4, 2, e, t);
}
function yh(e, t) {
  return Vs(4, 4, e, t);
}
function wh(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function xh(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    Vs(4, 4, wh.bind(null, t, e), n)
  );
}
function Qu() {}
function Sh(e, t) {
  var n = ut();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Bu(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Ch(e, t) {
  var n = ut();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Bu(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Eh(e, t, n) {
  return Yn & 21
    ? (wt(n, t) || ((n = Rp()), (de.lanes |= n), (Xn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ve = !0)), (e.memoizedState = n));
}
function fw(e, t) {
  var n = Z;
  ((Z = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = Ml.transition;
  Ml.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((Z = n), (Ml.transition = r));
  }
}
function kh() {
  return ut().memoizedState;
}
function pw(e, t, n) {
  var r = En(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Ph(e))
  )
    Th(t, n);
  else if (((n = sh(e, t, n, r)), n !== null)) {
    var o = Fe();
    (yt(n, e, r, o), Nh(n, t, r));
  }
}
function hw(e, t, n) {
  var r = En(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Ph(e)) Th(t, o);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var s = t.lastRenderedState,
          l = i(s, n);
        if (((o.hasEagerState = !0), (o.eagerState = l), wt(l, s))) {
          var a = t.interleaved;
          (a === null
            ? ((o.next = o), Fu(t))
            : ((o.next = a.next), (a.next = o)),
            (t.interleaved = o));
          return;
        }
      } catch {
      } finally {
      }
    ((n = sh(e, t, o, r)),
      n !== null && ((o = Fe()), yt(n, e, r, o), Nh(n, t, r)));
  }
}
function Ph(e) {
  var t = e.alternate;
  return e === de || (t !== null && t === de);
}
function Th(e, t) {
  bo = Ss = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function Nh(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), ku(e, n));
  }
}
var Cs = {
    readContext: at,
    useCallback: Ne,
    useContext: Ne,
    useEffect: Ne,
    useImperativeHandle: Ne,
    useInsertionEffect: Ne,
    useLayoutEffect: Ne,
    useMemo: Ne,
    useReducer: Ne,
    useRef: Ne,
    useState: Ne,
    useDebugValue: Ne,
    useDeferredValue: Ne,
    useTransition: Ne,
    useMutableSource: Ne,
    useSyncExternalStore: Ne,
    useId: Ne,
    unstable_isNewReconciler: !1,
  },
  mw = {
    readContext: at,
    useCallback: function (e, t) {
      return ((Nt().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: at,
    useEffect: Cd,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Qi(4194308, 4, wh.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Qi(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Qi(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Nt();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = Nt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = pw.bind(null, de, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Nt();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: Sd,
    useDebugValue: Qu,
    useDeferredValue: function (e) {
      return (Nt().memoizedState = e);
    },
    useTransition: function () {
      var e = Sd(!1),
        t = e[0];
      return ((e = fw.bind(null, e[1])), (Nt().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = de,
        o = Nt();
      if (ue) {
        if (n === void 0) throw Error(b(407));
        n = n();
      } else {
        if (((n = t()), Se === null)) throw Error(b(349));
        Yn & 30 || dh(r, t, n);
      }
      o.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (o.queue = i),
        Cd(ph.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        Yo(9, fh.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Nt(),
        t = Se.identifierPrefix;
      if (ue) {
        var n = Bt,
          r = Vt;
        ((n = (r & ~(1 << (32 - gt(r) - 1))).toString(32) + n),
          (t = ':' + t + 'R' + n),
          (n = Qo++),
          0 < n && (t += 'H' + n.toString(32)),
          (t += ':'));
      } else ((n = dw++), (t = ':' + t + 'r' + n.toString(32) + ':'));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  vw = {
    readContext: at,
    useCallback: Sh,
    useContext: at,
    useEffect: Ku,
    useImperativeHandle: xh,
    useInsertionEffect: gh,
    useLayoutEffect: yh,
    useMemo: Ch,
    useReducer: Dl,
    useRef: vh,
    useState: function () {
      return Dl(Go);
    },
    useDebugValue: Qu,
    useDeferredValue: function (e) {
      var t = ut();
      return Eh(t, ye.memoizedState, e);
    },
    useTransition: function () {
      var e = Dl(Go)[0],
        t = ut().memoizedState;
      return [e, t];
    },
    useMutableSource: uh,
    useSyncExternalStore: ch,
    useId: kh,
    unstable_isNewReconciler: !1,
  },
  gw = {
    readContext: at,
    useCallback: Sh,
    useContext: at,
    useEffect: Ku,
    useImperativeHandle: xh,
    useInsertionEffect: gh,
    useLayoutEffect: yh,
    useMemo: Ch,
    useReducer: Il,
    useRef: vh,
    useState: function () {
      return Il(Go);
    },
    useDebugValue: Qu,
    useDeferredValue: function (e) {
      var t = ut();
      return ye === null ? (t.memoizedState = e) : Eh(t, ye.memoizedState, e);
    },
    useTransition: function () {
      var e = Il(Go)[0],
        t = ut().memoizedState;
      return [e, t];
    },
    useMutableSource: uh,
    useSyncExternalStore: ch,
    useId: kh,
    unstable_isNewReconciler: !1,
  };
function ft(e, t) {
  if (e && e.defaultProps) {
    ((t = fe({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Aa(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : fe({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Bs = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? nr(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Fe(),
      o = En(e),
      i = Wt(r, o);
    ((i.payload = t),
      n != null && (i.callback = n),
      (t = Sn(e, i, o)),
      t !== null && (yt(t, e, o, r), Hi(t, e, o)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Fe(),
      o = En(e),
      i = Wt(r, o);
    ((i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = Sn(e, i, o)),
      t !== null && (yt(t, e, o, r), Hi(t, e, o)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Fe(),
      r = En(e),
      o = Wt(n, r);
    ((o.tag = 2),
      t != null && (o.callback = t),
      (t = Sn(e, o, r)),
      t !== null && (yt(t, e, r, n), Hi(t, e, r)));
  },
};
function Ed(e, t, n, r, o, i, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(r, i, s)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Uo(n, r) || !Uo(o, i)
        : !0
  );
}
function Rh(e, t, n) {
  var r = !1,
    o = Tn,
    i = t.contextType;
  return (
    typeof i == 'object' && i !== null
      ? (i = at(i))
      : ((o = We(t) ? Qn : Oe.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? Ur(e, o) : Tn)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Bs),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function kd(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == 'function' &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Bs.enqueueReplaceState(t, t.state, null));
}
function ja(e, t, n, r) {
  var o = e.stateNode;
  ((o.props = n), (o.state = e.memoizedState), (o.refs = {}), zu(e));
  var i = t.contextType;
  (typeof i == 'object' && i !== null
    ? (o.context = at(i))
    : ((i = We(t) ? Qn : Oe.current), (o.context = Ur(e, i))),
    (o.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == 'function' && (Aa(e, t, i, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof o.getSnapshotBeforeUpdate == 'function' ||
      (typeof o.UNSAFE_componentWillMount != 'function' &&
        typeof o.componentWillMount != 'function') ||
      ((t = o.state),
      typeof o.componentWillMount == 'function' && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == 'function' &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && Bs.enqueueReplaceState(o, o.state, null),
      ws(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == 'function' && (e.flags |= 4194308));
}
function Hr(e, t) {
  try {
    var n = '',
      r = t;
    do ((n += Hy(r)), (r = r.return));
    while (r);
    var o = n;
  } catch (i) {
    o =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function Ll(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Ma(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var yw = typeof WeakMap == 'function' ? WeakMap : Map;
function bh(e, t, n) {
  ((n = Wt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (ks || ((ks = !0), (Wa = r)), Ma(e, t));
    }),
    n
  );
}
function _h(e, t, n) {
  ((n = Wt(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == 'function') {
    var o = t.value;
    ((n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        Ma(e, t);
      }));
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == 'function' &&
      (n.callback = function () {
        (Ma(e, t),
          typeof r != 'function' &&
            (Cn === null ? (Cn = new Set([this])) : Cn.add(this)));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : '',
        });
      }),
    n
  );
}
function Pd(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new yw();
    var o = new Set();
    r.set(t, o);
  } else ((o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o)));
  o.has(n) || (o.add(n), (e = Aw.bind(null, e, t, n)), t.then(e, e));
}
function Td(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Nd(e, t, n, r, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Wt(-1, 1)), (t.tag = 2), Sn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var ww = qt.ReactCurrentOwner,
  Ve = !1;
function Ie(e, t, n, r) {
  t.child = e === null ? ih(t, null, n, r) : Br(t, e.child, n, r);
}
function Rd(e, t, n, r, o) {
  n = n.render;
  var i = t.ref;
  return (
    Pr(t, o),
    (r = Wu(e, t, n, r, i, o)),
    (n = Hu()),
    e !== null && !Ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        Gt(e, t, o))
      : (ue && n && Au(t), (t.flags |= 1), Ie(e, t, r, o), t.child)
  );
}
function bd(e, t, n, r, o) {
  if (e === null) {
    var i = n.type;
    return typeof i == 'function' &&
      !tc(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), Oh(e, t, i, r, o))
      : ((e = qi(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & o))) {
    var s = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Uo), n(s, r) && e.ref === t.ref)
    )
      return Gt(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = kn(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Oh(e, t, n, r, o) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Uo(i, r) && e.ref === t.ref)
      if (((Ve = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
        e.flags & 131072 && (Ve = !0);
      else return ((t.lanes = e.lanes), Gt(e, t, o));
  }
  return Da(e, t, n, r, o);
}
function Ah(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === 'hidden')
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        re(xr, Ge),
        (Ge |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          re(xr, Ge),
          (Ge |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        re(xr, Ge),
        (Ge |= r));
    }
  else
    (i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      re(xr, Ge),
      (Ge |= r));
  return (Ie(e, t, o, n), t.child);
}
function jh(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Da(e, t, n, r, o) {
  var i = We(n) ? Qn : Oe.current;
  return (
    (i = Ur(t, i)),
    Pr(t, o),
    (n = Wu(e, t, n, r, i, o)),
    (r = Hu()),
    e !== null && !Ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        Gt(e, t, o))
      : (ue && r && Au(t), (t.flags |= 1), Ie(e, t, n, o), t.child)
  );
}
function _d(e, t, n, r, o) {
  if (We(n)) {
    var i = !0;
    hs(t);
  } else i = !1;
  if ((Pr(t, o), t.stateNode === null))
    (Gi(e, t), Rh(t, n, r), ja(t, n, r, o), (r = !0));
  else if (e === null) {
    var s = t.stateNode,
      l = t.memoizedProps;
    s.props = l;
    var a = s.context,
      u = n.contextType;
    typeof u == 'object' && u !== null
      ? (u = at(u))
      : ((u = We(n) ? Qn : Oe.current), (u = Ur(t, u)));
    var d = n.getDerivedStateFromProps,
      h =
        typeof d == 'function' ||
        typeof s.getSnapshotBeforeUpdate == 'function';
    (h ||
      (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof s.componentWillReceiveProps != 'function') ||
      ((l !== r || a !== u) && kd(t, s, r, u)),
      (ln = !1));
    var v = t.memoizedState;
    ((s.state = v),
      ws(t, r, s, o),
      (a = t.memoizedState),
      l !== r || v !== a || Be.current || ln
        ? (typeof d == 'function' && (Aa(t, n, d, r), (a = t.memoizedState)),
          (l = ln || Ed(t, n, l, r, v, a, u))
            ? (h ||
                (typeof s.UNSAFE_componentWillMount != 'function' &&
                  typeof s.componentWillMount != 'function') ||
                (typeof s.componentWillMount == 'function' &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == 'function' &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (s.props = r),
          (s.state = a),
          (s.context = u),
          (r = l))
        : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((s = t.stateNode),
      lh(e, t),
      (l = t.memoizedProps),
      (u = t.type === t.elementType ? l : ft(t.type, l)),
      (s.props = u),
      (h = t.pendingProps),
      (v = s.context),
      (a = n.contextType),
      typeof a == 'object' && a !== null
        ? (a = at(a))
        : ((a = We(n) ? Qn : Oe.current), (a = Ur(t, a))));
    var x = n.getDerivedStateFromProps;
    ((d =
      typeof x == 'function' ||
      typeof s.getSnapshotBeforeUpdate == 'function') ||
      (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof s.componentWillReceiveProps != 'function') ||
      ((l !== h || v !== a) && kd(t, s, r, a)),
      (ln = !1),
      (v = t.memoizedState),
      (s.state = v),
      ws(t, r, s, o));
    var S = t.memoizedState;
    l !== h || v !== S || Be.current || ln
      ? (typeof x == 'function' && (Aa(t, n, x, r), (S = t.memoizedState)),
        (u = ln || Ed(t, n, u, r, v, S, a) || !1)
          ? (d ||
              (typeof s.UNSAFE_componentWillUpdate != 'function' &&
                typeof s.componentWillUpdate != 'function') ||
              (typeof s.componentWillUpdate == 'function' &&
                s.componentWillUpdate(r, S, a),
              typeof s.UNSAFE_componentWillUpdate == 'function' &&
                s.UNSAFE_componentWillUpdate(r, S, a)),
            typeof s.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != 'function' ||
              (l === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != 'function' ||
              (l === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = S)),
        (s.props = r),
        (s.state = S),
        (s.context = a),
        (r = u))
      : (typeof s.componentDidUpdate != 'function' ||
          (l === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != 'function' ||
          (l === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Ia(e, t, n, r, i, o);
}
function Ia(e, t, n, r, o, i) {
  jh(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return (o && md(t, n, !1), Gt(e, t, i));
  ((r = t.stateNode), (ww.current = t));
  var l =
    s && typeof n.getDerivedStateFromError != 'function' ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = Br(t, e.child, null, i)), (t.child = Br(t, null, l, i)))
      : Ie(e, t, l, i),
    (t.memoizedState = r.state),
    o && md(t, n, !0),
    t.child
  );
}
function Mh(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? hd(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && hd(e, t.context, !1),
    $u(e, t.containerInfo));
}
function Od(e, t, n, r, o) {
  return (Vr(), Mu(o), (t.flags |= 256), Ie(e, t, n, r), t.child);
}
var La = { dehydrated: null, treeContext: null, retryLane: 0 };
function Fa(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Dh(e, t, n) {
  var r = t.pendingProps,
    o = ce.current,
    i = !1,
    s = (t.flags & 128) !== 0,
    l;
  if (
    ((l = s) ||
      (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    l
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    re(ce, o & 1),
    e === null)
  )
    return (
      _a(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === '$!'
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (s = { mode: 'hidden', children: s }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = s))
                : (i = Ks(s, r, 0, null)),
              (e = Hn(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = Fa(n)),
              (t.memoizedState = La),
              e)
            : Gu(t, s))
    );
  if (((o = e.memoizedState), o !== null && ((l = o.dehydrated), l !== null)))
    return xw(e, t, s, r, l, o, n);
  if (i) {
    ((i = r.fallback), (s = t.mode), (o = e.child), (l = o.sibling));
    var a = { mode: 'hidden', children: r.children };
    return (
      !(s & 1) && t.child !== o
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = kn(o, a)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      l !== null ? (i = kn(l, i)) : ((i = Hn(i, s, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? Fa(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (i.memoizedState = s),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = La),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = kn(i, { mode: 'visible', children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Gu(e, t) {
  return (
    (t = Ks({ mode: 'visible', children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Ri(e, t, n, r) {
  return (
    r !== null && Mu(r),
    Br(t, e.child, null, n),
    (e = Gu(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function xw(e, t, n, r, o, i, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Ll(Error(b(422)))), Ri(e, t, s, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (o = t.mode),
          (r = Ks({ mode: 'visible', children: r.children }, o, 0, null)),
          (i = Hn(i, o, s, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && Br(t, e.child, null, s),
          (t.child.memoizedState = Fa(s)),
          (t.memoizedState = La),
          i);
  if (!(t.mode & 1)) return Ri(e, t, s, null);
  if (o.data === '$!') {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var l = r.dgst;
    return (
      (r = l),
      (i = Error(b(419))),
      (r = Ll(i, r, void 0)),
      Ri(e, t, s, r)
    );
  }
  if (((l = (s & e.childLanes) !== 0), Ve || l)) {
    if (((r = Se), r !== null)) {
      switch (s & -s) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      ((o = o & (r.suspendedLanes | s) ? 0 : o),
        o !== 0 &&
          o !== i.retryLane &&
          ((i.retryLane = o), Qt(e, o), yt(r, e, o, -1)));
    }
    return (ec(), (r = Ll(Error(b(421)))), Ri(e, t, s, r));
  }
  return o.data === '$?'
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = jw.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (Xe = xn(o.nextSibling)),
      (qe = t),
      (ue = !0),
      (vt = null),
      e !== null &&
        ((ot[it++] = Vt),
        (ot[it++] = Bt),
        (ot[it++] = Gn),
        (Vt = e.id),
        (Bt = e.overflow),
        (Gn = t)),
      (t = Gu(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Ad(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), Oa(e.return, t, n));
}
function Fl(e, t, n, r, o) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = o));
}
function Ih(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    i = r.tail;
  if ((Ie(e, t, r.children, n), (r = ce.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Ad(e, n, t);
        else if (e.tag === 19) Ad(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((re(ce, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case 'forwards':
        for (n = t.child, o = null; n !== null; )
          ((e = n.alternate),
            e !== null && xs(e) === null && (o = n),
            (n = n.sibling));
        ((n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          Fl(t, !1, o, n, i));
        break;
      case 'backwards':
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && xs(e) === null)) {
            t.child = o;
            break;
          }
          ((e = o.sibling), (o.sibling = n), (n = o), (o = e));
        }
        Fl(t, !0, n, null, i);
        break;
      case 'together':
        Fl(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Gi(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Gt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Xn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(b(153));
  if (t.child !== null) {
    for (
      e = t.child, n = kn(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      ((e = e.sibling),
        (n = n.sibling = kn(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function Sw(e, t, n) {
  switch (t.tag) {
    case 3:
      (Mh(t), Vr());
      break;
    case 5:
      ah(t);
      break;
    case 1:
      We(t.type) && hs(t);
      break;
    case 4:
      $u(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      (re(gs, r._currentValue), (r._currentValue = o));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (re(ce, ce.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? Dh(e, t, n)
            : (re(ce, ce.current & 1),
              (e = Gt(e, t, n)),
              e !== null ? e.sibling : null);
      re(ce, ce.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Ih(e, t, n);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        re(ce, ce.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), Ah(e, t, n));
  }
  return Gt(e, t, n);
}
var Lh, za, Fh, zh;
Lh = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
za = function () {};
Fh = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    ((e = t.stateNode), zn(Mt.current));
    var i = null;
    switch (n) {
      case 'input':
        ((o = la(e, o)), (r = la(e, r)), (i = []));
        break;
      case 'select':
        ((o = fe({}, o, { value: void 0 })),
          (r = fe({}, r, { value: void 0 })),
          (i = []));
        break;
      case 'textarea':
        ((o = ca(e, o)), (r = ca(e, r)), (i = []));
        break;
      default:
        typeof o.onClick != 'function' &&
          typeof r.onClick == 'function' &&
          (e.onclick = fs);
    }
    fa(n, r);
    var s;
    n = null;
    for (u in o)
      if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === 'style') {
          var l = o[u];
          for (s in l) l.hasOwnProperty(s) && (n || (n = {}), (n[s] = ''));
        } else
          u !== 'dangerouslySetInnerHTML' &&
            u !== 'children' &&
            u !== 'suppressContentEditableWarning' &&
            u !== 'suppressHydrationWarning' &&
            u !== 'autoFocus' &&
            (Mo.hasOwnProperty(u)
              ? i || (i = [])
              : (i = i || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (
        ((l = o != null ? o[u] : void 0),
        r.hasOwnProperty(u) && a !== l && (a != null || l != null))
      )
        if (u === 'style')
          if (l) {
            for (s in l)
              !l.hasOwnProperty(s) ||
                (a && a.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ''));
            for (s in a)
              a.hasOwnProperty(s) &&
                l[s] !== a[s] &&
                (n || (n = {}), (n[s] = a[s]));
          } else (n || (i || (i = []), i.push(u, n)), (n = a));
        else
          u === 'dangerouslySetInnerHTML'
            ? ((a = a ? a.__html : void 0),
              (l = l ? l.__html : void 0),
              a != null && l !== a && (i = i || []).push(u, a))
            : u === 'children'
              ? (typeof a != 'string' && typeof a != 'number') ||
                (i = i || []).push(u, '' + a)
              : u !== 'suppressContentEditableWarning' &&
                u !== 'suppressHydrationWarning' &&
                (Mo.hasOwnProperty(u)
                  ? (a != null && u === 'onScroll' && le('scroll', e),
                    i || l === a || (i = []))
                  : (i = i || []).push(u, a));
    }
    n && (i = i || []).push('style', n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
zh = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function mo(e, t) {
  if (!ue)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail;
        for (var n = null; t !== null; )
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case 'collapsed':
        n = e.tail;
        for (var r = null; n !== null; )
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Re(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var o = e.child; o !== null; )
      ((n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags & 14680064),
        (r |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling));
  else
    for (o = e.child; o !== null; )
      ((n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags),
        (r |= o.flags),
        (o.return = e),
        (o = o.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function Cw(e, t, n) {
  var r = t.pendingProps;
  switch ((ju(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (Re(t), null);
    case 1:
      return (We(t.type) && ps(), Re(t), null);
    case 3:
      return (
        (r = t.stateNode),
        Wr(),
        ae(Be),
        ae(Oe),
        Vu(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Ti(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), vt !== null && (Qa(vt), (vt = null)))),
        za(e, t),
        Re(t),
        null
      );
    case 5:
      Uu(t);
      var o = zn(Ko.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (Fh(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(b(166));
          return (Re(t), null);
        }
        if (((e = zn(Mt.current)), Ti(t))) {
          ((r = t.stateNode), (n = t.type));
          var i = t.memoizedProps;
          switch (((r[Ot] = t), (r[Wo] = i), (e = (t.mode & 1) !== 0), n)) {
            case 'dialog':
              (le('cancel', r), le('close', r));
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              le('load', r);
              break;
            case 'video':
            case 'audio':
              for (o = 0; o < Co.length; o++) le(Co[o], r);
              break;
            case 'source':
              le('error', r);
              break;
            case 'img':
            case 'image':
            case 'link':
              (le('error', r), le('load', r));
              break;
            case 'details':
              le('toggle', r);
              break;
            case 'input':
              (Uc(r, i), le('invalid', r));
              break;
            case 'select':
              ((r._wrapperState = { wasMultiple: !!i.multiple }),
                le('invalid', r));
              break;
            case 'textarea':
              (Bc(r, i), le('invalid', r));
          }
          (fa(n, i), (o = null));
          for (var s in i)
            if (i.hasOwnProperty(s)) {
              var l = i[s];
              s === 'children'
                ? typeof l == 'string'
                  ? r.textContent !== l &&
                    (i.suppressHydrationWarning !== !0 &&
                      Pi(r.textContent, l, e),
                    (o = ['children', l]))
                  : typeof l == 'number' &&
                    r.textContent !== '' + l &&
                    (i.suppressHydrationWarning !== !0 &&
                      Pi(r.textContent, l, e),
                    (o = ['children', '' + l]))
                : Mo.hasOwnProperty(s) &&
                  l != null &&
                  s === 'onScroll' &&
                  le('scroll', r);
            }
          switch (n) {
            case 'input':
              (gi(r), Vc(r, i, !0));
              break;
            case 'textarea':
              (gi(r), Wc(r));
              break;
            case 'select':
            case 'option':
              break;
            default:
              typeof i.onClick == 'function' && (r.onclick = fs);
          }
          ((r = o), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((s = o.nodeType === 9 ? o : o.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = pp(n)),
            e === 'http://www.w3.org/1999/xhtml'
              ? n === 'script'
                ? ((e = s.createElement('div')),
                  (e.innerHTML = '<script><\/script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == 'string'
                  ? (e = s.createElement(n, { is: r.is }))
                  : ((e = s.createElement(n)),
                    n === 'select' &&
                      ((s = e),
                      r.multiple
                        ? (s.multiple = !0)
                        : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[Ot] = t),
            (e[Wo] = r),
            Lh(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((s = pa(n, r)), n)) {
              case 'dialog':
                (le('cancel', e), le('close', e), (o = r));
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                (le('load', e), (o = r));
                break;
              case 'video':
              case 'audio':
                for (o = 0; o < Co.length; o++) le(Co[o], e);
                o = r;
                break;
              case 'source':
                (le('error', e), (o = r));
                break;
              case 'img':
              case 'image':
              case 'link':
                (le('error', e), le('load', e), (o = r));
                break;
              case 'details':
                (le('toggle', e), (o = r));
                break;
              case 'input':
                (Uc(e, r), (o = la(e, r)), le('invalid', e));
                break;
              case 'option':
                o = r;
                break;
              case 'select':
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (o = fe({}, r, { value: void 0 })),
                  le('invalid', e));
                break;
              case 'textarea':
                (Bc(e, r), (o = ca(e, r)), le('invalid', e));
                break;
              default:
                o = r;
            }
            (fa(n, o), (l = o));
            for (i in l)
              if (l.hasOwnProperty(i)) {
                var a = l[i];
                i === 'style'
                  ? vp(e, a)
                  : i === 'dangerouslySetInnerHTML'
                    ? ((a = a ? a.__html : void 0), a != null && hp(e, a))
                    : i === 'children'
                      ? typeof a == 'string'
                        ? (n !== 'textarea' || a !== '') && Do(e, a)
                        : typeof a == 'number' && Do(e, '' + a)
                      : i !== 'suppressContentEditableWarning' &&
                        i !== 'suppressHydrationWarning' &&
                        i !== 'autoFocus' &&
                        (Mo.hasOwnProperty(i)
                          ? a != null && i === 'onScroll' && le('scroll', e)
                          : a != null && yu(e, i, a, s));
              }
            switch (n) {
              case 'input':
                (gi(e), Vc(e, r, !1));
                break;
              case 'textarea':
                (gi(e), Wc(e));
                break;
              case 'option':
                r.value != null && e.setAttribute('value', '' + Pn(r.value));
                break;
              case 'select':
                ((e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? Sr(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      Sr(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof o.onClick == 'function' && (e.onclick = fs);
            }
            switch (n) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus;
                break e;
              case 'img':
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (Re(t), null);
    case 6:
      if (e && t.stateNode != null) zh(e, t, e.memoizedProps, r);
      else {
        if (typeof r != 'string' && t.stateNode === null) throw Error(b(166));
        if (((n = zn(Ko.current)), zn(Mt.current), Ti(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Ot] = t),
            (i = r.nodeValue !== n) && ((e = qe), e !== null))
          )
            switch (e.tag) {
              case 3:
                Pi(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Pi(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Ot] = t),
            (t.stateNode = r));
      }
      return (Re(t), null);
    case 13:
      if (
        (ae(ce),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (ue && Xe !== null && t.mode & 1 && !(t.flags & 128))
          (rh(), Vr(), (t.flags |= 98560), (i = !1));
        else if (((i = Ti(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(b(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(b(317));
            i[Ot] = t;
          } else
            (Vr(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (Re(t), (i = !1));
        } else (vt !== null && (Qa(vt), (vt = null)), (i = !0));
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || ce.current & 1 ? we === 0 && (we = 3) : ec())),
          t.updateQueue !== null && (t.flags |= 4),
          Re(t),
          null);
    case 4:
      return (
        Wr(),
        za(e, t),
        e === null && Vo(t.stateNode.containerInfo),
        Re(t),
        null
      );
    case 10:
      return (Lu(t.type._context), Re(t), null);
    case 17:
      return (We(t.type) && ps(), Re(t), null);
    case 19:
      if ((ae(ce), (i = t.memoizedState), i === null)) return (Re(t), null);
      if (((r = (t.flags & 128) !== 0), (s = i.rendering), s === null))
        if (r) mo(i, !1);
        else {
          if (we !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = xs(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    mo(i, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  ((i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (s = i.alternate),
                    s === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = s.childLanes),
                        (i.lanes = s.lanes),
                        (i.child = s.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = s.memoizedProps),
                        (i.memoizedState = s.memoizedState),
                        (i.updateQueue = s.updateQueue),
                        (i.type = s.type),
                        (e = s.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (re(ce, (ce.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          i.tail !== null &&
            me() > Kr &&
            ((t.flags |= 128), (r = !0), mo(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = xs(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              mo(i, !0),
              i.tail === null && i.tailMode === 'hidden' && !s.alternate && !ue)
            )
              return (Re(t), null);
          } else
            2 * me() - i.renderingStartTime > Kr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), mo(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = i.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (i.last = s));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = me()),
          (t.sibling = null),
          (n = ce.current),
          re(ce, r ? (n & 1) | 2 : n & 1),
          t)
        : (Re(t), null);
    case 22:
    case 23:
      return (
        Ju(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ge & 1073741824 && (Re(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Re(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(b(156, t.tag));
}
function Ew(e, t) {
  switch ((ju(t), t.tag)) {
    case 1:
      return (
        We(t.type) && ps(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Wr(),
        ae(Be),
        ae(Oe),
        Vu(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (Uu(t), null);
    case 13:
      if (
        (ae(ce), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(b(340));
        Vr();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (ae(ce), null);
    case 4:
      return (Wr(), null);
    case 10:
      return (Lu(t.type._context), null);
    case 22:
    case 23:
      return (Ju(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var bi = !1,
  _e = !1,
  kw = typeof WeakSet == 'function' ? WeakSet : Set,
  M = null;
function wr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == 'function')
      try {
        n(null);
      } catch (r) {
        he(e, t, r);
      }
    else n.current = null;
}
function $a(e, t, n) {
  try {
    n();
  } catch (r) {
    he(e, t, r);
  }
}
var jd = !1;
function Pw(e, t) {
  if (((Ea = us), (e = Wp()), Ou(e))) {
    if ('selectionStart' in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, i.nodeType);
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            l = -1,
            a = -1,
            u = 0,
            d = 0,
            h = e,
            v = null;
          t: for (;;) {
            for (
              var x;
              h !== n || (o !== 0 && h.nodeType !== 3) || (l = s + o),
                h !== i || (r !== 0 && h.nodeType !== 3) || (a = s + r),
                h.nodeType === 3 && (s += h.nodeValue.length),
                (x = h.firstChild) !== null;

            )
              ((v = h), (h = x));
            for (;;) {
              if (h === e) break t;
              if (
                (v === n && ++u === o && (l = s),
                v === i && ++d === r && (a = s),
                (x = h.nextSibling) !== null)
              )
                break;
              ((h = v), (v = h.parentNode));
            }
            h = x;
          }
          n = l === -1 || a === -1 ? null : { start: l, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (ka = { focusedElem: e, selectionRange: n }, us = !1, M = t; M !== null; )
    if (((t = M), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (M = e));
    else
      for (; M !== null; ) {
        t = M;
        try {
          var S = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (S !== null) {
                  var p = S.memoizedProps,
                    w = S.memoizedState,
                    m = t.stateNode,
                    f = m.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? p : ft(t.type, p),
                      w
                    );
                  m.__reactInternalSnapshotBeforeUpdate = f;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                g.nodeType === 1
                  ? (g.textContent = '')
                  : g.nodeType === 9 &&
                    g.documentElement &&
                    g.removeChild(g.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(b(163));
            }
        } catch (C) {
          he(t, t.return, C);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (M = e));
          break;
        }
        M = t.return;
      }
  return ((S = jd), (jd = !1), S);
}
function _o(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var i = o.destroy;
        ((o.destroy = void 0), i !== void 0 && $a(t, n, i));
      }
      o = o.next;
    } while (o !== r);
  }
}
function Ws(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Ua(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == 'function' ? t(e) : (t.current = e);
  }
}
function $h(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), $h(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Ot], delete t[Wo], delete t[Na], delete t[lw], delete t[aw])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function Uh(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Md(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Uh(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Va(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = fs)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Va(e, t, n), e = e.sibling; e !== null; )
      (Va(e, t, n), (e = e.sibling));
}
function Ba(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Ba(e, t, n), e = e.sibling; e !== null; )
      (Ba(e, t, n), (e = e.sibling));
}
var Ce = null,
  mt = !1;
function Zt(e, t, n) {
  for (n = n.child; n !== null; ) (Vh(e, t, n), (n = n.sibling));
}
function Vh(e, t, n) {
  if (jt && typeof jt.onCommitFiberUnmount == 'function')
    try {
      jt.onCommitFiberUnmount(Is, n);
    } catch {}
  switch (n.tag) {
    case 5:
      _e || wr(n, t);
    case 6:
      var r = Ce,
        o = mt;
      ((Ce = null),
        Zt(e, t, n),
        (Ce = r),
        (mt = o),
        Ce !== null &&
          (mt
            ? ((e = Ce),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Ce.removeChild(n.stateNode)));
      break;
    case 18:
      Ce !== null &&
        (mt
          ? ((e = Ce),
            (n = n.stateNode),
            e.nodeType === 8
              ? Ol(e.parentNode, n)
              : e.nodeType === 1 && Ol(e, n),
            zo(e))
          : Ol(Ce, n.stateNode));
      break;
    case 4:
      ((r = Ce),
        (o = mt),
        (Ce = n.stateNode.containerInfo),
        (mt = !0),
        Zt(e, t, n),
        (Ce = r),
        (mt = o));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !_e &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        o = r = r.next;
        do {
          var i = o,
            s = i.destroy;
          ((i = i.tag),
            s !== void 0 && (i & 2 || i & 4) && $a(n, t, s),
            (o = o.next));
        } while (o !== r);
      }
      Zt(e, t, n);
      break;
    case 1:
      if (
        !_e &&
        (wr(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == 'function')
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (l) {
          he(n, t, l);
        }
      Zt(e, t, n);
      break;
    case 21:
      Zt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((_e = (r = _e) || n.memoizedState !== null), Zt(e, t, n), (_e = r))
        : Zt(e, t, n);
      break;
    default:
      Zt(e, t, n);
  }
}
function Dd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new kw()),
      t.forEach(function (r) {
        var o = Mw.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      }));
  }
}
function ct(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r];
      try {
        var i = e,
          s = t,
          l = s;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              ((Ce = l.stateNode), (mt = !1));
              break e;
            case 3:
              ((Ce = l.stateNode.containerInfo), (mt = !0));
              break e;
            case 4:
              ((Ce = l.stateNode.containerInfo), (mt = !0));
              break e;
          }
          l = l.return;
        }
        if (Ce === null) throw Error(b(160));
        (Vh(i, s, o), (Ce = null), (mt = !1));
        var a = o.alternate;
        (a !== null && (a.return = null), (o.return = null));
      } catch (u) {
        he(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) (Bh(t, e), (t = t.sibling));
}
function Bh(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((ct(t, e), Tt(e), r & 4)) {
        try {
          (_o(3, e, e.return), Ws(3, e));
        } catch (p) {
          he(e, e.return, p);
        }
        try {
          _o(5, e, e.return);
        } catch (p) {
          he(e, e.return, p);
        }
      }
      break;
    case 1:
      (ct(t, e), Tt(e), r & 512 && n !== null && wr(n, n.return));
      break;
    case 5:
      if (
        (ct(t, e),
        Tt(e),
        r & 512 && n !== null && wr(n, n.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          Do(o, '');
        } catch (p) {
          he(e, e.return, p);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var i = e.memoizedProps,
          s = n !== null ? n.memoizedProps : i,
          l = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            (l === 'input' && i.type === 'radio' && i.name != null && dp(o, i),
              pa(l, s));
            var u = pa(l, i);
            for (s = 0; s < a.length; s += 2) {
              var d = a[s],
                h = a[s + 1];
              d === 'style'
                ? vp(o, h)
                : d === 'dangerouslySetInnerHTML'
                  ? hp(o, h)
                  : d === 'children'
                    ? Do(o, h)
                    : yu(o, d, h, u);
            }
            switch (l) {
              case 'input':
                aa(o, i);
                break;
              case 'textarea':
                fp(o, i);
                break;
              case 'select':
                var v = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!i.multiple;
                var x = i.value;
                x != null
                  ? Sr(o, !!i.multiple, x, !1)
                  : v !== !!i.multiple &&
                    (i.defaultValue != null
                      ? Sr(o, !!i.multiple, i.defaultValue, !0)
                      : Sr(o, !!i.multiple, i.multiple ? [] : '', !1));
            }
            o[Wo] = i;
          } catch (p) {
            he(e, e.return, p);
          }
      }
      break;
    case 6:
      if ((ct(t, e), Tt(e), r & 4)) {
        if (e.stateNode === null) throw Error(b(162));
        ((o = e.stateNode), (i = e.memoizedProps));
        try {
          o.nodeValue = i;
        } catch (p) {
          he(e, e.return, p);
        }
      }
      break;
    case 3:
      if (
        (ct(t, e), Tt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          zo(t.containerInfo);
        } catch (p) {
          he(e, e.return, p);
        }
      break;
    case 4:
      (ct(t, e), Tt(e));
      break;
    case 13:
      (ct(t, e),
        Tt(e),
        (o = e.child),
        o.flags & 8192 &&
          ((i = o.memoizedState !== null),
          (o.stateNode.isHidden = i),
          !i ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            (qu = me())),
        r & 4 && Dd(e));
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((_e = (u = _e) || d), ct(t, e), (_e = u)) : ct(t, e),
        Tt(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !d && e.mode & 1)
        )
          for (M = e, d = e.child; d !== null; ) {
            for (h = M = d; M !== null; ) {
              switch (((v = M), (x = v.child), v.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  _o(4, v, v.return);
                  break;
                case 1:
                  wr(v, v.return);
                  var S = v.stateNode;
                  if (typeof S.componentWillUnmount == 'function') {
                    ((r = v), (n = v.return));
                    try {
                      ((t = r),
                        (S.props = t.memoizedProps),
                        (S.state = t.memoizedState),
                        S.componentWillUnmount());
                    } catch (p) {
                      he(r, n, p);
                    }
                  }
                  break;
                case 5:
                  wr(v, v.return);
                  break;
                case 22:
                  if (v.memoizedState !== null) {
                    Ld(h);
                    continue;
                  }
              }
              x !== null ? ((x.return = v), (M = x)) : Ld(h);
            }
            d = d.sibling;
          }
        e: for (d = null, h = e; ; ) {
          if (h.tag === 5) {
            if (d === null) {
              d = h;
              try {
                ((o = h.stateNode),
                  u
                    ? ((i = o.style),
                      typeof i.setProperty == 'function'
                        ? i.setProperty('display', 'none', 'important')
                        : (i.display = 'none'))
                    : ((l = h.stateNode),
                      (a = h.memoizedProps.style),
                      (s =
                        a != null && a.hasOwnProperty('display')
                          ? a.display
                          : null),
                      (l.style.display = mp('display', s))));
              } catch (p) {
                he(e, e.return, p);
              }
            }
          } else if (h.tag === 6) {
            if (d === null)
              try {
                h.stateNode.nodeValue = u ? '' : h.memoizedProps;
              } catch (p) {
                he(e, e.return, p);
              }
          } else if (
            ((h.tag !== 22 && h.tag !== 23) ||
              h.memoizedState === null ||
              h === e) &&
            h.child !== null
          ) {
            ((h.child.return = h), (h = h.child));
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            (d === h && (d = null), (h = h.return));
          }
          (d === h && (d = null),
            (h.sibling.return = h.return),
            (h = h.sibling));
        }
      }
      break;
    case 19:
      (ct(t, e), Tt(e), r & 4 && Dd(e));
      break;
    case 21:
      break;
    default:
      (ct(t, e), Tt(e));
  }
}
function Tt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Uh(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(b(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (Do(o, ''), (r.flags &= -33));
          var i = Md(e);
          Ba(e, i, o);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            l = Md(e);
          Va(e, l, s);
          break;
        default:
          throw Error(b(161));
      }
    } catch (a) {
      he(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Tw(e, t, n) {
  ((M = e), Wh(e));
}
function Wh(e, t, n) {
  for (var r = (e.mode & 1) !== 0; M !== null; ) {
    var o = M,
      i = o.child;
    if (o.tag === 22 && r) {
      var s = o.memoizedState !== null || bi;
      if (!s) {
        var l = o.alternate,
          a = (l !== null && l.memoizedState !== null) || _e;
        l = bi;
        var u = _e;
        if (((bi = s), (_e = a) && !u))
          for (M = o; M !== null; )
            ((s = M),
              (a = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? Fd(o)
                : a !== null
                  ? ((a.return = s), (M = a))
                  : Fd(o));
        for (; i !== null; ) ((M = i), Wh(i), (i = i.sibling));
        ((M = o), (bi = l), (_e = u));
      }
      Id(e);
    } else
      o.subtreeFlags & 8772 && i !== null ? ((i.return = o), (M = i)) : Id(e);
  }
}
function Id(e) {
  for (; M !== null; ) {
    var t = M;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              _e || Ws(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !_e)
                if (n === null) r.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : ft(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    o,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var i = t.updateQueue;
              i !== null && xd(t, i, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                xd(t, s, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var a = t.memoizedProps;
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    a.autoFocus && n.focus();
                    break;
                  case 'img':
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var d = u.memoizedState;
                  if (d !== null) {
                    var h = d.dehydrated;
                    h !== null && zo(h);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(b(163));
          }
        _e || (t.flags & 512 && Ua(t));
      } catch (v) {
        he(t, t.return, v);
      }
    }
    if (t === e) {
      M = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (M = n));
      break;
    }
    M = t.return;
  }
}
function Ld(e) {
  for (; M !== null; ) {
    var t = M;
    if (t === e) {
      M = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (M = n));
      break;
    }
    M = t.return;
  }
}
function Fd(e) {
  for (; M !== null; ) {
    var t = M;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ws(4, t);
          } catch (a) {
            he(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == 'function') {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              he(t, o, a);
            }
          }
          var i = t.return;
          try {
            Ua(t);
          } catch (a) {
            he(t, i, a);
          }
          break;
        case 5:
          var s = t.return;
          try {
            Ua(t);
          } catch (a) {
            he(t, s, a);
          }
      }
    } catch (a) {
      he(t, t.return, a);
    }
    if (t === e) {
      M = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      ((l.return = t.return), (M = l));
      break;
    }
    M = t.return;
  }
}
var Nw = Math.ceil,
  Es = qt.ReactCurrentDispatcher,
  Yu = qt.ReactCurrentOwner,
  lt = qt.ReactCurrentBatchConfig,
  Y = 0,
  Se = null,
  ve = null,
  Ee = 0,
  Ge = 0,
  xr = On(0),
  we = 0,
  Xo = null,
  Xn = 0,
  Hs = 0,
  Xu = 0,
  Oo = null,
  Ue = null,
  qu = 0,
  Kr = 1 / 0,
  $t = null,
  ks = !1,
  Wa = null,
  Cn = null,
  _i = !1,
  vn = null,
  Ps = 0,
  Ao = 0,
  Ha = null,
  Yi = -1,
  Xi = 0;
function Fe() {
  return Y & 6 ? me() : Yi !== -1 ? Yi : (Yi = me());
}
function En(e) {
  return e.mode & 1
    ? Y & 2 && Ee !== 0
      ? Ee & -Ee
      : cw.transition !== null
        ? (Xi === 0 && (Xi = Rp()), Xi)
        : ((e = Z),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Dp(e.type))),
          e)
    : 1;
}
function yt(e, t, n, r) {
  if (50 < Ao) throw ((Ao = 0), (Ha = null), Error(b(185)));
  (ii(e, n, r),
    (!(Y & 2) || e !== Se) &&
      (e === Se && (!(Y & 2) && (Hs |= n), we === 4 && un(e, Ee)),
      He(e, r),
      n === 1 && Y === 0 && !(t.mode & 1) && ((Kr = me() + 500), Us && An())));
}
function He(e, t) {
  var n = e.callbackNode;
  c0(e, t);
  var r = as(e, e === Se ? Ee : 0);
  if (r === 0)
    (n !== null && Qc(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Qc(n), t === 1))
      (e.tag === 0 ? uw(zd.bind(null, e)) : eh(zd.bind(null, e)),
        iw(function () {
          !(Y & 6) && An();
        }),
        (n = null));
    else {
      switch (bp(r)) {
        case 1:
          n = Eu;
          break;
        case 4:
          n = Tp;
          break;
        case 16:
          n = ls;
          break;
        case 536870912:
          n = Np;
          break;
        default:
          n = ls;
      }
      n = Zh(n, Hh.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function Hh(e, t) {
  if (((Yi = -1), (Xi = 0), Y & 6)) throw Error(b(327));
  var n = e.callbackNode;
  if (Tr() && e.callbackNode !== n) return null;
  var r = as(e, e === Se ? Ee : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ts(e, r);
  else {
    t = r;
    var o = Y;
    Y |= 2;
    var i = Qh();
    (Se !== e || Ee !== t) && (($t = null), (Kr = me() + 500), Wn(e, t));
    do
      try {
        _w();
        break;
      } catch (l) {
        Kh(e, l);
      }
    while (!0);
    (Iu(),
      (Es.current = i),
      (Y = o),
      ve !== null ? (t = 0) : ((Se = null), (Ee = 0), (t = we)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = ya(e)), o !== 0 && ((r = o), (t = Ka(e, o)))), t === 1)
    )
      throw ((n = Xo), Wn(e, 0), un(e, r), He(e, me()), n);
    if (t === 6) un(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) &&
          !Rw(o) &&
          ((t = Ts(e, r)),
          t === 2 && ((i = ya(e)), i !== 0 && ((r = i), (t = Ka(e, i)))),
          t === 1))
      )
        throw ((n = Xo), Wn(e, 0), un(e, r), He(e, me()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(b(345));
        case 2:
          In(e, Ue, $t);
          break;
        case 3:
          if (
            (un(e, r), (r & 130023424) === r && ((t = qu + 500 - me()), 10 < t))
          ) {
            if (as(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              (Fe(), (e.pingedLanes |= e.suspendedLanes & o));
              break;
            }
            e.timeoutHandle = Ta(In.bind(null, e, Ue, $t), t);
            break;
          }
          In(e, Ue, $t);
          break;
        case 4:
          if ((un(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r; ) {
            var s = 31 - gt(r);
            ((i = 1 << s), (s = t[s]), s > o && (o = s), (r &= ~i));
          }
          if (
            ((r = o),
            (r = me() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Nw(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Ta(In.bind(null, e, Ue, $t), r);
            break;
          }
          In(e, Ue, $t);
          break;
        case 5:
          In(e, Ue, $t);
          break;
        default:
          throw Error(b(329));
      }
    }
  }
  return (He(e, me()), e.callbackNode === n ? Hh.bind(null, e) : null);
}
function Ka(e, t) {
  var n = Oo;
  return (
    e.current.memoizedState.isDehydrated && (Wn(e, t).flags |= 256),
    (e = Ts(e, t)),
    e !== 2 && ((t = Ue), (Ue = n), t !== null && Qa(t)),
    e
  );
}
function Qa(e) {
  Ue === null ? (Ue = e) : Ue.push.apply(Ue, e);
}
function Rw(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            i = o.getSnapshot;
          o = o.value;
          try {
            if (!wt(i(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function un(e, t) {
  for (
    t &= ~Xu,
      t &= ~Hs,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - gt(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function zd(e) {
  if (Y & 6) throw Error(b(327));
  Tr();
  var t = as(e, 0);
  if (!(t & 1)) return (He(e, me()), null);
  var n = Ts(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = ya(e);
    r !== 0 && ((t = r), (n = Ka(e, r)));
  }
  if (n === 1) throw ((n = Xo), Wn(e, 0), un(e, t), He(e, me()), n);
  if (n === 6) throw Error(b(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    In(e, Ue, $t),
    He(e, me()),
    null
  );
}
function Zu(e, t) {
  var n = Y;
  Y |= 1;
  try {
    return e(t);
  } finally {
    ((Y = n), Y === 0 && ((Kr = me() + 500), Us && An()));
  }
}
function qn(e) {
  vn !== null && vn.tag === 0 && !(Y & 6) && Tr();
  var t = Y;
  Y |= 1;
  var n = lt.transition,
    r = Z;
  try {
    if (((lt.transition = null), (Z = 1), e)) return e();
  } finally {
    ((Z = r), (lt.transition = n), (Y = t), !(Y & 6) && An());
  }
}
function Ju() {
  ((Ge = xr.current), ae(xr));
}
function Wn(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), ow(n)), ve !== null))
    for (n = ve.return; n !== null; ) {
      var r = n;
      switch ((ju(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && ps());
          break;
        case 3:
          (Wr(), ae(Be), ae(Oe), Vu());
          break;
        case 5:
          Uu(r);
          break;
        case 4:
          Wr();
          break;
        case 13:
          ae(ce);
          break;
        case 19:
          ae(ce);
          break;
        case 10:
          Lu(r.type._context);
          break;
        case 22:
        case 23:
          Ju();
      }
      n = n.return;
    }
  if (
    ((Se = e),
    (ve = e = kn(e.current, null)),
    (Ee = Ge = t),
    (we = 0),
    (Xo = null),
    (Xu = Hs = Xn = 0),
    (Ue = Oo = null),
    Fn !== null)
  ) {
    for (t = 0; t < Fn.length; t++)
      if (((n = Fn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          i = n.pending;
        if (i !== null) {
          var s = i.next;
          ((i.next = o), (r.next = s));
        }
        n.pending = r;
      }
    Fn = null;
  }
  return e;
}
function Kh(e, t) {
  do {
    var n = ve;
    try {
      if ((Iu(), (Ki.current = Cs), Ss)) {
        for (var r = de.memoizedState; r !== null; ) {
          var o = r.queue;
          (o !== null && (o.pending = null), (r = r.next));
        }
        Ss = !1;
      }
      if (
        ((Yn = 0),
        (xe = ye = de = null),
        (bo = !1),
        (Qo = 0),
        (Yu.current = null),
        n === null || n.return === null)
      ) {
        ((we = 1), (Xo = t), (ve = null));
        break;
      }
      e: {
        var i = e,
          s = n.return,
          l = n,
          a = t;
        if (
          ((t = Ee),
          (l.flags |= 32768),
          a !== null && typeof a == 'object' && typeof a.then == 'function')
        ) {
          var u = a,
            d = l,
            h = d.tag;
          if (!(d.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var v = d.alternate;
            v
              ? ((d.updateQueue = v.updateQueue),
                (d.memoizedState = v.memoizedState),
                (d.lanes = v.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var x = Td(s);
          if (x !== null) {
            ((x.flags &= -257),
              Nd(x, s, l, i, t),
              x.mode & 1 && Pd(i, u, t),
              (t = x),
              (a = u));
            var S = t.updateQueue;
            if (S === null) {
              var p = new Set();
              (p.add(a), (t.updateQueue = p));
            } else S.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              (Pd(i, u, t), ec());
              break e;
            }
            a = Error(b(426));
          }
        } else if (ue && l.mode & 1) {
          var w = Td(s);
          if (w !== null) {
            (!(w.flags & 65536) && (w.flags |= 256),
              Nd(w, s, l, i, t),
              Mu(Hr(a, l)));
            break e;
          }
        }
        ((i = a = Hr(a, l)),
          we !== 4 && (we = 2),
          Oo === null ? (Oo = [i]) : Oo.push(i),
          (i = s));
        do {
          switch (i.tag) {
            case 3:
              ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
              var m = bh(i, a, t);
              wd(i, m);
              break e;
            case 1:
              l = a;
              var f = i.type,
                g = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof f.getDerivedStateFromError == 'function' ||
                  (g !== null &&
                    typeof g.componentDidCatch == 'function' &&
                    (Cn === null || !Cn.has(g))))
              ) {
                ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
                var C = _h(i, l, t);
                wd(i, C);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Yh(n);
    } catch (E) {
      ((t = E), ve === n && n !== null && (ve = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function Qh() {
  var e = Es.current;
  return ((Es.current = Cs), e === null ? Cs : e);
}
function ec() {
  ((we === 0 || we === 3 || we === 2) && (we = 4),
    Se === null || (!(Xn & 268435455) && !(Hs & 268435455)) || un(Se, Ee));
}
function Ts(e, t) {
  var n = Y;
  Y |= 2;
  var r = Qh();
  (Se !== e || Ee !== t) && (($t = null), Wn(e, t));
  do
    try {
      bw();
      break;
    } catch (o) {
      Kh(e, o);
    }
  while (!0);
  if ((Iu(), (Y = n), (Es.current = r), ve !== null)) throw Error(b(261));
  return ((Se = null), (Ee = 0), we);
}
function bw() {
  for (; ve !== null; ) Gh(ve);
}
function _w() {
  for (; ve !== null && !t0(); ) Gh(ve);
}
function Gh(e) {
  var t = qh(e.alternate, e, Ge);
  ((e.memoizedProps = e.pendingProps),
    t === null ? Yh(e) : (ve = t),
    (Yu.current = null));
}
function Yh(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Ew(n, t)), n !== null)) {
        ((n.flags &= 32767), (ve = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((we = 6), (ve = null));
        return;
      }
    } else if (((n = Cw(n, t, Ge)), n !== null)) {
      ve = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      ve = t;
      return;
    }
    ve = t = e;
  } while (t !== null);
  we === 0 && (we = 5);
}
function In(e, t, n) {
  var r = Z,
    o = lt.transition;
  try {
    ((lt.transition = null), (Z = 1), Ow(e, t, n, r));
  } finally {
    ((lt.transition = o), (Z = r));
  }
  return null;
}
function Ow(e, t, n, r) {
  do Tr();
  while (vn !== null);
  if (Y & 6) throw Error(b(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(b(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var i = n.lanes | n.childLanes;
  if (
    (d0(e, i),
    e === Se && ((ve = Se = null), (Ee = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      _i ||
      ((_i = !0),
      Zh(ls, function () {
        return (Tr(), null);
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    ((i = lt.transition), (lt.transition = null));
    var s = Z;
    Z = 1;
    var l = Y;
    ((Y |= 4),
      (Yu.current = null),
      Pw(e, n),
      Bh(n, e),
      q0(ka),
      (us = !!Ea),
      (ka = Ea = null),
      (e.current = n),
      Tw(n),
      n0(),
      (Y = l),
      (Z = s),
      (lt.transition = i));
  } else e.current = n;
  if (
    (_i && ((_i = !1), (vn = e), (Ps = o)),
    (i = e.pendingLanes),
    i === 0 && (Cn = null),
    i0(n.stateNode),
    He(e, me()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest }));
  if (ks) throw ((ks = !1), (e = Wa), (Wa = null), e);
  return (
    Ps & 1 && e.tag !== 0 && Tr(),
    (i = e.pendingLanes),
    i & 1 ? (e === Ha ? Ao++ : ((Ao = 0), (Ha = e))) : (Ao = 0),
    An(),
    null
  );
}
function Tr() {
  if (vn !== null) {
    var e = bp(Ps),
      t = lt.transition,
      n = Z;
    try {
      if (((lt.transition = null), (Z = 16 > e ? 16 : e), vn === null))
        var r = !1;
      else {
        if (((e = vn), (vn = null), (Ps = 0), Y & 6)) throw Error(b(331));
        var o = Y;
        for (Y |= 4, M = e.current; M !== null; ) {
          var i = M,
            s = i.child;
          if (M.flags & 16) {
            var l = i.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var u = l[a];
                for (M = u; M !== null; ) {
                  var d = M;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      _o(8, d, i);
                  }
                  var h = d.child;
                  if (h !== null) ((h.return = d), (M = h));
                  else
                    for (; M !== null; ) {
                      d = M;
                      var v = d.sibling,
                        x = d.return;
                      if (($h(d), d === u)) {
                        M = null;
                        break;
                      }
                      if (v !== null) {
                        ((v.return = x), (M = v));
                        break;
                      }
                      M = x;
                    }
                }
              }
              var S = i.alternate;
              if (S !== null) {
                var p = S.child;
                if (p !== null) {
                  S.child = null;
                  do {
                    var w = p.sibling;
                    ((p.sibling = null), (p = w));
                  } while (p !== null);
                }
              }
              M = i;
            }
          }
          if (i.subtreeFlags & 2064 && s !== null) ((s.return = i), (M = s));
          else
            e: for (; M !== null; ) {
              if (((i = M), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    _o(9, i, i.return);
                }
              var m = i.sibling;
              if (m !== null) {
                ((m.return = i.return), (M = m));
                break e;
              }
              M = i.return;
            }
        }
        var f = e.current;
        for (M = f; M !== null; ) {
          s = M;
          var g = s.child;
          if (s.subtreeFlags & 2064 && g !== null) ((g.return = s), (M = g));
          else
            e: for (s = f; M !== null; ) {
              if (((l = M), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ws(9, l);
                  }
                } catch (E) {
                  he(l, l.return, E);
                }
              if (l === s) {
                M = null;
                break e;
              }
              var C = l.sibling;
              if (C !== null) {
                ((C.return = l.return), (M = C));
                break e;
              }
              M = l.return;
            }
        }
        if (
          ((Y = o), An(), jt && typeof jt.onPostCommitFiberRoot == 'function')
        )
          try {
            jt.onPostCommitFiberRoot(Is, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((Z = n), (lt.transition = t));
    }
  }
  return !1;
}
function $d(e, t, n) {
  ((t = Hr(n, t)),
    (t = bh(e, t, 1)),
    (e = Sn(e, t, 1)),
    (t = Fe()),
    e !== null && (ii(e, 1, t), He(e, t)));
}
function he(e, t, n) {
  if (e.tag === 3) $d(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        $d(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof r.componentDidCatch == 'function' &&
            (Cn === null || !Cn.has(r)))
        ) {
          ((e = Hr(n, e)),
            (e = _h(t, e, 1)),
            (t = Sn(t, e, 1)),
            (e = Fe()),
            t !== null && (ii(t, 1, e), He(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function Aw(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = Fe()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Se === e &&
      (Ee & n) === n &&
      (we === 4 || (we === 3 && (Ee & 130023424) === Ee && 500 > me() - qu)
        ? Wn(e, 0)
        : (Xu |= n)),
    He(e, t));
}
function Xh(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = xi), (xi <<= 1), !(xi & 130023424) && (xi = 4194304))
      : (t = 1));
  var n = Fe();
  ((e = Qt(e, t)), e !== null && (ii(e, t, n), He(e, n)));
}
function jw(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), Xh(e, n));
}
function Mw(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(b(314));
  }
  (r !== null && r.delete(t), Xh(e, n));
}
var qh;
qh = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Be.current) Ve = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((Ve = !1), Sw(e, t, n));
      Ve = !!(e.flags & 131072);
    }
  else ((Ve = !1), ue && t.flags & 1048576 && th(t, vs, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (Gi(e, t), (e = t.pendingProps));
      var o = Ur(t, Oe.current);
      (Pr(t, n), (o = Wu(null, t, r, e, o, n)));
      var i = Hu();
      return (
        (t.flags |= 1),
        typeof o == 'object' &&
        o !== null &&
        typeof o.render == 'function' &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            We(r) ? ((i = !0), hs(t)) : (i = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            zu(t),
            (o.updater = Bs),
            (t.stateNode = o),
            (o._reactInternals = t),
            ja(t, r, e, n),
            (t = Ia(null, t, r, !0, i, n)))
          : ((t.tag = 0), ue && i && Au(t), Ie(null, t, o, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Gi(e, t),
          (e = t.pendingProps),
          (o = r._init),
          (r = o(r._payload)),
          (t.type = r),
          (o = t.tag = Iw(r)),
          (e = ft(r, e)),
          o)
        ) {
          case 0:
            t = Da(null, t, r, e, n);
            break e;
          case 1:
            t = _d(null, t, r, e, n);
            break e;
          case 11:
            t = Rd(null, t, r, e, n);
            break e;
          case 14:
            t = bd(null, t, r, ft(r.type, e), n);
            break e;
        }
        throw Error(b(306, r, ''));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : ft(r, o)),
        Da(e, t, r, o, n)
      );
    case 1:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : ft(r, o)),
        _d(e, t, r, o, n)
      );
    case 3:
      e: {
        if ((Mh(t), e === null)) throw Error(b(387));
        ((r = t.pendingProps),
          (i = t.memoizedState),
          (o = i.element),
          lh(e, t),
          ws(t, r, null, n));
        var s = t.memoizedState;
        if (((r = s.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            ((o = Hr(Error(b(423)), t)), (t = Od(e, t, r, n, o)));
            break e;
          } else if (r !== o) {
            ((o = Hr(Error(b(424)), t)), (t = Od(e, t, r, n, o)));
            break e;
          } else
            for (
              Xe = xn(t.stateNode.containerInfo.firstChild),
                qe = t,
                ue = !0,
                vt = null,
                n = ih(t, null, r, n),
                t.child = n;
              n;

            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((Vr(), r === o)) {
            t = Gt(e, t, n);
            break e;
          }
          Ie(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        ah(t),
        e === null && _a(t),
        (r = t.type),
        (o = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (s = o.children),
        Pa(r, o) ? (s = null) : i !== null && Pa(r, i) && (t.flags |= 32),
        jh(e, t),
        Ie(e, t, s, n),
        t.child
      );
    case 6:
      return (e === null && _a(t), null);
    case 13:
      return Dh(e, t, n);
    case 4:
      return (
        $u(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Br(t, null, r, n)) : Ie(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : ft(r, o)),
        Rd(e, t, r, o, n)
      );
    case 7:
      return (Ie(e, t, t.pendingProps, n), t.child);
    case 8:
      return (Ie(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (Ie(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (i = t.memoizedProps),
          (s = o.value),
          re(gs, r._currentValue),
          (r._currentValue = s),
          i !== null)
        )
          if (wt(i.value, s)) {
            if (i.children === o.children && !Be.current) {
              t = Gt(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var l = i.dependencies;
              if (l !== null) {
                s = i.child;
                for (var a = l.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (i.tag === 1) {
                      ((a = Wt(-1, n & -n)), (a.tag = 2));
                      var u = i.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var d = u.pending;
                        (d === null
                          ? (a.next = a)
                          : ((a.next = d.next), (d.next = a)),
                          (u.pending = a));
                      }
                    }
                    ((i.lanes |= n),
                      (a = i.alternate),
                      a !== null && (a.lanes |= n),
                      Oa(i.return, n, t),
                      (l.lanes |= n));
                    break;
                  }
                  a = a.next;
                }
              } else if (i.tag === 10) s = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((s = i.return), s === null)) throw Error(b(341));
                ((s.lanes |= n),
                  (l = s.alternate),
                  l !== null && (l.lanes |= n),
                  Oa(s, n, t),
                  (s = i.sibling));
              } else s = i.child;
              if (s !== null) s.return = i;
              else
                for (s = i; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((i = s.sibling), i !== null)) {
                    ((i.return = s.return), (s = i));
                    break;
                  }
                  s = s.return;
                }
              i = s;
            }
        (Ie(e, t, o.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        Pr(t, n),
        (o = at(o)),
        (r = r(o)),
        (t.flags |= 1),
        Ie(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (o = ft(r, t.pendingProps)),
        (o = ft(r.type, o)),
        bd(e, t, r, o, n)
      );
    case 15:
      return Oh(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : ft(r, o)),
        Gi(e, t),
        (t.tag = 1),
        We(r) ? ((e = !0), hs(t)) : (e = !1),
        Pr(t, n),
        Rh(t, r, o),
        ja(t, r, o, n),
        Ia(null, t, r, !0, e, n)
      );
    case 19:
      return Ih(e, t, n);
    case 22:
      return Ah(e, t, n);
  }
  throw Error(b(156, t.tag));
};
function Zh(e, t) {
  return Pp(e, t);
}
function Dw(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function st(e, t, n, r) {
  return new Dw(e, t, n, r);
}
function tc(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Iw(e) {
  if (typeof e == 'function') return tc(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === xu)) return 11;
    if (e === Su) return 14;
  }
  return 2;
}
function kn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = st(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function qi(e, t, n, r, o, i) {
  var s = 2;
  if (((r = e), typeof e == 'function')) tc(e) && (s = 1);
  else if (typeof e == 'string') s = 5;
  else
    e: switch (e) {
      case cr:
        return Hn(n.children, o, i, t);
      case wu:
        ((s = 8), (o |= 8));
        break;
      case ra:
        return (
          (e = st(12, n, t, o | 2)),
          (e.elementType = ra),
          (e.lanes = i),
          e
        );
      case oa:
        return ((e = st(13, n, t, o)), (e.elementType = oa), (e.lanes = i), e);
      case ia:
        return ((e = st(19, n, t, o)), (e.elementType = ia), (e.lanes = i), e);
      case ap:
        return Ks(n, o, i, t);
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case sp:
              s = 10;
              break e;
            case lp:
              s = 9;
              break e;
            case xu:
              s = 11;
              break e;
            case Su:
              s = 14;
              break e;
            case sn:
              ((s = 16), (r = null));
              break e;
          }
        throw Error(b(130, e == null ? e : typeof e, ''));
    }
  return (
    (t = st(s, n, t, o)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = i),
    t
  );
}
function Hn(e, t, n, r) {
  return ((e = st(7, e, r, t)), (e.lanes = n), e);
}
function Ks(e, t, n, r) {
  return (
    (e = st(22, e, r, t)),
    (e.elementType = ap),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function zl(e, t, n) {
  return ((e = st(6, e, null, t)), (e.lanes = n), e);
}
function $l(e, t, n) {
  return (
    (t = st(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Lw(e, t, n, r, o) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = xl(0)),
    (this.expirationTimes = xl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = xl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null));
}
function nc(e, t, n, r, o, i, s, l, a) {
  return (
    (e = new Lw(e, t, n, l, a)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = st(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    zu(i),
    e
  );
}
function Fw(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: ur,
    key: r == null ? null : '' + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Jh(e) {
  if (!e) return Tn;
  e = e._reactInternals;
  e: {
    if (nr(e) !== e || e.tag !== 1) throw Error(b(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (We(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(b(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (We(n)) return Jp(e, n, t);
  }
  return t;
}
function em(e, t, n, r, o, i, s, l, a) {
  return (
    (e = nc(n, r, !0, e, o, i, s, l, a)),
    (e.context = Jh(null)),
    (n = e.current),
    (r = Fe()),
    (o = En(n)),
    (i = Wt(r, o)),
    (i.callback = t ?? null),
    Sn(n, i, o),
    (e.current.lanes = o),
    ii(e, o, r),
    He(e, r),
    e
  );
}
function Qs(e, t, n, r) {
  var o = t.current,
    i = Fe(),
    s = En(o);
  return (
    (n = Jh(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Wt(i, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Sn(o, t, s)),
    e !== null && (yt(e, o, s, i), Hi(e, o, s)),
    s
  );
}
function Ns(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ud(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function rc(e, t) {
  (Ud(e, t), (e = e.alternate) && Ud(e, t));
}
function zw() {
  return null;
}
var tm =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e);
      };
function oc(e) {
  this._internalRoot = e;
}
Gs.prototype.render = oc.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(b(409));
  Qs(e, t, null, null);
};
Gs.prototype.unmount = oc.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (qn(function () {
      Qs(null, e, null, null);
    }),
      (t[Kt] = null));
  }
};
function Gs(e) {
  this._internalRoot = e;
}
Gs.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Ap();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < an.length && t !== 0 && t < an[n].priority; n++);
    (an.splice(n, 0, e), n === 0 && Mp(e));
  }
};
function ic(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ys(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  );
}
function Vd() {}
function $w(e, t, n, r, o) {
  if (o) {
    if (typeof r == 'function') {
      var i = r;
      r = function () {
        var u = Ns(s);
        i.call(u);
      };
    }
    var s = em(t, r, e, 0, null, !1, !1, '', Vd);
    return (
      (e._reactRootContainer = s),
      (e[Kt] = s.current),
      Vo(e.nodeType === 8 ? e.parentNode : e),
      qn(),
      s
    );
  }
  for (; (o = e.lastChild); ) e.removeChild(o);
  if (typeof r == 'function') {
    var l = r;
    r = function () {
      var u = Ns(a);
      l.call(u);
    };
  }
  var a = nc(e, 0, !1, null, null, !1, !1, '', Vd);
  return (
    (e._reactRootContainer = a),
    (e[Kt] = a.current),
    Vo(e.nodeType === 8 ? e.parentNode : e),
    qn(function () {
      Qs(t, a, n, r);
    }),
    a
  );
}
function Xs(e, t, n, r, o) {
  var i = n._reactRootContainer;
  if (i) {
    var s = i;
    if (typeof o == 'function') {
      var l = o;
      o = function () {
        var a = Ns(s);
        l.call(a);
      };
    }
    Qs(t, s, e, o);
  } else s = $w(n, t, e, o, r);
  return Ns(s);
}
_p = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = So(t.pendingLanes);
        n !== 0 &&
          (ku(t, n | 1), He(t, me()), !(Y & 6) && ((Kr = me() + 500), An()));
      }
      break;
    case 13:
      (qn(function () {
        var r = Qt(e, 1);
        if (r !== null) {
          var o = Fe();
          yt(r, e, 1, o);
        }
      }),
        rc(e, 1));
  }
};
Pu = function (e) {
  if (e.tag === 13) {
    var t = Qt(e, 134217728);
    if (t !== null) {
      var n = Fe();
      yt(t, e, 134217728, n);
    }
    rc(e, 134217728);
  }
};
Op = function (e) {
  if (e.tag === 13) {
    var t = En(e),
      n = Qt(e, t);
    if (n !== null) {
      var r = Fe();
      yt(n, e, t, r);
    }
    rc(e, t);
  }
};
Ap = function () {
  return Z;
};
jp = function (e, t) {
  var n = Z;
  try {
    return ((Z = e), t());
  } finally {
    Z = n;
  }
};
ma = function (e, t, n) {
  switch (t) {
    case 'input':
      if ((aa(e, n), (t = n.name), n.type === 'radio' && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            'input[name=' + JSON.stringify('' + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = $s(r);
            if (!o) throw Error(b(90));
            (cp(r), aa(r, o));
          }
        }
      }
      break;
    case 'textarea':
      fp(e, n);
      break;
    case 'select':
      ((t = n.value), t != null && Sr(e, !!n.multiple, t, !1));
  }
};
wp = Zu;
xp = qn;
var Uw = { usingClientEntryPoint: !1, Events: [li, hr, $s, gp, yp, Zu] },
  vo = {
    findFiberByHostInstance: Ln,
    bundleType: 0,
    version: '18.3.1',
    rendererPackageName: 'react-dom',
  },
  Vw = {
    bundleType: vo.bundleType,
    version: vo.version,
    rendererPackageName: vo.rendererPackageName,
    rendererConfig: vo.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: qt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = Ep(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: vo.findFiberByHostInstance || zw,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var Oi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Oi.isDisabled && Oi.supportsFiber)
    try {
      ((Is = Oi.inject(Vw)), (jt = Oi));
    } catch {}
}
tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Uw;
tt.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ic(t)) throw Error(b(200));
  return Fw(e, t, null, n);
};
tt.createRoot = function (e, t) {
  if (!ic(e)) throw Error(b(299));
  var n = !1,
    r = '',
    o = tm;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = nc(e, 1, !1, null, null, n, !1, r, o)),
    (e[Kt] = t.current),
    Vo(e.nodeType === 8 ? e.parentNode : e),
    new oc(t)
  );
};
tt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error(b(188))
      : ((e = Object.keys(e).join(',')), Error(b(268, e)));
  return ((e = Ep(t)), (e = e === null ? null : e.stateNode), e);
};
tt.flushSync = function (e) {
  return qn(e);
};
tt.hydrate = function (e, t, n) {
  if (!Ys(t)) throw Error(b(200));
  return Xs(null, e, t, !0, n);
};
tt.hydrateRoot = function (e, t, n) {
  if (!ic(e)) throw Error(b(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    i = '',
    s = tm;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = em(t, null, e, 1, n ?? null, o, !1, i, s)),
    (e[Kt] = t.current),
    Vo(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o));
  return new Gs(t);
};
tt.render = function (e, t, n) {
  if (!Ys(t)) throw Error(b(200));
  return Xs(null, e, t, !1, n);
};
tt.unmountComponentAtNode = function (e) {
  if (!Ys(e)) throw Error(b(40));
  return e._reactRootContainer
    ? (qn(function () {
        Xs(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[Kt] = null));
        });
      }),
      !0)
    : !1;
};
tt.unstable_batchedUpdates = Zu;
tt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Ys(n)) throw Error(b(200));
  if (e == null || e._reactInternals === void 0) throw Error(b(38));
  return Xs(e, t, n, !1, r);
};
tt.version = '18.3.1-next-f1338f8080-20240426';
function nm() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nm);
    } catch (e) {
      console.error(e);
    }
}
(nm(), (np.exports = tt));
var rr = np.exports;
const Bw = Bf(rr);
var rm,
  Bd = rr;
((rm = Bd.createRoot), Bd.hydrateRoot);
function Ww(e, t) {
  if (e instanceof RegExp) return { keys: !1, pattern: e };
  var n,
    r,
    o,
    i,
    s = [],
    l = '',
    a = e.split('/');
  for (a[0] || a.shift(); (o = a.shift()); )
    ((n = o[0]),
      n === '*'
        ? (s.push(n), (l += o[1] === '?' ? '(?:/(.*))?' : '/(.*)'))
        : n === ':'
          ? ((r = o.indexOf('?', 1)),
            (i = o.indexOf('.', 1)),
            s.push(o.substring(1, ~r ? r : ~i ? i : o.length)),
            (l += ~r && !~i ? '(?:/([^/]+?))?' : '/([^/]+?)'),
            ~i && (l += (~r ? '?' : '') + '\\' + o.substring(i)))
          : (l += '/' + o));
  return {
    keys: s,
    pattern: new RegExp('^' + l + (t ? '(?=$|/)' : '/?$'), 'i'),
  };
}
var om = { exports: {} },
  im = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qr = c;
function Hw(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Kw = typeof Object.is == 'function' ? Object.is : Hw,
  Qw = Qr.useState,
  Gw = Qr.useEffect,
  Yw = Qr.useLayoutEffect,
  Xw = Qr.useDebugValue;
function qw(e, t) {
  var n = t(),
    r = Qw({ inst: { value: n, getSnapshot: t } }),
    o = r[0].inst,
    i = r[1];
  return (
    Yw(
      function () {
        ((o.value = n), (o.getSnapshot = t), Ul(o) && i({ inst: o }));
      },
      [e, n, t]
    ),
    Gw(
      function () {
        return (
          Ul(o) && i({ inst: o }),
          e(function () {
            Ul(o) && i({ inst: o });
          })
        );
      },
      [e]
    ),
    Xw(n),
    n
  );
}
function Ul(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Kw(e, n);
  } catch {
    return !0;
  }
}
function Zw(e, t) {
  return t();
}
var Jw =
  typeof window > 'u' ||
  typeof window.document > 'u' ||
  typeof window.document.createElement > 'u'
    ? Zw
    : qw;
im.useSyncExternalStore =
  Qr.useSyncExternalStore !== void 0 ? Qr.useSyncExternalStore : Jw;
om.exports = im;
var ex = om.exports;
const tx = ep.useInsertionEffect,
  nx =
    typeof window < 'u' &&
    typeof window.document < 'u' &&
    typeof window.document.createElement < 'u',
  rx = nx ? c.useLayoutEffect : c.useEffect,
  ox = tx || rx,
  sm = (e) => {
    const t = c.useRef([e, (...n) => t[0](...n)]).current;
    return (
      ox(() => {
        t[0] = e;
      }),
      t[1]
    );
  },
  ix = 'popstate',
  sc = 'pushState',
  lc = 'replaceState',
  sx = 'hashchange',
  Wd = [ix, sc, lc, sx],
  lx = (e) => {
    for (const t of Wd) addEventListener(t, e);
    return () => {
      for (const t of Wd) removeEventListener(t, e);
    };
  },
  lm = (e, t) => ex.useSyncExternalStore(lx, e, t),
  ax = () => location.search,
  ux = ({ ssrSearch: e = '' } = {}) => lm(ax, () => e),
  Hd = () => location.pathname,
  cx = ({ ssrPath: e } = {}) => lm(Hd, e ? () => e : Hd),
  dx = (e, { replace: t = !1, state: n = null } = {}) =>
    history[t ? lc : sc](n, '', e),
  fx = (e = {}) => [cx(e), dx],
  Kd = Symbol.for('wouter_v3');
if (typeof history < 'u' && typeof window[Kd] > 'u') {
  for (const e of [sc, lc]) {
    const t = history[e];
    history[e] = function () {
      const n = t.apply(this, arguments),
        r = new Event(e);
      return ((r.arguments = arguments), dispatchEvent(r), n);
    };
  }
  Object.defineProperty(window, Kd, { value: !0 });
}
const px = (e, t) =>
    t.toLowerCase().indexOf(e.toLowerCase())
      ? '~' + t
      : t.slice(e.length) || '/',
  am = (e = '') => (e === '/' ? '' : e),
  hx = (e, t) => (e[0] === '~' ? e.slice(1) : am(t) + e),
  mx = (e = '', t) => px(Qd(am(e)), Qd(t)),
  Qd = (e) => {
    try {
      return decodeURI(e);
    } catch {
      return e;
    }
  },
  um = {
    hook: fx,
    searchHook: ux,
    parser: Ww,
    base: '',
    ssrPath: void 0,
    ssrSearch: void 0,
    hrefs: (e) => e,
  },
  cm = c.createContext(um),
  qs = () => c.useContext(cm),
  dm = {},
  fm = c.createContext(dm),
  vx = () => c.useContext(fm),
  ac = (e) => {
    const [t, n] = e.hook(e);
    return [mx(e.base, t), sm((r, o) => n(hx(r, e.base), o))];
  },
  pm = (e, t, n, r) => {
    const { pattern: o, keys: i } =
        t instanceof RegExp ? { keys: !1, pattern: t } : e(t || '*', r),
      s = o.exec(n) || [],
      [l, ...a] = s;
    return l !== void 0
      ? [
          !0,
          (() => {
            const u =
              i !== !1
                ? Object.fromEntries(i.map((h, v) => [h, a[v]]))
                : s.groups;
            let d = { ...a };
            return (u && Object.assign(d, u), d);
          })(),
          ...(r ? [l] : []),
        ]
      : [!1, null];
  },
  gx = ({ children: e, ...t }) => {
    var d, h;
    const n = qs(),
      r = t.hook ? um : n;
    let o = r;
    const [i, s] = ((d = t.ssrPath) == null ? void 0 : d.split('?')) ?? [];
    (s && ((t.ssrSearch = s), (t.ssrPath = i)),
      (t.hrefs = t.hrefs ?? ((h = t.hook) == null ? void 0 : h.hrefs)));
    let l = c.useRef({}),
      a = l.current,
      u = a;
    for (let v in r) {
      const x = v === 'base' ? r[v] + (t[v] || '') : t[v] || r[v];
      (a === u && x !== u[v] && (l.current = u = { ...u }),
        (u[v] = x),
        x !== r[v] && (o = u));
    }
    return c.createElement(cm.Provider, { value: o, children: e });
  },
  Gd = ({ children: e, component: t }, n) =>
    t ? c.createElement(t, { params: n }) : typeof e == 'function' ? e(n) : e,
  yx = (e) => {
    let t = c.useRef(dm),
      n = t.current;
    for (const r in e) e[r] !== n[r] && (n = e);
    return (Object.keys(e).length === 0 && (n = e), (t.current = n));
  },
  Yd = ({ path: e, nest: t, match: n, ...r }) => {
    const o = qs(),
      [i] = ac(o),
      [s, l, a] = n ?? pm(o.parser, e, i, t),
      u = yx({ ...vx(), ...l });
    if (!s) return null;
    const d = a ? c.createElement(gx, { base: a }, Gd(r, u)) : Gd(r, u);
    return c.createElement(fm.Provider, { value: u, children: d });
  };
c.forwardRef((e, t) => {
  const n = qs(),
    [r, o] = ac(n),
    {
      to: i = '',
      href: s = i,
      onClick: l,
      asChild: a,
      children: u,
      className: d,
      replace: h,
      state: v,
      ...x
    } = e,
    S = sm((w) => {
      w.ctrlKey ||
        w.metaKey ||
        w.altKey ||
        w.shiftKey ||
        w.button !== 0 ||
        (l == null || l(w),
        w.defaultPrevented || (w.preventDefault(), o(s, e)));
    }),
    p = n.hrefs(s[0] === '~' ? s.slice(1) : n.base + s, n);
  return a && c.isValidElement(u)
    ? c.cloneElement(u, { onClick: S, href: p })
    : c.createElement('a', {
        ...x,
        onClick: S,
        href: p,
        className: d != null && d.call ? d(r === s) : d,
        children: u,
        ref: t,
      });
});
const hm = (e) =>
    Array.isArray(e)
      ? e.flatMap((t) => hm(t && t.type === c.Fragment ? t.props.children : t))
      : [e],
  wx = ({ children: e, location: t }) => {
    const n = qs(),
      [r] = ac(n);
    for (const o of hm(e)) {
      let i = 0;
      if (
        c.isValidElement(o) &&
        (i = pm(n.parser, o.props.path, t || r, o.props.nest))[0]
      )
        return c.cloneElement(o, { match: i });
    }
    return null;
  };
var Zs = class {
    constructor() {
      ((this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(e), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  Js = typeof window > 'u' || 'Deno' in globalThis;
function pt() {}
function xx(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Sx(e) {
  return typeof e == 'number' && e >= 0 && e !== 1 / 0;
}
function Cx(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function Xd(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Ex(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function qd(e, t) {
  const {
    type: n = 'all',
    exact: r,
    fetchStatus: o,
    predicate: i,
    queryKey: s,
    stale: l,
  } = e;
  if (s) {
    if (r) {
      if (t.queryHash !== uc(s, t.options)) return !1;
    } else if (!Zo(t.queryKey, s)) return !1;
  }
  if (n !== 'all') {
    const a = t.isActive();
    if ((n === 'active' && !a) || (n === 'inactive' && a)) return !1;
  }
  return !(
    (typeof l == 'boolean' && t.isStale() !== l) ||
    (o && o !== t.state.fetchStatus) ||
    (i && !i(t))
  );
}
function Zd(e, t) {
  const { exact: n, status: r, predicate: o, mutationKey: i } = e;
  if (i) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (qo(t.options.mutationKey) !== qo(i)) return !1;
    } else if (!Zo(t.options.mutationKey, i)) return !1;
  }
  return !((r && t.state.status !== r) || (o && !o(t)));
}
function uc(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || qo)(e);
}
function qo(e) {
  return JSON.stringify(e, (t, n) =>
    Ga(n)
      ? Object.keys(n)
          .sort()
          .reduce((r, o) => ((r[o] = n[o]), r), {})
      : n
  );
}
function Zo(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
      ? !1
      : e && t && typeof e == 'object' && typeof t == 'object'
        ? !Object.keys(t).some((n) => !Zo(e[n], t[n]))
        : !1;
}
function mm(e, t) {
  if (e === t) return e;
  const n = Jd(e) && Jd(t);
  if (n || (Ga(e) && Ga(t))) {
    const r = n ? e : Object.keys(e),
      o = r.length,
      i = n ? t : Object.keys(t),
      s = i.length,
      l = n ? [] : {};
    let a = 0;
    for (let u = 0; u < s; u++) {
      const d = n ? u : i[u];
      ((!n && r.includes(d)) || n) && e[d] === void 0 && t[d] === void 0
        ? ((l[d] = void 0), a++)
        : ((l[d] = mm(e[d], t[d])), l[d] === e[d] && e[d] !== void 0 && a++);
    }
    return o === s && a === o ? e : l;
  }
  return t;
}
function Jd(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Ga(e) {
  if (!ef(e)) return !1;
  const t = e.constructor;
  if (t === void 0) return !0;
  const n = t.prototype;
  return !(
    !ef(n) ||
    !n.hasOwnProperty('isPrototypeOf') ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function ef(e) {
  return Object.prototype.toString.call(e) === '[object Object]';
}
function kx(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
function Px(e, t, n) {
  return typeof n.structuralSharing == 'function'
    ? n.structuralSharing(e, t)
    : n.structuralSharing !== !1
      ? mm(e, t)
      : t;
}
function Tx(e, t, n = 0) {
  const r = [...e, t];
  return n && r.length > n ? r.slice(1) : r;
}
function Nx(e, t, n = 0) {
  const r = [t, ...e];
  return n && r.length > n ? r.slice(0, -1) : r;
}
var cc = Symbol();
function vm(e, t) {
  return !e.queryFn && t != null && t.initialPromise
    ? () => t.initialPromise
    : !e.queryFn || e.queryFn === cc
      ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
var $n,
  cn,
  Or,
  Df,
  Rx =
    ((Df = class extends Zs {
      constructor() {
        super();
        X(this, $n);
        X(this, cn);
        X(this, Or);
        K(this, Or, (t) => {
          if (!Js && window.addEventListener) {
            const n = () => t();
            return (
              window.addEventListener('visibilitychange', n, !1),
              () => {
                window.removeEventListener('visibilitychange', n);
              }
            );
          }
        });
      }
      onSubscribe() {
        R(this, cn) || this.setEventListener(R(this, Or));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() ||
          ((t = R(this, cn)) == null || t.call(this), K(this, cn, void 0));
      }
      setEventListener(t) {
        var n;
        (K(this, Or, t),
          (n = R(this, cn)) == null || n.call(this),
          K(
            this,
            cn,
            t((r) => {
              typeof r == 'boolean' ? this.setFocused(r) : this.onFocus();
            })
          ));
      }
      setFocused(t) {
        R(this, $n) !== t && (K(this, $n, t), this.onFocus());
      }
      onFocus() {
        const t = this.isFocused();
        this.listeners.forEach((n) => {
          n(t);
        });
      }
      isFocused() {
        var t;
        return typeof R(this, $n) == 'boolean'
          ? R(this, $n)
          : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !==
              'hidden';
      }
    }),
    ($n = new WeakMap()),
    (cn = new WeakMap()),
    (Or = new WeakMap()),
    Df),
  gm = new Rx(),
  Ar,
  dn,
  jr,
  If,
  bx =
    ((If = class extends Zs {
      constructor() {
        super();
        X(this, Ar, !0);
        X(this, dn);
        X(this, jr);
        K(this, jr, (t) => {
          if (!Js && window.addEventListener) {
            const n = () => t(!0),
              r = () => t(!1);
            return (
              window.addEventListener('online', n, !1),
              window.addEventListener('offline', r, !1),
              () => {
                (window.removeEventListener('online', n),
                  window.removeEventListener('offline', r));
              }
            );
          }
        });
      }
      onSubscribe() {
        R(this, dn) || this.setEventListener(R(this, jr));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() ||
          ((t = R(this, dn)) == null || t.call(this), K(this, dn, void 0));
      }
      setEventListener(t) {
        var n;
        (K(this, jr, t),
          (n = R(this, dn)) == null || n.call(this),
          K(this, dn, t(this.setOnline.bind(this))));
      }
      setOnline(t) {
        R(this, Ar) !== t &&
          (K(this, Ar, t),
          this.listeners.forEach((r) => {
            r(t);
          }));
      }
      isOnline() {
        return R(this, Ar);
      }
    }),
    (Ar = new WeakMap()),
    (dn = new WeakMap()),
    (jr = new WeakMap()),
    If),
  Rs = new bx();
function _x() {
  let e, t;
  const n = new Promise((o, i) => {
    ((e = o), (t = i));
  });
  ((n.status = 'pending'), n.catch(() => {}));
  function r(o) {
    (Object.assign(n, o), delete n.resolve, delete n.reject);
  }
  return (
    (n.resolve = (o) => {
      (r({ status: 'fulfilled', value: o }), e(o));
    }),
    (n.reject = (o) => {
      (r({ status: 'rejected', reason: o }), t(o));
    }),
    n
  );
}
function Ox(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function ym(e) {
  return (e ?? 'online') === 'online' ? Rs.isOnline() : !0;
}
var wm = class extends Error {
  constructor(e) {
    (super('CancelledError'),
      (this.revert = e == null ? void 0 : e.revert),
      (this.silent = e == null ? void 0 : e.silent));
  }
};
function Vl(e) {
  return e instanceof wm;
}
function xm(e) {
  let t = !1,
    n = 0,
    r = !1,
    o;
  const i = _x(),
    s = (p) => {
      var w;
      r || (v(new wm(p)), (w = e.abort) == null || w.call(e));
    },
    l = () => {
      t = !0;
    },
    a = () => {
      t = !1;
    },
    u = () =>
      gm.isFocused() &&
      (e.networkMode === 'always' || Rs.isOnline()) &&
      e.canRun(),
    d = () => ym(e.networkMode) && e.canRun(),
    h = (p) => {
      var w;
      r ||
        ((r = !0),
        (w = e.onSuccess) == null || w.call(e, p),
        o == null || o(),
        i.resolve(p));
    },
    v = (p) => {
      var w;
      r ||
        ((r = !0),
        (w = e.onError) == null || w.call(e, p),
        o == null || o(),
        i.reject(p));
    },
    x = () =>
      new Promise((p) => {
        var w;
        ((o = (m) => {
          (r || u()) && p(m);
        }),
          (w = e.onPause) == null || w.call(e));
      }).then(() => {
        var p;
        ((o = void 0), r || (p = e.onContinue) == null || p.call(e));
      }),
    S = () => {
      if (r) return;
      let p;
      const w = n === 0 ? e.initialPromise : void 0;
      try {
        p = w ?? e.fn();
      } catch (m) {
        p = Promise.reject(m);
      }
      Promise.resolve(p)
        .then(h)
        .catch((m) => {
          var T;
          if (r) return;
          const f = e.retry ?? (Js ? 0 : 3),
            g = e.retryDelay ?? Ox,
            C = typeof g == 'function' ? g(n, m) : g,
            E =
              f === !0 ||
              (typeof f == 'number' && n < f) ||
              (typeof f == 'function' && f(n, m));
          if (t || !E) {
            v(m);
            return;
          }
          (n++,
            (T = e.onFail) == null || T.call(e, n, m),
            kx(C)
              .then(() => (u() ? void 0 : x()))
              .then(() => {
                t ? v(m) : S();
              }));
        });
    };
  return {
    promise: i,
    cancel: s,
    continue: () => (o == null || o(), i),
    cancelRetry: l,
    continueRetry: a,
    canStart: d,
    start: () => (d() ? S() : x().then(S), i),
  };
}
function Ax() {
  let e = [],
    t = 0,
    n = (l) => {
      l();
    },
    r = (l) => {
      l();
    },
    o = (l) => setTimeout(l, 0);
  const i = (l) => {
      t
        ? e.push(l)
        : o(() => {
            n(l);
          });
    },
    s = () => {
      const l = e;
      ((e = []),
        l.length &&
          o(() => {
            r(() => {
              l.forEach((a) => {
                n(a);
              });
            });
          }));
    };
  return {
    batch: (l) => {
      let a;
      t++;
      try {
        a = l();
      } finally {
        (t--, t || s());
      }
      return a;
    },
    batchCalls:
      (l) =>
      (...a) => {
        i(() => {
          l(...a);
        });
      },
    schedule: i,
    setNotifyFunction: (l) => {
      n = l;
    },
    setBatchNotifyFunction: (l) => {
      r = l;
    },
    setScheduler: (l) => {
      o = l;
    },
  };
}
var Le = Ax(),
  Un,
  Lf,
  Sm =
    ((Lf = class {
      constructor() {
        X(this, Un);
      }
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        (this.clearGcTimeout(),
          Sx(this.gcTime) &&
            K(
              this,
              Un,
              setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime)
            ));
      }
      updateGcTime(e) {
        this.gcTime = Math.max(
          this.gcTime || 0,
          e ?? (Js ? 1 / 0 : 5 * 60 * 1e3)
        );
      }
      clearGcTimeout() {
        R(this, Un) && (clearTimeout(R(this, Un)), K(this, Un, void 0));
      }
    }),
    (Un = new WeakMap()),
    Lf),
  Mr,
  Dr,
  rt,
  be,
  ni,
  Vn,
  ht,
  zt,
  Ff,
  jx =
    ((Ff = class extends Sm {
      constructor(t) {
        super();
        X(this, ht);
        X(this, Mr);
        X(this, Dr);
        X(this, rt);
        X(this, be);
        X(this, ni);
        X(this, Vn);
        (K(this, Vn, !1),
          K(this, ni, t.defaultOptions),
          this.setOptions(t.options),
          (this.observers = []),
          K(this, rt, t.cache),
          (this.queryKey = t.queryKey),
          (this.queryHash = t.queryHash),
          K(this, Mr, Dx(this.options)),
          (this.state = t.state ?? R(this, Mr)),
          this.scheduleGc());
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        var t;
        return (t = R(this, be)) == null ? void 0 : t.promise;
      }
      setOptions(t) {
        ((this.options = { ...R(this, ni), ...t }),
          this.updateGcTime(this.options.gcTime));
      }
      optionalRemove() {
        !this.observers.length &&
          this.state.fetchStatus === 'idle' &&
          R(this, rt).remove(this);
      }
      setData(t, n) {
        const r = Px(this.state.data, t, this.options);
        return (
          Te(this, ht, zt).call(this, {
            data: r,
            type: 'success',
            dataUpdatedAt: n == null ? void 0 : n.updatedAt,
            manual: n == null ? void 0 : n.manual,
          }),
          r
        );
      }
      setState(t, n) {
        Te(this, ht, zt).call(this, {
          type: 'setState',
          state: t,
          setStateOptions: n,
        });
      }
      cancel(t) {
        var r, o;
        const n = (r = R(this, be)) == null ? void 0 : r.promise;
        return (
          (o = R(this, be)) == null || o.cancel(t),
          n ? n.then(pt).catch(pt) : Promise.resolve()
        );
      }
      destroy() {
        (super.destroy(), this.cancel({ silent: !0 }));
      }
      reset() {
        (this.destroy(), this.setState(R(this, Mr)));
      }
      isActive() {
        return this.observers.some((t) => Ex(t.options.enabled, this) !== !1);
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === cc ||
              this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
      }
      isStale() {
        return this.state.isInvalidated
          ? !0
          : this.getObserversCount() > 0
            ? this.observers.some((t) => t.getCurrentResult().isStale)
            : this.state.data === void 0;
      }
      isStaleByTime(t = 0) {
        return (
          this.state.isInvalidated ||
          this.state.data === void 0 ||
          !Cx(this.state.dataUpdatedAt, t)
        );
      }
      onFocus() {
        var n;
        const t = this.observers.find((r) => r.shouldFetchOnWindowFocus());
        (t == null || t.refetch({ cancelRefetch: !1 }),
          (n = R(this, be)) == null || n.continue());
      }
      onOnline() {
        var n;
        const t = this.observers.find((r) => r.shouldFetchOnReconnect());
        (t == null || t.refetch({ cancelRefetch: !1 }),
          (n = R(this, be)) == null || n.continue());
      }
      addObserver(t) {
        this.observers.includes(t) ||
          (this.observers.push(t),
          this.clearGcTimeout(),
          R(this, rt).notify({
            type: 'observerAdded',
            query: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        this.observers.includes(t) &&
          ((this.observers = this.observers.filter((n) => n !== t)),
          this.observers.length ||
            (R(this, be) &&
              (R(this, Vn)
                ? R(this, be).cancel({ revert: !0 })
                : R(this, be).cancelRetry()),
            this.scheduleGc()),
          R(this, rt).notify({
            type: 'observerRemoved',
            query: this,
            observer: t,
          }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated ||
          Te(this, ht, zt).call(this, { type: 'invalidate' });
      }
      fetch(t, n) {
        var a, u, d;
        if (this.state.fetchStatus !== 'idle') {
          if (this.state.data !== void 0 && n != null && n.cancelRefetch)
            this.cancel({ silent: !0 });
          else if (R(this, be))
            return (R(this, be).continueRetry(), R(this, be).promise);
        }
        if ((t && this.setOptions(t), !this.options.queryFn)) {
          const h = this.observers.find((v) => v.options.queryFn);
          h && this.setOptions(h.options);
        }
        const r = new AbortController(),
          o = (h) => {
            Object.defineProperty(h, 'signal', {
              enumerable: !0,
              get: () => (K(this, Vn, !0), r.signal),
            });
          },
          i = () => {
            const h = vm(this.options, n),
              v = { queryKey: this.queryKey, meta: this.meta };
            return (
              o(v),
              K(this, Vn, !1),
              this.options.persister ? this.options.persister(h, v, this) : h(v)
            );
          },
          s = {
            fetchOptions: n,
            options: this.options,
            queryKey: this.queryKey,
            state: this.state,
            fetchFn: i,
          };
        (o(s),
          (a = this.options.behavior) == null || a.onFetch(s, this),
          K(this, Dr, this.state),
          (this.state.fetchStatus === 'idle' ||
            this.state.fetchMeta !==
              ((u = s.fetchOptions) == null ? void 0 : u.meta)) &&
            Te(this, ht, zt).call(this, {
              type: 'fetch',
              meta: (d = s.fetchOptions) == null ? void 0 : d.meta,
            }));
        const l = (h) => {
          var v, x, S, p;
          ((Vl(h) && h.silent) ||
            Te(this, ht, zt).call(this, { type: 'error', error: h }),
            Vl(h) ||
              ((x = (v = R(this, rt).config).onError) == null ||
                x.call(v, h, this),
              (p = (S = R(this, rt).config).onSettled) == null ||
                p.call(S, this.state.data, h, this)),
            this.scheduleGc());
        };
        return (
          K(
            this,
            be,
            xm({
              initialPromise: n == null ? void 0 : n.initialPromise,
              fn: s.fetchFn,
              abort: r.abort.bind(r),
              onSuccess: (h) => {
                var v, x, S, p;
                if (h === void 0) {
                  l(new Error(`${this.queryHash} data is undefined`));
                  return;
                }
                try {
                  this.setData(h);
                } catch (w) {
                  l(w);
                  return;
                }
                ((x = (v = R(this, rt).config).onSuccess) == null ||
                  x.call(v, h, this),
                  (p = (S = R(this, rt).config).onSettled) == null ||
                    p.call(S, h, this.state.error, this),
                  this.scheduleGc());
              },
              onError: l,
              onFail: (h, v) => {
                Te(this, ht, zt).call(this, {
                  type: 'failed',
                  failureCount: h,
                  error: v,
                });
              },
              onPause: () => {
                Te(this, ht, zt).call(this, { type: 'pause' });
              },
              onContinue: () => {
                Te(this, ht, zt).call(this, { type: 'continue' });
              },
              retry: s.options.retry,
              retryDelay: s.options.retryDelay,
              networkMode: s.options.networkMode,
              canRun: () => !0,
            })
          ),
          R(this, be).start()
        );
      }
    }),
    (Mr = new WeakMap()),
    (Dr = new WeakMap()),
    (rt = new WeakMap()),
    (be = new WeakMap()),
    (ni = new WeakMap()),
    (Vn = new WeakMap()),
    (ht = new WeakSet()),
    (zt = function (t) {
      const n = (r) => {
        switch (t.type) {
          case 'failed':
            return {
              ...r,
              fetchFailureCount: t.failureCount,
              fetchFailureReason: t.error,
            };
          case 'pause':
            return { ...r, fetchStatus: 'paused' };
          case 'continue':
            return { ...r, fetchStatus: 'fetching' };
          case 'fetch':
            return {
              ...r,
              ...Mx(r.data, this.options),
              fetchMeta: t.meta ?? null,
            };
          case 'success':
            return {
              ...r,
              data: t.data,
              dataUpdateCount: r.dataUpdateCount + 1,
              dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: !1,
              status: 'success',
              ...(!t.manual && {
                fetchStatus: 'idle',
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
          case 'error':
            const o = t.error;
            return Vl(o) && o.revert && R(this, Dr)
              ? { ...R(this, Dr), fetchStatus: 'idle' }
              : {
                  ...r,
                  error: o,
                  errorUpdateCount: r.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: r.fetchFailureCount + 1,
                  fetchFailureReason: o,
                  fetchStatus: 'idle',
                  status: 'error',
                };
          case 'invalidate':
            return { ...r, isInvalidated: !0 };
          case 'setState':
            return { ...r, ...t.state };
        }
      };
      ((this.state = n(this.state)),
        Le.batch(() => {
          (this.observers.forEach((r) => {
            r.onQueryUpdate();
          }),
            R(this, rt).notify({ query: this, type: 'updated', action: t }));
        }));
    }),
    Ff);
function Mx(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: ym(t.networkMode) ? 'fetching' : 'paused',
    ...(e === void 0 && { error: null, status: 'pending' }),
  };
}
function Dx(e) {
  const t =
      typeof e.initialData == 'function' ? e.initialData() : e.initialData,
    n = t !== void 0,
    r = n
      ? typeof e.initialDataUpdatedAt == 'function'
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? (r ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? 'success' : 'pending',
    fetchStatus: 'idle',
  };
}
var Rt,
  zf,
  Ix =
    ((zf = class extends Zs {
      constructor(t = {}) {
        super();
        X(this, Rt);
        ((this.config = t), K(this, Rt, new Map()));
      }
      build(t, n, r) {
        const o = n.queryKey,
          i = n.queryHash ?? uc(o, n);
        let s = this.get(i);
        return (
          s ||
            ((s = new jx({
              cache: this,
              queryKey: o,
              queryHash: i,
              options: t.defaultQueryOptions(n),
              state: r,
              defaultOptions: t.getQueryDefaults(o),
            })),
            this.add(s)),
          s
        );
      }
      add(t) {
        R(this, Rt).has(t.queryHash) ||
          (R(this, Rt).set(t.queryHash, t),
          this.notify({ type: 'added', query: t }));
      }
      remove(t) {
        const n = R(this, Rt).get(t.queryHash);
        n &&
          (t.destroy(),
          n === t && R(this, Rt).delete(t.queryHash),
          this.notify({ type: 'removed', query: t }));
      }
      clear() {
        Le.batch(() => {
          this.getAll().forEach((t) => {
            this.remove(t);
          });
        });
      }
      get(t) {
        return R(this, Rt).get(t);
      }
      getAll() {
        return [...R(this, Rt).values()];
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find((r) => qd(n, r));
      }
      findAll(t = {}) {
        const n = this.getAll();
        return Object.keys(t).length > 0 ? n.filter((r) => qd(t, r)) : n;
      }
      notify(t) {
        Le.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      onFocus() {
        Le.batch(() => {
          this.getAll().forEach((t) => {
            t.onFocus();
          });
        });
      }
      onOnline() {
        Le.batch(() => {
          this.getAll().forEach((t) => {
            t.onOnline();
          });
        });
      }
    }),
    (Rt = new WeakMap()),
    zf),
  bt,
  De,
  Bn,
  _t,
  nn,
  $f,
  Lx =
    (($f = class extends Sm {
      constructor(t) {
        super();
        X(this, _t);
        X(this, bt);
        X(this, De);
        X(this, Bn);
        ((this.mutationId = t.mutationId),
          K(this, De, t.mutationCache),
          K(this, bt, []),
          (this.state = t.state || Fx()),
          this.setOptions(t.options),
          this.scheduleGc());
      }
      setOptions(t) {
        ((this.options = t), this.updateGcTime(this.options.gcTime));
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(t) {
        R(this, bt).includes(t) ||
          (R(this, bt).push(t),
          this.clearGcTimeout(),
          R(this, De).notify({
            type: 'observerAdded',
            mutation: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        (K(
          this,
          bt,
          R(this, bt).filter((n) => n !== t)
        ),
          this.scheduleGc(),
          R(this, De).notify({
            type: 'observerRemoved',
            mutation: this,
            observer: t,
          }));
      }
      optionalRemove() {
        R(this, bt).length ||
          (this.state.status === 'pending'
            ? this.scheduleGc()
            : R(this, De).remove(this));
      }
      continue() {
        var t;
        return (
          ((t = R(this, Bn)) == null ? void 0 : t.continue()) ??
          this.execute(this.state.variables)
        );
      }
      async execute(t) {
        var o, i, s, l, a, u, d, h, v, x, S, p, w, m, f, g, C, E, T, k;
        K(
          this,
          Bn,
          xm({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(t)
                : Promise.reject(new Error('No mutationFn found')),
            onFail: (P, A) => {
              Te(this, _t, nn).call(this, {
                type: 'failed',
                failureCount: P,
                error: A,
              });
            },
            onPause: () => {
              Te(this, _t, nn).call(this, { type: 'pause' });
            },
            onContinue: () => {
              Te(this, _t, nn).call(this, { type: 'continue' });
            },
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => R(this, De).canRun(this),
          })
        );
        const n = this.state.status === 'pending',
          r = !R(this, Bn).canStart();
        try {
          if (!n) {
            (Te(this, _t, nn).call(this, {
              type: 'pending',
              variables: t,
              isPaused: r,
            }),
              await ((i = (o = R(this, De).config).onMutate) == null
                ? void 0
                : i.call(o, t, this)));
            const A = await ((l = (s = this.options).onMutate) == null
              ? void 0
              : l.call(s, t));
            A !== this.state.context &&
              Te(this, _t, nn).call(this, {
                type: 'pending',
                context: A,
                variables: t,
                isPaused: r,
              });
          }
          const P = await R(this, Bn).start();
          return (
            await ((u = (a = R(this, De).config).onSuccess) == null
              ? void 0
              : u.call(a, P, t, this.state.context, this)),
            await ((h = (d = this.options).onSuccess) == null
              ? void 0
              : h.call(d, P, t, this.state.context)),
            await ((x = (v = R(this, De).config).onSettled) == null
              ? void 0
              : x.call(
                  v,
                  P,
                  null,
                  this.state.variables,
                  this.state.context,
                  this
                )),
            await ((p = (S = this.options).onSettled) == null
              ? void 0
              : p.call(S, P, null, t, this.state.context)),
            Te(this, _t, nn).call(this, { type: 'success', data: P }),
            P
          );
        } catch (P) {
          try {
            throw (
              await ((m = (w = R(this, De).config).onError) == null
                ? void 0
                : m.call(w, P, t, this.state.context, this)),
              await ((g = (f = this.options).onError) == null
                ? void 0
                : g.call(f, P, t, this.state.context)),
              await ((E = (C = R(this, De).config).onSettled) == null
                ? void 0
                : E.call(
                    C,
                    void 0,
                    P,
                    this.state.variables,
                    this.state.context,
                    this
                  )),
              await ((k = (T = this.options).onSettled) == null
                ? void 0
                : k.call(T, void 0, P, t, this.state.context)),
              P
            );
          } finally {
            Te(this, _t, nn).call(this, { type: 'error', error: P });
          }
        } finally {
          R(this, De).runNext(this);
        }
      }
    }),
    (bt = new WeakMap()),
    (De = new WeakMap()),
    (Bn = new WeakMap()),
    (_t = new WeakSet()),
    (nn = function (t) {
      const n = (r) => {
        switch (t.type) {
          case 'failed':
            return {
              ...r,
              failureCount: t.failureCount,
              failureReason: t.error,
            };
          case 'pause':
            return { ...r, isPaused: !0 };
          case 'continue':
            return { ...r, isPaused: !1 };
          case 'pending':
            return {
              ...r,
              context: t.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: t.isPaused,
              status: 'pending',
              variables: t.variables,
              submittedAt: Date.now(),
            };
          case 'success':
            return {
              ...r,
              data: t.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: 'success',
              isPaused: !1,
            };
          case 'error':
            return {
              ...r,
              data: void 0,
              error: t.error,
              failureCount: r.failureCount + 1,
              failureReason: t.error,
              isPaused: !1,
              status: 'error',
            };
        }
      };
      ((this.state = n(this.state)),
        Le.batch(() => {
          (R(this, bt).forEach((r) => {
            r.onMutationUpdate(t);
          }),
            R(this, De).notify({ mutation: this, type: 'updated', action: t }));
        }));
    }),
    $f);
function Fx() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: 'idle',
    variables: void 0,
    submittedAt: 0,
  };
}
var Qe,
  ri,
  Uf,
  zx =
    ((Uf = class extends Zs {
      constructor(t = {}) {
        super();
        X(this, Qe);
        X(this, ri);
        ((this.config = t), K(this, Qe, new Map()), K(this, ri, Date.now()));
      }
      build(t, n, r) {
        const o = new Lx({
          mutationCache: this,
          mutationId: ++hi(this, ri)._,
          options: t.defaultMutationOptions(n),
          state: r,
        });
        return (this.add(o), o);
      }
      add(t) {
        const n = Ai(t),
          r = R(this, Qe).get(n) ?? [];
        (r.push(t),
          R(this, Qe).set(n, r),
          this.notify({ type: 'added', mutation: t }));
      }
      remove(t) {
        var r;
        const n = Ai(t);
        if (R(this, Qe).has(n)) {
          const o =
            (r = R(this, Qe).get(n)) == null
              ? void 0
              : r.filter((i) => i !== t);
          o && (o.length === 0 ? R(this, Qe).delete(n) : R(this, Qe).set(n, o));
        }
        this.notify({ type: 'removed', mutation: t });
      }
      canRun(t) {
        var r;
        const n =
          (r = R(this, Qe).get(Ai(t))) == null
            ? void 0
            : r.find((o) => o.state.status === 'pending');
        return !n || n === t;
      }
      runNext(t) {
        var r;
        const n =
          (r = R(this, Qe).get(Ai(t))) == null
            ? void 0
            : r.find((o) => o !== t && o.state.isPaused);
        return (n == null ? void 0 : n.continue()) ?? Promise.resolve();
      }
      clear() {
        Le.batch(() => {
          this.getAll().forEach((t) => {
            this.remove(t);
          });
        });
      }
      getAll() {
        return [...R(this, Qe).values()].flat();
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find((r) => Zd(n, r));
      }
      findAll(t = {}) {
        return this.getAll().filter((n) => Zd(t, n));
      }
      notify(t) {
        Le.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      resumePausedMutations() {
        const t = this.getAll().filter((n) => n.state.isPaused);
        return Le.batch(() =>
          Promise.all(t.map((n) => n.continue().catch(pt)))
        );
      }
    }),
    (Qe = new WeakMap()),
    (ri = new WeakMap()),
    Uf);
function Ai(e) {
  var t;
  return (
    ((t = e.options.scope) == null ? void 0 : t.id) ?? String(e.mutationId)
  );
}
function tf(e) {
  return {
    onFetch: (t, n) => {
      var d, h, v, x, S;
      const r = t.options,
        o =
          (v =
            (h = (d = t.fetchOptions) == null ? void 0 : d.meta) == null
              ? void 0
              : h.fetchMore) == null
            ? void 0
            : v.direction,
        i = ((x = t.state.data) == null ? void 0 : x.pages) || [],
        s = ((S = t.state.data) == null ? void 0 : S.pageParams) || [];
      let l = { pages: [], pageParams: [] },
        a = 0;
      const u = async () => {
        let p = !1;
        const w = (g) => {
            Object.defineProperty(g, 'signal', {
              enumerable: !0,
              get: () => (
                t.signal.aborted
                  ? (p = !0)
                  : t.signal.addEventListener('abort', () => {
                      p = !0;
                    }),
                t.signal
              ),
            });
          },
          m = vm(t.options, t.fetchOptions),
          f = async (g, C, E) => {
            if (p) return Promise.reject();
            if (C == null && g.pages.length) return Promise.resolve(g);
            const T = {
              queryKey: t.queryKey,
              pageParam: C,
              direction: E ? 'backward' : 'forward',
              meta: t.options.meta,
            };
            w(T);
            const k = await m(T),
              { maxPages: P } = t.options,
              A = E ? Nx : Tx;
            return {
              pages: A(g.pages, k, P),
              pageParams: A(g.pageParams, C, P),
            };
          };
        if (o && i.length) {
          const g = o === 'backward',
            C = g ? $x : nf,
            E = { pages: i, pageParams: s },
            T = C(r, E);
          l = await f(E, T, g);
        } else {
          const g = e ?? i.length;
          do {
            const C = a === 0 ? (s[0] ?? r.initialPageParam) : nf(r, l);
            if (a > 0 && C == null) break;
            ((l = await f(l, C)), a++);
          } while (a < g);
        }
        return l;
      };
      t.options.persister
        ? (t.fetchFn = () => {
            var p, w;
            return (w = (p = t.options).persister) == null
              ? void 0
              : w.call(
                  p,
                  u,
                  {
                    queryKey: t.queryKey,
                    meta: t.options.meta,
                    signal: t.signal,
                  },
                  n
                );
          })
        : (t.fetchFn = u);
    },
  };
}
function nf(e, { pages: t, pageParams: n }) {
  const r = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0;
}
function $x(e, { pages: t, pageParams: n }) {
  var r;
  return t.length > 0
    ? (r = e.getPreviousPageParam) == null
      ? void 0
      : r.call(e, t[0], t, n[0], n)
    : void 0;
}
var pe,
  fn,
  pn,
  Ir,
  Lr,
  hn,
  Fr,
  zr,
  Vf,
  Ux =
    ((Vf = class {
      constructor(e = {}) {
        X(this, pe);
        X(this, fn);
        X(this, pn);
        X(this, Ir);
        X(this, Lr);
        X(this, hn);
        X(this, Fr);
        X(this, zr);
        (K(this, pe, e.queryCache || new Ix()),
          K(this, fn, e.mutationCache || new zx()),
          K(this, pn, e.defaultOptions || {}),
          K(this, Ir, new Map()),
          K(this, Lr, new Map()),
          K(this, hn, 0));
      }
      mount() {
        (hi(this, hn)._++,
          R(this, hn) === 1 &&
            (K(
              this,
              Fr,
              gm.subscribe(async (e) => {
                e &&
                  (await this.resumePausedMutations(), R(this, pe).onFocus());
              })
            ),
            K(
              this,
              zr,
              Rs.subscribe(async (e) => {
                e &&
                  (await this.resumePausedMutations(), R(this, pe).onOnline());
              })
            )));
      }
      unmount() {
        var e, t;
        (hi(this, hn)._--,
          R(this, hn) === 0 &&
            ((e = R(this, Fr)) == null || e.call(this),
            K(this, Fr, void 0),
            (t = R(this, zr)) == null || t.call(this),
            K(this, zr, void 0)));
      }
      isFetching(e) {
        return R(this, pe).findAll({ ...e, fetchStatus: 'fetching' }).length;
      }
      isMutating(e) {
        return R(this, fn).findAll({ ...e, status: 'pending' }).length;
      }
      getQueryData(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = R(this, pe).get(t.queryHash)) == null
          ? void 0
          : n.state.data;
      }
      ensureQueryData(e) {
        const t = this.getQueryData(e.queryKey);
        if (t === void 0) return this.fetchQuery(e);
        {
          const n = this.defaultQueryOptions(e),
            r = R(this, pe).build(this, n);
          return (
            e.revalidateIfStale &&
              r.isStaleByTime(Xd(n.staleTime, r)) &&
              this.prefetchQuery(n),
            Promise.resolve(t)
          );
        }
      }
      getQueriesData(e) {
        return R(this, pe)
          .findAll(e)
          .map(({ queryKey: t, state: n }) => {
            const r = n.data;
            return [t, r];
          });
      }
      setQueryData(e, t, n) {
        const r = this.defaultQueryOptions({ queryKey: e }),
          o = R(this, pe).get(r.queryHash),
          i = o == null ? void 0 : o.state.data,
          s = xx(t, i);
        if (s !== void 0)
          return R(this, pe)
            .build(this, r)
            .setData(s, { ...n, manual: !0 });
      }
      setQueriesData(e, t, n) {
        return Le.batch(() =>
          R(this, pe)
            .findAll(e)
            .map(({ queryKey: r }) => [r, this.setQueryData(r, t, n)])
        );
      }
      getQueryState(e) {
        var n;
        const t = this.defaultQueryOptions({ queryKey: e });
        return (n = R(this, pe).get(t.queryHash)) == null ? void 0 : n.state;
      }
      removeQueries(e) {
        const t = R(this, pe);
        Le.batch(() => {
          t.findAll(e).forEach((n) => {
            t.remove(n);
          });
        });
      }
      resetQueries(e, t) {
        const n = R(this, pe),
          r = { type: 'active', ...e };
        return Le.batch(
          () => (
            n.findAll(e).forEach((o) => {
              o.reset();
            }),
            this.refetchQueries(r, t)
          )
        );
      }
      cancelQueries(e = {}, t = {}) {
        const n = { revert: !0, ...t },
          r = Le.batch(() =>
            R(this, pe)
              .findAll(e)
              .map((o) => o.cancel(n))
          );
        return Promise.all(r).then(pt).catch(pt);
      }
      invalidateQueries(e = {}, t = {}) {
        return Le.batch(() => {
          if (
            (R(this, pe)
              .findAll(e)
              .forEach((r) => {
                r.invalidate();
              }),
            e.refetchType === 'none')
          )
            return Promise.resolve();
          const n = { ...e, type: e.refetchType ?? e.type ?? 'active' };
          return this.refetchQueries(n, t);
        });
      }
      refetchQueries(e = {}, t) {
        const n = {
            ...t,
            cancelRefetch: (t == null ? void 0 : t.cancelRefetch) ?? !0,
          },
          r = Le.batch(() =>
            R(this, pe)
              .findAll(e)
              .filter((o) => !o.isDisabled())
              .map((o) => {
                let i = o.fetch(void 0, n);
                return (
                  n.throwOnError || (i = i.catch(pt)),
                  o.state.fetchStatus === 'paused' ? Promise.resolve() : i
                );
              })
          );
        return Promise.all(r).then(pt);
      }
      fetchQuery(e) {
        const t = this.defaultQueryOptions(e);
        t.retry === void 0 && (t.retry = !1);
        const n = R(this, pe).build(this, t);
        return n.isStaleByTime(Xd(t.staleTime, n))
          ? n.fetch(t)
          : Promise.resolve(n.state.data);
      }
      prefetchQuery(e) {
        return this.fetchQuery(e).then(pt).catch(pt);
      }
      fetchInfiniteQuery(e) {
        return ((e.behavior = tf(e.pages)), this.fetchQuery(e));
      }
      prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(pt).catch(pt);
      }
      ensureInfiniteQueryData(e) {
        return ((e.behavior = tf(e.pages)), this.ensureQueryData(e));
      }
      resumePausedMutations() {
        return Rs.isOnline()
          ? R(this, fn).resumePausedMutations()
          : Promise.resolve();
      }
      getQueryCache() {
        return R(this, pe);
      }
      getMutationCache() {
        return R(this, fn);
      }
      getDefaultOptions() {
        return R(this, pn);
      }
      setDefaultOptions(e) {
        K(this, pn, e);
      }
      setQueryDefaults(e, t) {
        R(this, Ir).set(qo(e), { queryKey: e, defaultOptions: t });
      }
      getQueryDefaults(e) {
        const t = [...R(this, Ir).values()];
        let n = {};
        return (
          t.forEach((r) => {
            Zo(e, r.queryKey) && (n = { ...n, ...r.defaultOptions });
          }),
          n
        );
      }
      setMutationDefaults(e, t) {
        R(this, Lr).set(qo(e), { mutationKey: e, defaultOptions: t });
      }
      getMutationDefaults(e) {
        const t = [...R(this, Lr).values()];
        let n = {};
        return (
          t.forEach((r) => {
            Zo(e, r.mutationKey) && (n = { ...n, ...r.defaultOptions });
          }),
          n
        );
      }
      defaultQueryOptions(e) {
        if (e._defaulted) return e;
        const t = {
          ...R(this, pn).queries,
          ...this.getQueryDefaults(e.queryKey),
          ...e,
          _defaulted: !0,
        };
        return (
          t.queryHash || (t.queryHash = uc(t.queryKey, t)),
          t.refetchOnReconnect === void 0 &&
            (t.refetchOnReconnect = t.networkMode !== 'always'),
          t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
          !t.networkMode && t.persister && (t.networkMode = 'offlineFirst'),
          t.enabled !== !0 && t.queryFn === cc && (t.enabled = !1),
          t
        );
      }
      defaultMutationOptions(e) {
        return e != null && e._defaulted
          ? e
          : {
              ...R(this, pn).mutations,
              ...((e == null ? void 0 : e.mutationKey) &&
                this.getMutationDefaults(e.mutationKey)),
              ...e,
              _defaulted: !0,
            };
      }
      clear() {
        (R(this, pe).clear(), R(this, fn).clear());
      }
    }),
    (pe = new WeakMap()),
    (fn = new WeakMap()),
    (pn = new WeakMap()),
    (Ir = new WeakMap()),
    (Lr = new WeakMap()),
    (hn = new WeakMap()),
    (Fr = new WeakMap()),
    (zr = new WeakMap()),
    Vf),
  Vx = c.createContext(void 0),
  Bx = ({ client: e, children: t }) => (
    c.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e]
    ),
    y.jsx(Vx.Provider, { value: e, children: t })
  );
async function Wx(e) {
  if (!e.ok) {
    const t = (await e.text()) || e.statusText;
    throw new Error(`${e.status}: ${t}`);
  }
}
const Hx =
    ({ on401: e }) =>
    async ({ queryKey: t }) => {
      const n = await fetch(t.join('/'), { credentials: 'include' });
      return e === 'returnNull' && n.status === 401
        ? null
        : (await Wx(n), await n.json());
    },
  Kx = new Ux({
    defaultOptions: {
      queries: {
        queryFn: Hx({ on401: 'throw' }),
        refetchInterval: !1,
        refetchOnWindowFocus: !1,
        staleTime: 1 / 0,
        retry: !1,
      },
      mutations: { retry: !1 },
    },
  }),
  Qx = 1,
  Gx = 1e6;
let Bl = 0;
function Yx() {
  return ((Bl = (Bl + 1) % Number.MAX_SAFE_INTEGER), Bl.toString());
}
const Wl = new Map(),
  rf = (e) => {
    if (Wl.has(e)) return;
    const t = setTimeout(() => {
      (Wl.delete(e), jo({ type: 'REMOVE_TOAST', toastId: e }));
    }, Gx);
    Wl.set(e, t);
  },
  Xx = (e, t) => {
    switch (t.type) {
      case 'ADD_TOAST':
        return { ...e, toasts: [t.toast, ...e.toasts].slice(0, Qx) };
      case 'UPDATE_TOAST':
        return {
          ...e,
          toasts: e.toasts.map((n) =>
            n.id === t.toast.id ? { ...n, ...t.toast } : n
          ),
        };
      case 'DISMISS_TOAST': {
        const { toastId: n } = t;
        return (
          n
            ? rf(n)
            : e.toasts.forEach((r) => {
                rf(r.id);
              }),
          {
            ...e,
            toasts: e.toasts.map((r) =>
              r.id === n || n === void 0 ? { ...r, open: !1 } : r
            ),
          }
        );
      }
      case 'REMOVE_TOAST':
        return t.toastId === void 0
          ? { ...e, toasts: [] }
          : { ...e, toasts: e.toasts.filter((n) => n.id !== t.toastId) };
    }
  },
  Zi = [];
let Ji = { toasts: [] };
function jo(e) {
  ((Ji = Xx(Ji, e)),
    Zi.forEach((t) => {
      t(Ji);
    }));
}
function qx({ ...e }) {
  const t = Yx(),
    n = (o) => jo({ type: 'UPDATE_TOAST', toast: { ...o, id: t } }),
    r = () => jo({ type: 'DISMISS_TOAST', toastId: t });
  return (
    jo({
      type: 'ADD_TOAST',
      toast: {
        ...e,
        id: t,
        open: !0,
        onOpenChange: (o) => {
          o || r();
        },
      },
    }),
    { id: t, dismiss: r, update: n }
  );
}
function Zx() {
  const [e, t] = c.useState(Ji);
  return (
    c.useEffect(
      () => (
        Zi.push(t),
        () => {
          const n = Zi.indexOf(t);
          n > -1 && Zi.splice(n, 1);
        }
      ),
      [e]
    ),
    {
      ...e,
      toast: qx,
      dismiss: (n) => jo({ type: 'DISMISS_TOAST', toastId: n }),
    }
  );
}
function B(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (o) {
    if ((e == null || e(o), n === !1 || !o.defaultPrevented))
      return t == null ? void 0 : t(o);
  };
}
function of(e, t) {
  if (typeof e == 'function') return e(t);
  e != null && (e.current = t);
}
function Cm(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const i = of(o, t);
      return (!n && typeof i == 'function' && (n = !0), i);
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const i = r[o];
          typeof i == 'function' ? i() : of(e[o], null);
        }
      };
  };
}
function oe(...e) {
  return c.useCallback(Cm(...e), e);
}
function Jx(e, t) {
  const n = c.createContext(t),
    r = (i) => {
      const { children: s, ...l } = i,
        a = c.useMemo(() => l, Object.values(l));
      return y.jsx(n.Provider, { value: a, children: s });
    };
  r.displayName = e + 'Provider';
  function o(i) {
    const s = c.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${i}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function or(e, t = []) {
  let n = [];
  function r(i, s) {
    const l = c.createContext(s),
      a = n.length;
    n = [...n, s];
    const u = (h) => {
      var m;
      const { scope: v, children: x, ...S } = h,
        p = ((m = v == null ? void 0 : v[e]) == null ? void 0 : m[a]) || l,
        w = c.useMemo(() => S, Object.values(S));
      return y.jsx(p.Provider, { value: w, children: x });
    };
    u.displayName = i + 'Provider';
    function d(h, v) {
      var p;
      const x = ((p = v == null ? void 0 : v[e]) == null ? void 0 : p[a]) || l,
        S = c.useContext(x);
      if (S) return S;
      if (s !== void 0) return s;
      throw new Error(`\`${h}\` must be used within \`${i}\``);
    }
    return [u, d];
  }
  const o = () => {
    const i = n.map((s) => c.createContext(s));
    return function (l) {
      const a = (l == null ? void 0 : l[e]) || i;
      return c.useMemo(() => ({ [`__scope${e}`]: { ...l, [e]: a } }), [l, a]);
    };
  };
  return ((o.scopeName = e), [r, e1(o, ...t)]);
}
function e1(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (i) {
      const s = r.reduce((l, { useScope: a, scopeName: u }) => {
        const h = a(i)[`__scope${u}`];
        return { ...l, ...h };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
function Gr(e) {
  const t = n1(e),
    n = c.forwardRef((r, o) => {
      const { children: i, ...s } = r,
        l = c.Children.toArray(i),
        a = l.find(o1);
      if (a) {
        const u = a.props.children,
          d = l.map((h) =>
            h === a
              ? c.Children.count(u) > 1
                ? c.Children.only(null)
                : c.isValidElement(u)
                  ? u.props.children
                  : null
              : h
          );
        return y.jsx(t, {
          ...s,
          ref: o,
          children: c.isValidElement(u) ? c.cloneElement(u, void 0, d) : null,
        });
      }
      return y.jsx(t, { ...s, ref: o, children: i });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
var t1 = Gr('Slot');
function n1(e) {
  const t = c.forwardRef((n, r) => {
    const { children: o, ...i } = n;
    if (c.isValidElement(o)) {
      const s = s1(o),
        l = i1(i, o.props);
      return (
        o.type !== c.Fragment && (l.ref = r ? Cm(r, s) : s),
        c.cloneElement(o, l)
      );
    }
    return c.Children.count(o) > 1 ? c.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var Em = Symbol('radix.slottable');
function r1(e) {
  const t = ({ children: n }) => y.jsx(y.Fragment, { children: n });
  return ((t.displayName = `${e}.Slottable`), (t.__radixId = Em), t);
}
function o1(e) {
  return (
    c.isValidElement(e) &&
    typeof e.type == 'function' &&
    '__radixId' in e.type &&
    e.type.__radixId === Em
  );
}
function i1(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r],
      i = t[r];
    /^on[A-Z]/.test(r)
      ? o && i
        ? (n[r] = (...l) => {
            (i(...l), o(...l));
          })
        : o && (n[r] = o)
      : r === 'style'
        ? (n[r] = { ...o, ...i })
        : r === 'className' && (n[r] = [o, i].filter(Boolean).join(' '));
  }
  return { ...e, ...n };
}
function s1(e) {
  var r, o;
  let t =
      (r = Object.getOwnPropertyDescriptor(e.props, 'ref')) == null
        ? void 0
        : r.get,
    n = t && 'isReactWarning' in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t =
        (o = Object.getOwnPropertyDescriptor(e, 'ref')) == null
          ? void 0
          : o.get),
      (n = t && 'isReactWarning' in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function km(e) {
  const t = e + 'CollectionProvider',
    [n, r] = or(t),
    [o, i] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    s = (p) => {
      const { scope: w, children: m } = p,
        f = tn.useRef(null),
        g = tn.useRef(new Map()).current;
      return y.jsx(o, { scope: w, itemMap: g, collectionRef: f, children: m });
    };
  s.displayName = t;
  const l = e + 'CollectionSlot',
    a = Gr(l),
    u = tn.forwardRef((p, w) => {
      const { scope: m, children: f } = p,
        g = i(l, m),
        C = oe(w, g.collectionRef);
      return y.jsx(a, { ref: C, children: f });
    });
  u.displayName = l;
  const d = e + 'CollectionItemSlot',
    h = 'data-radix-collection-item',
    v = Gr(d),
    x = tn.forwardRef((p, w) => {
      const { scope: m, children: f, ...g } = p,
        C = tn.useRef(null),
        E = oe(w, C),
        T = i(d, m);
      return (
        tn.useEffect(
          () => (
            T.itemMap.set(C, { ref: C, ...g }),
            () => void T.itemMap.delete(C)
          )
        ),
        y.jsx(v, { [h]: '', ref: E, children: f })
      );
    });
  x.displayName = d;
  function S(p) {
    const w = i(e + 'CollectionConsumer', p);
    return tn.useCallback(() => {
      const f = w.collectionRef.current;
      if (!f) return [];
      const g = Array.from(f.querySelectorAll(`[${h}]`));
      return Array.from(w.itemMap.values()).sort(
        (T, k) => g.indexOf(T.ref.current) - g.indexOf(k.ref.current)
      );
    }, [w.collectionRef, w.itemMap]);
  }
  return [{ Provider: s, Slot: u, ItemSlot: x }, S, r];
}
var l1 = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'span',
    'svg',
    'ul',
  ],
  G = l1.reduce((e, t) => {
    const n = Gr(`Primitive.${t}`),
      r = c.forwardRef((o, i) => {
        const { asChild: s, ...l } = o,
          a = s ? n : t;
        return (
          typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0),
          y.jsx(a, { ...l, ref: i })
        );
      });
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
  }, {});
function Pm(e, t) {
  e && rr.flushSync(() => e.dispatchEvent(t));
}
function et(e) {
  const t = c.useRef(e);
  return (
    c.useEffect(() => {
      t.current = e;
    }),
    c.useMemo(
      () =>
        (...n) => {
          var r;
          return (r = t.current) == null ? void 0 : r.call(t, ...n);
        },
      []
    )
  );
}
function a1(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = et(e);
  c.useEffect(() => {
    const r = (o) => {
      o.key === 'Escape' && n(o);
    };
    return (
      t.addEventListener('keydown', r, { capture: !0 }),
      () => t.removeEventListener('keydown', r, { capture: !0 })
    );
  }, [n, t]);
}
var u1 = 'DismissableLayer',
  Ya = 'dismissableLayer.update',
  c1 = 'dismissableLayer.pointerDownOutside',
  d1 = 'dismissableLayer.focusOutside',
  sf,
  Tm = c.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  ui = c.forwardRef((e, t) => {
    const {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: r,
        onPointerDownOutside: o,
        onFocusOutside: i,
        onInteractOutside: s,
        onDismiss: l,
        ...a
      } = e,
      u = c.useContext(Tm),
      [d, h] = c.useState(null),
      v =
        (d == null ? void 0 : d.ownerDocument) ??
        (globalThis == null ? void 0 : globalThis.document),
      [, x] = c.useState({}),
      S = oe(t, (k) => h(k)),
      p = Array.from(u.layers),
      [w] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1),
      m = p.indexOf(w),
      f = d ? p.indexOf(d) : -1,
      g = u.layersWithOutsidePointerEventsDisabled.size > 0,
      C = f >= m,
      E = p1((k) => {
        const P = k.target,
          A = [...u.branches].some((j) => j.contains(P));
        !C ||
          A ||
          (o == null || o(k),
          s == null || s(k),
          k.defaultPrevented || l == null || l());
      }, v),
      T = h1((k) => {
        const P = k.target;
        [...u.branches].some((j) => j.contains(P)) ||
          (i == null || i(k),
          s == null || s(k),
          k.defaultPrevented || l == null || l());
      }, v);
    return (
      a1((k) => {
        f === u.layers.size - 1 &&
          (r == null || r(k),
          !k.defaultPrevented && l && (k.preventDefault(), l()));
      }, v),
      c.useEffect(() => {
        if (d)
          return (
            n &&
              (u.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((sf = v.body.style.pointerEvents),
                (v.body.style.pointerEvents = 'none')),
              u.layersWithOutsidePointerEventsDisabled.add(d)),
            u.layers.add(d),
            lf(),
            () => {
              n &&
                u.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (v.body.style.pointerEvents = sf);
            }
          );
      }, [d, v, n, u]),
      c.useEffect(
        () => () => {
          d &&
            (u.layers.delete(d),
            u.layersWithOutsidePointerEventsDisabled.delete(d),
            lf());
        },
        [d, u]
      ),
      c.useEffect(() => {
        const k = () => x({});
        return (
          document.addEventListener(Ya, k),
          () => document.removeEventListener(Ya, k)
        );
      }, []),
      y.jsx(G.div, {
        ...a,
        ref: S,
        style: {
          pointerEvents: g ? (C ? 'auto' : 'none') : void 0,
          ...e.style,
        },
        onFocusCapture: B(e.onFocusCapture, T.onFocusCapture),
        onBlurCapture: B(e.onBlurCapture, T.onBlurCapture),
        onPointerDownCapture: B(e.onPointerDownCapture, E.onPointerDownCapture),
      })
    );
  });
ui.displayName = u1;
var f1 = 'DismissableLayerBranch',
  Nm = c.forwardRef((e, t) => {
    const n = c.useContext(Tm),
      r = c.useRef(null),
      o = oe(t, r);
    return (
      c.useEffect(() => {
        const i = r.current;
        if (i)
          return (
            n.branches.add(i),
            () => {
              n.branches.delete(i);
            }
          );
      }, [n.branches]),
      y.jsx(G.div, { ...e, ref: o })
    );
  });
Nm.displayName = f1;
function p1(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = et(e),
    r = c.useRef(!1),
    o = c.useRef(() => {});
  return (
    c.useEffect(() => {
      const i = (l) => {
          if (l.target && !r.current) {
            let a = function () {
              Rm(c1, n, u, { discrete: !0 });
            };
            const u = { originalEvent: l };
            l.pointerType === 'touch'
              ? (t.removeEventListener('click', o.current),
                (o.current = a),
                t.addEventListener('click', o.current, { once: !0 }))
              : a();
          } else t.removeEventListener('click', o.current);
          r.current = !1;
        },
        s = window.setTimeout(() => {
          t.addEventListener('pointerdown', i);
        }, 0);
      return () => {
        (window.clearTimeout(s),
          t.removeEventListener('pointerdown', i),
          t.removeEventListener('click', o.current));
      };
    }, [t, n]),
    { onPointerDownCapture: () => (r.current = !0) }
  );
}
function h1(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = et(e),
    r = c.useRef(!1);
  return (
    c.useEffect(() => {
      const o = (i) => {
        i.target &&
          !r.current &&
          Rm(d1, n, { originalEvent: i }, { discrete: !1 });
      };
      return (
        t.addEventListener('focusin', o),
        () => t.removeEventListener('focusin', o)
      );
    }, [t, n]),
    {
      onFocusCapture: () => (r.current = !0),
      onBlurCapture: () => (r.current = !1),
    }
  );
}
function lf() {
  const e = new CustomEvent(Ya);
  document.dispatchEvent(e);
}
function Rm(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target,
    i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && o.addEventListener(e, t, { once: !0 }),
    r ? Pm(o, i) : o.dispatchEvent(i));
}
var m1 = ui,
  v1 = Nm,
  Ae = globalThis != null && globalThis.document ? c.useLayoutEffect : () => {},
  g1 = 'Portal',
  el = c.forwardRef((e, t) => {
    var l;
    const { container: n, ...r } = e,
      [o, i] = c.useState(!1);
    Ae(() => i(!0), []);
    const s =
      n ||
      (o &&
        ((l = globalThis == null ? void 0 : globalThis.document) == null
          ? void 0
          : l.body));
    return s ? Bw.createPortal(y.jsx(G.div, { ...r, ref: t }), s) : null;
  });
el.displayName = g1;
function y1(e, t) {
  return c.useReducer((n, r) => t[n][r] ?? n, e);
}
var eo = (e) => {
  const { present: t, children: n } = e,
    r = w1(t),
    o =
      typeof n == 'function' ? n({ present: r.isPresent }) : c.Children.only(n),
    i = oe(r.ref, x1(o));
  return typeof n == 'function' || r.isPresent
    ? c.cloneElement(o, { ref: i })
    : null;
};
eo.displayName = 'Presence';
function w1(e) {
  const [t, n] = c.useState(),
    r = c.useRef({}),
    o = c.useRef(e),
    i = c.useRef('none'),
    s = e ? 'mounted' : 'unmounted',
    [l, a] = y1(s, {
      mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
      unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
      unmounted: { MOUNT: 'mounted' },
    });
  return (
    c.useEffect(() => {
      const u = ji(r.current);
      i.current = l === 'mounted' ? u : 'none';
    }, [l]),
    Ae(() => {
      const u = r.current,
        d = o.current;
      if (d !== e) {
        const v = i.current,
          x = ji(u);
        (e
          ? a('MOUNT')
          : x === 'none' || (u == null ? void 0 : u.display) === 'none'
            ? a('UNMOUNT')
            : a(d && v !== x ? 'ANIMATION_OUT' : 'UNMOUNT'),
          (o.current = e));
      }
    }, [e, a]),
    Ae(() => {
      if (t) {
        let u;
        const d = t.ownerDocument.defaultView ?? window,
          h = (x) => {
            const p = ji(r.current).includes(x.animationName);
            if (x.target === t && p && (a('ANIMATION_END'), !o.current)) {
              const w = t.style.animationFillMode;
              ((t.style.animationFillMode = 'forwards'),
                (u = d.setTimeout(() => {
                  t.style.animationFillMode === 'forwards' &&
                    (t.style.animationFillMode = w);
                })));
            }
          },
          v = (x) => {
            x.target === t && (i.current = ji(r.current));
          };
        return (
          t.addEventListener('animationstart', v),
          t.addEventListener('animationcancel', h),
          t.addEventListener('animationend', h),
          () => {
            (d.clearTimeout(u),
              t.removeEventListener('animationstart', v),
              t.removeEventListener('animationcancel', h),
              t.removeEventListener('animationend', h));
          }
        );
      } else a('ANIMATION_END');
    }, [t, a]),
    {
      isPresent: ['mounted', 'unmountSuspended'].includes(l),
      ref: c.useCallback((u) => {
        (u && (r.current = getComputedStyle(u)), n(u));
      }, []),
    }
  );
}
function ji(e) {
  return (e == null ? void 0 : e.animationName) || 'none';
}
function x1(e) {
  var r, o;
  let t =
      (r = Object.getOwnPropertyDescriptor(e.props, 'ref')) == null
        ? void 0
        : r.get,
    n = t && 'isReactWarning' in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t =
        (o = Object.getOwnPropertyDescriptor(e, 'ref')) == null
          ? void 0
          : o.get),
      (n = t && 'isReactWarning' in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function Jo({ prop: e, defaultProp: t, onChange: n = () => {} }) {
  const [r, o] = S1({ defaultProp: t, onChange: n }),
    i = e !== void 0,
    s = i ? e : r,
    l = et(n),
    a = c.useCallback(
      (u) => {
        if (i) {
          const h = typeof u == 'function' ? u(e) : u;
          h !== e && l(h);
        } else o(u);
      },
      [i, e, o, l]
    );
  return [s, a];
}
function S1({ defaultProp: e, onChange: t }) {
  const n = c.useState(e),
    [r] = n,
    o = c.useRef(r),
    i = et(t);
  return (
    c.useEffect(() => {
      o.current !== r && (i(r), (o.current = r));
    }, [r, o, i]),
    n
  );
}
var C1 = 'VisuallyHidden',
  ci = c.forwardRef((e, t) =>
    y.jsx(G.span, {
      ...e,
      ref: t,
      style: {
        position: 'absolute',
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
        ...e.style,
      },
    })
  );
ci.displayName = C1;
var E1 = ci,
  dc = 'ToastProvider',
  [fc, k1, P1] = km('Toast'),
  [bm, yP] = or('Toast', [P1]),
  [T1, tl] = bm(dc),
  _m = (e) => {
    const {
        __scopeToast: t,
        label: n = 'Notification',
        duration: r = 5e3,
        swipeDirection: o = 'right',
        swipeThreshold: i = 50,
        children: s,
      } = e,
      [l, a] = c.useState(null),
      [u, d] = c.useState(0),
      h = c.useRef(!1),
      v = c.useRef(!1);
    return (
      n.trim() ||
        console.error(
          `Invalid prop \`label\` supplied to \`${dc}\`. Expected non-empty \`string\`.`
        ),
      y.jsx(fc.Provider, {
        scope: t,
        children: y.jsx(T1, {
          scope: t,
          label: n,
          duration: r,
          swipeDirection: o,
          swipeThreshold: i,
          toastCount: u,
          viewport: l,
          onViewportChange: a,
          onToastAdd: c.useCallback(() => d((x) => x + 1), []),
          onToastRemove: c.useCallback(() => d((x) => x - 1), []),
          isFocusedToastEscapeKeyDownRef: h,
          isClosePausedRef: v,
          children: s,
        }),
      })
    );
  };
_m.displayName = dc;
var Om = 'ToastViewport',
  N1 = ['F8'],
  Xa = 'toast.viewportPause',
  qa = 'toast.viewportResume',
  Am = c.forwardRef((e, t) => {
    const {
        __scopeToast: n,
        hotkey: r = N1,
        label: o = 'Notifications ({hotkey})',
        ...i
      } = e,
      s = tl(Om, n),
      l = k1(n),
      a = c.useRef(null),
      u = c.useRef(null),
      d = c.useRef(null),
      h = c.useRef(null),
      v = oe(t, h, s.onViewportChange),
      x = r.join('+').replace(/Key/g, '').replace(/Digit/g, ''),
      S = s.toastCount > 0;
    (c.useEffect(() => {
      const w = (m) => {
        var g;
        r.length !== 0 &&
          r.every((C) => m[C] || m.code === C) &&
          ((g = h.current) == null || g.focus());
      };
      return (
        document.addEventListener('keydown', w),
        () => document.removeEventListener('keydown', w)
      );
    }, [r]),
      c.useEffect(() => {
        const w = a.current,
          m = h.current;
        if (S && w && m) {
          const f = () => {
              if (!s.isClosePausedRef.current) {
                const T = new CustomEvent(Xa);
                (m.dispatchEvent(T), (s.isClosePausedRef.current = !0));
              }
            },
            g = () => {
              if (s.isClosePausedRef.current) {
                const T = new CustomEvent(qa);
                (m.dispatchEvent(T), (s.isClosePausedRef.current = !1));
              }
            },
            C = (T) => {
              !w.contains(T.relatedTarget) && g();
            },
            E = () => {
              w.contains(document.activeElement) || g();
            };
          return (
            w.addEventListener('focusin', f),
            w.addEventListener('focusout', C),
            w.addEventListener('pointermove', f),
            w.addEventListener('pointerleave', E),
            window.addEventListener('blur', f),
            window.addEventListener('focus', g),
            () => {
              (w.removeEventListener('focusin', f),
                w.removeEventListener('focusout', C),
                w.removeEventListener('pointermove', f),
                w.removeEventListener('pointerleave', E),
                window.removeEventListener('blur', f),
                window.removeEventListener('focus', g));
            }
          );
        }
      }, [S, s.isClosePausedRef]));
    const p = c.useCallback(
      ({ tabbingDirection: w }) => {
        const f = l().map((g) => {
          const C = g.ref.current,
            E = [C, ...$1(C)];
          return w === 'forwards' ? E : E.reverse();
        });
        return (w === 'forwards' ? f.reverse() : f).flat();
      },
      [l]
    );
    return (
      c.useEffect(() => {
        const w = h.current;
        if (w) {
          const m = (f) => {
            var E, T, k;
            const g = f.altKey || f.ctrlKey || f.metaKey;
            if (f.key === 'Tab' && !g) {
              const P = document.activeElement,
                A = f.shiftKey;
              if (f.target === w && A) {
                (E = u.current) == null || E.focus();
                return;
              }
              const D = p({ tabbingDirection: A ? 'backwards' : 'forwards' }),
                U = D.findIndex((O) => O === P);
              Hl(D.slice(U + 1))
                ? f.preventDefault()
                : A
                  ? (T = u.current) == null || T.focus()
                  : (k = d.current) == null || k.focus();
            }
          };
          return (
            w.addEventListener('keydown', m),
            () => w.removeEventListener('keydown', m)
          );
        }
      }, [l, p]),
      y.jsxs(v1, {
        ref: a,
        role: 'region',
        'aria-label': o.replace('{hotkey}', x),
        tabIndex: -1,
        style: { pointerEvents: S ? void 0 : 'none' },
        children: [
          S &&
            y.jsx(Za, {
              ref: u,
              onFocusFromOutsideViewport: () => {
                const w = p({ tabbingDirection: 'forwards' });
                Hl(w);
              },
            }),
          y.jsx(fc.Slot, {
            scope: n,
            children: y.jsx(G.ol, { tabIndex: -1, ...i, ref: v }),
          }),
          S &&
            y.jsx(Za, {
              ref: d,
              onFocusFromOutsideViewport: () => {
                const w = p({ tabbingDirection: 'backwards' });
                Hl(w);
              },
            }),
        ],
      })
    );
  });
Am.displayName = Om;
var jm = 'ToastFocusProxy',
  Za = c.forwardRef((e, t) => {
    const { __scopeToast: n, onFocusFromOutsideViewport: r, ...o } = e,
      i = tl(jm, n);
    return y.jsx(ci, {
      'aria-hidden': !0,
      tabIndex: 0,
      ...o,
      ref: t,
      style: { position: 'fixed' },
      onFocus: (s) => {
        var u;
        const l = s.relatedTarget;
        !((u = i.viewport) != null && u.contains(l)) && r();
      },
    });
  });
Za.displayName = jm;
var nl = 'Toast',
  R1 = 'toast.swipeStart',
  b1 = 'toast.swipeMove',
  _1 = 'toast.swipeCancel',
  O1 = 'toast.swipeEnd',
  Mm = c.forwardRef((e, t) => {
    const { forceMount: n, open: r, defaultOpen: o, onOpenChange: i, ...s } = e,
      [l = !0, a] = Jo({ prop: r, defaultProp: o, onChange: i });
    return y.jsx(eo, {
      present: n || l,
      children: y.jsx(M1, {
        open: l,
        ...s,
        ref: t,
        onClose: () => a(!1),
        onPause: et(e.onPause),
        onResume: et(e.onResume),
        onSwipeStart: B(e.onSwipeStart, (u) => {
          u.currentTarget.setAttribute('data-swipe', 'start');
        }),
        onSwipeMove: B(e.onSwipeMove, (u) => {
          const { x: d, y: h } = u.detail.delta;
          (u.currentTarget.setAttribute('data-swipe', 'move'),
            u.currentTarget.style.setProperty(
              '--radix-toast-swipe-move-x',
              `${d}px`
            ),
            u.currentTarget.style.setProperty(
              '--radix-toast-swipe-move-y',
              `${h}px`
            ));
        }),
        onSwipeCancel: B(e.onSwipeCancel, (u) => {
          (u.currentTarget.setAttribute('data-swipe', 'cancel'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-move-x'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-move-y'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-end-x'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-end-y'));
        }),
        onSwipeEnd: B(e.onSwipeEnd, (u) => {
          const { x: d, y: h } = u.detail.delta;
          (u.currentTarget.setAttribute('data-swipe', 'end'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-move-x'),
            u.currentTarget.style.removeProperty('--radix-toast-swipe-move-y'),
            u.currentTarget.style.setProperty(
              '--radix-toast-swipe-end-x',
              `${d}px`
            ),
            u.currentTarget.style.setProperty(
              '--radix-toast-swipe-end-y',
              `${h}px`
            ),
            a(!1));
        }),
      }),
    });
  });
Mm.displayName = nl;
var [A1, j1] = bm(nl, { onClose() {} }),
  M1 = c.forwardRef((e, t) => {
    const {
        __scopeToast: n,
        type: r = 'foreground',
        duration: o,
        open: i,
        onClose: s,
        onEscapeKeyDown: l,
        onPause: a,
        onResume: u,
        onSwipeStart: d,
        onSwipeMove: h,
        onSwipeCancel: v,
        onSwipeEnd: x,
        ...S
      } = e,
      p = tl(nl, n),
      [w, m] = c.useState(null),
      f = oe(t, (O) => m(O)),
      g = c.useRef(null),
      C = c.useRef(null),
      E = o || p.duration,
      T = c.useRef(0),
      k = c.useRef(E),
      P = c.useRef(0),
      { onToastAdd: A, onToastRemove: j } = p,
      z = et(() => {
        var H;
        ((w == null ? void 0 : w.contains(document.activeElement)) &&
          ((H = p.viewport) == null || H.focus()),
          s());
      }),
      D = c.useCallback(
        (O) => {
          !O ||
            O === 1 / 0 ||
            (window.clearTimeout(P.current),
            (T.current = new Date().getTime()),
            (P.current = window.setTimeout(z, O)));
        },
        [z]
      );
    (c.useEffect(() => {
      const O = p.viewport;
      if (O) {
        const H = () => {
            (D(k.current), u == null || u());
          },
          L = () => {
            const V = new Date().getTime() - T.current;
            ((k.current = k.current - V),
              window.clearTimeout(P.current),
              a == null || a());
          };
        return (
          O.addEventListener(Xa, L),
          O.addEventListener(qa, H),
          () => {
            (O.removeEventListener(Xa, L), O.removeEventListener(qa, H));
          }
        );
      }
    }, [p.viewport, E, a, u, D]),
      c.useEffect(() => {
        i && !p.isClosePausedRef.current && D(E);
      }, [i, E, p.isClosePausedRef, D]),
      c.useEffect(() => (A(), () => j()), [A, j]));
    const U = c.useMemo(() => (w ? Um(w) : null), [w]);
    return p.viewport
      ? y.jsxs(y.Fragment, {
          children: [
            U &&
              y.jsx(D1, {
                __scopeToast: n,
                role: 'status',
                'aria-live': r === 'foreground' ? 'assertive' : 'polite',
                'aria-atomic': !0,
                children: U,
              }),
            y.jsx(A1, {
              scope: n,
              onClose: z,
              children: rr.createPortal(
                y.jsx(fc.ItemSlot, {
                  scope: n,
                  children: y.jsx(m1, {
                    asChild: !0,
                    onEscapeKeyDown: B(l, () => {
                      (p.isFocusedToastEscapeKeyDownRef.current || z(),
                        (p.isFocusedToastEscapeKeyDownRef.current = !1));
                    }),
                    children: y.jsx(G.li, {
                      role: 'status',
                      'aria-live': 'off',
                      'aria-atomic': !0,
                      tabIndex: 0,
                      'data-state': i ? 'open' : 'closed',
                      'data-swipe-direction': p.swipeDirection,
                      ...S,
                      ref: f,
                      style: {
                        userSelect: 'none',
                        touchAction: 'none',
                        ...e.style,
                      },
                      onKeyDown: B(e.onKeyDown, (O) => {
                        O.key === 'Escape' &&
                          (l == null || l(O.nativeEvent),
                          O.nativeEvent.defaultPrevented ||
                            ((p.isFocusedToastEscapeKeyDownRef.current = !0),
                            z()));
                      }),
                      onPointerDown: B(e.onPointerDown, (O) => {
                        O.button === 0 &&
                          (g.current = { x: O.clientX, y: O.clientY });
                      }),
                      onPointerMove: B(e.onPointerMove, (O) => {
                        if (!g.current) return;
                        const H = O.clientX - g.current.x,
                          L = O.clientY - g.current.y,
                          V = !!C.current,
                          N = ['left', 'right'].includes(p.swipeDirection),
                          _ = ['left', 'up'].includes(p.swipeDirection)
                            ? Math.min
                            : Math.max,
                          I = N ? _(0, H) : 0,
                          $ = N ? 0 : _(0, L),
                          J = O.pointerType === 'touch' ? 10 : 2,
                          je = { x: I, y: $ },
                          ge = { originalEvent: O, delta: je };
                        V
                          ? ((C.current = je), Mi(b1, h, ge, { discrete: !1 }))
                          : af(je, p.swipeDirection, J)
                            ? ((C.current = je),
                              Mi(R1, d, ge, { discrete: !1 }),
                              O.target.setPointerCapture(O.pointerId))
                            : (Math.abs(H) > J || Math.abs(L) > J) &&
                              (g.current = null);
                      }),
                      onPointerUp: B(e.onPointerUp, (O) => {
                        const H = C.current,
                          L = O.target;
                        if (
                          (L.hasPointerCapture(O.pointerId) &&
                            L.releasePointerCapture(O.pointerId),
                          (C.current = null),
                          (g.current = null),
                          H)
                        ) {
                          const V = O.currentTarget,
                            N = { originalEvent: O, delta: H };
                          (af(H, p.swipeDirection, p.swipeThreshold)
                            ? Mi(O1, x, N, { discrete: !0 })
                            : Mi(_1, v, N, { discrete: !0 }),
                            V.addEventListener(
                              'click',
                              (_) => _.preventDefault(),
                              { once: !0 }
                            ));
                        }
                      }),
                    }),
                  }),
                }),
                p.viewport
              ),
            }),
          ],
        })
      : null;
  }),
  D1 = (e) => {
    const { __scopeToast: t, children: n, ...r } = e,
      o = tl(nl, t),
      [i, s] = c.useState(!1),
      [l, a] = c.useState(!1);
    return (
      F1(() => s(!0)),
      c.useEffect(() => {
        const u = window.setTimeout(() => a(!0), 1e3);
        return () => window.clearTimeout(u);
      }, []),
      l
        ? null
        : y.jsx(el, {
            asChild: !0,
            children: y.jsx(ci, {
              ...r,
              children:
                i && y.jsxs(y.Fragment, { children: [o.label, ' ', n] }),
            }),
          })
    );
  },
  I1 = 'ToastTitle',
  Dm = c.forwardRef((e, t) => {
    const { __scopeToast: n, ...r } = e;
    return y.jsx(G.div, { ...r, ref: t });
  });
Dm.displayName = I1;
var L1 = 'ToastDescription',
  Im = c.forwardRef((e, t) => {
    const { __scopeToast: n, ...r } = e;
    return y.jsx(G.div, { ...r, ref: t });
  });
Im.displayName = L1;
var Lm = 'ToastAction',
  Fm = c.forwardRef((e, t) => {
    const { altText: n, ...r } = e;
    return n.trim()
      ? y.jsx($m, {
          altText: n,
          asChild: !0,
          children: y.jsx(pc, { ...r, ref: t }),
        })
      : (console.error(
          `Invalid prop \`altText\` supplied to \`${Lm}\`. Expected non-empty \`string\`.`
        ),
        null);
  });
Fm.displayName = Lm;
var zm = 'ToastClose',
  pc = c.forwardRef((e, t) => {
    const { __scopeToast: n, ...r } = e,
      o = j1(zm, n);
    return y.jsx($m, {
      asChild: !0,
      children: y.jsx(G.button, {
        type: 'button',
        ...r,
        ref: t,
        onClick: B(e.onClick, o.onClose),
      }),
    });
  });
pc.displayName = zm;
var $m = c.forwardRef((e, t) => {
  const { __scopeToast: n, altText: r, ...o } = e;
  return y.jsx(G.div, {
    'data-radix-toast-announce-exclude': '',
    'data-radix-toast-announce-alt': r || void 0,
    ...o,
    ref: t,
  });
});
function Um(e) {
  const t = [];
  return (
    Array.from(e.childNodes).forEach((r) => {
      if (
        (r.nodeType === r.TEXT_NODE && r.textContent && t.push(r.textContent),
        z1(r))
      ) {
        const o = r.ariaHidden || r.hidden || r.style.display === 'none',
          i = r.dataset.radixToastAnnounceExclude === '';
        if (!o)
          if (i) {
            const s = r.dataset.radixToastAnnounceAlt;
            s && t.push(s);
          } else t.push(...Um(r));
      }
    }),
    t
  );
}
function Mi(e, t, n, { discrete: r }) {
  const o = n.originalEvent.currentTarget,
    i = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: n });
  (t && o.addEventListener(e, t, { once: !0 }),
    r ? Pm(o, i) : o.dispatchEvent(i));
}
var af = (e, t, n = 0) => {
  const r = Math.abs(e.x),
    o = Math.abs(e.y),
    i = r > o;
  return t === 'left' || t === 'right' ? i && r > n : !i && o > n;
};
function F1(e = () => {}) {
  const t = et(e);
  Ae(() => {
    let n = 0,
      r = 0;
    return (
      (n = window.requestAnimationFrame(
        () => (r = window.requestAnimationFrame(t))
      )),
      () => {
        (window.cancelAnimationFrame(n), window.cancelAnimationFrame(r));
      }
    );
  }, [t]);
}
function z1(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function $1(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const o = r.tagName === 'INPUT' && r.type === 'hidden';
        return r.disabled || r.hidden || o
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Hl(e) {
  const t = document.activeElement;
  return e.some((n) =>
    n === t ? !0 : (n.focus(), document.activeElement !== t)
  );
}
var U1 = _m,
  Vm = Am,
  Bm = Mm,
  Wm = Dm,
  Hm = Im,
  Km = Fm,
  Qm = pc;
function Gm(e) {
  var t,
    n,
    r = '';
  if (typeof e == 'string' || typeof e == 'number') r += e;
  else if (typeof e == 'object')
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (n = Gm(e[t])) && (r && (r += ' '), (r += n));
    } else for (n in e) e[n] && (r && (r += ' '), (r += n));
  return r;
}
function Ym() {
  for (var e, t, n = 0, r = '', o = arguments.length; n < o; n++)
    (e = arguments[n]) && (t = Gm(e)) && (r && (r += ' '), (r += t));
  return r;
}
const uf = (e) => (typeof e == 'boolean' ? `${e}` : e === 0 ? '0' : e),
  cf = Ym,
  hc = (e, t) => (n) => {
    var r;
    if ((t == null ? void 0 : t.variants) == null)
      return cf(
        e,
        n == null ? void 0 : n.class,
        n == null ? void 0 : n.className
      );
    const { variants: o, defaultVariants: i } = t,
      s = Object.keys(o).map((u) => {
        const d = n == null ? void 0 : n[u],
          h = i == null ? void 0 : i[u];
        if (d === null) return null;
        const v = uf(d) || uf(h);
        return o[u][v];
      }),
      l =
        n &&
        Object.entries(n).reduce((u, d) => {
          let [h, v] = d;
          return (v === void 0 || (u[h] = v), u);
        }, {}),
      a =
        t == null || (r = t.compoundVariants) === null || r === void 0
          ? void 0
          : r.reduce((u, d) => {
              let { class: h, className: v, ...x } = d;
              return Object.entries(x).every((S) => {
                let [p, w] = S;
                return Array.isArray(w)
                  ? w.includes({ ...i, ...l }[p])
                  : { ...i, ...l }[p] === w;
              })
                ? [...u, h, v]
                : u;
            }, []);
    return cf(
      e,
      s,
      a,
      n == null ? void 0 : n.class,
      n == null ? void 0 : n.className
    );
  };
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const V1 = (e) => e.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  Xm = (...e) => e.filter((t, n, r) => !!t && r.indexOf(t) === n).join(' ');
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var B1 = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const W1 = c.forwardRef(
  (
    {
      color: e = 'currentColor',
      size: t = 24,
      strokeWidth: n = 2,
      absoluteStrokeWidth: r,
      className: o = '',
      children: i,
      iconNode: s,
      ...l
    },
    a
  ) =>
    c.createElement(
      'svg',
      {
        ref: a,
        ...B1,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
        className: Xm('lucide', o),
        ...l,
      },
      [
        ...s.map(([u, d]) => c.createElement(u, d)),
        ...(Array.isArray(i) ? i : [i]),
      ]
    )
);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ct = (e, t) => {
  const n = c.forwardRef(({ className: r, ...o }, i) =>
    c.createElement(W1, {
      ref: i,
      iconNode: t,
      className: Xm(`lucide-${V1(e)}`, r),
      ...o,
    })
  );
  return ((n.displayName = `${e}`), n);
};
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const H1 = Ct('Check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qm = Ct('ChevronDown', [
  ['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const K1 = Ct('ChevronUp', [
  ['path', { d: 'm18 15-6-6-6 6', key: '153udz' }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Q1 = Ct('CircleAlert', [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
  ['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
  ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const G1 = Ct('Download', [
  ['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', key: 'ih7n3h' }],
  ['polyline', { points: '7 10 12 15 17 10', key: '2ggqvy' }],
  ['line', { x1: '12', x2: '12', y1: '15', y2: '3', key: '1vk2je' }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Y1 = Ct('Keyboard', [
  ['path', { d: 'M10 8h.01', key: '1r9ogq' }],
  ['path', { d: 'M12 12h.01', key: '1mp3jc' }],
  ['path', { d: 'M14 8h.01', key: '1primd' }],
  ['path', { d: 'M16 12h.01', key: '1l6xoz' }],
  ['path', { d: 'M18 8h.01', key: 'emo2bl' }],
  ['path', { d: 'M6 8h.01', key: 'x9i8wu' }],
  ['path', { d: 'M7 16h10', key: 'wp8him' }],
  ['path', { d: 'M8 12h.01', key: 'czm47f' }],
  [
    'rect',
    { width: '20', height: '16', x: '2', y: '4', rx: '2', key: '18n3k1' },
  ],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const X1 = Ct('Moon', [
  ['path', { d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z', key: 'a7tn18' }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const q1 = Ct('Settings', [
  [
    'path',
    {
      d: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
      key: '1qme2f',
    },
  ],
  ['circle', { cx: '12', cy: '12', r: '3', key: '1v7zrd' }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Zm = Ct('Sparkles', [
  [
    'path',
    {
      d: 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z',
      key: '4pj2yx',
    },
  ],
  ['path', { d: 'M20 3v4', key: '1olli1' }],
  ['path', { d: 'M22 5h-4', key: '1gvqau' }],
  ['path', { d: 'M4 17v2', key: 'vumght' }],
  ['path', { d: 'M5 18H3', key: 'zchphs' }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Z1 = Ct('Sun', [
  ['circle', { cx: '12', cy: '12', r: '4', key: '4exip2' }],
  ['path', { d: 'M12 2v2', key: 'tus03m' }],
  ['path', { d: 'M12 20v2', key: '1lh1kg' }],
  ['path', { d: 'm4.93 4.93 1.41 1.41', key: '149t6j' }],
  ['path', { d: 'm17.66 17.66 1.41 1.41', key: 'ptbguv' }],
  ['path', { d: 'M2 12h2', key: '1t8f8n' }],
  ['path', { d: 'M20 12h2', key: '1q8mjw' }],
  ['path', { d: 'm6.34 17.66-1.41 1.41', key: '1m8zz5' }],
  ['path', { d: 'm19.07 4.93-1.41 1.41', key: '1shlcs' }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const rl = Ct('X', [
    ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
    ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
  ]),
  mc = '-',
  J1 = (e) => {
    const t = tS(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (s) => {
        const l = s.split(mc);
        return (l[0] === '' && l.length !== 1 && l.shift(), Jm(l, t) || eS(s));
      },
      getConflictingClassGroupIds: (s, l) => {
        const a = n[s] || [];
        return l && r[s] ? [...a, ...r[s]] : a;
      },
    };
  },
  Jm = (e, t) => {
    var s;
    if (e.length === 0) return t.classGroupId;
    const n = e[0],
      r = t.nextPart.get(n),
      o = r ? Jm(e.slice(1), r) : void 0;
    if (o) return o;
    if (t.validators.length === 0) return;
    const i = e.join(mc);
    return (s = t.validators.find(({ validator: l }) => l(i))) == null
      ? void 0
      : s.classGroupId;
  },
  df = /^\[(.+)\]$/,
  eS = (e) => {
    if (df.test(e)) {
      const t = df.exec(e)[1],
        n = t == null ? void 0 : t.substring(0, t.indexOf(':'));
      if (n) return 'arbitrary..' + n;
    }
  },
  tS = (e) => {
    const { theme: t, prefix: n } = e,
      r = { nextPart: new Map(), validators: [] };
    return (
      rS(Object.entries(e.classGroups), n).forEach(([i, s]) => {
        Ja(s, r, i, t);
      }),
      r
    );
  },
  Ja = (e, t, n, r) => {
    e.forEach((o) => {
      if (typeof o == 'string') {
        const i = o === '' ? t : ff(t, o);
        i.classGroupId = n;
        return;
      }
      if (typeof o == 'function') {
        if (nS(o)) {
          Ja(o(r), t, n, r);
          return;
        }
        t.validators.push({ validator: o, classGroupId: n });
        return;
      }
      Object.entries(o).forEach(([i, s]) => {
        Ja(s, ff(t, i), n, r);
      });
    });
  },
  ff = (e, t) => {
    let n = e;
    return (
      t.split(mc).forEach((r) => {
        (n.nextPart.has(r) ||
          n.nextPart.set(r, { nextPart: new Map(), validators: [] }),
          (n = n.nextPart.get(r)));
      }),
      n
    );
  },
  nS = (e) => e.isThemeGetter,
  rS = (e, t) =>
    t
      ? e.map(([n, r]) => {
          const o = r.map((i) =>
            typeof i == 'string'
              ? t + i
              : typeof i == 'object'
                ? Object.fromEntries(
                    Object.entries(i).map(([s, l]) => [t + s, l])
                  )
                : i
          );
          return [n, o];
        })
      : e,
  oS = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
      n = new Map(),
      r = new Map();
    const o = (i, s) => {
      (n.set(i, s), t++, t > e && ((t = 0), (r = n), (n = new Map())));
    };
    return {
      get(i) {
        let s = n.get(i);
        if (s !== void 0) return s;
        if ((s = r.get(i)) !== void 0) return (o(i, s), s);
      },
      set(i, s) {
        n.has(i) ? n.set(i, s) : o(i, s);
      },
    };
  },
  ev = '!',
  iS = (e) => {
    const { separator: t, experimentalParseClassName: n } = e,
      r = t.length === 1,
      o = t[0],
      i = t.length,
      s = (l) => {
        const a = [];
        let u = 0,
          d = 0,
          h;
        for (let w = 0; w < l.length; w++) {
          let m = l[w];
          if (u === 0) {
            if (m === o && (r || l.slice(w, w + i) === t)) {
              (a.push(l.slice(d, w)), (d = w + i));
              continue;
            }
            if (m === '/') {
              h = w;
              continue;
            }
          }
          m === '[' ? u++ : m === ']' && u--;
        }
        const v = a.length === 0 ? l : l.substring(d),
          x = v.startsWith(ev),
          S = x ? v.substring(1) : v,
          p = h && h > d ? h - d : void 0;
        return {
          modifiers: a,
          hasImportantModifier: x,
          baseClassName: S,
          maybePostfixModifierPosition: p,
        };
      };
    return n ? (l) => n({ className: l, parseClassName: s }) : s;
  },
  sS = (e) => {
    if (e.length <= 1) return e;
    const t = [];
    let n = [];
    return (
      e.forEach((r) => {
        r[0] === '[' ? (t.push(...n.sort(), r), (n = [])) : n.push(r);
      }),
      t.push(...n.sort()),
      t
    );
  },
  lS = (e) => ({ cache: oS(e.cacheSize), parseClassName: iS(e), ...J1(e) }),
  aS = /\s+/,
  uS = (e, t) => {
    const {
        parseClassName: n,
        getClassGroupId: r,
        getConflictingClassGroupIds: o,
      } = t,
      i = [],
      s = e.trim().split(aS);
    let l = '';
    for (let a = s.length - 1; a >= 0; a -= 1) {
      const u = s[a],
        {
          modifiers: d,
          hasImportantModifier: h,
          baseClassName: v,
          maybePostfixModifierPosition: x,
        } = n(u);
      let S = !!x,
        p = r(S ? v.substring(0, x) : v);
      if (!p) {
        if (!S) {
          l = u + (l.length > 0 ? ' ' + l : l);
          continue;
        }
        if (((p = r(v)), !p)) {
          l = u + (l.length > 0 ? ' ' + l : l);
          continue;
        }
        S = !1;
      }
      const w = sS(d).join(':'),
        m = h ? w + ev : w,
        f = m + p;
      if (i.includes(f)) continue;
      i.push(f);
      const g = o(p, S);
      for (let C = 0; C < g.length; ++C) {
        const E = g[C];
        i.push(m + E);
      }
      l = u + (l.length > 0 ? ' ' + l : l);
    }
    return l;
  };
function cS() {
  let e = 0,
    t,
    n,
    r = '';
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = tv(t)) && (r && (r += ' '), (r += n));
  return r;
}
const tv = (e) => {
  if (typeof e == 'string') return e;
  let t,
    n = '';
  for (let r = 0; r < e.length; r++)
    e[r] && (t = tv(e[r])) && (n && (n += ' '), (n += t));
  return n;
};
function dS(e, ...t) {
  let n,
    r,
    o,
    i = s;
  function s(a) {
    const u = t.reduce((d, h) => h(d), e());
    return ((n = lS(u)), (r = n.cache.get), (o = n.cache.set), (i = l), l(a));
  }
  function l(a) {
    const u = r(a);
    if (u) return u;
    const d = uS(a, n);
    return (o(a, d), d);
  }
  return function () {
    return i(cS.apply(null, arguments));
  };
}
const se = (e) => {
    const t = (n) => n[e] || [];
    return ((t.isThemeGetter = !0), t);
  },
  nv = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  fS = /^\d+\/\d+$/,
  pS = new Set(['px', 'full', 'screen']),
  hS = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  mS =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  vS = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  gS = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  yS =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Ft = (e) => Nr(e) || pS.has(e) || fS.test(e),
  Jt = (e) => to(e, 'length', TS),
  Nr = (e) => !!e && !Number.isNaN(Number(e)),
  Kl = (e) => to(e, 'number', Nr),
  go = (e) => !!e && Number.isInteger(Number(e)),
  wS = (e) => e.endsWith('%') && Nr(e.slice(0, -1)),
  W = (e) => nv.test(e),
  en = (e) => hS.test(e),
  xS = new Set(['length', 'size', 'percentage']),
  SS = (e) => to(e, xS, rv),
  CS = (e) => to(e, 'position', rv),
  ES = new Set(['image', 'url']),
  kS = (e) => to(e, ES, RS),
  PS = (e) => to(e, '', NS),
  yo = () => !0,
  to = (e, t, n) => {
    const r = nv.exec(e);
    return r
      ? r[1]
        ? typeof t == 'string'
          ? r[1] === t
          : t.has(r[1])
        : n(r[2])
      : !1;
  },
  TS = (e) => mS.test(e) && !vS.test(e),
  rv = () => !1,
  NS = (e) => gS.test(e),
  RS = (e) => yS.test(e),
  bS = () => {
    const e = se('colors'),
      t = se('spacing'),
      n = se('blur'),
      r = se('brightness'),
      o = se('borderColor'),
      i = se('borderRadius'),
      s = se('borderSpacing'),
      l = se('borderWidth'),
      a = se('contrast'),
      u = se('grayscale'),
      d = se('hueRotate'),
      h = se('invert'),
      v = se('gap'),
      x = se('gradientColorStops'),
      S = se('gradientColorStopPositions'),
      p = se('inset'),
      w = se('margin'),
      m = se('opacity'),
      f = se('padding'),
      g = se('saturate'),
      C = se('scale'),
      E = se('sepia'),
      T = se('skew'),
      k = se('space'),
      P = se('translate'),
      A = () => ['auto', 'contain', 'none'],
      j = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      z = () => ['auto', W, t],
      D = () => [W, t],
      U = () => ['', Ft, Jt],
      O = () => ['auto', Nr, W],
      H = () => [
        'bottom',
        'center',
        'left',
        'left-bottom',
        'left-top',
        'right',
        'right-bottom',
        'right-top',
        'top',
      ],
      L = () => ['solid', 'dashed', 'dotted', 'double', 'none'],
      V = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      N = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
      ],
      _ = () => ['', '0', W],
      I = () => [
        'auto',
        'avoid',
        'all',
        'avoid-page',
        'page',
        'left',
        'right',
        'column',
      ],
      $ = () => [Nr, W];
    return {
      cacheSize: 500,
      separator: ':',
      theme: {
        colors: [yo],
        spacing: [Ft, Jt],
        blur: ['none', '', en, W],
        brightness: $(),
        borderColor: [e],
        borderRadius: ['none', '', 'full', en, W],
        borderSpacing: D(),
        borderWidth: U(),
        contrast: $(),
        grayscale: _(),
        hueRotate: $(),
        invert: _(),
        gap: D(),
        gradientColorStops: [e],
        gradientColorStopPositions: [wS, Jt],
        inset: z(),
        margin: z(),
        opacity: $(),
        padding: D(),
        saturate: $(),
        scale: $(),
        sepia: _(),
        skew: $(),
        space: D(),
        translate: D(),
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', 'video', W] }],
        container: ['container'],
        columns: [{ columns: [en] }],
        'break-after': [{ 'break-after': I() }],
        'break-before': [{ 'break-before': I() }],
        'break-inside': [
          { 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] },
        ],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [
          { object: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
        ],
        'object-position': [{ object: [...H(), W] }],
        overflow: [{ overflow: j() }],
        'overflow-x': [{ 'overflow-x': j() }],
        'overflow-y': [{ 'overflow-y': j() }],
        overscroll: [{ overscroll: A() }],
        'overscroll-x': [{ 'overscroll-x': A() }],
        'overscroll-y': [{ 'overscroll-y': A() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: [p] }],
        'inset-x': [{ 'inset-x': [p] }],
        'inset-y': [{ 'inset-y': [p] }],
        start: [{ start: [p] }],
        end: [{ end: [p] }],
        top: [{ top: [p] }],
        right: [{ right: [p] }],
        bottom: [{ bottom: [p] }],
        left: [{ left: [p] }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: ['auto', go, W] }],
        basis: [{ basis: z() }],
        'flex-direction': [
          { flex: ['row', 'row-reverse', 'col', 'col-reverse'] },
        ],
        'flex-wrap': [{ flex: ['wrap', 'wrap-reverse', 'nowrap'] }],
        flex: [{ flex: ['1', 'auto', 'initial', 'none', W] }],
        grow: [{ grow: _() }],
        shrink: [{ shrink: _() }],
        order: [{ order: ['first', 'last', 'none', go, W] }],
        'grid-cols': [{ 'grid-cols': [yo] }],
        'col-start-end': [{ col: ['auto', { span: ['full', go, W] }, W] }],
        'col-start': [{ 'col-start': O() }],
        'col-end': [{ 'col-end': O() }],
        'grid-rows': [{ 'grid-rows': [yo] }],
        'row-start-end': [{ row: ['auto', { span: [go, W] }, W] }],
        'row-start': [{ 'row-start': O() }],
        'row-end': [{ 'row-end': O() }],
        'grid-flow': [
          { 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] },
        ],
        'auto-cols': [{ 'auto-cols': ['auto', 'min', 'max', 'fr', W] }],
        'auto-rows': [{ 'auto-rows': ['auto', 'min', 'max', 'fr', W] }],
        gap: [{ gap: [v] }],
        'gap-x': [{ 'gap-x': [v] }],
        'gap-y': [{ 'gap-y': [v] }],
        'justify-content': [{ justify: ['normal', ...N()] }],
        'justify-items': [
          { 'justify-items': ['start', 'end', 'center', 'stretch'] },
        ],
        'justify-self': [
          { 'justify-self': ['auto', 'start', 'end', 'center', 'stretch'] },
        ],
        'align-content': [{ content: ['normal', ...N(), 'baseline'] }],
        'align-items': [
          { items: ['start', 'end', 'center', 'baseline', 'stretch'] },
        ],
        'align-self': [
          { self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'] },
        ],
        'place-content': [{ 'place-content': [...N(), 'baseline'] }],
        'place-items': [
          { 'place-items': ['start', 'end', 'center', 'baseline', 'stretch'] },
        ],
        'place-self': [
          { 'place-self': ['auto', 'start', 'end', 'center', 'stretch'] },
        ],
        p: [{ p: [f] }],
        px: [{ px: [f] }],
        py: [{ py: [f] }],
        ps: [{ ps: [f] }],
        pe: [{ pe: [f] }],
        pt: [{ pt: [f] }],
        pr: [{ pr: [f] }],
        pb: [{ pb: [f] }],
        pl: [{ pl: [f] }],
        m: [{ m: [w] }],
        mx: [{ mx: [w] }],
        my: [{ my: [w] }],
        ms: [{ ms: [w] }],
        me: [{ me: [w] }],
        mt: [{ mt: [w] }],
        mr: [{ mr: [w] }],
        mb: [{ mb: [w] }],
        ml: [{ ml: [w] }],
        'space-x': [{ 'space-x': [k] }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': [k] }],
        'space-y-reverse': ['space-y-reverse'],
        w: [{ w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', W, t] }],
        'min-w': [{ 'min-w': [W, t, 'min', 'max', 'fit'] }],
        'max-w': [
          {
            'max-w': [
              W,
              t,
              'none',
              'full',
              'min',
              'max',
              'fit',
              'prose',
              { screen: [en] },
              en,
            ],
          },
        ],
        h: [{ h: [W, t, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
        'min-h': [
          { 'min-h': [W, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] },
        ],
        'max-h': [
          { 'max-h': [W, t, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] },
        ],
        size: [{ size: [W, t, 'auto', 'min', 'max', 'fit'] }],
        'font-size': [{ text: ['base', en, Jt] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [
          {
            font: [
              'thin',
              'extralight',
              'light',
              'normal',
              'medium',
              'semibold',
              'bold',
              'extrabold',
              'black',
              Kl,
            ],
          },
        ],
        'font-family': [{ font: [yo] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [
          {
            tracking: [
              'tighter',
              'tight',
              'normal',
              'wide',
              'wider',
              'widest',
              W,
            ],
          },
        ],
        'line-clamp': [{ 'line-clamp': ['none', Nr, Kl] }],
        leading: [
          {
            leading: [
              'none',
              'tight',
              'snug',
              'normal',
              'relaxed',
              'loose',
              Ft,
              W,
            ],
          },
        ],
        'list-image': [{ 'list-image': ['none', W] }],
        'list-style-type': [{ list: ['none', 'disc', 'decimal', W] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'placeholder-color': [{ placeholder: [e] }],
        'placeholder-opacity': [{ 'placeholder-opacity': [m] }],
        'text-alignment': [
          { text: ['left', 'center', 'right', 'justify', 'start', 'end'] },
        ],
        'text-color': [{ text: [e] }],
        'text-opacity': [{ 'text-opacity': [m] }],
        'text-decoration': [
          'underline',
          'overline',
          'line-through',
          'no-underline',
        ],
        'text-decoration-style': [{ decoration: [...L(), 'wavy'] }],
        'text-decoration-thickness': [
          { decoration: ['auto', 'from-font', Ft, Jt] },
        ],
        'underline-offset': [{ 'underline-offset': ['auto', Ft, W] }],
        'text-decoration-color': [{ decoration: [e] }],
        'text-transform': [
          'uppercase',
          'lowercase',
          'capitalize',
          'normal-case',
        ],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: D() }],
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              W,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              'normal',
              'nowrap',
              'pre',
              'pre-line',
              'pre-wrap',
              'break-spaces',
            ],
          },
        ],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', W] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-opacity': [{ 'bg-opacity': [m] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: [...H(), CS] }],
        'bg-repeat': [
          { bg: ['no-repeat', { repeat: ['', 'x', 'y', 'round', 'space'] }] },
        ],
        'bg-size': [{ bg: ['auto', 'cover', 'contain', SS] }],
        'bg-image': [
          {
            bg: [
              'none',
              { 'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] },
              kS,
            ],
          },
        ],
        'bg-color': [{ bg: [e] }],
        'gradient-from-pos': [{ from: [S] }],
        'gradient-via-pos': [{ via: [S] }],
        'gradient-to-pos': [{ to: [S] }],
        'gradient-from': [{ from: [x] }],
        'gradient-via': [{ via: [x] }],
        'gradient-to': [{ to: [x] }],
        rounded: [{ rounded: [i] }],
        'rounded-s': [{ 'rounded-s': [i] }],
        'rounded-e': [{ 'rounded-e': [i] }],
        'rounded-t': [{ 'rounded-t': [i] }],
        'rounded-r': [{ 'rounded-r': [i] }],
        'rounded-b': [{ 'rounded-b': [i] }],
        'rounded-l': [{ 'rounded-l': [i] }],
        'rounded-ss': [{ 'rounded-ss': [i] }],
        'rounded-se': [{ 'rounded-se': [i] }],
        'rounded-ee': [{ 'rounded-ee': [i] }],
        'rounded-es': [{ 'rounded-es': [i] }],
        'rounded-tl': [{ 'rounded-tl': [i] }],
        'rounded-tr': [{ 'rounded-tr': [i] }],
        'rounded-br': [{ 'rounded-br': [i] }],
        'rounded-bl': [{ 'rounded-bl': [i] }],
        'border-w': [{ border: [l] }],
        'border-w-x': [{ 'border-x': [l] }],
        'border-w-y': [{ 'border-y': [l] }],
        'border-w-s': [{ 'border-s': [l] }],
        'border-w-e': [{ 'border-e': [l] }],
        'border-w-t': [{ 'border-t': [l] }],
        'border-w-r': [{ 'border-r': [l] }],
        'border-w-b': [{ 'border-b': [l] }],
        'border-w-l': [{ 'border-l': [l] }],
        'border-opacity': [{ 'border-opacity': [m] }],
        'border-style': [{ border: [...L(), 'hidden'] }],
        'divide-x': [{ 'divide-x': [l] }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': [l] }],
        'divide-y-reverse': ['divide-y-reverse'],
        'divide-opacity': [{ 'divide-opacity': [m] }],
        'divide-style': [{ divide: L() }],
        'border-color': [{ border: [o] }],
        'border-color-x': [{ 'border-x': [o] }],
        'border-color-y': [{ 'border-y': [o] }],
        'border-color-s': [{ 'border-s': [o] }],
        'border-color-e': [{ 'border-e': [o] }],
        'border-color-t': [{ 'border-t': [o] }],
        'border-color-r': [{ 'border-r': [o] }],
        'border-color-b': [{ 'border-b': [o] }],
        'border-color-l': [{ 'border-l': [o] }],
        'divide-color': [{ divide: [o] }],
        'outline-style': [{ outline: ['', ...L()] }],
        'outline-offset': [{ 'outline-offset': [Ft, W] }],
        'outline-w': [{ outline: [Ft, Jt] }],
        'outline-color': [{ outline: [e] }],
        'ring-w': [{ ring: U() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: [e] }],
        'ring-opacity': [{ 'ring-opacity': [m] }],
        'ring-offset-w': [{ 'ring-offset': [Ft, Jt] }],
        'ring-offset-color': [{ 'ring-offset': [e] }],
        shadow: [{ shadow: ['', 'inner', 'none', en, PS] }],
        'shadow-color': [{ shadow: [yo] }],
        opacity: [{ opacity: [m] }],
        'mix-blend': [{ 'mix-blend': [...V(), 'plus-lighter', 'plus-darker'] }],
        'bg-blend': [{ 'bg-blend': V() }],
        filter: [{ filter: ['', 'none'] }],
        blur: [{ blur: [n] }],
        brightness: [{ brightness: [r] }],
        contrast: [{ contrast: [a] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', en, W] }],
        grayscale: [{ grayscale: [u] }],
        'hue-rotate': [{ 'hue-rotate': [d] }],
        invert: [{ invert: [h] }],
        saturate: [{ saturate: [g] }],
        sepia: [{ sepia: [E] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none'] }],
        'backdrop-blur': [{ 'backdrop-blur': [n] }],
        'backdrop-brightness': [{ 'backdrop-brightness': [r] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [a] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': [u] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [d] }],
        'backdrop-invert': [{ 'backdrop-invert': [h] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [m] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [g] }],
        'backdrop-sepia': [{ 'backdrop-sepia': [E] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': [s] }],
        'border-spacing-x': [{ 'border-spacing-x': [s] }],
        'border-spacing-y': [{ 'border-spacing-y': [s] }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [
          {
            transition: [
              'none',
              'all',
              '',
              'colors',
              'opacity',
              'shadow',
              'transform',
              W,
            ],
          },
        ],
        duration: [{ duration: $() }],
        ease: [{ ease: ['linear', 'in', 'out', 'in-out', W] }],
        delay: [{ delay: $() }],
        animate: [{ animate: ['none', 'spin', 'ping', 'pulse', 'bounce', W] }],
        transform: [{ transform: ['', 'gpu', 'none'] }],
        scale: [{ scale: [C] }],
        'scale-x': [{ 'scale-x': [C] }],
        'scale-y': [{ 'scale-y': [C] }],
        rotate: [{ rotate: [go, W] }],
        'translate-x': [{ 'translate-x': [P] }],
        'translate-y': [{ 'translate-y': [P] }],
        'skew-x': [{ 'skew-x': [T] }],
        'skew-y': [{ 'skew-y': [T] }],
        'transform-origin': [
          {
            origin: [
              'center',
              'top',
              'top-right',
              'right',
              'bottom-right',
              'bottom',
              'bottom-left',
              'left',
              'top-left',
              W,
            ],
          },
        ],
        accent: [{ accent: ['auto', e] }],
        appearance: [{ appearance: ['none', 'auto'] }],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              W,
            ],
          },
        ],
        'caret-color': [{ caret: [e] }],
        'pointer-events': [{ 'pointer-events': ['none', 'auto'] }],
        resize: [{ resize: ['none', 'y', 'x', ''] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': D() }],
        'scroll-mx': [{ 'scroll-mx': D() }],
        'scroll-my': [{ 'scroll-my': D() }],
        'scroll-ms': [{ 'scroll-ms': D() }],
        'scroll-me': [{ 'scroll-me': D() }],
        'scroll-mt': [{ 'scroll-mt': D() }],
        'scroll-mr': [{ 'scroll-mr': D() }],
        'scroll-mb': [{ 'scroll-mb': D() }],
        'scroll-ml': [{ 'scroll-ml': D() }],
        'scroll-p': [{ 'scroll-p': D() }],
        'scroll-px': [{ 'scroll-px': D() }],
        'scroll-py': [{ 'scroll-py': D() }],
        'scroll-ps': [{ 'scroll-ps': D() }],
        'scroll-pe': [{ 'scroll-pe': D() }],
        'scroll-pt': [{ 'scroll-pt': D() }],
        'scroll-pr': [{ 'scroll-pr': D() }],
        'scroll-pb': [{ 'scroll-pb': D() }],
        'scroll-pl': [{ 'scroll-pl': D() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [
          { 'will-change': ['auto', 'scroll', 'contents', 'transform', W] },
        ],
        fill: [{ fill: [e, 'none'] }],
        'stroke-w': [{ stroke: [Ft, Jt, Kl] }],
        stroke: [{ stroke: [e, 'none'] }],
        sr: ['sr-only', 'not-sr-only'],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: [
          'inset-x',
          'inset-y',
          'start',
          'end',
          'top',
          'right',
          'bottom',
          'left',
        ],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction',
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-s',
          'border-w-e',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-s',
          'border-color-e',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
    };
  },
  _S = dS(bS);
function q(...e) {
  return _S(Ym(e));
}
const OS = U1,
  ov = c.forwardRef(({ className: e, ...t }, n) =>
    y.jsx(Vm, {
      ref: n,
      className: q(
        'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
        e
      ),
      ...t,
    })
  );
ov.displayName = Vm.displayName;
const AS = hc(
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
    {
      variants: {
        variant: {
          default: 'border bg-background text-foreground',
          destructive:
            'destructive group border-destructive bg-destructive text-destructive-foreground',
        },
      },
      defaultVariants: { variant: 'default' },
    }
  ),
  iv = c.forwardRef(({ className: e, variant: t, ...n }, r) =>
    y.jsx(Bm, { ref: r, className: q(AS({ variant: t }), e), ...n })
  );
iv.displayName = Bm.displayName;
const jS = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx(Km, {
    ref: n,
    className: q(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      e
    ),
    ...t,
  })
);
jS.displayName = Km.displayName;
const sv = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx(Qm, {
    ref: n,
    className: q(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      e
    ),
    'toast-close': '',
    ...t,
    children: y.jsx(rl, { className: 'h-4 w-4' }),
  })
);
sv.displayName = Qm.displayName;
const lv = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx(Wm, { ref: n, className: q('text-sm font-semibold', e), ...t })
);
lv.displayName = Wm.displayName;
const av = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx(Hm, { ref: n, className: q('text-sm opacity-90', e), ...t })
);
av.displayName = Hm.displayName;
function MS() {
  const { toasts: e } = Zx();
  return y.jsxs(OS, {
    children: [
      e.map(function ({ id: t, title: n, description: r, action: o, ...i }) {
        return y.jsxs(
          iv,
          {
            ...i,
            children: [
              y.jsxs('div', {
                className: 'grid gap-1',
                children: [
                  n && y.jsx(lv, { children: n }),
                  r && y.jsx(av, { children: r }),
                ],
              }),
              o,
              y.jsx(sv, {}),
            ],
          },
          t
        );
      }),
      y.jsx(ov, {}),
    ],
  });
}
var DS = ep[' useId '.trim().toString()] || (() => {}),
  IS = 0;
function Rr(e) {
  const [t, n] = c.useState(DS());
  return (
    Ae(() => {
      n((r) => r ?? String(IS++));
    }, [e]),
    t ? `radix-${t}` : ''
  );
}
const LS = ['top', 'right', 'bottom', 'left'],
  Nn = Math.min,
  Ye = Math.max,
  bs = Math.round,
  Di = Math.floor,
  Dt = (e) => ({ x: e, y: e }),
  FS = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' },
  zS = { start: 'end', end: 'start' };
function eu(e, t, n) {
  return Ye(e, Nn(t, n));
}
function Yt(e, t) {
  return typeof e == 'function' ? e(t) : e;
}
function Xt(e) {
  return e.split('-')[0];
}
function no(e) {
  return e.split('-')[1];
}
function vc(e) {
  return e === 'x' ? 'y' : 'x';
}
function gc(e) {
  return e === 'y' ? 'height' : 'width';
}
function Rn(e) {
  return ['top', 'bottom'].includes(Xt(e)) ? 'y' : 'x';
}
function yc(e) {
  return vc(Rn(e));
}
function $S(e, t, n) {
  n === void 0 && (n = !1);
  const r = no(e),
    o = yc(e),
    i = gc(o);
  let s =
    o === 'x'
      ? r === (n ? 'end' : 'start')
        ? 'right'
        : 'left'
      : r === 'start'
        ? 'bottom'
        : 'top';
  return (t.reference[i] > t.floating[i] && (s = _s(s)), [s, _s(s)]);
}
function US(e) {
  const t = _s(e);
  return [tu(e), t, tu(t)];
}
function tu(e) {
  return e.replace(/start|end/g, (t) => zS[t]);
}
function VS(e, t, n) {
  const r = ['left', 'right'],
    o = ['right', 'left'],
    i = ['top', 'bottom'],
    s = ['bottom', 'top'];
  switch (e) {
    case 'top':
    case 'bottom':
      return n ? (t ? o : r) : t ? r : o;
    case 'left':
    case 'right':
      return t ? i : s;
    default:
      return [];
  }
}
function BS(e, t, n, r) {
  const o = no(e);
  let i = VS(Xt(e), n === 'start', r);
  return (
    o && ((i = i.map((s) => s + '-' + o)), t && (i = i.concat(i.map(tu)))),
    i
  );
}
function _s(e) {
  return e.replace(/left|right|bottom|top/g, (t) => FS[t]);
}
function WS(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function uv(e) {
  return typeof e != 'number'
    ? WS(e)
    : { top: e, right: e, bottom: e, left: e };
}
function Os(e) {
  const { x: t, y: n, width: r, height: o } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n,
  };
}
function pf(e, t, n) {
  let { reference: r, floating: o } = e;
  const i = Rn(t),
    s = yc(t),
    l = gc(s),
    a = Xt(t),
    u = i === 'y',
    d = r.x + r.width / 2 - o.width / 2,
    h = r.y + r.height / 2 - o.height / 2,
    v = r[l] / 2 - o[l] / 2;
  let x;
  switch (a) {
    case 'top':
      x = { x: d, y: r.y - o.height };
      break;
    case 'bottom':
      x = { x: d, y: r.y + r.height };
      break;
    case 'right':
      x = { x: r.x + r.width, y: h };
      break;
    case 'left':
      x = { x: r.x - o.width, y: h };
      break;
    default:
      x = { x: r.x, y: r.y };
  }
  switch (no(t)) {
    case 'start':
      x[s] -= v * (n && u ? -1 : 1);
      break;
    case 'end':
      x[s] += v * (n && u ? -1 : 1);
      break;
  }
  return x;
}
const HS = async (e, t, n) => {
  const {
      placement: r = 'bottom',
      strategy: o = 'absolute',
      middleware: i = [],
      platform: s,
    } = n,
    l = i.filter(Boolean),
    a = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let u = await s.getElementRects({ reference: e, floating: t, strategy: o }),
    { x: d, y: h } = pf(u, r, a),
    v = r,
    x = {},
    S = 0;
  for (let p = 0; p < l.length; p++) {
    const { name: w, fn: m } = l[p],
      {
        x: f,
        y: g,
        data: C,
        reset: E,
      } = await m({
        x: d,
        y: h,
        initialPlacement: r,
        placement: v,
        strategy: o,
        middlewareData: x,
        rects: u,
        platform: s,
        elements: { reference: e, floating: t },
      });
    ((d = f ?? d),
      (h = g ?? h),
      (x = { ...x, [w]: { ...x[w], ...C } }),
      E &&
        S <= 50 &&
        (S++,
        typeof E == 'object' &&
          (E.placement && (v = E.placement),
          E.rects &&
            (u =
              E.rects === !0
                ? await s.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: o,
                  })
                : E.rects),
          ({ x: d, y: h } = pf(u, v, a))),
        (p = -1)));
  }
  return { x: d, y: h, placement: v, strategy: o, middlewareData: x };
};
async function ei(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: o, platform: i, rects: s, elements: l, strategy: a } = e,
    {
      boundary: u = 'clippingAncestors',
      rootBoundary: d = 'viewport',
      elementContext: h = 'floating',
      altBoundary: v = !1,
      padding: x = 0,
    } = Yt(t, e),
    S = uv(x),
    w = l[v ? (h === 'floating' ? 'reference' : 'floating') : h],
    m = Os(
      await i.getClippingRect({
        element:
          (n = await (i.isElement == null ? void 0 : i.isElement(w))) == null ||
          n
            ? w
            : w.contextElement ||
              (await (i.getDocumentElement == null
                ? void 0
                : i.getDocumentElement(l.floating))),
        boundary: u,
        rootBoundary: d,
        strategy: a,
      })
    ),
    f =
      h === 'floating'
        ? { x: r, y: o, width: s.floating.width, height: s.floating.height }
        : s.reference,
    g = await (i.getOffsetParent == null
      ? void 0
      : i.getOffsetParent(l.floating)),
    C = (await (i.isElement == null ? void 0 : i.isElement(g)))
      ? (await (i.getScale == null ? void 0 : i.getScale(g))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    E = Os(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: l,
            rect: f,
            offsetParent: g,
            strategy: a,
          })
        : f
    );
  return {
    top: (m.top - E.top + S.top) / C.y,
    bottom: (E.bottom - m.bottom + S.bottom) / C.y,
    left: (m.left - E.left + S.left) / C.x,
    right: (E.right - m.right + S.right) / C.x,
  };
}
const KS = (e) => ({
    name: 'arrow',
    options: e,
    async fn(t) {
      const {
          x: n,
          y: r,
          placement: o,
          rects: i,
          platform: s,
          elements: l,
          middlewareData: a,
        } = t,
        { element: u, padding: d = 0 } = Yt(e, t) || {};
      if (u == null) return {};
      const h = uv(d),
        v = { x: n, y: r },
        x = yc(o),
        S = gc(x),
        p = await s.getDimensions(u),
        w = x === 'y',
        m = w ? 'top' : 'left',
        f = w ? 'bottom' : 'right',
        g = w ? 'clientHeight' : 'clientWidth',
        C = i.reference[S] + i.reference[x] - v[x] - i.floating[S],
        E = v[x] - i.reference[x],
        T = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u));
      let k = T ? T[g] : 0;
      (!k || !(await (s.isElement == null ? void 0 : s.isElement(T)))) &&
        (k = l.floating[g] || i.floating[S]);
      const P = C / 2 - E / 2,
        A = k / 2 - p[S] / 2 - 1,
        j = Nn(h[m], A),
        z = Nn(h[f], A),
        D = j,
        U = k - p[S] - z,
        O = k / 2 - p[S] / 2 + P,
        H = eu(D, O, U),
        L =
          !a.arrow &&
          no(o) != null &&
          O !== H &&
          i.reference[S] / 2 - (O < D ? j : z) - p[S] / 2 < 0,
        V = L ? (O < D ? O - D : O - U) : 0;
      return {
        [x]: v[x] + V,
        data: {
          [x]: H,
          centerOffset: O - H - V,
          ...(L && { alignmentOffset: V }),
        },
        reset: L,
      };
    },
  }),
  QS = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'flip',
        options: e,
        async fn(t) {
          var n, r;
          const {
              placement: o,
              middlewareData: i,
              rects: s,
              initialPlacement: l,
              platform: a,
              elements: u,
            } = t,
            {
              mainAxis: d = !0,
              crossAxis: h = !0,
              fallbackPlacements: v,
              fallbackStrategy: x = 'bestFit',
              fallbackAxisSideDirection: S = 'none',
              flipAlignment: p = !0,
              ...w
            } = Yt(e, t);
          if ((n = i.arrow) != null && n.alignmentOffset) return {};
          const m = Xt(o),
            f = Rn(l),
            g = Xt(l) === l,
            C = await (a.isRTL == null ? void 0 : a.isRTL(u.floating)),
            E = v || (g || !p ? [_s(l)] : US(l)),
            T = S !== 'none';
          !v && T && E.push(...BS(l, p, S, C));
          const k = [l, ...E],
            P = await ei(t, w),
            A = [];
          let j = ((r = i.flip) == null ? void 0 : r.overflows) || [];
          if ((d && A.push(P[m]), h)) {
            const O = $S(o, s, C);
            A.push(P[O[0]], P[O[1]]);
          }
          if (
            ((j = [...j, { placement: o, overflows: A }]),
            !A.every((O) => O <= 0))
          ) {
            var z, D;
            const O = (((z = i.flip) == null ? void 0 : z.index) || 0) + 1,
              H = k[O];
            if (H)
              return {
                data: { index: O, overflows: j },
                reset: { placement: H },
              };
            let L =
              (D = j
                .filter((V) => V.overflows[0] <= 0)
                .sort((V, N) => V.overflows[1] - N.overflows[1])[0]) == null
                ? void 0
                : D.placement;
            if (!L)
              switch (x) {
                case 'bestFit': {
                  var U;
                  const V =
                    (U = j
                      .filter((N) => {
                        if (T) {
                          const _ = Rn(N.placement);
                          return _ === f || _ === 'y';
                        }
                        return !0;
                      })
                      .map((N) => [
                        N.placement,
                        N.overflows
                          .filter((_) => _ > 0)
                          .reduce((_, I) => _ + I, 0),
                      ])
                      .sort((N, _) => N[1] - _[1])[0]) == null
                      ? void 0
                      : U[0];
                  V && (L = V);
                  break;
                }
                case 'initialPlacement':
                  L = l;
                  break;
              }
            if (o !== L) return { reset: { placement: L } };
          }
          return {};
        },
      }
    );
  };
function hf(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function mf(e) {
  return LS.some((t) => e[t] >= 0);
}
const GS = function (e) {
  return (
    e === void 0 && (e = {}),
    {
      name: 'hide',
      options: e,
      async fn(t) {
        const { rects: n } = t,
          { strategy: r = 'referenceHidden', ...o } = Yt(e, t);
        switch (r) {
          case 'referenceHidden': {
            const i = await ei(t, { ...o, elementContext: 'reference' }),
              s = hf(i, n.reference);
            return {
              data: { referenceHiddenOffsets: s, referenceHidden: mf(s) },
            };
          }
          case 'escaped': {
            const i = await ei(t, { ...o, altBoundary: !0 }),
              s = hf(i, n.floating);
            return { data: { escapedOffsets: s, escaped: mf(s) } };
          }
          default:
            return {};
        }
      },
    }
  );
};
async function YS(e, t) {
  const { placement: n, platform: r, elements: o } = e,
    i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)),
    s = Xt(n),
    l = no(n),
    a = Rn(n) === 'y',
    u = ['left', 'top'].includes(s) ? -1 : 1,
    d = i && a ? -1 : 1,
    h = Yt(t, e);
  let {
    mainAxis: v,
    crossAxis: x,
    alignmentAxis: S,
  } = typeof h == 'number'
    ? { mainAxis: h, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: h.mainAxis || 0,
        crossAxis: h.crossAxis || 0,
        alignmentAxis: h.alignmentAxis,
      };
  return (
    l && typeof S == 'number' && (x = l === 'end' ? S * -1 : S),
    a ? { x: x * d, y: v * u } : { x: v * u, y: x * d }
  );
}
const XS = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: 'offset',
        options: e,
        async fn(t) {
          var n, r;
          const { x: o, y: i, placement: s, middlewareData: l } = t,
            a = await YS(t, e);
          return s === ((n = l.offset) == null ? void 0 : n.placement) &&
            (r = l.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: o + a.x, y: i + a.y, data: { ...a, placement: s } };
        },
      }
    );
  },
  qS = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'shift',
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: o } = t,
            {
              mainAxis: i = !0,
              crossAxis: s = !1,
              limiter: l = {
                fn: (w) => {
                  let { x: m, y: f } = w;
                  return { x: m, y: f };
                },
              },
              ...a
            } = Yt(e, t),
            u = { x: n, y: r },
            d = await ei(t, a),
            h = Rn(Xt(o)),
            v = vc(h);
          let x = u[v],
            S = u[h];
          if (i) {
            const w = v === 'y' ? 'top' : 'left',
              m = v === 'y' ? 'bottom' : 'right',
              f = x + d[w],
              g = x - d[m];
            x = eu(f, x, g);
          }
          if (s) {
            const w = h === 'y' ? 'top' : 'left',
              m = h === 'y' ? 'bottom' : 'right',
              f = S + d[w],
              g = S - d[m];
            S = eu(f, S, g);
          }
          const p = l.fn({ ...t, [v]: x, [h]: S });
          return {
            ...p,
            data: { x: p.x - n, y: p.y - r, enabled: { [v]: i, [h]: s } },
          };
        },
      }
    );
  },
  ZS = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: r, placement: o, rects: i, middlewareData: s } = t,
            { offset: l = 0, mainAxis: a = !0, crossAxis: u = !0 } = Yt(e, t),
            d = { x: n, y: r },
            h = Rn(o),
            v = vc(h);
          let x = d[v],
            S = d[h];
          const p = Yt(l, t),
            w =
              typeof p == 'number'
                ? { mainAxis: p, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...p };
          if (a) {
            const g = v === 'y' ? 'height' : 'width',
              C = i.reference[v] - i.floating[g] + w.mainAxis,
              E = i.reference[v] + i.reference[g] - w.mainAxis;
            x < C ? (x = C) : x > E && (x = E);
          }
          if (u) {
            var m, f;
            const g = v === 'y' ? 'width' : 'height',
              C = ['top', 'left'].includes(Xt(o)),
              E =
                i.reference[h] -
                i.floating[g] +
                ((C && ((m = s.offset) == null ? void 0 : m[h])) || 0) +
                (C ? 0 : w.crossAxis),
              T =
                i.reference[h] +
                i.reference[g] +
                (C ? 0 : ((f = s.offset) == null ? void 0 : f[h]) || 0) -
                (C ? w.crossAxis : 0);
            S < E ? (S = E) : S > T && (S = T);
          }
          return { [v]: x, [h]: S };
        },
      }
    );
  },
  JS = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'size',
        options: e,
        async fn(t) {
          var n, r;
          const { placement: o, rects: i, platform: s, elements: l } = t,
            { apply: a = () => {}, ...u } = Yt(e, t),
            d = await ei(t, u),
            h = Xt(o),
            v = no(o),
            x = Rn(o) === 'y',
            { width: S, height: p } = i.floating;
          let w, m;
          h === 'top' || h === 'bottom'
            ? ((w = h),
              (m =
                v ===
                ((await (s.isRTL == null ? void 0 : s.isRTL(l.floating)))
                  ? 'start'
                  : 'end')
                  ? 'left'
                  : 'right'))
            : ((m = h), (w = v === 'end' ? 'top' : 'bottom'));
          const f = p - d.top - d.bottom,
            g = S - d.left - d.right,
            C = Nn(p - d[w], f),
            E = Nn(S - d[m], g),
            T = !t.middlewareData.shift;
          let k = C,
            P = E;
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (P = g),
            (r = t.middlewareData.shift) != null && r.enabled.y && (k = f),
            T && !v)
          ) {
            const j = Ye(d.left, 0),
              z = Ye(d.right, 0),
              D = Ye(d.top, 0),
              U = Ye(d.bottom, 0);
            x
              ? (P = S - 2 * (j !== 0 || z !== 0 ? j + z : Ye(d.left, d.right)))
              : (k =
                  p - 2 * (D !== 0 || U !== 0 ? D + U : Ye(d.top, d.bottom)));
          }
          await a({ ...t, availableWidth: P, availableHeight: k });
          const A = await s.getDimensions(l.floating);
          return S !== A.width || p !== A.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function ol() {
  return typeof window < 'u';
}
function ro(e) {
  return cv(e) ? (e.nodeName || '').toLowerCase() : '#document';
}
function Ze(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function Lt(e) {
  var t;
  return (t = (cv(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function cv(e) {
  return ol() ? e instanceof Node || e instanceof Ze(e).Node : !1;
}
function xt(e) {
  return ol() ? e instanceof Element || e instanceof Ze(e).Element : !1;
}
function It(e) {
  return ol() ? e instanceof HTMLElement || e instanceof Ze(e).HTMLElement : !1;
}
function vf(e) {
  return !ol() || typeof ShadowRoot > 'u'
    ? !1
    : e instanceof ShadowRoot || e instanceof Ze(e).ShadowRoot;
}
function di(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: o } = St(e);
  return (
    /auto|scroll|overlay|hidden|clip/.test(t + r + n) &&
    !['inline', 'contents'].includes(o)
  );
}
function eC(e) {
  return ['table', 'td', 'th'].includes(ro(e));
}
function il(e) {
  return [':popover-open', ':modal'].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function wc(e) {
  const t = xc(),
    n = xt(e) ? St(e) : e;
  return (
    ['transform', 'translate', 'scale', 'rotate', 'perspective'].some((r) =>
      n[r] ? n[r] !== 'none' : !1
    ) ||
    (n.containerType ? n.containerType !== 'normal' : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== 'none' : !1)) ||
    (!t && (n.filter ? n.filter !== 'none' : !1)) ||
    ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'].some(
      (r) => (n.willChange || '').includes(r)
    ) ||
    ['paint', 'layout', 'strict', 'content'].some((r) =>
      (n.contain || '').includes(r)
    )
  );
}
function tC(e) {
  let t = bn(e);
  for (; It(t) && !Yr(t); ) {
    if (wc(t)) return t;
    if (il(t)) return null;
    t = bn(t);
  }
  return null;
}
function xc() {
  return typeof CSS > 'u' || !CSS.supports
    ? !1
    : CSS.supports('-webkit-backdrop-filter', 'none');
}
function Yr(e) {
  return ['html', 'body', '#document'].includes(ro(e));
}
function St(e) {
  return Ze(e).getComputedStyle(e);
}
function sl(e) {
  return xt(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function bn(e) {
  if (ro(e) === 'html') return e;
  const t = e.assignedSlot || e.parentNode || (vf(e) && e.host) || Lt(e);
  return vf(t) ? t.host : t;
}
function dv(e) {
  const t = bn(e);
  return Yr(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : It(t) && di(t)
      ? t
      : dv(t);
}
function ti(e, t, n) {
  var r;
  (t === void 0 && (t = []), n === void 0 && (n = !0));
  const o = dv(e),
    i = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
    s = Ze(o);
  if (i) {
    const l = nu(s);
    return t.concat(
      s,
      s.visualViewport || [],
      di(o) ? o : [],
      l && n ? ti(l) : []
    );
  }
  return t.concat(o, ti(o, [], n));
}
function nu(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function fv(e) {
  const t = St(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const o = It(e),
    i = o ? e.offsetWidth : n,
    s = o ? e.offsetHeight : r,
    l = bs(n) !== i || bs(r) !== s;
  return (l && ((n = i), (r = s)), { width: n, height: r, $: l });
}
function Sc(e) {
  return xt(e) ? e : e.contextElement;
}
function br(e) {
  const t = Sc(e);
  if (!It(t)) return Dt(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: o, $: i } = fv(t);
  let s = (i ? bs(n.width) : n.width) / r,
    l = (i ? bs(n.height) : n.height) / o;
  return (
    (!s || !Number.isFinite(s)) && (s = 1),
    (!l || !Number.isFinite(l)) && (l = 1),
    { x: s, y: l }
  );
}
const nC = Dt(0);
function pv(e) {
  const t = Ze(e);
  return !xc() || !t.visualViewport
    ? nC
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function rC(e, t, n) {
  return (t === void 0 && (t = !1), !n || (t && n !== Ze(e)) ? !1 : t);
}
function Zn(e, t, n, r) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  const o = e.getBoundingClientRect(),
    i = Sc(e);
  let s = Dt(1);
  t && (r ? xt(r) && (s = br(r)) : (s = br(e)));
  const l = rC(i, n, r) ? pv(i) : Dt(0);
  let a = (o.left + l.x) / s.x,
    u = (o.top + l.y) / s.y,
    d = o.width / s.x,
    h = o.height / s.y;
  if (i) {
    const v = Ze(i),
      x = r && xt(r) ? Ze(r) : r;
    let S = v,
      p = nu(S);
    for (; p && r && x !== S; ) {
      const w = br(p),
        m = p.getBoundingClientRect(),
        f = St(p),
        g = m.left + (p.clientLeft + parseFloat(f.paddingLeft)) * w.x,
        C = m.top + (p.clientTop + parseFloat(f.paddingTop)) * w.y;
      ((a *= w.x),
        (u *= w.y),
        (d *= w.x),
        (h *= w.y),
        (a += g),
        (u += C),
        (S = Ze(p)),
        (p = nu(S)));
    }
  }
  return Os({ width: d, height: h, x: a, y: u });
}
function Cc(e, t) {
  const n = sl(e).scrollLeft;
  return t ? t.left + n : Zn(Lt(e)).left + n;
}
function hv(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(),
    o = r.left + t.scrollLeft - (n ? 0 : Cc(e, r)),
    i = r.top + t.scrollTop;
  return { x: o, y: i };
}
function oC(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: o } = e;
  const i = o === 'fixed',
    s = Lt(r),
    l = t ? il(t.floating) : !1;
  if (r === s || (l && i)) return n;
  let a = { scrollLeft: 0, scrollTop: 0 },
    u = Dt(1);
  const d = Dt(0),
    h = It(r);
  if (
    (h || (!h && !i)) &&
    ((ro(r) !== 'body' || di(s)) && (a = sl(r)), It(r))
  ) {
    const x = Zn(r);
    ((u = br(r)), (d.x = x.x + r.clientLeft), (d.y = x.y + r.clientTop));
  }
  const v = s && !h && !i ? hv(s, a, !0) : Dt(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - a.scrollLeft * u.x + d.x + v.x,
    y: n.y * u.y - a.scrollTop * u.y + d.y + v.y,
  };
}
function iC(e) {
  return Array.from(e.getClientRects());
}
function sC(e) {
  const t = Lt(e),
    n = sl(e),
    r = e.ownerDocument.body,
    o = Ye(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    i = Ye(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + Cc(e);
  const l = -n.scrollTop;
  return (
    St(r).direction === 'rtl' && (s += Ye(t.clientWidth, r.clientWidth) - o),
    { width: o, height: i, x: s, y: l }
  );
}
function lC(e, t) {
  const n = Ze(e),
    r = Lt(e),
    o = n.visualViewport;
  let i = r.clientWidth,
    s = r.clientHeight,
    l = 0,
    a = 0;
  if (o) {
    ((i = o.width), (s = o.height));
    const u = xc();
    (!u || (u && t === 'fixed')) && ((l = o.offsetLeft), (a = o.offsetTop));
  }
  return { width: i, height: s, x: l, y: a };
}
function aC(e, t) {
  const n = Zn(e, !0, t === 'fixed'),
    r = n.top + e.clientTop,
    o = n.left + e.clientLeft,
    i = It(e) ? br(e) : Dt(1),
    s = e.clientWidth * i.x,
    l = e.clientHeight * i.y,
    a = o * i.x,
    u = r * i.y;
  return { width: s, height: l, x: a, y: u };
}
function gf(e, t, n) {
  let r;
  if (t === 'viewport') r = lC(e, n);
  else if (t === 'document') r = sC(Lt(e));
  else if (xt(t)) r = aC(t, n);
  else {
    const o = pv(e);
    r = { x: t.x - o.x, y: t.y - o.y, width: t.width, height: t.height };
  }
  return Os(r);
}
function mv(e, t) {
  const n = bn(e);
  return n === t || !xt(n) || Yr(n)
    ? !1
    : St(n).position === 'fixed' || mv(n, t);
}
function uC(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = ti(e, [], !1).filter((l) => xt(l) && ro(l) !== 'body'),
    o = null;
  const i = St(e).position === 'fixed';
  let s = i ? bn(e) : e;
  for (; xt(s) && !Yr(s); ) {
    const l = St(s),
      a = wc(s);
    (!a && l.position === 'fixed' && (o = null),
      (
        i
          ? !a && !o
          : (!a &&
              l.position === 'static' &&
              !!o &&
              ['absolute', 'fixed'].includes(o.position)) ||
            (di(s) && !a && mv(e, s))
      )
        ? (r = r.filter((d) => d !== s))
        : (o = l),
      (s = bn(s)));
  }
  return (t.set(e, r), r);
}
function cC(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: o } = e;
  const s = [
      ...(n === 'clippingAncestors'
        ? il(t)
          ? []
          : uC(t, this._c)
        : [].concat(n)),
      r,
    ],
    l = s[0],
    a = s.reduce(
      (u, d) => {
        const h = gf(t, d, o);
        return (
          (u.top = Ye(h.top, u.top)),
          (u.right = Nn(h.right, u.right)),
          (u.bottom = Nn(h.bottom, u.bottom)),
          (u.left = Ye(h.left, u.left)),
          u
        );
      },
      gf(t, l, o)
    );
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top,
  };
}
function dC(e) {
  const { width: t, height: n } = fv(e);
  return { width: t, height: n };
}
function fC(e, t, n) {
  const r = It(t),
    o = Lt(t),
    i = n === 'fixed',
    s = Zn(e, !0, i, t);
  let l = { scrollLeft: 0, scrollTop: 0 };
  const a = Dt(0);
  if (r || (!r && !i))
    if (((ro(t) !== 'body' || di(o)) && (l = sl(t)), r)) {
      const v = Zn(t, !0, i, t);
      ((a.x = v.x + t.clientLeft), (a.y = v.y + t.clientTop));
    } else o && (a.x = Cc(o));
  const u = o && !r && !i ? hv(o, l) : Dt(0),
    d = s.left + l.scrollLeft - a.x - u.x,
    h = s.top + l.scrollTop - a.y - u.y;
  return { x: d, y: h, width: s.width, height: s.height };
}
function Ql(e) {
  return St(e).position === 'static';
}
function yf(e, t) {
  if (!It(e) || St(e).position === 'fixed') return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (Lt(e) === n && (n = n.ownerDocument.body), n);
}
function vv(e, t) {
  const n = Ze(e);
  if (il(e)) return n;
  if (!It(e)) {
    let o = bn(e);
    for (; o && !Yr(o); ) {
      if (xt(o) && !Ql(o)) return o;
      o = bn(o);
    }
    return n;
  }
  let r = yf(e, t);
  for (; r && eC(r) && Ql(r); ) r = yf(r, t);
  return r && Yr(r) && Ql(r) && !wc(r) ? n : r || tC(e) || n;
}
const pC = async function (e) {
  const t = this.getOffsetParent || vv,
    n = this.getDimensions,
    r = await n(e.floating);
  return {
    reference: fC(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function hC(e) {
  return St(e).direction === 'rtl';
}
const mC = {
  convertOffsetParentRelativeRectToViewportRelativeRect: oC,
  getDocumentElement: Lt,
  getClippingRect: cC,
  getOffsetParent: vv,
  getElementRects: pC,
  getClientRects: iC,
  getDimensions: dC,
  getScale: br,
  isElement: xt,
  isRTL: hC,
};
function gv(e, t) {
  return (
    e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
  );
}
function vC(e, t) {
  let n = null,
    r;
  const o = Lt(e);
  function i() {
    var l;
    (clearTimeout(r), (l = n) == null || l.disconnect(), (n = null));
  }
  function s(l, a) {
    (l === void 0 && (l = !1), a === void 0 && (a = 1), i());
    const u = e.getBoundingClientRect(),
      { left: d, top: h, width: v, height: x } = u;
    if ((l || t(), !v || !x)) return;
    const S = Di(h),
      p = Di(o.clientWidth - (d + v)),
      w = Di(o.clientHeight - (h + x)),
      m = Di(d),
      g = {
        rootMargin: -S + 'px ' + -p + 'px ' + -w + 'px ' + -m + 'px',
        threshold: Ye(0, Nn(1, a)) || 1,
      };
    let C = !0;
    function E(T) {
      const k = T[0].intersectionRatio;
      if (k !== a) {
        if (!C) return s();
        k
          ? s(!1, k)
          : (r = setTimeout(() => {
              s(!1, 1e-7);
            }, 1e3));
      }
      (k === 1 && !gv(u, e.getBoundingClientRect()) && s(), (C = !1));
    }
    try {
      n = new IntersectionObserver(E, { ...g, root: o.ownerDocument });
    } catch {
      n = new IntersectionObserver(E, g);
    }
    n.observe(e);
  }
  return (s(!0), i);
}
function gC(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: o = !0,
      ancestorResize: i = !0,
      elementResize: s = typeof ResizeObserver == 'function',
      layoutShift: l = typeof IntersectionObserver == 'function',
      animationFrame: a = !1,
    } = r,
    u = Sc(e),
    d = o || i ? [...(u ? ti(u) : []), ...ti(t)] : [];
  d.forEach((m) => {
    (o && m.addEventListener('scroll', n, { passive: !0 }),
      i && m.addEventListener('resize', n));
  });
  const h = u && l ? vC(u, n) : null;
  let v = -1,
    x = null;
  s &&
    ((x = new ResizeObserver((m) => {
      let [f] = m;
      (f &&
        f.target === u &&
        x &&
        (x.unobserve(t),
        cancelAnimationFrame(v),
        (v = requestAnimationFrame(() => {
          var g;
          (g = x) == null || g.observe(t);
        }))),
        n());
    })),
    u && !a && x.observe(u),
    x.observe(t));
  let S,
    p = a ? Zn(e) : null;
  a && w();
  function w() {
    const m = Zn(e);
    (p && !gv(p, m) && n(), (p = m), (S = requestAnimationFrame(w)));
  }
  return (
    n(),
    () => {
      var m;
      (d.forEach((f) => {
        (o && f.removeEventListener('scroll', n),
          i && f.removeEventListener('resize', n));
      }),
        h == null || h(),
        (m = x) == null || m.disconnect(),
        (x = null),
        a && cancelAnimationFrame(S));
    }
  );
}
const yC = XS,
  wC = qS,
  xC = QS,
  SC = JS,
  CC = GS,
  wf = KS,
  EC = ZS,
  kC = (e, t, n) => {
    const r = new Map(),
      o = { platform: mC, ...n },
      i = { ...o.platform, _c: r };
    return HS(e, t, { ...o, platform: i });
  };
var es = typeof document < 'u' ? c.useLayoutEffect : c.useEffect;
function As(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == 'function' && e.toString() === t.toString()) return !0;
  let n, r, o;
  if (e && t && typeof e == 'object') {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!As(e[r], t[r])) return !1;
      return !0;
    }
    if (((o = Object.keys(e)), (n = o.length), n !== Object.keys(t).length))
      return !1;
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, o[r])) return !1;
    for (r = n; r-- !== 0; ) {
      const i = o[r];
      if (!(i === '_owner' && e.$$typeof) && !As(e[i], t[i])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function yv(e) {
  return typeof window > 'u'
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function xf(e, t) {
  const n = yv(e);
  return Math.round(t * n) / n;
}
function Gl(e) {
  const t = c.useRef(e);
  return (
    es(() => {
      t.current = e;
    }),
    t
  );
}
function PC(e) {
  e === void 0 && (e = {});
  const {
      placement: t = 'bottom',
      strategy: n = 'absolute',
      middleware: r = [],
      platform: o,
      elements: { reference: i, floating: s } = {},
      transform: l = !0,
      whileElementsMounted: a,
      open: u,
    } = e,
    [d, h] = c.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [v, x] = c.useState(r);
  As(v, r) || x(r);
  const [S, p] = c.useState(null),
    [w, m] = c.useState(null),
    f = c.useCallback((N) => {
      N !== T.current && ((T.current = N), p(N));
    }, []),
    g = c.useCallback((N) => {
      N !== k.current && ((k.current = N), m(N));
    }, []),
    C = i || S,
    E = s || w,
    T = c.useRef(null),
    k = c.useRef(null),
    P = c.useRef(d),
    A = a != null,
    j = Gl(a),
    z = Gl(o),
    D = Gl(u),
    U = c.useCallback(() => {
      if (!T.current || !k.current) return;
      const N = { placement: t, strategy: n, middleware: v };
      (z.current && (N.platform = z.current),
        kC(T.current, k.current, N).then((_) => {
          const I = { ..._, isPositioned: D.current !== !1 };
          O.current &&
            !As(P.current, I) &&
            ((P.current = I),
            rr.flushSync(() => {
              h(I);
            }));
        }));
    }, [v, t, n, z, D]);
  es(() => {
    u === !1 &&
      P.current.isPositioned &&
      ((P.current.isPositioned = !1), h((N) => ({ ...N, isPositioned: !1 })));
  }, [u]);
  const O = c.useRef(!1);
  (es(
    () => (
      (O.current = !0),
      () => {
        O.current = !1;
      }
    ),
    []
  ),
    es(() => {
      if ((C && (T.current = C), E && (k.current = E), C && E)) {
        if (j.current) return j.current(C, E, U);
        U();
      }
    }, [C, E, U, j, A]));
  const H = c.useMemo(
      () => ({ reference: T, floating: k, setReference: f, setFloating: g }),
      [f, g]
    ),
    L = c.useMemo(() => ({ reference: C, floating: E }), [C, E]),
    V = c.useMemo(() => {
      const N = { position: n, left: 0, top: 0 };
      if (!L.floating) return N;
      const _ = xf(L.floating, d.x),
        I = xf(L.floating, d.y);
      return l
        ? {
            ...N,
            transform: 'translate(' + _ + 'px, ' + I + 'px)',
            ...(yv(L.floating) >= 1.5 && { willChange: 'transform' }),
          }
        : { position: n, left: _, top: I };
    }, [n, l, L.floating, d.x, d.y]);
  return c.useMemo(
    () => ({ ...d, update: U, refs: H, elements: L, floatingStyles: V }),
    [d, U, H, L, V]
  );
}
const TC = (e) => {
    function t(n) {
      return {}.hasOwnProperty.call(n, 'current');
    }
    return {
      name: 'arrow',
      options: e,
      fn(n) {
        const { element: r, padding: o } = typeof e == 'function' ? e(n) : e;
        return r && t(r)
          ? r.current != null
            ? wf({ element: r.current, padding: o }).fn(n)
            : {}
          : r
            ? wf({ element: r, padding: o }).fn(n)
            : {};
      },
    };
  },
  NC = (e, t) => ({ ...yC(e), options: [e, t] }),
  RC = (e, t) => ({ ...wC(e), options: [e, t] }),
  bC = (e, t) => ({ ...EC(e), options: [e, t] }),
  _C = (e, t) => ({ ...xC(e), options: [e, t] }),
  OC = (e, t) => ({ ...SC(e), options: [e, t] }),
  AC = (e, t) => ({ ...CC(e), options: [e, t] }),
  jC = (e, t) => ({ ...TC(e), options: [e, t] });
var MC = 'Arrow',
  wv = c.forwardRef((e, t) => {
    const { children: n, width: r = 10, height: o = 5, ...i } = e;
    return y.jsx(G.svg, {
      ...i,
      ref: t,
      width: r,
      height: o,
      viewBox: '0 0 30 10',
      preserveAspectRatio: 'none',
      children: e.asChild ? n : y.jsx('polygon', { points: '0,0 30,0 15,10' }),
    });
  });
wv.displayName = MC;
var DC = wv;
function xv(e) {
  const [t, n] = c.useState(void 0);
  return (
    Ae(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        const r = new ResizeObserver((o) => {
          if (!Array.isArray(o) || !o.length) return;
          const i = o[0];
          let s, l;
          if ('borderBoxSize' in i) {
            const a = i.borderBoxSize,
              u = Array.isArray(a) ? a[0] : a;
            ((s = u.inlineSize), (l = u.blockSize));
          } else ((s = e.offsetWidth), (l = e.offsetHeight));
          n({ width: s, height: l });
        });
        return (r.observe(e, { box: 'border-box' }), () => r.unobserve(e));
      } else n(void 0);
    }, [e]),
    t
  );
}
var Ec = 'Popper',
  [Sv, ll] = or(Ec),
  [IC, Cv] = Sv(Ec),
  Ev = (e) => {
    const { __scopePopper: t, children: n } = e,
      [r, o] = c.useState(null);
    return y.jsx(IC, { scope: t, anchor: r, onAnchorChange: o, children: n });
  };
Ev.displayName = Ec;
var kv = 'PopperAnchor',
  Pv = c.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e,
      i = Cv(kv, n),
      s = c.useRef(null),
      l = oe(t, s);
    return (
      c.useEffect(() => {
        i.onAnchorChange((r == null ? void 0 : r.current) || s.current);
      }),
      r ? null : y.jsx(G.div, { ...o, ref: l })
    );
  });
Pv.displayName = kv;
var kc = 'PopperContent',
  [LC, FC] = Sv(kc),
  Tv = c.forwardRef((e, t) => {
    var F, ie, Pe, ne, ee, te;
    const {
        __scopePopper: n,
        side: r = 'bottom',
        sideOffset: o = 0,
        align: i = 'center',
        alignOffset: s = 0,
        arrowPadding: l = 0,
        avoidCollisions: a = !0,
        collisionBoundary: u = [],
        collisionPadding: d = 0,
        sticky: h = 'partial',
        hideWhenDetached: v = !1,
        updatePositionStrategy: x = 'optimized',
        onPlaced: S,
        ...p
      } = e,
      w = Cv(kc, n),
      [m, f] = c.useState(null),
      g = oe(t, (Ke) => f(Ke)),
      [C, E] = c.useState(null),
      T = xv(C),
      k = (T == null ? void 0 : T.width) ?? 0,
      P = (T == null ? void 0 : T.height) ?? 0,
      A = r + (i !== 'center' ? '-' + i : ''),
      j =
        typeof d == 'number'
          ? d
          : { top: 0, right: 0, bottom: 0, left: 0, ...d },
      z = Array.isArray(u) ? u : [u],
      D = z.length > 0,
      U = { padding: j, boundary: z.filter($C), altBoundary: D },
      {
        refs: O,
        floatingStyles: H,
        placement: L,
        isPositioned: V,
        middlewareData: N,
      } = PC({
        strategy: 'fixed',
        placement: A,
        whileElementsMounted: (...Ke) =>
          gC(...Ke, { animationFrame: x === 'always' }),
        elements: { reference: w.anchor },
        middleware: [
          NC({ mainAxis: o + P, alignmentAxis: s }),
          a &&
            RC({
              mainAxis: !0,
              crossAxis: !1,
              limiter: h === 'partial' ? bC() : void 0,
              ...U,
            }),
          a && _C({ ...U }),
          OC({
            ...U,
            apply: ({
              elements: Ke,
              rects: Pt,
              availableWidth: io,
              availableHeight: so,
            }) => {
              const { width: lo, height: vy } = Pt.reference,
                pi = Ke.floating.style;
              (pi.setProperty('--radix-popper-available-width', `${io}px`),
                pi.setProperty('--radix-popper-available-height', `${so}px`),
                pi.setProperty('--radix-popper-anchor-width', `${lo}px`),
                pi.setProperty('--radix-popper-anchor-height', `${vy}px`));
            },
          }),
          C && jC({ element: C, padding: l }),
          UC({ arrowWidth: k, arrowHeight: P }),
          v && AC({ strategy: 'referenceHidden', ...U }),
        ],
      }),
      [_, I] = bv(L),
      $ = et(S);
    Ae(() => {
      V && ($ == null || $());
    }, [V, $]);
    const J = (F = N.arrow) == null ? void 0 : F.x,
      je = (ie = N.arrow) == null ? void 0 : ie.y,
      ge = ((Pe = N.arrow) == null ? void 0 : Pe.centerOffset) !== 0,
      [kt, Me] = c.useState();
    return (
      Ae(() => {
        m && Me(window.getComputedStyle(m).zIndex);
      }, [m]),
      y.jsx('div', {
        ref: O.setFloating,
        'data-radix-popper-content-wrapper': '',
        style: {
          ...H,
          transform: V ? H.transform : 'translate(0, -200%)',
          minWidth: 'max-content',
          zIndex: kt,
          '--radix-popper-transform-origin': [
            (ne = N.transformOrigin) == null ? void 0 : ne.x,
            (ee = N.transformOrigin) == null ? void 0 : ee.y,
          ].join(' '),
          ...(((te = N.hide) == null ? void 0 : te.referenceHidden) && {
            visibility: 'hidden',
            pointerEvents: 'none',
          }),
        },
        dir: e.dir,
        children: y.jsx(LC, {
          scope: n,
          placedSide: _,
          onArrowChange: E,
          arrowX: J,
          arrowY: je,
          shouldHideArrow: ge,
          children: y.jsx(G.div, {
            'data-side': _,
            'data-align': I,
            ...p,
            ref: g,
            style: { ...p.style, animation: V ? void 0 : 'none' },
          }),
        }),
      })
    );
  });
Tv.displayName = kc;
var Nv = 'PopperArrow',
  zC = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' },
  Rv = c.forwardRef(function (t, n) {
    const { __scopePopper: r, ...o } = t,
      i = FC(Nv, r),
      s = zC[i.placedSide];
    return y.jsx('span', {
      ref: i.onArrowChange,
      style: {
        position: 'absolute',
        left: i.arrowX,
        top: i.arrowY,
        [s]: 0,
        transformOrigin: {
          top: '',
          right: '0 0',
          bottom: 'center 0',
          left: '100% 0',
        }[i.placedSide],
        transform: {
          top: 'translateY(100%)',
          right: 'translateY(50%) rotate(90deg) translateX(-50%)',
          bottom: 'rotate(180deg)',
          left: 'translateY(50%) rotate(-90deg) translateX(50%)',
        }[i.placedSide],
        visibility: i.shouldHideArrow ? 'hidden' : void 0,
      },
      children: y.jsx(DC, {
        ...o,
        ref: n,
        style: { ...o.style, display: 'block' },
      }),
    });
  });
Rv.displayName = Nv;
function $C(e) {
  return e !== null;
}
var UC = (e) => ({
  name: 'transformOrigin',
  options: e,
  fn(t) {
    var w, m, f;
    const { placement: n, rects: r, middlewareData: o } = t,
      s = ((w = o.arrow) == null ? void 0 : w.centerOffset) !== 0,
      l = s ? 0 : e.arrowWidth,
      a = s ? 0 : e.arrowHeight,
      [u, d] = bv(n),
      h = { start: '0%', center: '50%', end: '100%' }[d],
      v = (((m = o.arrow) == null ? void 0 : m.x) ?? 0) + l / 2,
      x = (((f = o.arrow) == null ? void 0 : f.y) ?? 0) + a / 2;
    let S = '',
      p = '';
    return (
      u === 'bottom'
        ? ((S = s ? h : `${v}px`), (p = `${-a}px`))
        : u === 'top'
          ? ((S = s ? h : `${v}px`), (p = `${r.floating.height + a}px`))
          : u === 'right'
            ? ((S = `${-a}px`), (p = s ? h : `${x}px`))
            : u === 'left' &&
              ((S = `${r.floating.width + a}px`), (p = s ? h : `${x}px`)),
      { data: { x: S, y: p } }
    );
  },
});
function bv(e) {
  const [t, n = 'center'] = e.split('-');
  return [t, n];
}
var VC = Ev,
  _v = Pv,
  Ov = Tv,
  Av = Rv,
  [al, wP] = or('Tooltip', [ll]),
  Pc = ll(),
  jv = 'TooltipProvider',
  BC = 700,
  Sf = 'tooltip.open',
  [WC, Mv] = al(jv),
  Dv = (e) => {
    const {
        __scopeTooltip: t,
        delayDuration: n = BC,
        skipDelayDuration: r = 300,
        disableHoverableContent: o = !1,
        children: i,
      } = e,
      s = c.useRef(!0),
      l = c.useRef(!1),
      a = c.useRef(0);
    return (
      c.useEffect(() => {
        const u = a.current;
        return () => window.clearTimeout(u);
      }, []),
      y.jsx(WC, {
        scope: t,
        isOpenDelayedRef: s,
        delayDuration: n,
        onOpen: c.useCallback(() => {
          (window.clearTimeout(a.current), (s.current = !1));
        }, []),
        onClose: c.useCallback(() => {
          (window.clearTimeout(a.current),
            (a.current = window.setTimeout(() => (s.current = !0), r)));
        }, [r]),
        isPointerInTransitRef: l,
        onPointerInTransitChange: c.useCallback((u) => {
          l.current = u;
        }, []),
        disableHoverableContent: o,
        children: i,
      })
    );
  };
Dv.displayName = jv;
var Iv = 'Tooltip',
  [xP, ul] = al(Iv),
  ru = 'TooltipTrigger',
  HC = c.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...r } = e,
      o = ul(ru, n),
      i = Mv(ru, n),
      s = Pc(n),
      l = c.useRef(null),
      a = oe(t, l, o.onTriggerChange),
      u = c.useRef(!1),
      d = c.useRef(!1),
      h = c.useCallback(() => (u.current = !1), []);
    return (
      c.useEffect(
        () => () => document.removeEventListener('pointerup', h),
        [h]
      ),
      y.jsx(_v, {
        asChild: !0,
        ...s,
        children: y.jsx(G.button, {
          'aria-describedby': o.open ? o.contentId : void 0,
          'data-state': o.stateAttribute,
          ...r,
          ref: a,
          onPointerMove: B(e.onPointerMove, (v) => {
            v.pointerType !== 'touch' &&
              !d.current &&
              !i.isPointerInTransitRef.current &&
              (o.onTriggerEnter(), (d.current = !0));
          }),
          onPointerLeave: B(e.onPointerLeave, () => {
            (o.onTriggerLeave(), (d.current = !1));
          }),
          onPointerDown: B(e.onPointerDown, () => {
            (o.open && o.onClose(),
              (u.current = !0),
              document.addEventListener('pointerup', h, { once: !0 }));
          }),
          onFocus: B(e.onFocus, () => {
            u.current || o.onOpen();
          }),
          onBlur: B(e.onBlur, o.onClose),
          onClick: B(e.onClick, o.onClose),
        }),
      })
    );
  });
HC.displayName = ru;
var KC = 'TooltipPortal',
  [SP, QC] = al(KC, { forceMount: void 0 }),
  Xr = 'TooltipContent',
  Lv = c.forwardRef((e, t) => {
    const n = QC(Xr, e.__scopeTooltip),
      { forceMount: r = n.forceMount, side: o = 'top', ...i } = e,
      s = ul(Xr, e.__scopeTooltip);
    return y.jsx(eo, {
      present: r || s.open,
      children: s.disableHoverableContent
        ? y.jsx(Fv, { side: o, ...i, ref: t })
        : y.jsx(GC, { side: o, ...i, ref: t }),
    });
  }),
  GC = c.forwardRef((e, t) => {
    const n = ul(Xr, e.__scopeTooltip),
      r = Mv(Xr, e.__scopeTooltip),
      o = c.useRef(null),
      i = oe(t, o),
      [s, l] = c.useState(null),
      { trigger: a, onClose: u } = n,
      d = o.current,
      { onPointerInTransitChange: h } = r,
      v = c.useCallback(() => {
        (l(null), h(!1));
      }, [h]),
      x = c.useCallback(
        (S, p) => {
          const w = S.currentTarget,
            m = { x: S.clientX, y: S.clientY },
            f = JC(m, w.getBoundingClientRect()),
            g = eE(m, f),
            C = tE(p.getBoundingClientRect()),
            E = rE([...g, ...C]);
          (l(E), h(!0));
        },
        [h]
      );
    return (
      c.useEffect(() => () => v(), [v]),
      c.useEffect(() => {
        if (a && d) {
          const S = (w) => x(w, d),
            p = (w) => x(w, a);
          return (
            a.addEventListener('pointerleave', S),
            d.addEventListener('pointerleave', p),
            () => {
              (a.removeEventListener('pointerleave', S),
                d.removeEventListener('pointerleave', p));
            }
          );
        }
      }, [a, d, x, v]),
      c.useEffect(() => {
        if (s) {
          const S = (p) => {
            const w = p.target,
              m = { x: p.clientX, y: p.clientY },
              f =
                (a == null ? void 0 : a.contains(w)) ||
                (d == null ? void 0 : d.contains(w)),
              g = !nE(m, s);
            f ? v() : g && (v(), u());
          };
          return (
            document.addEventListener('pointermove', S),
            () => document.removeEventListener('pointermove', S)
          );
        }
      }, [a, d, s, u, v]),
      y.jsx(Fv, { ...e, ref: i })
    );
  }),
  [YC, XC] = al(Iv, { isInside: !1 }),
  qC = r1('TooltipContent'),
  Fv = c.forwardRef((e, t) => {
    const {
        __scopeTooltip: n,
        children: r,
        'aria-label': o,
        onEscapeKeyDown: i,
        onPointerDownOutside: s,
        ...l
      } = e,
      a = ul(Xr, n),
      u = Pc(n),
      { onClose: d } = a;
    return (
      c.useEffect(
        () => (
          document.addEventListener(Sf, d),
          () => document.removeEventListener(Sf, d)
        ),
        [d]
      ),
      c.useEffect(() => {
        if (a.trigger) {
          const h = (v) => {
            const x = v.target;
            x != null && x.contains(a.trigger) && d();
          };
          return (
            window.addEventListener('scroll', h, { capture: !0 }),
            () => window.removeEventListener('scroll', h, { capture: !0 })
          );
        }
      }, [a.trigger, d]),
      y.jsx(ui, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: i,
        onPointerDownOutside: s,
        onFocusOutside: (h) => h.preventDefault(),
        onDismiss: d,
        children: y.jsxs(Ov, {
          'data-state': a.stateAttribute,
          ...u,
          ...l,
          ref: t,
          style: {
            ...l.style,
            '--radix-tooltip-content-transform-origin':
              'var(--radix-popper-transform-origin)',
            '--radix-tooltip-content-available-width':
              'var(--radix-popper-available-width)',
            '--radix-tooltip-content-available-height':
              'var(--radix-popper-available-height)',
            '--radix-tooltip-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-tooltip-trigger-height':
              'var(--radix-popper-anchor-height)',
          },
          children: [
            y.jsx(qC, { children: r }),
            y.jsx(YC, {
              scope: n,
              isInside: !0,
              children: y.jsx(E1, {
                id: a.contentId,
                role: 'tooltip',
                children: o || r,
              }),
            }),
          ],
        }),
      })
    );
  });
Lv.displayName = Xr;
var zv = 'TooltipArrow',
  ZC = c.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...r } = e,
      o = Pc(n);
    return XC(zv, n).isInside ? null : y.jsx(Av, { ...o, ...r, ref: t });
  });
ZC.displayName = zv;
function JC(e, t) {
  const n = Math.abs(t.top - e.y),
    r = Math.abs(t.bottom - e.y),
    o = Math.abs(t.right - e.x),
    i = Math.abs(t.left - e.x);
  switch (Math.min(n, r, o, i)) {
    case i:
      return 'left';
    case o:
      return 'right';
    case n:
      return 'top';
    case r:
      return 'bottom';
    default:
      throw new Error('unreachable');
  }
}
function eE(e, t, n = 5) {
  const r = [];
  switch (t) {
    case 'top':
      r.push({ x: e.x - n, y: e.y + n }, { x: e.x + n, y: e.y + n });
      break;
    case 'bottom':
      r.push({ x: e.x - n, y: e.y - n }, { x: e.x + n, y: e.y - n });
      break;
    case 'left':
      r.push({ x: e.x + n, y: e.y - n }, { x: e.x + n, y: e.y + n });
      break;
    case 'right':
      r.push({ x: e.x - n, y: e.y - n }, { x: e.x - n, y: e.y + n });
      break;
  }
  return r;
}
function tE(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r },
  ];
}
function nE(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let i = 0, s = t.length - 1; i < t.length; s = i++) {
    const l = t[i].x,
      a = t[i].y,
      u = t[s].x,
      d = t[s].y;
    a > r != d > r && n < ((u - l) * (r - a)) / (d - a) + l && (o = !o);
  }
  return o;
}
function rE(e) {
  const t = e.slice();
  return (
    t.sort((n, r) =>
      n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0
    ),
    oE(t)
  );
}
function oE(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (; t.length >= 2; ) {
      const i = t[t.length - 1],
        s = t[t.length - 2];
      if ((i.x - s.x) * (o.y - s.y) >= (i.y - s.y) * (o.x - s.x)) t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    for (; n.length >= 2; ) {
      const i = n[n.length - 1],
        s = n[n.length - 2];
      if ((i.x - s.x) * (o.y - s.y) >= (i.y - s.y) * (o.x - s.x)) n.pop();
      else break;
    }
    n.push(o);
  }
  return (
    n.pop(),
    t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y
      ? t
      : t.concat(n)
  );
}
var iE = Dv,
  $v = Lv;
const sE = iE,
  lE = c.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) =>
    y.jsx($v, {
      ref: r,
      sideOffset: t,
      className: q(
        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]',
        e
      ),
      ...n,
    })
  );
lE.displayName = $v.displayName;
const Uv = c.createContext(void 0);
function aE({ children: e, defaultTheme: t = 'dark' }) {
  const [n, r] = c.useState(() => localStorage.getItem('theme') || t);
  return (
    c.useEffect(() => {
      const o = document.documentElement;
      (o.classList.remove('light', 'dark'),
        o.classList.add(n),
        localStorage.setItem('theme', n));
    }, [n]),
    y.jsx(Uv.Provider, { value: { theme: n, setTheme: r }, children: e })
  );
}
const uE = () => {
    const e = c.useContext(Uv);
    if (e === void 0)
      throw new Error('useTheme must be used within a ThemeProvider');
    return e;
  },
  cE = hc(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2',
    {
      variants: {
        variant: {
          default:
            'bg-primary text-primary-foreground border border-primary-border',
          destructive:
            'bg-destructive text-destructive-foreground border border-destructive-border',
          outline:
            ' border [border-color:var(--button-outline)]  shadow-xs active:shadow-none ',
          secondary:
            'border bg-secondary text-secondary-foreground border border-secondary-border ',
          ghost: 'border border-transparent',
        },
        size: {
          default: 'min-h-9 px-4 py-2',
          sm: 'min-h-8 rounded-md px-3 text-xs',
          lg: 'min-h-10 rounded-md px-8',
          icon: 'h-9 w-9',
        },
      },
      defaultVariants: { variant: 'default', size: 'default' },
    }
  ),
  Kn = c.forwardRef(
    ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => {
      const s = r ? t1 : 'button';
      return y.jsx(s, {
        className: q(cE({ variant: t, size: n, className: e })),
        ref: i,
        ...o,
      });
    }
  );
Kn.displayName = 'Button';
function dE({
  documentTitle: e,
  onTitleChange: t,
  onSettingsClick: n,
  onExportClick: r,
}) {
  const { theme: o, setTheme: i } = uE(),
    s = () => {
      i(o === 'dark' ? 'light' : 'dark');
    };
  return y.jsx('div', {
    className: 'sticky top-0 z-50 w-full bg-background/60 backdrop-blur-md',
    children: y.jsxs('div', {
      className:
        'flex items-center justify-between h-12 px-6 max-w-4xl mx-auto',
      children: [
        y.jsx('input', {
          type: 'text',
          value: e,
          onChange: (l) => t(l.target.value),
          className:
            'bg-transparent border-0 focus:outline-none focus:ring-0 text-sm text-muted-foreground placeholder:text-muted-foreground/50 w-48',
          placeholder: 'Untitled',
          'data-testid': 'input-document-title',
        }),
        y.jsxs('div', {
          className:
            'flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity',
          children: [
            y.jsx(Kn, {
              size: 'icon',
              variant: 'ghost',
              onClick: s,
              className: 'h-8 w-8',
              'data-testid': 'button-theme-toggle',
              children:
                o === 'dark'
                  ? y.jsx(Z1, { className: 'w-3.5 h-3.5' })
                  : y.jsx(X1, { className: 'w-3.5 h-3.5' }),
            }),
            y.jsx(Kn, {
              size: 'icon',
              variant: 'ghost',
              onClick: r,
              className: 'h-8 w-8',
              'data-testid': 'button-export',
              children: y.jsx(G1, { className: 'w-3.5 h-3.5' }),
            }),
            y.jsx(Kn, {
              size: 'icon',
              variant: 'ghost',
              onClick: n,
              className: 'h-8 w-8',
              'data-testid': 'button-settings',
              children: y.jsx(q1, { className: 'w-3.5 h-3.5' }),
            }),
          ],
        }),
      ],
    }),
  });
}
function fE({
  onTextChange: e,
  onSuggestionAccept: t,
  completionMode: n = 'sentence',
  writingStyle: r = 'casual',
}) {
  const [o, i] = c.useState(''),
    [s, l] = c.useState(''),
    [a, u] = c.useState(!1),
    d = c.useRef(null),
    h = c.useRef();
  c.useEffect(() => {
    d.current && d.current.focus();
  }, []);
  const v = async (p) => {
      if (p.length < 10) {
        l('');
        return;
      }
      u(!0);
      try {
        const m = await (
          await fetch('/api/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: p, mode: n, style: r }),
          })
        ).json();
        l(m.suggestion || '');
      } catch (w) {
        (console.error('Error generating suggestion:', w), l(''));
      } finally {
        u(!1);
      }
    },
    x = (p) => {
      const w = p.target.value;
      (i(w),
        e == null || e(w),
        h.current && clearTimeout(h.current),
        l(''),
        (h.current = setTimeout(() => {
          v(w);
        }, 500)));
    },
    S = (p) => {
      if (p.key === 'Tab' && s) {
        p.preventDefault();
        const w = o + s;
        (i(w), l(''), e == null || e(w), t == null || t());
      } else p.key === 'Escape' && s && (p.preventDefault(), l(''));
    };
  return y.jsxs('div', {
    className: 'relative w-full h-full flex flex-col',
    children: [
      y.jsxs('div', {
        className: 'flex-1 relative',
        children: [
          y.jsx('textarea', {
            ref: d,
            value: o,
            onChange: x,
            onKeyDown: S,
            className:
              'w-full h-full bg-transparent text-foreground text-base leading-relaxed resize-none focus:outline-none focus:ring-0 border-0 p-0',
            placeholder: 'Start typing and let AI assist you...',
            'data-testid': 'input-editor',
          }),
          s &&
            y.jsxs('div', {
              className:
                'absolute top-0 left-0 pointer-events-none whitespace-pre-wrap text-base leading-relaxed p-0',
              children: [
                y.jsx('span', { className: 'invisible', children: o }),
                y.jsx('span', {
                  className: 'text-ai-suggestion italic opacity-60',
                  'data-testid': 'text-suggestion',
                  children: s,
                }),
              ],
            }),
        ],
      }),
      s &&
        y.jsx('div', {
          className:
            'absolute bottom-0 left-0 right-0 flex items-center justify-center py-2 opacity-50 hover:opacity-100 transition-opacity',
          'data-testid': 'panel-suggestion-controls',
          children: y.jsxs('div', {
            className:
              'flex items-center gap-2 px-3 py-1 bg-ai-suggestion-dim/30 rounded-full backdrop-blur-sm',
            children: [
              y.jsx(Zm, { className: 'w-2.5 h-2.5 text-ai-suggestion' }),
              y.jsxs('span', {
                className: 'text-xs text-muted-foreground',
                children: [
                  y.jsx('kbd', {
                    className: 'px-1 py-0.5 bg-muted/50 rounded text-xs',
                    children: 'Tab',
                  }),
                  ' accept',
                ],
              }),
            ],
          }),
        }),
      a &&
        !s &&
        y.jsx('div', {
          className: 'absolute bottom-2 left-0 right-0 flex justify-center',
          'data-testid': 'status-generating',
          children: y.jsxs('div', {
            className:
              'flex items-center gap-2 px-3 py-1 bg-background/50 rounded-full backdrop-blur-sm opacity-40',
            children: [
              y.jsx('div', {
                className:
                  'w-1 h-1 bg-ai-suggestion rounded-full animate-pulse',
              }),
              y.jsx('span', {
                className: 'text-xs text-muted-foreground',
                children: 'thinking',
              }),
            ],
          }),
        }),
    ],
  });
}
function pE({
  wordCount: e,
  charCount: t,
  suggestionsAccepted: n,
  aiStatus: r,
  onKeyboardShortcutsClick: o,
}) {
  return y.jsx('div', {
    className:
      'fixed bottom-0 left-0 right-0 z-40 bg-background/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-200',
    children: y.jsx('div', {
      className: 'flex items-center justify-center h-8 max-w-4xl mx-auto px-6',
      children: y.jsxs('div', {
        className: 'flex items-center gap-6 text-xs text-muted-foreground/60',
        children: [
          y.jsx('div', {
            className: 'flex items-center gap-1.5',
            'data-testid': 'text-word-count',
            children: y.jsxs('span', { children: [e, ' words'] }),
          }),
          y.jsxs('div', {
            className: 'flex items-center gap-1.5',
            'data-testid': 'text-suggestions-count',
            children: [
              y.jsx(Zm, { className: 'w-3 h-3 text-ai-suggestion/60' }),
              y.jsx('span', { children: n }),
            ],
          }),
          y.jsxs(Kn, {
            size: 'sm',
            variant: 'ghost',
            onClick: o,
            className: 'h-6 text-xs opacity-60 hover:opacity-100',
            'data-testid': 'button-shortcuts',
            children: [
              y.jsx(Y1, { className: 'w-3 h-3 mr-1' }),
              y.jsx('span', {
                className: 'hidden sm:inline',
                children: 'Shortcuts',
              }),
            ],
          }),
        ],
      }),
    }),
  });
}
var hE = 'Label',
  Vv = c.forwardRef((e, t) =>
    y.jsx(G.label, {
      ...e,
      ref: t,
      onMouseDown: (n) => {
        var o;
        n.target.closest('button, input, select, textarea') ||
          ((o = e.onMouseDown) == null || o.call(e, n),
          !n.defaultPrevented && n.detail > 1 && n.preventDefault());
      },
    })
  );
Vv.displayName = hE;
var Bv = Vv;
const mE = hc(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
  ),
  ts = c.forwardRef(({ className: e, ...t }, n) =>
    y.jsx(Bv, { ref: n, className: q(mE(), e), ...t })
  );
ts.displayName = Bv.displayName;
function Wv(e) {
  const t = c.useRef({ value: e, previous: e });
  return c.useMemo(
    () => (
      t.current.value !== e &&
        ((t.current.previous = t.current.value), (t.current.value = e)),
      t.current.previous
    ),
    [e]
  );
}
var Tc = 'Switch',
  [vE, CP] = or(Tc),
  [gE, yE] = vE(Tc),
  Hv = c.forwardRef((e, t) => {
    const {
        __scopeSwitch: n,
        name: r,
        checked: o,
        defaultChecked: i,
        required: s,
        disabled: l,
        value: a = 'on',
        onCheckedChange: u,
        form: d,
        ...h
      } = e,
      [v, x] = c.useState(null),
      S = oe(t, (g) => x(g)),
      p = c.useRef(!1),
      w = v ? d || !!v.closest('form') : !0,
      [m = !1, f] = Jo({ prop: o, defaultProp: i, onChange: u });
    return y.jsxs(gE, {
      scope: n,
      checked: m,
      disabled: l,
      children: [
        y.jsx(G.button, {
          type: 'button',
          role: 'switch',
          'aria-checked': m,
          'aria-required': s,
          'data-state': Gv(m),
          'data-disabled': l ? '' : void 0,
          disabled: l,
          value: a,
          ...h,
          ref: S,
          onClick: B(e.onClick, (g) => {
            (f((C) => !C),
              w &&
                ((p.current = g.isPropagationStopped()),
                p.current || g.stopPropagation()));
          }),
        }),
        w &&
          y.jsx(wE, {
            control: v,
            bubbles: !p.current,
            name: r,
            value: a,
            checked: m,
            required: s,
            disabled: l,
            form: d,
            style: { transform: 'translateX(-100%)' },
          }),
      ],
    });
  });
Hv.displayName = Tc;
var Kv = 'SwitchThumb',
  Qv = c.forwardRef((e, t) => {
    const { __scopeSwitch: n, ...r } = e,
      o = yE(Kv, n);
    return y.jsx(G.span, {
      'data-state': Gv(o.checked),
      'data-disabled': o.disabled ? '' : void 0,
      ...r,
      ref: t,
    });
  });
Qv.displayName = Kv;
var wE = (e) => {
  const { control: t, checked: n, bubbles: r = !0, ...o } = e,
    i = c.useRef(null),
    s = Wv(n),
    l = xv(t);
  return (
    c.useEffect(() => {
      const a = i.current,
        u = window.HTMLInputElement.prototype,
        h = Object.getOwnPropertyDescriptor(u, 'checked').set;
      if (s !== n && h) {
        const v = new Event('click', { bubbles: r });
        (h.call(a, n), a.dispatchEvent(v));
      }
    }, [s, n, r]),
    y.jsx('input', {
      type: 'checkbox',
      'aria-hidden': !0,
      defaultChecked: n,
      ...o,
      tabIndex: -1,
      ref: i,
      style: {
        ...e.style,
        ...l,
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        margin: 0,
      },
    })
  );
};
function Gv(e) {
  return e ? 'checked' : 'unchecked';
}
var Yv = Hv,
  xE = Qv;
const Xv = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx(Yv, {
    className: q(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      e
    ),
    ...t,
    ref: n,
    children: y.jsx(xE, {
      className: q(
        'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
      ),
    }),
  })
);
Xv.displayName = Yv.displayName;
function Cf(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
var SE = c.createContext(void 0);
function CE(e) {
  const t = c.useContext(SE);
  return e || t || 'ltr';
}
var Yl = 0;
function qv() {
  c.useEffect(() => {
    const e = document.querySelectorAll('[data-radix-focus-guard]');
    return (
      document.body.insertAdjacentElement('afterbegin', e[0] ?? Ef()),
      document.body.insertAdjacentElement('beforeend', e[1] ?? Ef()),
      Yl++,
      () => {
        (Yl === 1 &&
          document
            .querySelectorAll('[data-radix-focus-guard]')
            .forEach((t) => t.remove()),
          Yl--);
      }
    );
  }, []);
}
function Ef() {
  const e = document.createElement('span');
  return (
    e.setAttribute('data-radix-focus-guard', ''),
    (e.tabIndex = 0),
    (e.style.outline = 'none'),
    (e.style.opacity = '0'),
    (e.style.position = 'fixed'),
    (e.style.pointerEvents = 'none'),
    e
  );
}
var Xl = 'focusScope.autoFocusOnMount',
  ql = 'focusScope.autoFocusOnUnmount',
  kf = { bubbles: !1, cancelable: !0 },
  EE = 'FocusScope',
  Nc = c.forwardRef((e, t) => {
    const {
        loop: n = !1,
        trapped: r = !1,
        onMountAutoFocus: o,
        onUnmountAutoFocus: i,
        ...s
      } = e,
      [l, a] = c.useState(null),
      u = et(o),
      d = et(i),
      h = c.useRef(null),
      v = oe(t, (p) => a(p)),
      x = c.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (c.useEffect(() => {
      if (r) {
        let p = function (g) {
            if (x.paused || !l) return;
            const C = g.target;
            l.contains(C) ? (h.current = C) : rn(h.current, { select: !0 });
          },
          w = function (g) {
            if (x.paused || !l) return;
            const C = g.relatedTarget;
            C !== null && (l.contains(C) || rn(h.current, { select: !0 }));
          },
          m = function (g) {
            if (document.activeElement === document.body)
              for (const E of g) E.removedNodes.length > 0 && rn(l);
          };
        (document.addEventListener('focusin', p),
          document.addEventListener('focusout', w));
        const f = new MutationObserver(m);
        return (
          l && f.observe(l, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener('focusin', p),
              document.removeEventListener('focusout', w),
              f.disconnect());
          }
        );
      }
    }, [r, l, x.paused]),
      c.useEffect(() => {
        if (l) {
          Tf.add(x);
          const p = document.activeElement;
          if (!l.contains(p)) {
            const m = new CustomEvent(Xl, kf);
            (l.addEventListener(Xl, u),
              l.dispatchEvent(m),
              m.defaultPrevented ||
                (kE(bE(Zv(l)), { select: !0 }),
                document.activeElement === p && rn(l)));
          }
          return () => {
            (l.removeEventListener(Xl, u),
              setTimeout(() => {
                const m = new CustomEvent(ql, kf);
                (l.addEventListener(ql, d),
                  l.dispatchEvent(m),
                  m.defaultPrevented || rn(p ?? document.body, { select: !0 }),
                  l.removeEventListener(ql, d),
                  Tf.remove(x));
              }, 0));
          };
        }
      }, [l, u, d, x]));
    const S = c.useCallback(
      (p) => {
        if ((!n && !r) || x.paused) return;
        const w = p.key === 'Tab' && !p.altKey && !p.ctrlKey && !p.metaKey,
          m = document.activeElement;
        if (w && m) {
          const f = p.currentTarget,
            [g, C] = PE(f);
          g && C
            ? !p.shiftKey && m === C
              ? (p.preventDefault(), n && rn(g, { select: !0 }))
              : p.shiftKey &&
                m === g &&
                (p.preventDefault(), n && rn(C, { select: !0 }))
            : m === f && p.preventDefault();
        }
      },
      [n, r, x.paused]
    );
    return y.jsx(G.div, { tabIndex: -1, ...s, ref: v, onKeyDown: S });
  });
Nc.displayName = EE;
function kE(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if ((rn(r, { select: t }), document.activeElement !== n)) return;
}
function PE(e) {
  const t = Zv(e),
    n = Pf(t, e),
    r = Pf(t.reverse(), e);
  return [n, r];
}
function Zv(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const o = r.tagName === 'INPUT' && r.type === 'hidden';
        return r.disabled || r.hidden || o
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Pf(e, t) {
  for (const n of e) if (!TE(n, { upTo: t })) return n;
}
function TE(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === 'hidden') return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === 'none') return !0;
    e = e.parentElement;
  }
  return !1;
}
function NE(e) {
  return e instanceof HTMLInputElement && 'select' in e;
}
function rn(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && NE(e) && t && e.select());
  }
}
var Tf = RE();
function RE() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      (t !== n && (n == null || n.pause()), (e = Nf(e, t)), e.unshift(t));
    },
    remove(t) {
      var n;
      ((e = Nf(e, t)), (n = e[0]) == null || n.resume());
    },
  };
}
function Nf(e, t) {
  const n = [...e],
    r = n.indexOf(t);
  return (r !== -1 && n.splice(r, 1), n);
}
function bE(e) {
  return e.filter((t) => t.tagName !== 'A');
}
var _E = function (e) {
    if (typeof document > 'u') return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  sr = new WeakMap(),
  Ii = new WeakMap(),
  Li = {},
  Zl = 0,
  Jv = function (e) {
    return e && (e.host || Jv(e.parentNode));
  },
  OE = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n;
        var r = Jv(n);
        return r && e.contains(r)
          ? r
          : (console.error(
              'aria-hidden',
              n,
              'in not contained inside',
              e,
              '. Doing nothing'
            ),
            null);
      })
      .filter(function (n) {
        return !!n;
      });
  },
  AE = function (e, t, n, r) {
    var o = OE(t, Array.isArray(e) ? e : [e]);
    Li[n] || (Li[n] = new WeakMap());
    var i = Li[n],
      s = [],
      l = new Set(),
      a = new Set(o),
      u = function (h) {
        !h || l.has(h) || (l.add(h), u(h.parentNode));
      };
    o.forEach(u);
    var d = function (h) {
      !h ||
        a.has(h) ||
        Array.prototype.forEach.call(h.children, function (v) {
          if (l.has(v)) d(v);
          else
            try {
              var x = v.getAttribute(r),
                S = x !== null && x !== 'false',
                p = (sr.get(v) || 0) + 1,
                w = (i.get(v) || 0) + 1;
              (sr.set(v, p),
                i.set(v, w),
                s.push(v),
                p === 1 && S && Ii.set(v, !0),
                w === 1 && v.setAttribute(n, 'true'),
                S || v.setAttribute(r, 'true'));
            } catch (m) {
              console.error('aria-hidden: cannot operate on ', v, m);
            }
        });
    };
    return (
      d(t),
      l.clear(),
      Zl++,
      function () {
        (s.forEach(function (h) {
          var v = sr.get(h) - 1,
            x = i.get(h) - 1;
          (sr.set(h, v),
            i.set(h, x),
            v || (Ii.has(h) || h.removeAttribute(r), Ii.delete(h)),
            x || h.removeAttribute(n));
        }),
          Zl--,
          Zl ||
            ((sr = new WeakMap()),
            (sr = new WeakMap()),
            (Ii = new WeakMap()),
            (Li = {})));
      }
    );
  },
  eg = function (e, t, n) {
    n === void 0 && (n = 'data-aria-hidden');
    var r = Array.from(Array.isArray(e) ? e : [e]),
      o = _E(e);
    return o
      ? (r.push.apply(r, Array.from(o.querySelectorAll('[aria-live]'))),
        AE(r, o, n, 'aria-hidden'))
      : function () {
          return null;
        };
  },
  At = function () {
    return (
      (At =
        Object.assign ||
        function (t) {
          for (var n, r = 1, o = arguments.length; r < o; r++) {
            n = arguments[r];
            for (var i in n)
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          }
          return t;
        }),
      At.apply(this, arguments)
    );
  };
function tg(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
        (n[r[o]] = e[r[o]]);
  return n;
}
function jE(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, i; r < o; r++)
      (i || !(r in t)) &&
        (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
  return e.concat(i || Array.prototype.slice.call(t));
}
var ns = 'right-scroll-bar-position',
  rs = 'width-before-scroll-bar',
  ME = 'with-scroll-bars-hidden',
  DE = '--removed-body-scroll-bar-size';
function Jl(e, t) {
  return (typeof e == 'function' ? e(t) : e && (e.current = t), e);
}
function IE(e, t) {
  var n = c.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && ((n.value = r), n.callback(r, o));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var LE = typeof window < 'u' ? c.useLayoutEffect : c.useEffect,
  Rf = new WeakMap();
function FE(e, t) {
  var n = IE(null, function (r) {
    return e.forEach(function (o) {
      return Jl(o, r);
    });
  });
  return (
    LE(
      function () {
        var r = Rf.get(n);
        if (r) {
          var o = new Set(r),
            i = new Set(e),
            s = n.current;
          (o.forEach(function (l) {
            i.has(l) || Jl(l, null);
          }),
            i.forEach(function (l) {
              o.has(l) || Jl(l, s);
            }));
        }
        Rf.set(n, e);
      },
      [e]
    ),
    n
  );
}
function zE(e) {
  return e;
}
function $E(e, t) {
  t === void 0 && (t = zE);
  var n = [],
    r = !1,
    o = {
      read: function () {
        if (r)
          throw new Error(
            'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.'
          );
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (i) {
        var s = t(i, r);
        return (
          n.push(s),
          function () {
            n = n.filter(function (l) {
              return l !== s;
            });
          }
        );
      },
      assignSyncMedium: function (i) {
        for (r = !0; n.length; ) {
          var s = n;
          ((n = []), s.forEach(i));
        }
        n = {
          push: function (l) {
            return i(l);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (i) {
        r = !0;
        var s = [];
        if (n.length) {
          var l = n;
          ((n = []), l.forEach(i), (s = n));
        }
        var a = function () {
            var d = s;
            ((s = []), d.forEach(i));
          },
          u = function () {
            return Promise.resolve().then(a);
          };
        (u(),
          (n = {
            push: function (d) {
              (s.push(d), u());
            },
            filter: function (d) {
              return ((s = s.filter(d)), n);
            },
          }));
      },
    };
  return o;
}
function UE(e) {
  e === void 0 && (e = {});
  var t = $E(null);
  return ((t.options = At({ async: !0, ssr: !1 }, e)), t);
}
var ng = function (e) {
  var t = e.sideCar,
    n = tg(e, ['sideCar']);
  if (!t)
    throw new Error(
      'Sidecar: please provide `sideCar` property to import the right car'
    );
  var r = t.read();
  if (!r) throw new Error('Sidecar medium not found');
  return c.createElement(r, At({}, n));
};
ng.isSideCarExport = !0;
function VE(e, t) {
  return (e.useMedium(t), ng);
}
var rg = UE(),
  ea = function () {},
  cl = c.forwardRef(function (e, t) {
    var n = c.useRef(null),
      r = c.useState({
        onScrollCapture: ea,
        onWheelCapture: ea,
        onTouchMoveCapture: ea,
      }),
      o = r[0],
      i = r[1],
      s = e.forwardProps,
      l = e.children,
      a = e.className,
      u = e.removeScrollBar,
      d = e.enabled,
      h = e.shards,
      v = e.sideCar,
      x = e.noIsolation,
      S = e.inert,
      p = e.allowPinchZoom,
      w = e.as,
      m = w === void 0 ? 'div' : w,
      f = e.gapMode,
      g = tg(e, [
        'forwardProps',
        'children',
        'className',
        'removeScrollBar',
        'enabled',
        'shards',
        'sideCar',
        'noIsolation',
        'inert',
        'allowPinchZoom',
        'as',
        'gapMode',
      ]),
      C = v,
      E = FE([n, t]),
      T = At(At({}, g), o);
    return c.createElement(
      c.Fragment,
      null,
      d &&
        c.createElement(C, {
          sideCar: rg,
          removeScrollBar: u,
          shards: h,
          noIsolation: x,
          inert: S,
          setCallbacks: i,
          allowPinchZoom: !!p,
          lockRef: n,
          gapMode: f,
        }),
      s
        ? c.cloneElement(c.Children.only(l), At(At({}, T), { ref: E }))
        : c.createElement(m, At({}, T, { className: a, ref: E }), l)
    );
  });
cl.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
cl.classNames = { fullWidth: rs, zeroRight: ns };
var BE = function () {
  if (typeof __webpack_nonce__ < 'u') return __webpack_nonce__;
};
function WE() {
  if (!document) return null;
  var e = document.createElement('style');
  e.type = 'text/css';
  var t = BE();
  return (t && e.setAttribute('nonce', t), e);
}
function HE(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function KE(e) {
  var t = document.head || document.getElementsByTagName('head')[0];
  t.appendChild(e);
}
var QE = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = WE()) && (HE(t, n), KE(t)), e++);
      },
      remove: function () {
        (e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  GE = function () {
    var e = QE();
    return function (t, n) {
      c.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n]
      );
    };
  },
  og = function () {
    var e = GE(),
      t = function (n) {
        var r = n.styles,
          o = n.dynamic;
        return (e(r, o), null);
      };
    return t;
  },
  YE = { left: 0, top: 0, right: 0, gap: 0 },
  ta = function (e) {
    return parseInt(e || '', 10) || 0;
  },
  XE = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === 'padding' ? 'paddingLeft' : 'marginLeft'],
      r = t[e === 'padding' ? 'paddingTop' : 'marginTop'],
      o = t[e === 'padding' ? 'paddingRight' : 'marginRight'];
    return [ta(n), ta(r), ta(o)];
  },
  qE = function (e) {
    if ((e === void 0 && (e = 'margin'), typeof window > 'u')) return YE;
    var t = XE(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, r - n + t[2] - t[0]),
    };
  },
  ZE = og(),
  _r = 'data-scroll-locked',
  JE = function (e, t, n, r) {
    var o = e.left,
      i = e.top,
      s = e.right,
      l = e.gap;
    return (
      n === void 0 && (n = 'margin'),
      `
  .`
        .concat(
          ME,
          ` {
   overflow: hidden `
        )
        .concat(
          r,
          `;
   padding-right: `
        )
        .concat(l, 'px ')
        .concat(
          r,
          `;
  }
  body[`
        )
        .concat(
          _r,
          `] {
    overflow: hidden `
        )
        .concat(
          r,
          `;
    overscroll-behavior: contain;
    `
        )
        .concat(
          [
            t && 'position: relative '.concat(r, ';'),
            n === 'margin' &&
              `
    padding-left: `
                .concat(
                  o,
                  `px;
    padding-top: `
                )
                .concat(
                  i,
                  `px;
    padding-right: `
                )
                .concat(
                  s,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `
                )
                .concat(l, 'px ')
                .concat(
                  r,
                  `;
    `
                ),
            n === 'padding' &&
              'padding-right: '.concat(l, 'px ').concat(r, ';'),
          ]
            .filter(Boolean)
            .join(''),
          `
  }
  
  .`
        )
        .concat(
          ns,
          ` {
    right: `
        )
        .concat(l, 'px ')
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(
          rs,
          ` {
    margin-right: `
        )
        .concat(l, 'px ')
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(ns, ' .')
        .concat(
          ns,
          ` {
    right: 0 `
        )
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(rs, ' .')
        .concat(
          rs,
          ` {
    margin-right: 0 `
        )
        .concat(
          r,
          `;
  }
  
  body[`
        )
        .concat(
          _r,
          `] {
    `
        )
        .concat(DE, ': ')
        .concat(
          l,
          `px;
  }
`
        )
    );
  },
  bf = function () {
    var e = parseInt(document.body.getAttribute(_r) || '0', 10);
    return isFinite(e) ? e : 0;
  },
  ek = function () {
    c.useEffect(function () {
      return (
        document.body.setAttribute(_r, (bf() + 1).toString()),
        function () {
          var e = bf() - 1;
          e <= 0
            ? document.body.removeAttribute(_r)
            : document.body.setAttribute(_r, e.toString());
        }
      );
    }, []);
  },
  tk = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      o = r === void 0 ? 'margin' : r;
    ek();
    var i = c.useMemo(
      function () {
        return qE(o);
      },
      [o]
    );
    return c.createElement(ZE, { styles: JE(i, !t, o, n ? '' : '!important') });
  },
  ou = !1;
if (typeof window < 'u')
  try {
    var Fi = Object.defineProperty({}, 'passive', {
      get: function () {
        return ((ou = !0), !0);
      },
    });
    (window.addEventListener('test', Fi, Fi),
      window.removeEventListener('test', Fi, Fi));
  } catch {
    ou = !1;
  }
var lr = ou ? { passive: !1 } : !1,
  nk = function (e) {
    return e.tagName === 'TEXTAREA';
  },
  ig = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return (
      n[t] !== 'hidden' &&
      !(n.overflowY === n.overflowX && !nk(e) && n[t] === 'visible')
    );
  },
  rk = function (e) {
    return ig(e, 'overflowY');
  },
  ok = function (e) {
    return ig(e, 'overflowX');
  },
  _f = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      typeof ShadowRoot < 'u' && r instanceof ShadowRoot && (r = r.host);
      var o = sg(e, r);
      if (o) {
        var i = lg(e, r),
          s = i[1],
          l = i[2];
        if (s > l) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  ik = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight;
    return [t, n, r];
  },
  sk = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth;
    return [t, n, r];
  },
  sg = function (e, t) {
    return e === 'v' ? rk(t) : ok(t);
  },
  lg = function (e, t) {
    return e === 'v' ? ik(t) : sk(t);
  },
  lk = function (e, t) {
    return e === 'h' && t === 'rtl' ? -1 : 1;
  },
  ak = function (e, t, n, r, o) {
    var i = lk(e, window.getComputedStyle(t).direction),
      s = i * r,
      l = n.target,
      a = t.contains(l),
      u = !1,
      d = s > 0,
      h = 0,
      v = 0;
    do {
      var x = lg(e, l),
        S = x[0],
        p = x[1],
        w = x[2],
        m = p - w - i * S;
      ((S || m) && sg(e, l) && ((h += m), (v += S)),
        l instanceof ShadowRoot ? (l = l.host) : (l = l.parentNode));
    } while ((!a && l !== document.body) || (a && (t.contains(l) || t === l)));
    return (
      ((d && (Math.abs(h) < 1 || !o)) || (!d && (Math.abs(v) < 1 || !o))) &&
        (u = !0),
      u
    );
  },
  zi = function (e) {
    return 'changedTouches' in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  Of = function (e) {
    return [e.deltaX, e.deltaY];
  },
  Af = function (e) {
    return e && 'current' in e ? e.current : e;
  },
  uk = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  ck = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`
      )
      .concat(
        e,
        ` {pointer-events: all;}
`
      );
  },
  dk = 0,
  ar = [];
function fk(e) {
  var t = c.useRef([]),
    n = c.useRef([0, 0]),
    r = c.useRef(),
    o = c.useState(dk++)[0],
    i = c.useState(og)[0],
    s = c.useRef(e);
  (c.useEffect(
    function () {
      s.current = e;
    },
    [e]
  ),
    c.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add('block-interactivity-'.concat(o));
          var p = jE([e.lockRef.current], (e.shards || []).map(Af), !0).filter(
            Boolean
          );
          return (
            p.forEach(function (w) {
              return w.classList.add('allow-interactivity-'.concat(o));
            }),
            function () {
              (document.body.classList.remove('block-interactivity-'.concat(o)),
                p.forEach(function (w) {
                  return w.classList.remove('allow-interactivity-'.concat(o));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards]
    ));
  var l = c.useCallback(function (p, w) {
      if (
        ('touches' in p && p.touches.length === 2) ||
        (p.type === 'wheel' && p.ctrlKey)
      )
        return !s.current.allowPinchZoom;
      var m = zi(p),
        f = n.current,
        g = 'deltaX' in p ? p.deltaX : f[0] - m[0],
        C = 'deltaY' in p ? p.deltaY : f[1] - m[1],
        E,
        T = p.target,
        k = Math.abs(g) > Math.abs(C) ? 'h' : 'v';
      if ('touches' in p && k === 'h' && T.type === 'range') return !1;
      var P = _f(k, T);
      if (!P) return !0;
      if ((P ? (E = k) : ((E = k === 'v' ? 'h' : 'v'), (P = _f(k, T))), !P))
        return !1;
      if (
        (!r.current && 'changedTouches' in p && (g || C) && (r.current = E), !E)
      )
        return !0;
      var A = r.current || E;
      return ak(A, w, p, A === 'h' ? g : C, !0);
    }, []),
    a = c.useCallback(function (p) {
      var w = p;
      if (!(!ar.length || ar[ar.length - 1] !== i)) {
        var m = 'deltaY' in w ? Of(w) : zi(w),
          f = t.current.filter(function (E) {
            return (
              E.name === w.type &&
              (E.target === w.target || w.target === E.shadowParent) &&
              uk(E.delta, m)
            );
          })[0];
        if (f && f.should) {
          w.cancelable && w.preventDefault();
          return;
        }
        if (!f) {
          var g = (s.current.shards || [])
              .map(Af)
              .filter(Boolean)
              .filter(function (E) {
                return E.contains(w.target);
              }),
            C = g.length > 0 ? l(w, g[0]) : !s.current.noIsolation;
          C && w.cancelable && w.preventDefault();
        }
      }
    }, []),
    u = c.useCallback(function (p, w, m, f) {
      var g = { name: p, delta: w, target: m, should: f, shadowParent: pk(m) };
      (t.current.push(g),
        setTimeout(function () {
          t.current = t.current.filter(function (C) {
            return C !== g;
          });
        }, 1));
    }, []),
    d = c.useCallback(function (p) {
      ((n.current = zi(p)), (r.current = void 0));
    }, []),
    h = c.useCallback(function (p) {
      u(p.type, Of(p), p.target, l(p, e.lockRef.current));
    }, []),
    v = c.useCallback(function (p) {
      u(p.type, zi(p), p.target, l(p, e.lockRef.current));
    }, []);
  c.useEffect(function () {
    return (
      ar.push(i),
      e.setCallbacks({
        onScrollCapture: h,
        onWheelCapture: h,
        onTouchMoveCapture: v,
      }),
      document.addEventListener('wheel', a, lr),
      document.addEventListener('touchmove', a, lr),
      document.addEventListener('touchstart', d, lr),
      function () {
        ((ar = ar.filter(function (p) {
          return p !== i;
        })),
          document.removeEventListener('wheel', a, lr),
          document.removeEventListener('touchmove', a, lr),
          document.removeEventListener('touchstart', d, lr));
      }
    );
  }, []);
  var x = e.removeScrollBar,
    S = e.inert;
  return c.createElement(
    c.Fragment,
    null,
    S ? c.createElement(i, { styles: ck(o) }) : null,
    x ? c.createElement(tk, { gapMode: e.gapMode }) : null
  );
}
function pk(e) {
  for (var t = null; e !== null; )
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)),
      (e = e.parentNode));
  return t;
}
const hk = VE(rg, fk);
var Rc = c.forwardRef(function (e, t) {
  return c.createElement(cl, At({}, e, { ref: t, sideCar: hk }));
});
Rc.classNames = cl.classNames;
var mk = [' ', 'Enter', 'ArrowUp', 'ArrowDown'],
  vk = [' ', 'Enter'],
  fi = 'Select',
  [dl, fl, gk] = km(fi),
  [oo, EP] = or(fi, [gk, ll]),
  pl = ll(),
  [yk, jn] = oo(fi),
  [wk, xk] = oo(fi),
  ag = (e) => {
    const {
        __scopeSelect: t,
        children: n,
        open: r,
        defaultOpen: o,
        onOpenChange: i,
        value: s,
        defaultValue: l,
        onValueChange: a,
        dir: u,
        name: d,
        autoComplete: h,
        disabled: v,
        required: x,
        form: S,
      } = e,
      p = pl(t),
      [w, m] = c.useState(null),
      [f, g] = c.useState(null),
      [C, E] = c.useState(!1),
      T = CE(u),
      [k = !1, P] = Jo({ prop: r, defaultProp: o, onChange: i }),
      [A, j] = Jo({ prop: s, defaultProp: l, onChange: a }),
      z = c.useRef(null),
      D = w ? S || !!w.closest('form') : !0,
      [U, O] = c.useState(new Set()),
      H = Array.from(U)
        .map((L) => L.props.value)
        .join(';');
    return y.jsx(VC, {
      ...p,
      children: y.jsxs(yk, {
        required: x,
        scope: t,
        trigger: w,
        onTriggerChange: m,
        valueNode: f,
        onValueNodeChange: g,
        valueNodeHasChildren: C,
        onValueNodeHasChildrenChange: E,
        contentId: Rr(),
        value: A,
        onValueChange: j,
        open: k,
        onOpenChange: P,
        dir: T,
        triggerPointerDownPosRef: z,
        disabled: v,
        children: [
          y.jsx(dl.Provider, {
            scope: t,
            children: y.jsx(wk, {
              scope: e.__scopeSelect,
              onNativeOptionAdd: c.useCallback((L) => {
                O((V) => new Set(V).add(L));
              }, []),
              onNativeOptionRemove: c.useCallback((L) => {
                O((V) => {
                  const N = new Set(V);
                  return (N.delete(L), N);
                });
              }, []),
              children: n,
            }),
          }),
          D
            ? y.jsxs(
                jg,
                {
                  'aria-hidden': !0,
                  required: x,
                  tabIndex: -1,
                  name: d,
                  autoComplete: h,
                  value: A,
                  onChange: (L) => j(L.target.value),
                  disabled: v,
                  form: S,
                  children: [
                    A === void 0 ? y.jsx('option', { value: '' }) : null,
                    Array.from(U),
                  ],
                },
                H
              )
            : null,
        ],
      }),
    });
  };
ag.displayName = fi;
var ug = 'SelectTrigger',
  cg = c.forwardRef((e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e,
      i = pl(n),
      s = jn(ug, n),
      l = s.disabled || r,
      a = oe(t, s.onTriggerChange),
      u = fl(n),
      d = c.useRef('touch'),
      [h, v, x] = Mg((p) => {
        const w = u().filter((g) => !g.disabled),
          m = w.find((g) => g.value === s.value),
          f = Dg(w, p, m);
        f !== void 0 && s.onValueChange(f.value);
      }),
      S = (p) => {
        (l || (s.onOpenChange(!0), x()),
          p &&
            (s.triggerPointerDownPosRef.current = {
              x: Math.round(p.pageX),
              y: Math.round(p.pageY),
            }));
      };
    return y.jsx(_v, {
      asChild: !0,
      ...i,
      children: y.jsx(G.button, {
        type: 'button',
        role: 'combobox',
        'aria-controls': s.contentId,
        'aria-expanded': s.open,
        'aria-required': s.required,
        'aria-autocomplete': 'none',
        dir: s.dir,
        'data-state': s.open ? 'open' : 'closed',
        disabled: l,
        'data-disabled': l ? '' : void 0,
        'data-placeholder': Ag(s.value) ? '' : void 0,
        ...o,
        ref: a,
        onClick: B(o.onClick, (p) => {
          (p.currentTarget.focus(), d.current !== 'mouse' && S(p));
        }),
        onPointerDown: B(o.onPointerDown, (p) => {
          d.current = p.pointerType;
          const w = p.target;
          (w.hasPointerCapture(p.pointerId) &&
            w.releasePointerCapture(p.pointerId),
            p.button === 0 &&
              p.ctrlKey === !1 &&
              p.pointerType === 'mouse' &&
              (S(p), p.preventDefault()));
        }),
        onKeyDown: B(o.onKeyDown, (p) => {
          const w = h.current !== '';
          (!(p.ctrlKey || p.altKey || p.metaKey) &&
            p.key.length === 1 &&
            v(p.key),
            !(w && p.key === ' ') &&
              mk.includes(p.key) &&
              (S(), p.preventDefault()));
        }),
      }),
    });
  });
cg.displayName = ug;
var dg = 'SelectValue',
  fg = c.forwardRef((e, t) => {
    const {
        __scopeSelect: n,
        className: r,
        style: o,
        children: i,
        placeholder: s = '',
        ...l
      } = e,
      a = jn(dg, n),
      { onValueNodeHasChildrenChange: u } = a,
      d = i !== void 0,
      h = oe(t, a.onValueNodeChange);
    return (
      Ae(() => {
        u(d);
      }, [u, d]),
      y.jsx(G.span, {
        ...l,
        ref: h,
        style: { pointerEvents: 'none' },
        children: Ag(a.value) ? y.jsx(y.Fragment, { children: s }) : i,
      })
    );
  });
fg.displayName = dg;
var Sk = 'SelectIcon',
  pg = c.forwardRef((e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return y.jsx(G.span, {
      'aria-hidden': !0,
      ...o,
      ref: t,
      children: r || '▼',
    });
  });
pg.displayName = Sk;
var Ck = 'SelectPortal',
  hg = (e) => y.jsx(el, { asChild: !0, ...e });
hg.displayName = Ck;
var Jn = 'SelectContent',
  mg = c.forwardRef((e, t) => {
    const n = jn(Jn, e.__scopeSelect),
      [r, o] = c.useState();
    if (
      (Ae(() => {
        o(new DocumentFragment());
      }, []),
      !n.open)
    ) {
      const i = r;
      return i
        ? rr.createPortal(
            y.jsx(vg, {
              scope: e.__scopeSelect,
              children: y.jsx(dl.Slot, {
                scope: e.__scopeSelect,
                children: y.jsx('div', { children: e.children }),
              }),
            }),
            i
          )
        : null;
    }
    return y.jsx(gg, { ...e, ref: t });
  });
mg.displayName = Jn;
var dt = 10,
  [vg, Mn] = oo(Jn),
  Ek = 'SelectContentImpl',
  kk = Gr('SelectContent.RemoveScroll'),
  gg = c.forwardRef((e, t) => {
    const {
        __scopeSelect: n,
        position: r = 'item-aligned',
        onCloseAutoFocus: o,
        onEscapeKeyDown: i,
        onPointerDownOutside: s,
        side: l,
        sideOffset: a,
        align: u,
        alignOffset: d,
        arrowPadding: h,
        collisionBoundary: v,
        collisionPadding: x,
        sticky: S,
        hideWhenDetached: p,
        avoidCollisions: w,
        ...m
      } = e,
      f = jn(Jn, n),
      [g, C] = c.useState(null),
      [E, T] = c.useState(null),
      k = oe(t, (F) => C(F)),
      [P, A] = c.useState(null),
      [j, z] = c.useState(null),
      D = fl(n),
      [U, O] = c.useState(!1),
      H = c.useRef(!1);
    (c.useEffect(() => {
      if (g) return eg(g);
    }, [g]),
      qv());
    const L = c.useCallback(
        (F) => {
          const [ie, ...Pe] = D().map((te) => te.ref.current),
            [ne] = Pe.slice(-1),
            ee = document.activeElement;
          for (const te of F)
            if (
              te === ee ||
              (te == null || te.scrollIntoView({ block: 'nearest' }),
              te === ie && E && (E.scrollTop = 0),
              te === ne && E && (E.scrollTop = E.scrollHeight),
              te == null || te.focus(),
              document.activeElement !== ee)
            )
              return;
        },
        [D, E]
      ),
      V = c.useCallback(() => L([P, g]), [L, P, g]);
    c.useEffect(() => {
      U && V();
    }, [U, V]);
    const { onOpenChange: N, triggerPointerDownPosRef: _ } = f;
    (c.useEffect(() => {
      if (g) {
        let F = { x: 0, y: 0 };
        const ie = (ne) => {
            var ee, te;
            F = {
              x: Math.abs(
                Math.round(ne.pageX) -
                  (((ee = _.current) == null ? void 0 : ee.x) ?? 0)
              ),
              y: Math.abs(
                Math.round(ne.pageY) -
                  (((te = _.current) == null ? void 0 : te.y) ?? 0)
              ),
            };
          },
          Pe = (ne) => {
            (F.x <= 10 && F.y <= 10
              ? ne.preventDefault()
              : g.contains(ne.target) || N(!1),
              document.removeEventListener('pointermove', ie),
              (_.current = null));
          };
        return (
          _.current !== null &&
            (document.addEventListener('pointermove', ie),
            document.addEventListener('pointerup', Pe, {
              capture: !0,
              once: !0,
            })),
          () => {
            (document.removeEventListener('pointermove', ie),
              document.removeEventListener('pointerup', Pe, { capture: !0 }));
          }
        );
      }
    }, [g, N, _]),
      c.useEffect(() => {
        const F = () => N(!1);
        return (
          window.addEventListener('blur', F),
          window.addEventListener('resize', F),
          () => {
            (window.removeEventListener('blur', F),
              window.removeEventListener('resize', F));
          }
        );
      }, [N]));
    const [I, $] = Mg((F) => {
        const ie = D().filter((ee) => !ee.disabled),
          Pe = ie.find((ee) => ee.ref.current === document.activeElement),
          ne = Dg(ie, F, Pe);
        ne && setTimeout(() => ne.ref.current.focus());
      }),
      J = c.useCallback(
        (F, ie, Pe) => {
          const ne = !H.current && !Pe;
          ((f.value !== void 0 && f.value === ie) || ne) &&
            (A(F), ne && (H.current = !0));
        },
        [f.value]
      ),
      je = c.useCallback(() => (g == null ? void 0 : g.focus()), [g]),
      ge = c.useCallback(
        (F, ie, Pe) => {
          const ne = !H.current && !Pe;
          ((f.value !== void 0 && f.value === ie) || ne) && z(F);
        },
        [f.value]
      ),
      kt = r === 'popper' ? iu : yg,
      Me =
        kt === iu
          ? {
              side: l,
              sideOffset: a,
              align: u,
              alignOffset: d,
              arrowPadding: h,
              collisionBoundary: v,
              collisionPadding: x,
              sticky: S,
              hideWhenDetached: p,
              avoidCollisions: w,
            }
          : {};
    return y.jsx(vg, {
      scope: n,
      content: g,
      viewport: E,
      onViewportChange: T,
      itemRefCallback: J,
      selectedItem: P,
      onItemLeave: je,
      itemTextRefCallback: ge,
      focusSelectedItem: V,
      selectedItemText: j,
      position: r,
      isPositioned: U,
      searchRef: I,
      children: y.jsx(Rc, {
        as: kk,
        allowPinchZoom: !0,
        children: y.jsx(Nc, {
          asChild: !0,
          trapped: f.open,
          onMountAutoFocus: (F) => {
            F.preventDefault();
          },
          onUnmountAutoFocus: B(o, (F) => {
            var ie;
            ((ie = f.trigger) == null || ie.focus({ preventScroll: !0 }),
              F.preventDefault());
          }),
          children: y.jsx(ui, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: i,
            onPointerDownOutside: s,
            onFocusOutside: (F) => F.preventDefault(),
            onDismiss: () => f.onOpenChange(!1),
            children: y.jsx(kt, {
              role: 'listbox',
              id: f.contentId,
              'data-state': f.open ? 'open' : 'closed',
              dir: f.dir,
              onContextMenu: (F) => F.preventDefault(),
              ...m,
              ...Me,
              onPlaced: () => O(!0),
              ref: k,
              style: {
                display: 'flex',
                flexDirection: 'column',
                outline: 'none',
                ...m.style,
              },
              onKeyDown: B(m.onKeyDown, (F) => {
                const ie = F.ctrlKey || F.altKey || F.metaKey;
                if (
                  (F.key === 'Tab' && F.preventDefault(),
                  !ie && F.key.length === 1 && $(F.key),
                  ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(F.key))
                ) {
                  let ne = D()
                    .filter((ee) => !ee.disabled)
                    .map((ee) => ee.ref.current);
                  if (
                    (['ArrowUp', 'End'].includes(F.key) &&
                      (ne = ne.slice().reverse()),
                    ['ArrowUp', 'ArrowDown'].includes(F.key))
                  ) {
                    const ee = F.target,
                      te = ne.indexOf(ee);
                    ne = ne.slice(te + 1);
                  }
                  (setTimeout(() => L(ne)), F.preventDefault());
                }
              }),
            }),
          }),
        }),
      }),
    });
  });
gg.displayName = Ek;
var Pk = 'SelectItemAlignedPosition',
  yg = c.forwardRef((e, t) => {
    const { __scopeSelect: n, onPlaced: r, ...o } = e,
      i = jn(Jn, n),
      s = Mn(Jn, n),
      [l, a] = c.useState(null),
      [u, d] = c.useState(null),
      h = oe(t, (k) => d(k)),
      v = fl(n),
      x = c.useRef(!1),
      S = c.useRef(!0),
      {
        viewport: p,
        selectedItem: w,
        selectedItemText: m,
        focusSelectedItem: f,
      } = s,
      g = c.useCallback(() => {
        if (i.trigger && i.valueNode && l && u && p && w && m) {
          const k = i.trigger.getBoundingClientRect(),
            P = u.getBoundingClientRect(),
            A = i.valueNode.getBoundingClientRect(),
            j = m.getBoundingClientRect();
          if (i.dir !== 'rtl') {
            const ee = j.left - P.left,
              te = A.left - ee,
              Ke = k.left - te,
              Pt = k.width + Ke,
              io = Math.max(Pt, P.width),
              so = window.innerWidth - dt,
              lo = Cf(te, [dt, Math.max(dt, so - io)]);
            ((l.style.minWidth = Pt + 'px'), (l.style.left = lo + 'px'));
          } else {
            const ee = P.right - j.right,
              te = window.innerWidth - A.right - ee,
              Ke = window.innerWidth - k.right - te,
              Pt = k.width + Ke,
              io = Math.max(Pt, P.width),
              so = window.innerWidth - dt,
              lo = Cf(te, [dt, Math.max(dt, so - io)]);
            ((l.style.minWidth = Pt + 'px'), (l.style.right = lo + 'px'));
          }
          const z = v(),
            D = window.innerHeight - dt * 2,
            U = p.scrollHeight,
            O = window.getComputedStyle(u),
            H = parseInt(O.borderTopWidth, 10),
            L = parseInt(O.paddingTop, 10),
            V = parseInt(O.borderBottomWidth, 10),
            N = parseInt(O.paddingBottom, 10),
            _ = H + L + U + N + V,
            I = Math.min(w.offsetHeight * 5, _),
            $ = window.getComputedStyle(p),
            J = parseInt($.paddingTop, 10),
            je = parseInt($.paddingBottom, 10),
            ge = k.top + k.height / 2 - dt,
            kt = D - ge,
            Me = w.offsetHeight / 2,
            F = w.offsetTop + Me,
            ie = H + L + F,
            Pe = _ - ie;
          if (ie <= ge) {
            const ee = z.length > 0 && w === z[z.length - 1].ref.current;
            l.style.bottom = '0px';
            const te = u.clientHeight - p.offsetTop - p.offsetHeight,
              Ke = Math.max(kt, Me + (ee ? je : 0) + te + V),
              Pt = ie + Ke;
            l.style.height = Pt + 'px';
          } else {
            const ee = z.length > 0 && w === z[0].ref.current;
            l.style.top = '0px';
            const Ke = Math.max(ge, H + p.offsetTop + (ee ? J : 0) + Me) + Pe;
            ((l.style.height = Ke + 'px'),
              (p.scrollTop = ie - ge + p.offsetTop));
          }
          ((l.style.margin = `${dt}px 0`),
            (l.style.minHeight = I + 'px'),
            (l.style.maxHeight = D + 'px'),
            r == null || r(),
            requestAnimationFrame(() => (x.current = !0)));
        }
      }, [v, i.trigger, i.valueNode, l, u, p, w, m, i.dir, r]);
    Ae(() => g(), [g]);
    const [C, E] = c.useState();
    Ae(() => {
      u && E(window.getComputedStyle(u).zIndex);
    }, [u]);
    const T = c.useCallback(
      (k) => {
        k && S.current === !0 && (g(), f == null || f(), (S.current = !1));
      },
      [g, f]
    );
    return y.jsx(Nk, {
      scope: n,
      contentWrapper: l,
      shouldExpandOnScrollRef: x,
      onScrollButtonChange: T,
      children: y.jsx('div', {
        ref: a,
        style: {
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          zIndex: C,
        },
        children: y.jsx(G.div, {
          ...o,
          ref: h,
          style: { boxSizing: 'border-box', maxHeight: '100%', ...o.style },
        }),
      }),
    });
  });
yg.displayName = Pk;
var Tk = 'SelectPopperPosition',
  iu = c.forwardRef((e, t) => {
    const {
        __scopeSelect: n,
        align: r = 'start',
        collisionPadding: o = dt,
        ...i
      } = e,
      s = pl(n);
    return y.jsx(Ov, {
      ...s,
      ...i,
      ref: t,
      align: r,
      collisionPadding: o,
      style: {
        boxSizing: 'border-box',
        ...i.style,
        '--radix-select-content-transform-origin':
          'var(--radix-popper-transform-origin)',
        '--radix-select-content-available-width':
          'var(--radix-popper-available-width)',
        '--radix-select-content-available-height':
          'var(--radix-popper-available-height)',
        '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    });
  });
iu.displayName = Tk;
var [Nk, bc] = oo(Jn, {}),
  su = 'SelectViewport',
  wg = c.forwardRef((e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e,
      i = Mn(su, n),
      s = bc(su, n),
      l = oe(t, i.onViewportChange),
      a = c.useRef(0);
    return y.jsxs(y.Fragment, {
      children: [
        y.jsx('style', {
          dangerouslySetInnerHTML: {
            __html:
              '[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}',
          },
          nonce: r,
        }),
        y.jsx(dl.Slot, {
          scope: n,
          children: y.jsx(G.div, {
            'data-radix-select-viewport': '',
            role: 'presentation',
            ...o,
            ref: l,
            style: {
              position: 'relative',
              flex: 1,
              overflow: 'hidden auto',
              ...o.style,
            },
            onScroll: B(o.onScroll, (u) => {
              const d = u.currentTarget,
                { contentWrapper: h, shouldExpandOnScrollRef: v } = s;
              if (v != null && v.current && h) {
                const x = Math.abs(a.current - d.scrollTop);
                if (x > 0) {
                  const S = window.innerHeight - dt * 2,
                    p = parseFloat(h.style.minHeight),
                    w = parseFloat(h.style.height),
                    m = Math.max(p, w);
                  if (m < S) {
                    const f = m + x,
                      g = Math.min(S, f),
                      C = f - g;
                    ((h.style.height = g + 'px'),
                      h.style.bottom === '0px' &&
                        ((d.scrollTop = C > 0 ? C : 0),
                        (h.style.justifyContent = 'flex-end')));
                  }
                }
              }
              a.current = d.scrollTop;
            }),
          }),
        }),
      ],
    });
  });
wg.displayName = su;
var xg = 'SelectGroup',
  [Rk, bk] = oo(xg),
  _k = c.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e,
      o = Rr();
    return y.jsx(Rk, {
      scope: n,
      id: o,
      children: y.jsx(G.div, {
        role: 'group',
        'aria-labelledby': o,
        ...r,
        ref: t,
      }),
    });
  });
_k.displayName = xg;
var Sg = 'SelectLabel',
  Cg = c.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e,
      o = bk(Sg, n);
    return y.jsx(G.div, { id: o.id, ...r, ref: t });
  });
Cg.displayName = Sg;
var js = 'SelectItem',
  [Ok, Eg] = oo(js),
  kg = c.forwardRef((e, t) => {
    const {
        __scopeSelect: n,
        value: r,
        disabled: o = !1,
        textValue: i,
        ...s
      } = e,
      l = jn(js, n),
      a = Mn(js, n),
      u = l.value === r,
      [d, h] = c.useState(i ?? ''),
      [v, x] = c.useState(!1),
      S = oe(t, (f) => {
        var g;
        return (g = a.itemRefCallback) == null ? void 0 : g.call(a, f, r, o);
      }),
      p = Rr(),
      w = c.useRef('touch'),
      m = () => {
        o || (l.onValueChange(r), l.onOpenChange(!1));
      };
    if (r === '')
      throw new Error(
        'A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.'
      );
    return y.jsx(Ok, {
      scope: n,
      value: r,
      disabled: o,
      textId: p,
      isSelected: u,
      onItemTextChange: c.useCallback((f) => {
        h((g) => g || ((f == null ? void 0 : f.textContent) ?? '').trim());
      }, []),
      children: y.jsx(dl.ItemSlot, {
        scope: n,
        value: r,
        disabled: o,
        textValue: d,
        children: y.jsx(G.div, {
          role: 'option',
          'aria-labelledby': p,
          'data-highlighted': v ? '' : void 0,
          'aria-selected': u && v,
          'data-state': u ? 'checked' : 'unchecked',
          'aria-disabled': o || void 0,
          'data-disabled': o ? '' : void 0,
          tabIndex: o ? void 0 : -1,
          ...s,
          ref: S,
          onFocus: B(s.onFocus, () => x(!0)),
          onBlur: B(s.onBlur, () => x(!1)),
          onClick: B(s.onClick, () => {
            w.current !== 'mouse' && m();
          }),
          onPointerUp: B(s.onPointerUp, () => {
            w.current === 'mouse' && m();
          }),
          onPointerDown: B(s.onPointerDown, (f) => {
            w.current = f.pointerType;
          }),
          onPointerMove: B(s.onPointerMove, (f) => {
            var g;
            ((w.current = f.pointerType),
              o
                ? (g = a.onItemLeave) == null || g.call(a)
                : w.current === 'mouse' &&
                  f.currentTarget.focus({ preventScroll: !0 }));
          }),
          onPointerLeave: B(s.onPointerLeave, (f) => {
            var g;
            f.currentTarget === document.activeElement &&
              ((g = a.onItemLeave) == null || g.call(a));
          }),
          onKeyDown: B(s.onKeyDown, (f) => {
            var C;
            (((C = a.searchRef) == null ? void 0 : C.current) !== '' &&
              f.key === ' ') ||
              (vk.includes(f.key) && m(), f.key === ' ' && f.preventDefault());
          }),
        }),
      }),
    });
  });
kg.displayName = js;
var Eo = 'SelectItemText',
  Pg = c.forwardRef((e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...i } = e,
      s = jn(Eo, n),
      l = Mn(Eo, n),
      a = Eg(Eo, n),
      u = xk(Eo, n),
      [d, h] = c.useState(null),
      v = oe(
        t,
        (m) => h(m),
        a.onItemTextChange,
        (m) => {
          var f;
          return (f = l.itemTextRefCallback) == null
            ? void 0
            : f.call(l, m, a.value, a.disabled);
        }
      ),
      x = d == null ? void 0 : d.textContent,
      S = c.useMemo(
        () =>
          y.jsx(
            'option',
            { value: a.value, disabled: a.disabled, children: x },
            a.value
          ),
        [a.disabled, a.value, x]
      ),
      { onNativeOptionAdd: p, onNativeOptionRemove: w } = u;
    return (
      Ae(() => (p(S), () => w(S)), [p, w, S]),
      y.jsxs(y.Fragment, {
        children: [
          y.jsx(G.span, { id: a.textId, ...i, ref: v }),
          a.isSelected && s.valueNode && !s.valueNodeHasChildren
            ? rr.createPortal(i.children, s.valueNode)
            : null,
        ],
      })
    );
  });
Pg.displayName = Eo;
var Tg = 'SelectItemIndicator',
  Ng = c.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return Eg(Tg, n).isSelected
      ? y.jsx(G.span, { 'aria-hidden': !0, ...r, ref: t })
      : null;
  });
Ng.displayName = Tg;
var lu = 'SelectScrollUpButton',
  Rg = c.forwardRef((e, t) => {
    const n = Mn(lu, e.__scopeSelect),
      r = bc(lu, e.__scopeSelect),
      [o, i] = c.useState(!1),
      s = oe(t, r.onScrollButtonChange);
    return (
      Ae(() => {
        if (n.viewport && n.isPositioned) {
          let l = function () {
            const u = a.scrollTop > 0;
            i(u);
          };
          const a = n.viewport;
          return (
            l(),
            a.addEventListener('scroll', l),
            () => a.removeEventListener('scroll', l)
          );
        }
      }, [n.viewport, n.isPositioned]),
      o
        ? y.jsx(_g, {
            ...e,
            ref: s,
            onAutoScroll: () => {
              const { viewport: l, selectedItem: a } = n;
              l && a && (l.scrollTop = l.scrollTop - a.offsetHeight);
            },
          })
        : null
    );
  });
Rg.displayName = lu;
var au = 'SelectScrollDownButton',
  bg = c.forwardRef((e, t) => {
    const n = Mn(au, e.__scopeSelect),
      r = bc(au, e.__scopeSelect),
      [o, i] = c.useState(!1),
      s = oe(t, r.onScrollButtonChange);
    return (
      Ae(() => {
        if (n.viewport && n.isPositioned) {
          let l = function () {
            const u = a.scrollHeight - a.clientHeight,
              d = Math.ceil(a.scrollTop) < u;
            i(d);
          };
          const a = n.viewport;
          return (
            l(),
            a.addEventListener('scroll', l),
            () => a.removeEventListener('scroll', l)
          );
        }
      }, [n.viewport, n.isPositioned]),
      o
        ? y.jsx(_g, {
            ...e,
            ref: s,
            onAutoScroll: () => {
              const { viewport: l, selectedItem: a } = n;
              l && a && (l.scrollTop = l.scrollTop + a.offsetHeight);
            },
          })
        : null
    );
  });
bg.displayName = au;
var _g = c.forwardRef((e, t) => {
    const { __scopeSelect: n, onAutoScroll: r, ...o } = e,
      i = Mn('SelectScrollButton', n),
      s = c.useRef(null),
      l = fl(n),
      a = c.useCallback(() => {
        s.current !== null &&
          (window.clearInterval(s.current), (s.current = null));
      }, []);
    return (
      c.useEffect(() => () => a(), [a]),
      Ae(() => {
        var d;
        const u = l().find((h) => h.ref.current === document.activeElement);
        (d = u == null ? void 0 : u.ref.current) == null ||
          d.scrollIntoView({ block: 'nearest' });
      }, [l]),
      y.jsx(G.div, {
        'aria-hidden': !0,
        ...o,
        ref: t,
        style: { flexShrink: 0, ...o.style },
        onPointerDown: B(o.onPointerDown, () => {
          s.current === null && (s.current = window.setInterval(r, 50));
        }),
        onPointerMove: B(o.onPointerMove, () => {
          var u;
          ((u = i.onItemLeave) == null || u.call(i),
            s.current === null && (s.current = window.setInterval(r, 50)));
        }),
        onPointerLeave: B(o.onPointerLeave, () => {
          a();
        }),
      })
    );
  }),
  Ak = 'SelectSeparator',
  Og = c.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return y.jsx(G.div, { 'aria-hidden': !0, ...r, ref: t });
  });
Og.displayName = Ak;
var uu = 'SelectArrow',
  jk = c.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e,
      o = pl(n),
      i = jn(uu, n),
      s = Mn(uu, n);
    return i.open && s.position === 'popper'
      ? y.jsx(Av, { ...o, ...r, ref: t })
      : null;
  });
jk.displayName = uu;
function Ag(e) {
  return e === '' || e === void 0;
}
var jg = c.forwardRef((e, t) => {
  const { value: n, ...r } = e,
    o = c.useRef(null),
    i = oe(t, o),
    s = Wv(n);
  return (
    c.useEffect(() => {
      const l = o.current,
        a = window.HTMLSelectElement.prototype,
        d = Object.getOwnPropertyDescriptor(a, 'value').set;
      if (s !== n && d) {
        const h = new Event('change', { bubbles: !0 });
        (d.call(l, n), l.dispatchEvent(h));
      }
    }, [s, n]),
    y.jsx(ci, {
      asChild: !0,
      children: y.jsx('select', { ...r, ref: i, defaultValue: n }),
    })
  );
});
jg.displayName = 'BubbleSelect';
function Mg(e) {
  const t = et(e),
    n = c.useRef(''),
    r = c.useRef(0),
    o = c.useCallback(
      (s) => {
        const l = n.current + s;
        (t(l),
          (function a(u) {
            ((n.current = u),
              window.clearTimeout(r.current),
              u !== '' && (r.current = window.setTimeout(() => a(''), 1e3)));
          })(l));
      },
      [t]
    ),
    i = c.useCallback(() => {
      ((n.current = ''), window.clearTimeout(r.current));
    }, []);
  return (
    c.useEffect(() => () => window.clearTimeout(r.current), []),
    [n, o, i]
  );
}
function Dg(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t,
    i = n ? e.indexOf(n) : -1;
  let s = Mk(e, Math.max(i, 0));
  o.length === 1 && (s = s.filter((u) => u !== n));
  const a = s.find((u) =>
    u.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return a !== n ? a : void 0;
}
function Mk(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Dk = ag,
  Ig = cg,
  Ik = fg,
  Lk = pg,
  Fk = hg,
  Lg = mg,
  zk = wg,
  Fg = Cg,
  zg = kg,
  $k = Pg,
  Uk = Ng,
  $g = Rg,
  Ug = bg,
  Vg = Og;
const jf = Dk,
  Mf = Ik,
  cu = c.forwardRef(({ className: e, children: t, ...n }, r) =>
    y.jsxs(Ig, {
      ref: r,
      className: q(
        'flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        e
      ),
      ...n,
      children: [
        t,
        y.jsx(Lk, {
          asChild: !0,
          children: y.jsx(qm, { className: 'h-4 w-4 opacity-50' }),
        }),
      ],
    })
  );
cu.displayName = Ig.displayName;
const Bg = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx($g, {
    ref: n,
    className: q('flex cursor-default items-center justify-center py-1', e),
    ...t,
    children: y.jsx(K1, { className: 'h-4 w-4' }),
  })
);
Bg.displayName = $g.displayName;
const Wg = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx(Ug, {
    ref: n,
    className: q('flex cursor-default items-center justify-center py-1', e),
    ...t,
    children: y.jsx(qm, { className: 'h-4 w-4' }),
  })
);
Wg.displayName = Ug.displayName;
const du = c.forwardRef(
  ({ className: e, children: t, position: n = 'popper', ...r }, o) =>
    y.jsx(Fk, {
      children: y.jsxs(Lg, {
        ref: o,
        className: q(
          'relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]',
          n === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          e
        ),
        position: n,
        ...r,
        children: [
          y.jsx(Bg, {}),
          y.jsx(zk, {
            className: q(
              'p-1',
              n === 'popper' &&
                'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
            ),
            children: t,
          }),
          y.jsx(Wg, {}),
        ],
      }),
    })
);
du.displayName = Lg.displayName;
const Vk = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx(Fg, {
    ref: n,
    className: q('py-1.5 pl-8 pr-2 text-sm font-semibold', e),
    ...t,
  })
);
Vk.displayName = Fg.displayName;
const on = c.forwardRef(({ className: e, children: t, ...n }, r) =>
  y.jsxs(zg, {
    ref: r,
    className: q(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      e
    ),
    ...n,
    children: [
      y.jsx('span', {
        className:
          'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
        children: y.jsx(Uk, { children: y.jsx(H1, { className: 'h-4 w-4' }) }),
      }),
      y.jsx($k, { children: t }),
    ],
  })
);
on.displayName = zg.displayName;
const Bk = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx(Vg, { ref: n, className: q('-mx-1 my-1 h-px bg-muted', e), ...t })
);
Bk.displayName = Vg.displayName;
function Wk({
  isOpen: e,
  onClose: t,
  autoSave: n,
  onAutoSaveChange: r,
  completionMode: o,
  onCompletionModeChange: i,
  writingStyle: s,
  onWritingStyleChange: l,
}) {
  return y.jsxs(y.Fragment, {
    children: [
      e &&
        y.jsx('div', {
          className: 'fixed inset-0 bg-background/80 backdrop-blur-sm z-40',
          onClick: t,
          'data-testid': 'overlay-settings',
        }),
      y.jsx('div', {
        className: `fixed top-0 right-0 h-full w-80 bg-card border-l shadow-xl z-50 transform transition-transform duration-200 ease-in-out ${e ? 'translate-x-0' : 'translate-x-full'}`,
        'data-testid': 'panel-settings',
        children: y.jsxs('div', {
          className: 'flex flex-col h-full',
          children: [
            y.jsxs('div', {
              className: 'flex items-center justify-between p-6 border-b',
              children: [
                y.jsx('h2', {
                  className: 'text-lg font-semibold',
                  children: 'Settings',
                }),
                y.jsx(Kn, {
                  size: 'icon',
                  variant: 'ghost',
                  onClick: t,
                  'data-testid': 'button-close-settings',
                  children: y.jsx(rl, { className: 'w-4 h-4' }),
                }),
              ],
            }),
            y.jsxs('div', {
              className: 'flex-1 overflow-y-auto p-6 space-y-6',
              children: [
                y.jsxs('div', {
                  className: 'space-y-4',
                  children: [
                    y.jsxs('div', {
                      className: 'flex items-center justify-between',
                      children: [
                        y.jsx(ts, {
                          htmlFor: 'auto-save',
                          className: 'text-sm font-medium',
                          children: 'Auto-save',
                        }),
                        y.jsx(Xv, {
                          id: 'auto-save',
                          checked: n,
                          onCheckedChange: r,
                          'data-testid': 'switch-auto-save',
                        }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: 'space-y-2',
                      children: [
                        y.jsx(ts, {
                          htmlFor: 'completion-mode',
                          className: 'text-sm font-medium',
                          children: 'Completion Mode',
                        }),
                        y.jsxs(jf, {
                          value: o,
                          onValueChange: (a) => i(a),
                          children: [
                            y.jsx(cu, {
                              id: 'completion-mode',
                              'data-testid': 'select-completion-mode',
                              children: y.jsx(Mf, {}),
                            }),
                            y.jsxs(du, {
                              children: [
                                y.jsx(on, {
                                  value: 'word',
                                  children: 'Word completion',
                                }),
                                y.jsx(on, {
                                  value: 'sentence',
                                  children: 'Sentence continuation',
                                }),
                                y.jsx(on, {
                                  value: 'paragraph',
                                  children: 'Paragraph expansion',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    y.jsxs('div', {
                      className: 'space-y-2',
                      children: [
                        y.jsx(ts, {
                          htmlFor: 'writing-style',
                          className: 'text-sm font-medium',
                          children: 'Writing Style',
                        }),
                        y.jsxs(jf, {
                          value: s,
                          onValueChange: (a) => l(a),
                          children: [
                            y.jsx(cu, {
                              id: 'writing-style',
                              'data-testid': 'select-writing-style',
                              children: y.jsx(Mf, {}),
                            }),
                            y.jsxs(du, {
                              children: [
                                y.jsx(on, {
                                  value: 'casual',
                                  children: 'Casual',
                                }),
                                y.jsx(on, {
                                  value: 'formal',
                                  children: 'Formal',
                                }),
                                y.jsx(on, {
                                  value: 'creative',
                                  children: 'Creative',
                                }),
                                y.jsx(on, {
                                  value: 'technical',
                                  children: 'Technical',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                y.jsxs('div', {
                  className: 'pt-4 border-t',
                  children: [
                    y.jsx('h3', {
                      className: 'text-sm font-medium mb-2',
                      children: 'About',
                    }),
                    y.jsx('p', {
                      className:
                        'text-xs text-muted-foreground leading-relaxed',
                      children:
                        'AI Text Completion Editor helps you write faster with intelligent suggestions based on your writing patterns and style.',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
var _c = 'Dialog',
  [Hg, kP] = or(_c),
  [Hk, Et] = Hg(_c),
  Kg = (e) => {
    const {
        __scopeDialog: t,
        children: n,
        open: r,
        defaultOpen: o,
        onOpenChange: i,
        modal: s = !0,
      } = e,
      l = c.useRef(null),
      a = c.useRef(null),
      [u = !1, d] = Jo({ prop: r, defaultProp: o, onChange: i });
    return y.jsx(Hk, {
      scope: t,
      triggerRef: l,
      contentRef: a,
      contentId: Rr(),
      titleId: Rr(),
      descriptionId: Rr(),
      open: u,
      onOpenChange: d,
      onOpenToggle: c.useCallback(() => d((h) => !h), [d]),
      modal: s,
      children: n,
    });
  };
Kg.displayName = _c;
var Qg = 'DialogTrigger',
  Kk = c.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Et(Qg, n),
      i = oe(t, o.triggerRef);
    return y.jsx(G.button, {
      type: 'button',
      'aria-haspopup': 'dialog',
      'aria-expanded': o.open,
      'aria-controls': o.contentId,
      'data-state': jc(o.open),
      ...r,
      ref: i,
      onClick: B(e.onClick, o.onOpenToggle),
    });
  });
Kk.displayName = Qg;
var Oc = 'DialogPortal',
  [Qk, Gg] = Hg(Oc, { forceMount: void 0 }),
  Yg = (e) => {
    const { __scopeDialog: t, forceMount: n, children: r, container: o } = e,
      i = Et(Oc, t);
    return y.jsx(Qk, {
      scope: t,
      forceMount: n,
      children: c.Children.map(r, (s) =>
        y.jsx(eo, {
          present: n || i.open,
          children: y.jsx(el, { asChild: !0, container: o, children: s }),
        })
      ),
    });
  };
Yg.displayName = Oc;
var Ms = 'DialogOverlay',
  Xg = c.forwardRef((e, t) => {
    const n = Gg(Ms, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      i = Et(Ms, e.__scopeDialog);
    return i.modal
      ? y.jsx(eo, {
          present: r || i.open,
          children: y.jsx(Yk, { ...o, ref: t }),
        })
      : null;
  });
Xg.displayName = Ms;
var Gk = Gr('DialogOverlay.RemoveScroll'),
  Yk = c.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Et(Ms, n);
    return y.jsx(Rc, {
      as: Gk,
      allowPinchZoom: !0,
      shards: [o.contentRef],
      children: y.jsx(G.div, {
        'data-state': jc(o.open),
        ...r,
        ref: t,
        style: { pointerEvents: 'auto', ...r.style },
      }),
    });
  }),
  er = 'DialogContent',
  qg = c.forwardRef((e, t) => {
    const n = Gg(er, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      i = Et(er, e.__scopeDialog);
    return y.jsx(eo, {
      present: r || i.open,
      children: i.modal
        ? y.jsx(Xk, { ...o, ref: t })
        : y.jsx(qk, { ...o, ref: t }),
    });
  });
qg.displayName = er;
var Xk = c.forwardRef((e, t) => {
    const n = Et(er, e.__scopeDialog),
      r = c.useRef(null),
      o = oe(t, n.contentRef, r);
    return (
      c.useEffect(() => {
        const i = r.current;
        if (i) return eg(i);
      }, []),
      y.jsx(Zg, {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: B(e.onCloseAutoFocus, (i) => {
          var s;
          (i.preventDefault(), (s = n.triggerRef.current) == null || s.focus());
        }),
        onPointerDownOutside: B(e.onPointerDownOutside, (i) => {
          const s = i.detail.originalEvent,
            l = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || l) && i.preventDefault();
        }),
        onFocusOutside: B(e.onFocusOutside, (i) => i.preventDefault()),
      })
    );
  }),
  qk = c.forwardRef((e, t) => {
    const n = Et(er, e.__scopeDialog),
      r = c.useRef(!1),
      o = c.useRef(!1);
    return y.jsx(Zg, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (i) => {
        var s, l;
        ((s = e.onCloseAutoFocus) == null || s.call(e, i),
          i.defaultPrevented ||
            (r.current || (l = n.triggerRef.current) == null || l.focus(),
            i.preventDefault()),
          (r.current = !1),
          (o.current = !1));
      },
      onInteractOutside: (i) => {
        var a, u;
        ((a = e.onInteractOutside) == null || a.call(e, i),
          i.defaultPrevented ||
            ((r.current = !0),
            i.detail.originalEvent.type === 'pointerdown' && (o.current = !0)));
        const s = i.target;
        (((u = n.triggerRef.current) == null ? void 0 : u.contains(s)) &&
          i.preventDefault(),
          i.detail.originalEvent.type === 'focusin' &&
            o.current &&
            i.preventDefault());
      },
    });
  }),
  Zg = c.forwardRef((e, t) => {
    const {
        __scopeDialog: n,
        trapFocus: r,
        onOpenAutoFocus: o,
        onCloseAutoFocus: i,
        ...s
      } = e,
      l = Et(er, n),
      a = c.useRef(null),
      u = oe(t, a);
    return (
      qv(),
      y.jsxs(y.Fragment, {
        children: [
          y.jsx(Nc, {
            asChild: !0,
            loop: !0,
            trapped: r,
            onMountAutoFocus: o,
            onUnmountAutoFocus: i,
            children: y.jsx(ui, {
              role: 'dialog',
              id: l.contentId,
              'aria-describedby': l.descriptionId,
              'aria-labelledby': l.titleId,
              'data-state': jc(l.open),
              ...s,
              ref: u,
              onDismiss: () => l.onOpenChange(!1),
            }),
          }),
          y.jsxs(y.Fragment, {
            children: [
              y.jsx(Zk, { titleId: l.titleId }),
              y.jsx(eP, { contentRef: a, descriptionId: l.descriptionId }),
            ],
          }),
        ],
      })
    );
  }),
  Ac = 'DialogTitle',
  Jg = c.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Et(Ac, n);
    return y.jsx(G.h2, { id: o.titleId, ...r, ref: t });
  });
Jg.displayName = Ac;
var ey = 'DialogDescription',
  ty = c.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Et(ey, n);
    return y.jsx(G.p, { id: o.descriptionId, ...r, ref: t });
  });
ty.displayName = ey;
var ny = 'DialogClose',
  ry = c.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Et(ny, n);
    return y.jsx(G.button, {
      type: 'button',
      ...r,
      ref: t,
      onClick: B(e.onClick, () => o.onOpenChange(!1)),
    });
  });
ry.displayName = ny;
function jc(e) {
  return e ? 'open' : 'closed';
}
var oy = 'DialogTitleWarning',
  [PP, iy] = Jx(oy, { contentName: er, titleName: Ac, docsSlug: 'dialog' }),
  Zk = ({ titleId: e }) => {
    const t = iy(oy),
      n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
    return (
      c.useEffect(() => {
        e && (document.getElementById(e) || console.error(n));
      }, [n, e]),
      null
    );
  },
  Jk = 'DialogDescriptionWarning',
  eP = ({ contentRef: e, descriptionId: t }) => {
    const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${iy(Jk).contentName}}.`;
    return (
      c.useEffect(() => {
        var i;
        const o =
          (i = e.current) == null ? void 0 : i.getAttribute('aria-describedby');
        t && o && (document.getElementById(t) || console.warn(r));
      }, [r, e, t]),
      null
    );
  },
  tP = Kg,
  nP = Yg,
  sy = Xg,
  ly = qg,
  ay = Jg,
  uy = ty,
  rP = ry;
const oP = tP,
  iP = nP,
  cy = c.forwardRef(({ className: e, ...t }, n) =>
    y.jsx(sy, {
      ref: n,
      className: q(
        'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        e
      ),
      ...t,
    })
  );
cy.displayName = sy.displayName;
const dy = c.forwardRef(({ className: e, children: t, ...n }, r) =>
  y.jsxs(iP, {
    children: [
      y.jsx(cy, {}),
      y.jsxs(ly, {
        ref: r,
        className: q(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          e
        ),
        ...n,
        children: [
          t,
          y.jsxs(rP, {
            className:
              'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
            children: [
              y.jsx(rl, { className: 'h-4 w-4' }),
              y.jsx('span', { className: 'sr-only', children: 'Close' }),
            ],
          }),
        ],
      }),
    ],
  })
);
dy.displayName = ly.displayName;
const fy = ({ className: e, ...t }) =>
  y.jsx('div', {
    className: q('flex flex-col space-y-1.5 text-center sm:text-left', e),
    ...t,
  });
fy.displayName = 'DialogHeader';
const py = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx(ay, {
    ref: n,
    className: q('text-lg font-semibold leading-none tracking-tight', e),
    ...t,
  })
);
py.displayName = ay.displayName;
const sP = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx(uy, { ref: n, className: q('text-sm text-muted-foreground', e), ...t })
);
sP.displayName = uy.displayName;
const lP = [
  { keys: ['Tab'], description: 'Accept AI suggestion' },
  { keys: ['Esc'], description: 'Dismiss AI suggestion' },
  { keys: ['Ctrl', 'S'], description: 'Save document' },
  { keys: ['Ctrl', 'E'], description: 'Export document' },
  { keys: ['Ctrl', ','], description: 'Open settings' },
  { keys: ['Ctrl', '/'], description: 'Show keyboard shortcuts' },
];
function aP({ isOpen: e, onClose: t }) {
  return y.jsx(oP, {
    open: e,
    onOpenChange: t,
    children: y.jsxs(dy, {
      className: 'sm:max-w-md',
      'data-testid': 'modal-shortcuts',
      children: [
        y.jsxs(fy, {
          children: [
            y.jsx(py, { children: 'Keyboard Shortcuts' }),
            y.jsx(Kn, {
              size: 'icon',
              variant: 'ghost',
              onClick: t,
              className: 'absolute right-4 top-4',
              'data-testid': 'button-close-shortcuts',
              children: y.jsx(rl, { className: 'w-4 h-4' }),
            }),
          ],
        }),
        y.jsx('div', {
          className: 'grid gap-3 py-4',
          children: lP.map((n, r) =>
            y.jsxs(
              'div',
              {
                className: 'flex items-center justify-between py-2',
                'data-testid': `shortcut-${r}`,
                children: [
                  y.jsx('span', {
                    className: 'text-sm text-muted-foreground',
                    children: n.description,
                  }),
                  y.jsx('div', {
                    className: 'flex gap-1',
                    children: n.keys.map((o, i) =>
                      y.jsx(
                        'kbd',
                        {
                          className:
                            'px-2 py-1 bg-muted rounded text-xs font-mono',
                          children: o,
                        },
                        i
                      )
                    ),
                  }),
                ],
              },
              r
            )
          ),
        }),
      ],
    }),
  });
}
function uP() {
  const [e, t] = c.useState('Untitled Document'),
    [n, r] = c.useState(''),
    [o, i] = c.useState(0),
    [s, l] = c.useState(0),
    [a, u] = c.useState(0),
    [d, h] = c.useState('ready'),
    [v, x] = c.useState(!1),
    [S, p] = c.useState(!1),
    [w, m] = c.useState(!0),
    [f, g] = c.useState('sentence'),
    [C, E] = c.useState('casual');
  (c.useEffect(() => {
    const k = n.trim().split(/\s+/).filter(Boolean);
    (i(k.length), l(n.length));
  }, [n]),
    c.useEffect(() => {
      const k = (P) => {
        (P.ctrlKey || P.metaKey) && P.key === 's'
          ? (P.preventDefault(), console.log('Document saved'))
          : (P.ctrlKey || P.metaKey) && P.key === 'e'
            ? (P.preventDefault(), T())
            : (P.ctrlKey || P.metaKey) && P.key === ','
              ? (P.preventDefault(), x(!0))
              : (P.ctrlKey || P.metaKey) &&
                P.key === '/' &&
                (P.preventDefault(), p(!0));
      };
      return (
        window.addEventListener('keydown', k),
        () => window.removeEventListener('keydown', k)
      );
    }, []));
  const T = () => {
    const k = new Blob([n], { type: 'text/plain' }),
      P = URL.createObjectURL(k),
      A = document.createElement('a');
    ((A.href = P),
      (A.download = `${e || 'document'}.txt`),
      A.click(),
      URL.revokeObjectURL(P),
      console.log('Document exported'));
  };
  return y.jsxs('div', {
    className: 'flex flex-col h-screen bg-background',
    children: [
      y.jsx(dE, {
        documentTitle: e,
        onTitleChange: t,
        onSettingsClick: () => x(!0),
        onExportClick: T,
      }),
      y.jsx('main', {
        className: 'flex-1 overflow-auto',
        children: y.jsx('div', {
          className: 'max-w-3xl mx-auto px-8 md:px-16 py-12 md:py-20 h-full',
          children: y.jsx(fE, {
            onTextChange: r,
            onSuggestionAccept: () => u((k) => k + 1),
            completionMode: f,
            writingStyle: C,
          }),
        }),
      }),
      y.jsx(pE, {
        wordCount: o,
        charCount: s,
        suggestionsAccepted: a,
        aiStatus: d,
        onKeyboardShortcutsClick: () => p(!0),
      }),
      y.jsx(Wk, {
        isOpen: v,
        onClose: () => x(!1),
        autoSave: w,
        onAutoSaveChange: m,
        completionMode: f,
        onCompletionModeChange: g,
        writingStyle: C,
        onWritingStyleChange: E,
      }),
      y.jsx(aP, { isOpen: S, onClose: () => p(!1) }),
    ],
  });
}
const hy = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx('div', {
    ref: n,
    className: q(
      'shadcn-card rounded-xl border bg-card border-card-border text-card-foreground shadow-sm',
      e
    ),
    ...t,
  })
);
hy.displayName = 'Card';
const cP = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx('div', {
    ref: n,
    className: q('flex flex-col space-y-1.5 p-6', e),
    ...t,
  })
);
cP.displayName = 'CardHeader';
const dP = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx('div', {
    ref: n,
    className: q('text-2xl font-semibold leading-none tracking-tight', e),
    ...t,
  })
);
dP.displayName = 'CardTitle';
const fP = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx('div', {
    ref: n,
    className: q('text-sm text-muted-foreground', e),
    ...t,
  })
);
fP.displayName = 'CardDescription';
const my = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx('div', { ref: n, className: q('p-6 pt-0', e), ...t })
);
my.displayName = 'CardContent';
const pP = c.forwardRef(({ className: e, ...t }, n) =>
  y.jsx('div', { ref: n, className: q('flex items-center p-6 pt-0', e), ...t })
);
pP.displayName = 'CardFooter';
function hP() {
  return y.jsx('div', {
    className:
      'min-h-screen w-full flex items-center justify-center bg-gray-50',
    children: y.jsx(hy, {
      className: 'w-full max-w-md mx-4',
      children: y.jsxs(my, {
        className: 'pt-6',
        children: [
          y.jsxs('div', {
            className: 'flex mb-4 gap-2',
            children: [
              y.jsx(Q1, { className: 'h-8 w-8 text-red-500' }),
              y.jsx('h1', {
                className: 'text-2xl font-bold text-gray-900',
                children: '404 Page Not Found',
              }),
            ],
          }),
          y.jsx('p', {
            className: 'mt-4 text-sm text-gray-600',
            children: 'Did you forget to add the page to the router?',
          }),
        ],
      }),
    }),
  });
}
function mP() {
  return y.jsxs(wx, {
    children: [
      y.jsx(Yd, { path: '/', component: uP }),
      y.jsx(Yd, { component: hP }),
    ],
  });
}
function vP() {
  return y.jsx(Bx, {
    client: Kx,
    children: y.jsx(aE, {
      defaultTheme: 'dark',
      children: y.jsxs(sE, { children: [y.jsx(MS, {}), y.jsx(mP, {})] }),
    }),
  });
}
rm(document.getElementById('root')).render(y.jsx(vP, {}));
