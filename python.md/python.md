## Object and values

```
>>> a = [1, 2, 3]
>>> b = [1, 2, 3]
>>> a is b
False
```

If two objects are identical, they are also equivalent, but if they are equivalent, they are not necessarily identical.

## Aliasing

If the aliased object is mutable, changes made with one aliasa affect the other.

```
>>> b[0] = 17
>>> print a
[17, 2, 3]
```

It is error-prone. In general, it is safer to avoid aliasing when you are working with mutable objects.
For immutable objects like strings, aliasing is not as much of a problem.

- modify

```
>>> t1 = [1, 2]
>>> t2 = t1.append(3)
>>> print t1
[1, 2, 3]
>>> print t2
None
```

- create

```
>>> t3 = t1 + [4]
>>> print t3
[1, 2, 3, 4]
```

modify하는 것과 create하는 것의 차이는 중요함. 함수를 만들 때 리스트를 modify하기 때문이다.

```
def bad_delete_head(t):
    t = t[1:]              # WRONG!
```

slice operator는 새로운 리스트를 생성하고 리스트를 참조하지만 argument로 전달된 리스트에는 영향x.
새로운 리스트를 리턴하는 함수를 작성하는 것이 대안이 될 수 있다.

```
def tail(t):
    return t[1:]

This function leaves the original list unmodified. Here’s how it is used:

>>> letters = ['a', 'b', 'c']
>>> rest = tail(letters)
>>> print rest
['b', 'c']
```

Reference -https://www.greenteapress.com/thinkpython/html/thinkpython011.html

```

```

```

```
