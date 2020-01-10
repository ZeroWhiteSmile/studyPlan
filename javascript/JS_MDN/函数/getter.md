## getter

```
{get prop() { ... } }

{get [expression]() { ... } }
```

prop -- 要绑定到给定函数的**属性名**。
expression -- 从 ECMAScript 2015 开始，还可以使用一个**计算属性名**的表达式绑定到给定的函数。

expression 表达式 英 /ɪkˈspreʃn/  美 /ɪkˈspreʃn/ n. 表现，表示，表达；表情，脸色，态度，腔调，声调；式，符号；词句，语句，措辞，说法 复数 expressions
prop 道具，支撑 英 /prɒp/  美 /prɑːp/ n. 支柱，支撑物；支持者；道具；（橄榄球中的）支柱前锋；（语法）结构词；（马快跑时的）骤停；（戏剧、电影的）道具；（非正式）道具管理员；（非正式，飞机的）螺旋桨 v. 支撑；放置；用……撑住（某物）；（马等挺直前腿）骤停


## 描述

有时需要允许访问返回动态计算值的属性，或者你可能需要反映内部变量的状态，而不需要使用显式方法调用。

在JavaScript中，可以使用 getter 来实现。

虽然可以使用 getter 和 setter 来创建一个伪属性类型，但是不可能同时将一个 getter 绑定到一个属性并且该属性实际上具有一个值。

使用get语法时应注意以下问题：

* 可以使用数值或字符串作为标识；
* 必须不带参数
* 它不能与另一个 get 或具有相同属性的数据条目同时出现在一个对象字面量中（不允许使用 { get x() { }, get x() { } } 和 { x: ..., get x() { } }）。

## 在新对象初始化时定义一个getter

这会为obj创建一个伪属性latest，它会返回log数组的最后一个元素。

```
var obj = {
  log: ['example','test'],
  get latest() {
    if (this.log.length == 0) return undefined
    return this.log[this.log.length - 1]
  }
}
console.log(obj.latest); // "test"
```

注意，尝试为latest分配一个值不会改变它。


## 使用delete操作符删除 getter

只需使用 delete，就可删除 getter：

```
delete obj.latest;
```

##  使用defineProperty在现有对象上定义 getter

define 英 /dɪˈfaɪn/  美 /dɪˈfaɪn/ vt. 定义；使明确；规定 过去式 defined过去分词 defined现在分词 defining第三人称单数 defines

Object.defineProperty(obj, prop(key值), descriptor)

```
var o = { a:0 }

Object.defineProperty(o, "b", { get: function () { return this.a + 1; } });

console.log(o.b) // Runs the getter, which yields a + 1 (which is 1)
```

## 使用计算属性名

```
var expr = 'foo';

var obj = {
  get [expr]() { return 'bar'; }
};

console.log(obj.foo); // "bar"
```

## smart(智慧)/self-overwriting(自我覆盖)/lazy getters(懒getters)

**Getters **：给你一种方法来定义一个对象的属性，但是在访问它们之前不会计算属性的值。 getter 延续计算值的成本，直到需要值，如果不需要，您就不用支付成本。


**lazy getters(懒getters)**：一种额外的优化技术是用智能或记忆化 getters 延迟属性值的计算并将其缓存以备以后访问。该值是在第一次调用getter 时计算的，然后被缓存，因此后续访问返回缓存值而不重新计算它。这在以下情况下很有用：

* 如果属性值的计算是昂贵的（占用大量RAM或CPU时间，产生工作线程，检索远程文件等）。
* 如果现在不需要该值。它将在稍后使用，或在某些情况下它根本不使用。
* 如果被使用，它将被访问几次，并且不需要重新计算该值将永远不会被改变，或者不应该被重新计算。
