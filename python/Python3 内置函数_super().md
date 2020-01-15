## Python3 内置函数_super()

super 英 /ˈsuːpə(r); ˈsjuːpə(r)/  美 /ˈsuːpər/ adj. 特级的；极好的 n. 特级品，特大号；临时雇员

super() 函数是用于调用父类(超类)的一个方法。

super 是用来解决多重继承问题的，直接用类名调用父类方法在使用单继承的时候没问题，但是如果使用多继承，会涉及到查找顺序（MRO）、重复调用（钻石继承）等种种问题。

MRO 就是类的方法解析顺序表, 其实也就是继承父类方法时的顺序表。

```python
super(type[, object-or-type])
```
type -- 类。**(子类对象)**
object-or-type -- 类，一般是 self**（self）**

* 简单例子：

```python
class A:
    def add(self, x):
        y = x + 1
        print(y)

class B(A):
    def add(self, x):
        super().add(x)
b = B()
b.add(2) #3
```

* 类里面super调用父类方法：

```python
class FooParent(object):
    # 定义构造方法(定义self属性)
    def __init__(self):
        self.parent = 'I\'m the parent.'
        print('parent')

    def bar(self, message):
        print('{0} from Parent'.format(message))

class FooChild(FooParent):
    # 定义构造方法(定义self属性)
    def __init__(self):
        # super(FooChild,self) 首先找到 FooChild 的父类（就是类 FooParent），然后把类 FooChild 的对象转换为类 FooParent 的对象
        super(FooChild, self).__init__() #parent
        print('Child')

    def bar(self, message):
        super(FooChild, self).bar(message) #HelloWorld from Parent
        print('Child Bar function')
        print(self.parent) #I'm the parent.

if __name__ == '__main__':
    fooChild = FooChild()
    fooChild.bar('HelloWorld')
```

* 类外面super调用父类方法

```python
#定义父类
class Parent:
    def myMethod(self):
        print('调用父类方法')

#定义子类
class Child(Parent):
    def myMethod(self):
        print('调用子类方法')

#子类实例
c = Child()
#子类调用重写方法
c.myMethod() #输出：调用子类方法
#用子类对象调用父类已被覆盖的方法
#self 代表的是类的实例，代表当前对象的地址,所以c 也等于 self, 所以super里可以用c代替self
super(Child, c).myMethod() #输出：调用父类方法
```

* 经典的菱形继承案例，BC 继承 A，然后 D 继承 BC，创造一个 D 的对象。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---> B ---
A --|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--> D
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---> C ---

```python
class A():
    def __init__(self):
        print('enter A')
        print('leave A')

class B(A):
    def __init__(self):
        print('enter B')
        super().__init__()
        print('leave B')

class C(A):
    def __init__(self):
        print('enter C')
        super().__init__()
        print('leave C')

class D(B, C):
    def __init__(self):
        print('enter D')
        super().__init__()
        print('leave D')

d = D()
```