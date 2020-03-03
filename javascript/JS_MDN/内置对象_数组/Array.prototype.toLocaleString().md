## Array.prototype.toLocaleString()

toLocaleString() 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。

```
arr.toLocaleString([locales[,options]]);
```

locales 可选 -- 带有BCP 47语言标记的字符串或字符串数组，关于locales参数的形式与解释，请看Intl页面。

options 可选 -- 一个可配置属性的对象，对于数字 Number.prototype.toLocaleString()，对于日期Date.prototype.toLocaleString().

返回值 -- 表示数组元素的字符串。

## 使用locales和options

* Object: Object.prototype.toLocaleString()
* Number: Number.prototype.toLocaleString()
* Date: Date.prototype.toLocaleString()


* 总是在prices数组中显示字符串和数字的货币符号：

```
var prices = ['￥7', 500, 8123, 12];
prices.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
```

currency 英 /ˈkʌrənsi/  美 /ˈkɜːrənsi/  n. 货币；通货 复数 currencies
JPY abbr. 日元（Japanese Yen）


## 兼容旧环境Polyfill

```
// https://tc39.github.io/ecma402/#sup-array.prototype.tolocalestring
if (!Array.prototype.toLocaleString) {
  Object.defineProperty(Array.prototype, 'toLocaleString', {
    value: function(locales, options) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var a = Object(this);

      // 2. Let len be ? ToLength(? Get(A, "length")).
      var len = a.length >>> 0;

      // 3. Let separator be the String value for the 
      //    list-separator String appropriate for the 
      //    host environment's current locale (this is 
      //    derived in an implementation-defined way).
      // NOTE: In this case, we will use a comma
      var separator = ',';

      // 4. If len is zero, return the empty String.
      if (len === 0) {
        return '';
      }

      // 5. Let firstElement be ? Get(A, "0").
      var firstElement = a[0];
      // 6. If firstElement is undefined or null, then
      //  a.Let R be the empty String.
      // 7. Else,
      //  a. Let R be ? 
      //     ToString(? 
      //       Invoke(
      //        firstElement, 
      //        "toLocaleString", 
      //        « locales, options »
      //       )
      //     )
      var r = firstElement == null ? 
        '' : firstElement.toLocaleString(locales, options);

      // 8. Let k be 1.
      var k = 1;

      // 9. Repeat, while k < len
      while (k < len) {
        // a. Let S be a String value produced by 
        //   concatenating R and separator.
        var s = r + separator;

        // b. Let nextElement be ? Get(A, ToString(k)).
        var nextElement = a[k];

        // c. If nextElement is undefined or null, then
        //   i. Let R be the empty String.
        // d. Else,
        //   i. Let R be ? 
        //     ToString(? 
        //       Invoke(
        //        nextElement, 
        //        "toLocaleString", 
        //        « locales, options »
        //       )
        //     )
        r = nextElement == null ? 
          '' : nextElement.toLocaleString(locales, options);

        // e. Let R be a String value produced by 
        //   concatenating S and R.
        r = s + r;

        // f. Increase k by 1.
        k++;
      }

      // 10. Return R.
      return r;
    }
  });
}
```

如果你需要支持真正不支持Object.defineProperty的JavaScript引擎，最好不要对Array.prototype方法进行填充，因为你不能使它们不可枚举。