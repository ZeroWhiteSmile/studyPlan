# !E:/softwareDirectory/Python37 #文件目录
# -*- coding: UTF-8 -*-
#coding=utf-8

steps = 0
def hanoiTower(n, A, B, C):
    if n == 1:
        print('将编号为', n, '盘子从', A, '移动到', C)
    else:
        hanoiTower(n - 1, A, C, B)
        print('将编号为', n, '盘子从', A, '移动到', C)
        hanoiTower(n - 1, B, A, C)
    global steps
    ''' 在函数内部对变量赋值进行修改后，该变量就会被Python解释器认为是局部变量而非全局变量，
        程序执行到steps +=1 的时候，因为这条语句是给a赋值，所以a成为了局部变量，那么在执行return a(或是print a)的时候，因为a这个局部变量还没有定义，自然就会抛出这样的错误。
        当全局变量来看，就是使用global关键字，在函数内部先声明a这个变量是全局变量。
    '''
    steps += 1
    print(steps)

hanoiTower(10, 'A', 'B', 'C')