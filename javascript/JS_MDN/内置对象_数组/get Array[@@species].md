## get Array[@@species]

species 种类 英 /ˈspiːʃiːz/  美 /ˈspiːʃiːz/  n. [生物] 物种；种类 adj. 物种上的 复数 species

```
Array[Symbol.species]
```

返回值 -- Array 的构造函数。


species 属性返回默认构造函数, 它用于 Array 对象的构造函数 Array:
```
Array[Symbol.species]; // function Array()
```

在继承类的对象中（例如你自定义的数组 MyArray），MyArray 的 species 属性返回的是 MyArray 这个构造函数. 然而你可能想要覆盖它，以便在你继承的对象 MyArray 中返回父类的构造函数 Array :

```
class MyArray extends Array {
  // 重写 MyArray 的 species 属性到父类 Array 的构造函数
  static get [Symbol.species]() { return Array; }
}
```