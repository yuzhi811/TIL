# C#

Main 함수를 제외하고는 운영체제가 어떤 함수도 호출하지 않는다.

```
namespace HelloCSharp
{
  class Program
  {
    static void Main(string[] args)
    {
      Console.WriteLine("Hi");
      Console.ReadLine();
    }
  }
}
```

build: 코드를 수정하면 항상 build를 다시 해야 함. 그것을 컴퓨터가 알아들을 수 있는 언어로 만들어서 exe파일을 만들어내는 것, 컴파일 작업.

매개변수로 배열이 들어온다는 의미.
args[0]
