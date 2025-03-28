"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/lunr-languages/lunr.stemmer.support.js
var require_lunr_stemmer_support = __commonJS({
  "node_modules/lunr-languages/lunr.stemmer.support.js"(exports, module2) {
    "use strict";
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof exports === "object") {
        module2.exports = factory();
      } else {
        factory()(root.lunr);
      }
    })(exports, function() {
      return function(lunr) {
        lunr.stemmerSupport = {
          Among: function(s, substring_i, result, method) {
            this.toCharArray = function(s2) {
              var sLength = s2.length, charArr = new Array(sLength);
              for (var i = 0; i < sLength; i++)
                charArr[i] = s2.charCodeAt(i);
              return charArr;
            };
            if (!s && s != "" || !substring_i && substring_i != 0 || !result)
              throw "Bad Among initialisation: s:" + s + ", substring_i: " + substring_i + ", result: " + result;
            this.s_size = s.length;
            this.s = this.toCharArray(s);
            this.substring_i = substring_i;
            this.result = result;
            this.method = method;
          },
          SnowballProgram: function() {
            var current;
            return {
              bra: 0,
              ket: 0,
              limit: 0,
              cursor: 0,
              limit_backward: 0,
              setCurrent: function(word) {
                current = word;
                this.cursor = 0;
                this.limit = word.length;
                this.limit_backward = 0;
                this.bra = this.cursor;
                this.ket = this.limit;
              },
              getCurrent: function() {
                var result = current;
                current = null;
                return result;
              },
              in_grouping: function(s, min, max) {
                if (this.cursor < this.limit) {
                  var ch = current.charCodeAt(this.cursor);
                  if (ch <= max && ch >= min) {
                    ch -= min;
                    if (s[ch >> 3] & 1 << (ch & 7)) {
                      this.cursor++;
                      return true;
                    }
                  }
                }
                return false;
              },
              in_grouping_b: function(s, min, max) {
                if (this.cursor > this.limit_backward) {
                  var ch = current.charCodeAt(this.cursor - 1);
                  if (ch <= max && ch >= min) {
                    ch -= min;
                    if (s[ch >> 3] & 1 << (ch & 7)) {
                      this.cursor--;
                      return true;
                    }
                  }
                }
                return false;
              },
              out_grouping: function(s, min, max) {
                if (this.cursor < this.limit) {
                  var ch = current.charCodeAt(this.cursor);
                  if (ch > max || ch < min) {
                    this.cursor++;
                    return true;
                  }
                  ch -= min;
                  if (!(s[ch >> 3] & 1 << (ch & 7))) {
                    this.cursor++;
                    return true;
                  }
                }
                return false;
              },
              out_grouping_b: function(s, min, max) {
                if (this.cursor > this.limit_backward) {
                  var ch = current.charCodeAt(this.cursor - 1);
                  if (ch > max || ch < min) {
                    this.cursor--;
                    return true;
                  }
                  ch -= min;
                  if (!(s[ch >> 3] & 1 << (ch & 7))) {
                    this.cursor--;
                    return true;
                  }
                }
                return false;
              },
              eq_s: function(s_size, s) {
                if (this.limit - this.cursor < s_size)
                  return false;
                for (var i = 0; i < s_size; i++)
                  if (current.charCodeAt(this.cursor + i) != s.charCodeAt(i))
                    return false;
                this.cursor += s_size;
                return true;
              },
              eq_s_b: function(s_size, s) {
                if (this.cursor - this.limit_backward < s_size)
                  return false;
                for (var i = 0; i < s_size; i++)
                  if (current.charCodeAt(this.cursor - s_size + i) != s.charCodeAt(i))
                    return false;
                this.cursor -= s_size;
                return true;
              },
              find_among: function(v, v_size) {
                var i = 0, j = v_size, c = this.cursor, l = this.limit, common_i = 0, common_j = 0, first_key_inspected = false;
                while (true) {
                  var k = i + (j - i >> 1), diff = 0, common = common_i < common_j ? common_i : common_j, w = v[k];
                  for (var i2 = common; i2 < w.s_size; i2++) {
                    if (c + common == l) {
                      diff = -1;
                      break;
                    }
                    diff = current.charCodeAt(c + common) - w.s[i2];
                    if (diff)
                      break;
                    common++;
                  }
                  if (diff < 0) {
                    j = k;
                    common_j = common;
                  } else {
                    i = k;
                    common_i = common;
                  }
                  if (j - i <= 1) {
                    if (i > 0 || j == i || first_key_inspected)
                      break;
                    first_key_inspected = true;
                  }
                }
                while (true) {
                  var w = v[i];
                  if (common_i >= w.s_size) {
                    this.cursor = c + w.s_size;
                    if (!w.method)
                      return w.result;
                    var res = w.method();
                    this.cursor = c + w.s_size;
                    if (res)
                      return w.result;
                  }
                  i = w.substring_i;
                  if (i < 0)
                    return 0;
                }
              },
              find_among_b: function(v, v_size) {
                var i = 0, j = v_size, c = this.cursor, lb = this.limit_backward, common_i = 0, common_j = 0, first_key_inspected = false;
                while (true) {
                  var k = i + (j - i >> 1), diff = 0, common = common_i < common_j ? common_i : common_j, w = v[k];
                  for (var i2 = w.s_size - 1 - common; i2 >= 0; i2--) {
                    if (c - common == lb) {
                      diff = -1;
                      break;
                    }
                    diff = current.charCodeAt(c - 1 - common) - w.s[i2];
                    if (diff)
                      break;
                    common++;
                  }
                  if (diff < 0) {
                    j = k;
                    common_j = common;
                  } else {
                    i = k;
                    common_i = common;
                  }
                  if (j - i <= 1) {
                    if (i > 0 || j == i || first_key_inspected)
                      break;
                    first_key_inspected = true;
                  }
                }
                while (true) {
                  var w = v[i];
                  if (common_i >= w.s_size) {
                    this.cursor = c - w.s_size;
                    if (!w.method)
                      return w.result;
                    var res = w.method();
                    this.cursor = c - w.s_size;
                    if (res)
                      return w.result;
                  }
                  i = w.substring_i;
                  if (i < 0)
                    return 0;
                }
              },
              replace_s: function(c_bra, c_ket, s) {
                var adjustment = s.length - (c_ket - c_bra), left = current.substring(0, c_bra), right = current.substring(c_ket);
                current = left + s + right;
                this.limit += adjustment;
                if (this.cursor >= c_ket)
                  this.cursor += adjustment;
                else if (this.cursor > c_bra)
                  this.cursor = c_bra;
                return adjustment;
              },
              slice_check: function() {
                if (this.bra < 0 || this.bra > this.ket || this.ket > this.limit || this.limit > current.length)
                  throw "faulty slice operation";
              },
              slice_from: function(s) {
                this.slice_check();
                this.replace_s(this.bra, this.ket, s);
              },
              slice_del: function() {
                this.slice_from("");
              },
              insert: function(c_bra, c_ket, s) {
                var adjustment = this.replace_s(c_bra, c_ket, s);
                if (c_bra <= this.bra)
                  this.bra += adjustment;
                if (c_bra <= this.ket)
                  this.ket += adjustment;
              },
              slice_to: function() {
                this.slice_check();
                return current.substring(this.bra, this.ket);
              },
              eq_v_b: function(s) {
                return this.eq_s_b(s.length, s);
              }
            };
          }
        };
        lunr.trimmerSupport = {
          generateTrimmer: function(wordCharacters) {
            var startRegex = new RegExp("^[^" + wordCharacters + "]+");
            var endRegex = new RegExp("[^" + wordCharacters + "]+$");
            return function(token) {
              if (typeof token.update === "function") {
                return token.update(function(s) {
                  return s.replace(startRegex, "").replace(endRegex, "");
                });
              } else {
                return token.replace(startRegex, "").replace(endRegex, "");
              }
            };
          }
        };
      };
    });
  }
});

// node_modules/lunr-languages/lunr.multi.js
var require_lunr_multi = __commonJS({
  "node_modules/lunr-languages/lunr.multi.js"(exports, module2) {
    "use strict";
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof exports === "object") {
        module2.exports = factory();
      } else {
        factory()(root.lunr);
      }
    })(exports, function() {
      return function(lunr) {
        lunr.multiLanguage = function() {
          var languages = Array.prototype.slice.call(arguments);
          var nameSuffix = languages.join("-");
          var wordCharacters = "";
          var pipeline = [];
          var searchPipeline = [];
          for (var i = 0; i < languages.length; ++i) {
            if (languages[i] == "en") {
              wordCharacters += "\\w";
              pipeline.unshift(lunr.stopWordFilter);
              pipeline.push(lunr.stemmer);
              searchPipeline.push(lunr.stemmer);
            } else {
              wordCharacters += lunr[languages[i]].wordCharacters;
              if (lunr[languages[i]].stopWordFilter) {
                pipeline.unshift(lunr[languages[i]].stopWordFilter);
              }
              if (lunr[languages[i]].stemmer) {
                pipeline.push(lunr[languages[i]].stemmer);
                searchPipeline.push(lunr[languages[i]].stemmer);
              }
            }
          }
          ;
          var multiTrimmer = lunr.trimmerSupport.generateTrimmer(wordCharacters);
          lunr.Pipeline.registerFunction(multiTrimmer, "lunr-multi-trimmer-" + nameSuffix);
          pipeline.unshift(multiTrimmer);
          return function() {
            this.pipeline.reset();
            this.pipeline.add.apply(this.pipeline, pipeline);
            if (this.searchPipeline) {
              this.searchPipeline.reset();
              this.searchPipeline.add.apply(this.searchPipeline, searchPipeline);
            }
          };
        };
      };
    });
  }
});

// node_modules/lunr-languages/lunr.ko.js
var require_lunr_ko = __commonJS({
  "node_modules/lunr-languages/lunr.ko.js"(exports, module2) {
    "use strict";
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof exports === "object") {
        module2.exports = factory();
      } else {
        factory()(root.lunr);
      }
    })(exports, function() {
      return function(lunr) {
        if ("undefined" === typeof lunr) {
          throw new Error("Lunr is not present. Please include / require Lunr before this script.");
        }
        if ("undefined" === typeof lunr.stemmerSupport) {
          throw new Error("Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.");
        }
        lunr.ko = function() {
          this.pipeline.reset();
          this.pipeline.add(
            lunr.ko.trimmer,
            lunr.ko.stopWordFilter
          );
        };
        lunr.ko.wordCharacters = "[A-Za-z\uAC00-\uD7A3]";
        lunr.ko.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.ko.wordCharacters);
        lunr.Pipeline.registerFunction(lunr.ko.trimmer, "trimmer-ko");
        lunr.ko.stopWordFilter = lunr.generateStopWordFilter("\uC544 \uD734 \uC544\uC774\uAD6C \uC544\uC774\uCFE0 \uC544\uC774\uACE0 \uC5B4 \uB098 \uC6B0\uB9AC \uC800\uD76C \uB530\uB77C \uC758\uD574 \uC744 \uB97C \uC5D0 \uC758 \uAC00 \uC73C\uB85C \uB85C \uC5D0\uAC8C \uBFD0\uC774\uB2E4 \uC758\uAC70\uD558\uC5EC \uADFC\uAC70\uD558\uC5EC \uC785\uAC01\uD558\uC5EC \uAE30\uC900\uC73C\uB85C \uC608\uD558\uBA74 \uC608\uB97C \uB4E4\uBA74 \uC608\uB97C \uB4E4\uC790\uBA74 \uC800 \uC18C\uC778 \uC18C\uC0DD \uC800\uD76C \uC9C0\uB9D0\uACE0 \uD558\uC9C0\uB9C8 \uD558\uC9C0\uB9C8\uB77C \uB2E4\uB978 \uBB3C\uB860 \uB610\uD55C \uADF8\uB9AC\uACE0 \uBE44\uAE38\uC218 \uC5C6\uB2E4 \uD574\uC11C\uB294 \uC548\uB41C\uB2E4 \uBFD0\uB9CC \uC544\uB2C8\uB77C \uB9CC\uC774 \uC544\uB2C8\uB2E4 \uB9CC\uC740 \uC544\uB2C8\uB2E4 \uB9C9\uB860\uD558\uACE0 \uAD00\uACC4\uC5C6\uC774 \uADF8\uCE58\uC9C0 \uC54A\uB2E4 \uADF8\uB7EC\uB098 \uADF8\uB7F0\uB370 \uD558\uC9C0\uB9CC \uB4E0\uAC04\uC5D0 \uB17C\uD558\uC9C0 \uC54A\uB2E4 \uB530\uC9C0\uC9C0 \uC54A\uB2E4 \uC124\uC0AC \uBE44\uB85D \uB354\uB77C\uB3C4 \uC544\uB2C8\uBA74 \uB9CC \uBABB\uD558\uB2E4 \uD558\uB294 \uD3B8\uC774 \uB0AB\uB2E4 \uBD88\uBB38\uD558\uACE0 \uD5A5\uD558\uC5EC \uD5A5\uD574\uC11C \uD5A5\uD558\uB2E4 \uCABD\uC73C\uB85C \uD2C8\uD0C0 \uC774\uC6A9\uD558\uC5EC \uD0C0\uB2E4 \uC624\uB974\uB2E4 \uC81C\uC678\uD558\uACE0 \uC774 \uC678\uC5D0 \uC774 \uBC16\uC5D0 \uD558\uC5EC\uC57C \uBE44\uB85C\uC18C \uD55C\uB2E4\uBA74 \uBAB0\uB77C\uB3C4 \uC678\uC5D0\uB3C4 \uC774\uACF3 \uC5EC\uAE30 \uBD80\uD130 \uAE30\uC810\uC73C\uB85C \uB530\uB77C\uC11C \uD560 \uC0DD\uAC01\uC774\uB2E4 \uD558\uB824\uACE0\uD558\uB2E4 \uC774\uB9AC\uD558\uC5EC \uADF8\uB9AC\uD558\uC5EC \uADF8\uB807\uAC8C \uD568\uC73C\uB85C\uC368 \uD558\uC9C0\uB9CC \uC77C\uB54C \uD560\uB54C \uC55E\uC5D0\uC11C \uC911\uC5D0\uC11C \uBCF4\uB294\uB370\uC11C \uC73C\uB85C\uC368 \uB85C\uC368 \uAE4C\uC9C0 \uD574\uC57C\uD55C\uB2E4 \uC77C\uAC83\uC774\uB2E4 \uBC18\uB4DC\uC2DC \uD560\uC904\uC54C\uB2E4 \uD560\uC218\uC788\uB2E4 \uD560\uC218\uC788\uC5B4 \uC784\uC5D0 \uD2C0\uB9BC\uC5C6\uB2E4 \uD55C\uB2E4\uBA74 \uB4F1 \uB4F1\uB4F1 \uC81C \uACA8\uC6B0 \uB2E8\uC9C0 \uB2E4\uB9CC \uD560\uBFD0 \uB529\uB3D9 \uB315\uADF8 \uB300\uD574\uC11C \uB300\uD558\uC5EC \uB300\uD558\uBA74 \uD6E8\uC52C \uC5BC\uB9C8\uB098 \uC5BC\uB9C8\uB9CC\uD07C \uC5BC\uB9C8\uD07C \uB0A8\uC9D3 \uC5EC \uC5BC\uB9C8\uAC04 \uC57D\uAC04 \uB2E4\uC18C \uC880 \uC870\uAE08 \uB2E4\uC218 \uBA87 \uC5BC\uB9C8 \uC9C0\uB9CC \uD558\uBB3C\uBA70 \uB610\uD55C \uADF8\uB7EC\uB098 \uADF8\uB807\uC9C0\uB9CC \uD558\uC9C0\uB9CC \uC774\uC678\uC5D0\uB3C4 \uB300\uD574 \uB9D0\uD558\uC790\uBA74 \uBFD0\uC774\uB2E4 \uB2E4\uC74C\uC5D0 \uBC18\uB300\uB85C \uBC18\uB300\uB85C \uB9D0\uD558\uC790\uBA74 \uC774\uC640 \uBC18\uB300\uB85C \uBC14\uAFB8\uC5B4\uC11C \uB9D0\uD558\uBA74 \uBC14\uAFB8\uC5B4\uC11C \uD55C\uB2E4\uBA74 \uB9CC\uC57D \uADF8\uB807\uC9C0\uC54A\uC73C\uBA74 \uAE4C\uC545 \uD22D \uB531 \uC090\uAC71\uAC70\uB9AC\uB2E4 \uBCF4\uB4DC\uB4DD \uBE44\uAC71\uAC70\uB9AC\uB2E4 \uAF48\uB2F9 \uC751\uB2F9 \uD574\uC57C\uD55C\uB2E4 \uC5D0 \uAC00\uC11C \uAC01 \uAC01\uAC01 \uC5EC\uB7EC\uBD84 \uAC01\uC885 \uAC01\uC790 \uC81C\uAC01\uAE30 \uD558\uB3C4\uB85D\uD558\uB2E4 \uC640 \uACFC \uADF8\uB7EC\uBBC0\uB85C \uADF8\uB798\uC11C \uACE0\uB85C \uD55C \uAE4C\uB2ED\uC5D0 \uD558\uAE30 \uB54C\uBB38\uC5D0 \uAC70\uB2C8\uC640 \uC774\uC9C0\uB9CC \uB300\uD558\uC5EC \uAD00\uD558\uC5EC \uAD00\uD55C \uACFC\uC5F0 \uC2E4\uB85C \uC544\uB2C8\uB098\uB2E4\uB97C\uAC00 \uC0DD\uAC01\uD55C\uB300\uB85C \uC9C4\uC9DC\uB85C \uD55C\uC801\uC774\uC788\uB2E4 \uD558\uACE4\uD558\uC600\uB2E4 \uD558 \uD558\uD558 \uD5C8\uD5C8 \uC544\uD558 \uAC70\uBC14 \uC640 \uC624 \uC65C \uC5B4\uC9F8\uC11C \uBB34\uC5C7\uB54C\uBB38\uC5D0 \uC5B4\uCC0C \uD558\uACA0\uB294\uAC00 \uBB34\uC2A8 \uC5B4\uB514 \uC5B4\uB290\uACF3 \uB354\uAD70\uB2E4\uB098 \uD558\uBB3C\uBA70 \uB354\uC6B1\uC774\uB294 \uC5B4\uB290\uB54C \uC5B8\uC81C \uC57C \uC774\uBD10 \uC5B4\uC774 \uC5EC\uBCF4\uC2DC\uC624 \uD750\uD750 \uD765 \uD734 \uD5C9\uD5C9 \uD5D0\uB5A1\uD5D0\uB5A1 \uC601\uCC28 \uC5EC\uCC28 \uC5B4\uAE30\uC5EC\uCC28 \uB059\uB059 \uC544\uC57C \uC557 \uC544\uC57C \uCF78\uCF78 \uC878\uC878 \uC88D\uC88D \uB69D\uB69D \uC8FC\uB8E9\uC8FC\uB8E9 \uC1A8 \uC6B0\uB974\uB974 \uADF8\uB798\uB3C4 \uB610 \uADF8\uB9AC\uACE0 \uBC14\uAFB8\uC5B4\uB9D0\uD558\uBA74 \uBC14\uAFB8\uC5B4\uB9D0\uD558\uC790\uBA74 \uD639\uC740 \uD639\uC2DC \uB2F5\uB2E4 \uBC0F \uADF8\uC5D0 \uB530\uB974\uB294 \uB54C\uAC00 \uB418\uC5B4 \uC989 \uC9C0\uB4E0\uC9C0 \uC124\uB839 \uAC00\uB839 \uD558\uB354\uB77C\uB3C4 \uD560\uC9C0\uB77C\uB3C4 \uC77C\uC9C0\uB77C\uB3C4 \uC9C0\uB4E0\uC9C0 \uBA87 \uAC70\uC758 \uD558\uB9C8\uD130\uBA74 \uC778\uC820 \uC774\uC820 \uB41C\uBC14\uC5D0\uC57C \uB41C\uC774\uC0C1 \uB9CC\uD07C	\uC5B4\uCC0C\uB40F\uB4E0 \uADF8\uC704\uC5D0 \uAC8C\uB2E4\uAC00 \uC810\uC5D0\uC11C \uBCF4\uC544 \uBE44\uCD94\uC5B4 \uBCF4\uC544 \uACE0\uB824\uD558\uBA74 \uD558\uAC8C\uB420\uAC83\uC774\uB2E4 \uC77C\uAC83\uC774\uB2E4 \uBE44\uAD50\uC801 \uC880 \uBCF4\uB2E4\uB354 \uBE44\uD558\uBA74 \uC2DC\uD0A4\uB2E4 \uD558\uAC8C\uD558\uB2E4 \uD560\uB9CC\uD558\uB2E4 \uC758\uD574\uC11C \uC5F0\uC774\uC11C \uC774\uC5B4\uC11C \uC787\uB530\uB77C \uB4A4\uB530\uB77C \uB4A4\uC774\uC5B4 \uACB0\uAD6D \uC758\uC9C0\uD558\uC5EC \uAE30\uB300\uC5EC \uD1B5\uD558\uC5EC \uC790\uB9C8\uC790 \uB354\uC6B1\uB354 \uBD88\uAD6C\uD558\uACE0 \uC5BC\uB9C8\uB4E0\uC9C0 \uB9C8\uC74C\uB300\uB85C \uC8FC\uC800\uD558\uC9C0 \uC54A\uACE0 \uACE7 \uC989\uC2DC \uBC14\uB85C \uB2F9\uC7A5 \uD558\uC790\uB9C8\uC790 \uBC16\uC5D0 \uC548\uB41C\uB2E4 \uD558\uBA74\uB41C\uB2E4 \uADF8\uB798 \uADF8\uB807\uC9C0 \uC694\uCEE8\uB300 \uB2E4\uC2DC \uB9D0\uD558\uC790\uBA74 \uBC14\uAFD4 \uB9D0\uD558\uBA74 \uC989 \uAD6C\uCCB4\uC801\uC73C\uB85C \uB9D0\uD558\uC790\uBA74 \uC2DC\uC791\uD558\uC5EC \uC2DC\uCD08\uC5D0 \uC774\uC0C1 \uD5C8 \uD5C9 \uD5C8\uAC71 \uBC14\uC640\uAC19\uC774 \uD574\uB3C4\uC88B\uB2E4 \uD574\uB3C4\uB41C\uB2E4 \uAC8C\uB2E4\uAC00 \uB354\uAD6C\uB098 \uD558\uBB3C\uBA70 \uC640\uB974\uB974 \uD30D \uD37D \uD384\uB801 \uB3D9\uC548 \uC774\uB798 \uD558\uACE0\uC788\uC5C8\uB2E4 \uC774\uC5C8\uB2E4 \uC5D0\uC11C \uB85C\uBD80\uD130 \uAE4C\uC9C0 \uC608\uD558\uBA74 \uD588\uC5B4\uC694 \uD574\uC694 \uD568\uAED8 \uAC19\uC774 \uB354\uBD88\uC5B4 \uB9C8\uC800 \uB9C8\uC800\uB3C4 \uC591\uC790 \uBAA8\uB450 \uC2B5\uB2C8\uB2E4 \uAC00\uAE4C\uC2A4\uB85C \uD558\uB824\uACE0\uD558\uB2E4 \uC988\uC74C\uD558\uC5EC \uB2E4\uB978 \uB2E4\uB978 \uBC29\uBA74\uC73C\uB85C \uD574\uBD10\uC694 \uC2B5\uB2C8\uAE4C \uD588\uC5B4\uC694 \uB9D0\uD560\uAC83\uB3C4 \uC5C6\uACE0 \uBB34\uB98E\uC4F0\uACE0 \uAC1C\uC758\uCE58\uC54A\uACE0 \uD558\uB294\uAC83\uB9CC \uBABB\uD558\uB2E4 \uD558\uB294\uAC83\uC774 \uB0AB\uB2E4 \uB9E4 \uB9E4\uBC88 \uB4E4 \uBAA8 \uC5B4\uB290\uAC83 \uC5B4\uB290 \uB85C\uC368 \uAC16\uACE0\uB9D0\uD558\uC790\uBA74 \uC5B4\uB514 \uC5B4\uB290\uCABD \uC5B4\uB290\uAC83 \uC5B4\uB290\uD574 \uC5B4\uB290 \uB144\uB3C4 \uB77C \uD574\uB3C4 \uC5B8\uC820\uAC00 \uC5B4\uB5A4\uAC83 \uC5B4\uB290\uAC83 \uC800\uAE30 \uC800\uCABD \uC800\uAC83 \uADF8\uB54C \uADF8\uB7FC \uADF8\uB7EC\uBA74 \uC694\uB9CC\uD55C\uAC78 \uADF8\uB798 \uADF8\uB54C \uC800\uAC83\uB9CC\uD07C \uADF8\uC800 \uC774\uB974\uAE30\uAE4C\uC9C0 \uD560 \uC904 \uC548\uB2E4 \uD560 \uD798\uC774 \uC788\uB2E4 \uB108 \uB108\uD76C \uB2F9\uC2E0 \uC5B4\uCC0C \uC124\uB9C8 \uCC28\uB77C\uB9AC \uD560\uC9C0\uC5B8\uC815 \uD560\uC9C0\uB77C\uB3C4 \uD560\uB9DD\uC815 \uD560\uC9C0\uC5B8\uC815 \uAD6C\uD1A0\uD558\uB2E4 \uAC8C\uC6B0\uB2E4 \uD1A0\uD558\uB2E4 \uBA54\uC4F0\uAC81\uB2E4 \uC606\uC0AC\uB78C \uD264 \uCCC7 \uC758\uAC70\uD558\uC5EC \uADFC\uAC70\uD558\uC5EC \uC758\uD574 \uB530\uB77C \uD798\uC785\uC5B4 \uADF8 \uB2E4\uC74C \uBC84\uAE08 \uB450\uBC88\uC9F8\uB85C \uAE30\uD0C0 \uCCAB\uBC88\uC9F8\uB85C \uB098\uBA38\uC9C0\uB294 \uADF8\uC911\uC5D0\uC11C \uACAC\uC9C0\uC5D0\uC11C \uD615\uC2DD\uC73C\uB85C \uC4F0\uC5EC \uC785\uC7A5\uC5D0\uC11C \uC704\uD574\uC11C \uB2E8\uC9C0 \uC758\uD574\uB418\uB2E4 \uD558\uB3C4\uB85D\uC2DC\uD0A4\uB2E4 \uBFD0\uB9CC\uC544\uB2C8\uB77C \uBC18\uB300\uB85C \uC804\uD6C4 \uC804\uC790 \uC55E\uC758\uAC83 \uC7A0\uC2DC \uC7A0\uAE50 \uD558\uBA74\uC11C \uADF8\uB807\uC9C0\uB9CC \uB2E4\uC74C\uC5D0 \uADF8\uB7EC\uD55C\uC989 \uADF8\uB7F0\uC989 \uB0A8\uB4E4 \uC544\uBB34\uAC70\uB098 \uC5B4\uCC0C\uD558\uB4E0\uC9C0 \uAC19\uB2E4 \uBE44\uC2B7\uD558\uB2E4 \uC608\uCEE8\uB300 \uC774\uB7F4\uC815\uB3C4\uB85C \uC5B4\uB5BB\uAC8C \uB9CC\uC57D \uB9CC\uC77C \uC704\uC5D0\uC11C \uC11C\uC220\uD55C\uBC14\uC640\uAC19\uC774 \uC778 \uB4EF\uD558\uB2E4 \uD558\uC9C0 \uC54A\uB294\uB2E4\uBA74 \uB9CC\uC57D\uC5D0 \uBB34\uC5C7 \uBB34\uC2A8 \uC5B4\uB290 \uC5B4\uB5A4 \uC544\uB798\uC717 \uC870\uCC28 \uD55C\uB370 \uADF8\uB7FC\uC5D0\uB3C4 \uBD88\uAD6C\uD558\uACE0 \uC5EC\uC804\uD788 \uC2EC\uC9C0\uC5B4 \uAE4C\uC9C0\uB3C4 \uC870\uCC28\uB3C4 \uD558\uC9C0 \uC54A\uB3C4\uB85D \uC54A\uAE30 \uC704\uD558\uC5EC \uB54C \uC2DC\uAC01 \uBB34\uB835 \uC2DC\uAC04 \uB3D9\uC548 \uC5B4\uB54C \uC5B4\uB5A0\uD55C \uD558\uC5EC\uAE08 \uB124 \uC608 \uC6B0\uC120 \uB204\uAD6C \uB204\uAC00 \uC54C\uACA0\uB294\uAC00 \uC544\uBB34\uB3C4 \uC904\uC740\uBAA8\uB978\uB2E4 \uC904\uC740 \uBAB0\uB78F\uB2E4 \uD558\uB294 \uAE40\uC5D0 \uACB8\uC0AC\uACB8\uC0AC \uD558\uB294\uBC14 \uADF8\uB7F0 \uAE4C\uB2ED\uC5D0 \uD55C \uC774\uC720\uB294 \uADF8\uB7EC\uB2C8 \uADF8\uB7EC\uB2C8\uAE4C \uB54C\uBB38\uC5D0 \uADF8 \uB108\uD76C \uADF8\uB4E4 \uB108\uD76C\uB4E4 \uD0C0\uC778 \uAC83 \uAC83\uB4E4 \uB108 \uC704\uD558\uC5EC \uACF5\uB3D9\uC73C\uB85C \uB3D9\uC2DC\uC5D0 \uD558\uAE30 \uC704\uD558\uC5EC \uC5B4\uCC0C\uD558\uC5EC \uBB34\uC5C7\uB54C\uBB38\uC5D0 \uBD95\uBD95 \uC719\uC719 \uB098 \uC6B0\uB9AC \uC5C9\uC5C9 \uD718\uC775 \uC719\uC719 \uC624\uD638 \uC544\uD558 \uC5B4\uCA0B\uB4E0 \uB9CC \uBABB\uD558\uB2E4	\uD558\uAE30\uBCF4\uB2E4\uB294 \uCC28\uB77C\uB9AC \uD558\uB294 \uD3B8\uC774 \uB0AB\uB2E4 \uD750\uD750 \uB180\uB77C\uB2E4 \uC0C1\uB300\uC801\uC73C\uB85C \uB9D0\uD558\uC790\uBA74 \uB9C8\uCE58 \uC544\uB2C8\uB77C\uBA74 \uC27F \uADF8\uB807\uC9C0 \uC54A\uC73C\uBA74 \uADF8\uB807\uC9C0 \uC54A\uB2E4\uBA74 \uC548 \uADF8\uB7EC\uBA74 \uC544\uB2C8\uC5C8\uB2E4\uBA74 \uD558\uB4E0\uC9C0 \uC544\uB2C8\uBA74 \uC774\uB77C\uBA74 \uC88B\uC544 \uC54C\uC558\uC5B4 \uD558\uB294\uAC83\uB3C4 \uADF8\uB9CC\uC774\uB2E4 \uC5B4\uCA54\uC218 \uC5C6\uB2E4 \uD558\uB098 \uC77C \uC77C\uBC18\uC801\uC73C\uB85C \uC77C\uB2E8 \uD55C\uCF20\uC73C\uB85C\uB294 \uC624\uC790\uB9C8\uC790 \uC774\uB807\uAC8C\uB418\uBA74 \uC774\uC640\uAC19\uB2E4\uBA74 \uC804\uBD80 \uD55C\uB9C8\uB514 \uD55C\uD56D\uBAA9 \uADFC\uAC70\uB85C \uD558\uAE30\uC5D0 \uC544\uC6B8\uB7EC \uD558\uC9C0 \uC54A\uB3C4\uB85D \uC54A\uAE30 \uC704\uD574\uC11C \uC774\uB974\uAE30\uAE4C\uC9C0 \uC774 \uB418\uB2E4 \uB85C \uC778\uD558\uC5EC \uAE4C\uB2ED\uC73C\uB85C \uC774\uC720\uB9CC\uC73C\uB85C \uC774\uB85C \uC778\uD558\uC5EC \uADF8\uB798\uC11C \uC774 \uB54C\uBB38\uC5D0 \uADF8\uB7EC\uBBC0\uB85C \uADF8\uB7F0 \uAE4C\uB2ED\uC5D0 \uC54C \uC218 \uC788\uB2E4 \uACB0\uB860\uC744 \uB0BC \uC218 \uC788\uB2E4 \uC73C\uB85C \uC778\uD558\uC5EC \uC788\uB2E4 \uC5B4\uB5A4\uAC83 \uAD00\uACC4\uAC00 \uC788\uB2E4 \uAD00\uB828\uC774 \uC788\uB2E4 \uC5F0\uAD00\uB418\uB2E4 \uC5B4\uB5A4\uAC83\uB4E4 \uC5D0 \uB300\uD574 \uC774\uB9AC\uD558\uC5EC \uADF8\uB9AC\uD558\uC5EC \uC5EC\uBD80 \uD558\uAE30\uBCF4\uB2E4\uB294 \uD558\uB290\uB2C8 \uD558\uBA74 \uD560\uC218\uB85D \uC6B4\uC6B4 \uC774\uB7EC\uC774\uB7EC\uD558\uB2E4 \uD558\uAD6C\uB098 \uD558\uB3C4\uB2E4 \uB2E4\uC2DC\uB9D0\uD558\uBA74 \uB2E4\uC74C\uC73C\uB85C \uC5D0 \uC788\uB2E4 \uC5D0 \uB2EC\uB824 \uC788\uB2E4 \uC6B0\uB9AC \uC6B0\uB9AC\uB4E4 \uC624\uD788\uB824 \uD558\uAE30\uB294\uD55C\uB370 \uC5B4\uB5BB\uAC8C \uC5B4\uB5BB\uD574 \uC5B4\uCC0C\uB40F\uC5B4 \uC5B4\uB54C \uC5B4\uC9F8\uC11C \uBCF8\uB300\uB85C \uC790 \uC774 \uC774\uCABD \uC5EC\uAE30 \uC774\uAC83 \uC774\uBC88 \uC774\uB807\uAC8C\uB9D0\uD558\uC790\uBA74 \uC774\uB7F0 \uC774\uB7EC\uD55C \uC774\uC640 \uAC19\uC740 \uC694\uB9CC\uD07C \uC694\uB9CC\uD55C \uAC83 \uC5BC\uB9C8 \uC548 \uB418\uB294 \uAC83 \uC774\uB9CC\uD07C \uC774 \uC815\uB3C4\uC758 \uC774\uB807\uAC8C \uB9CE\uC740 \uAC83 \uC774\uC640 \uAC19\uB2E4 \uC774\uB54C \uC774\uB807\uAD6C\uB098 \uAC83\uACFC \uAC19\uC774 \uB07C\uC775 \uC090\uAC71 \uB530\uC704 \uC640 \uAC19\uC740 \uC0AC\uB78C\uB4E4 \uBD80\uB958\uC758 \uC0AC\uB78C\uB4E4 \uC65C\uB0D0\uD558\uBA74 \uC911\uC758\uD558\uB098 \uC624\uC9C1 \uC624\uB85C\uC9C0 \uC5D0 \uD55C\uD558\uB2E4 \uD558\uAE30\uB9CC \uD558\uBA74 \uB3C4\uCC29\uD558\uB2E4 \uAE4C\uC9C0 \uBBF8\uCE58\uB2E4 \uB3C4\uB2EC\uD558\uB2E4 \uC815\uB3C4\uC5D0 \uC774\uB974\uB2E4 \uD560 \uC9C0\uACBD\uC774\uB2E4 \uACB0\uACFC\uC5D0 \uC774\uB974\uB2E4 \uAD00\uD574\uC11C\uB294 \uC5EC\uB7EC\uBD84 \uD558\uACE0 \uC788\uB2E4 \uD55C \uD6C4 \uD63C\uC790 \uC790\uAE30 \uC790\uAE30\uC9D1 \uC790\uC2E0 \uC6B0\uC5D0 \uC885\uD569\uD55C\uAC83\uACFC\uAC19\uC774 \uCD1D\uC801\uC73C\uB85C \uBCF4\uBA74 \uCD1D\uC801\uC73C\uB85C \uB9D0\uD558\uBA74 \uCD1D\uC801\uC73C\uB85C \uB300\uB85C \uD558\uB2E4 \uC73C\uB85C\uC11C \uCC38 \uADF8\uB9CC\uC774\uB2E4 \uD560 \uB530\uB984\uC774\uB2E4 \uCFF5 \uD0D5\uD0D5 \uCF85\uCF85 \uB465\uB465 \uBD10 \uBD10\uB77C \uC544\uC774\uC57C \uC544\uB2C8 \uC640\uC544 \uC751 \uC544\uC774 \uCC38\uB098 \uB144 \uC6D4 \uC77C \uB839 \uC601 \uC77C \uC774 \uC0BC \uC0AC \uC624 \uC721 \uB959 \uCE60 \uD314 \uAD6C \uC774\uCC9C\uC721 \uC774\uCC9C\uCE60 \uC774\uCC9C\uD314 \uC774\uCC9C\uAD6C \uD558\uB098 \uB458 \uC14B \uB137 \uB2E4\uC12F \uC5EC\uC12F \uC77C\uACF1 \uC5EC\uB35F \uC544\uD649 \uB839 \uC601".split(" "));
        lunr.Pipeline.registerFunction(lunr.ko.stopWordFilter, "stopWordFilter-ko");
        lunr.ko.stemmer = /* @__PURE__ */ function() {
          return function(word) {
            if (typeof word.update === "function") {
              return word.update(function(word2) {
                return word2;
              });
            } else {
              return word;
            }
          };
        }();
        lunr.Pipeline.registerFunction(lunr.ko.stemmer, "stemmer-ko");
      };
    });
  }
});

// src/worker/langs/ko.ts
var import_lunr_stemmer = __toESM(require_lunr_stemmer_support());
var import_lunr = __toESM(require_lunr_multi());
var import_lunr2 = __toESM(require_lunr_ko());
self.language = function(lunr) {
  (0, import_lunr_stemmer.default)(lunr);
  (0, import_lunr2.default)(lunr);
  (0, import_lunr.default)(lunr);
  lunr.multiLanguage("en", "ko");
  return lunr.ko;
};
/*! Bundled license information:

lunr-languages/lunr.stemmer.support.js:
  (*!
   * Snowball JavaScript Library v0.3
   * http://code.google.com/p/urim/
   * http://snowball.tartarus.org/
   *
   * Copyright 2010, Oleg Mazko
   * http://www.mozilla.org/MPL/
   *)

lunr-languages/lunr.ko.js:
  (*!
   * Lunr languages, `Korean` language
   * https://github.com/turbobit/lunr-languages
   *
   * Copyright 2021, Manikandan Venkatasubban
   * http://www.mozilla.org/MPL/
   *)
  (*!
   * based on
   * Snowball JavaScript Library v0.3
   * http://code.google.com/p/urim/
   * http://snowball.tartarus.org/
   *
   * Copyright 2010, Oleg Mazko
   * http://www.mozilla.org/MPL/
   *)
*/
