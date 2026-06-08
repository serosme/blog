# 基本数据类型与包装类型

## 基本数据类型

Java 中有 8 种基本数据类型，即 primitive type，可分为四类：

### 整数类型

| 类型    | 大小   | 范围           | 默认值 |
| ------- | ------ | -------------- | ------ |
| `byte`  | 1 字节 | -128 ~ 127     | `0`    |
| `short` | 2 字节 | -32768 ~ 32767 | `0`    |
| `int`   | 4 字节 | -2³¹ ~ 2³¹-1   | `0`    |
| `long`  | 8 字节 | -2⁶³ ~ 2⁶³-1   | `0`    |

### 浮点类型

| 类型     | 大小   | 范围                     | 默认值 |
| -------- | ------ | ------------------------ | ------ |
| `float`  | 4 字节 | 约 ±1.4E-45 ~ ±3.4E+38   | `0.0f` |
| `double` | 8 字节 | 约 ±4.9E-324 ~ ±1.7E+308 | `0.0d` |

::: tip 注意
表格中的最小值指最小正非零值，最大值的绝对值取 `MAX_VALUE`：

- `Float.MIN_VALUE` ≈ 1.4E-45，`Float.MAX_VALUE` ≈ 3.4E+38
- `Double.MIN_VALUE` ≈ 4.9E-324，`Double.MAX_VALUE` ≈ 1.7E+308

:::

### 字符类型

| 类型   | 大小   | 范围      | 默认值   |
| ------ | ------ | --------- | -------- |
| `char` | 2 字节 | 0 ~ 65535 | `\u0000` |

### 布尔类型

| 类型      | 大小     | 范围              | 默认值  |
| --------- | -------- | ----------------- | ------- |
| `boolean` | JVM 相关 | `true` 或 `false` | `false` |

::: tip 注意
`boolean` 的大小没有明确定义，在数组中以 `byte` 存储，在 HotSpot 中通常用 `int` 表示。
:::

### 类型提升与强制转换

基本类型在表达式中会自动提升：

```java
// 自动类型提升链：byte → short → int → long → float → double
byte a = 10;
byte b = 20;
// byte c = a + b;        // 编译错误：a + b 提升为 int
int  c = a + b;           // 正确

long d = 100L;
float e = d + 3.14f;      // long 提升为 float
```

强制转换可能静默溢出，不会抛出异常：

```java
int  big = 300;
byte b   = (byte) big;    // 44，截断低 8 位

byte b1 = 127;
byte b2 = (byte) (b1 + 1); // -128，溢出回绕
```

::: danger 注意
强制转换会截断高位或溢出回绕，**不会抛出任何异常**，排查困难。
:::

::: tip 类字段与局部变量的默认值差异
表格中的默认值仅适用于**类字段**，即实例变量与静态变量。**局部变量没有默认值**，必须显式初始化后才能使用，否则编译报错：

```java
public class Demo {
    int field;         // 默认 0（类字段，JVM 自动赋零值）

    void method() {
        int local;    // 编译错误：variable might not have been initialized
        System.out.println(local);
    }
}
```

:::

## 包装类型

每种基本数据类型都有对应的包装类型，即 wrapper class，位于 `java.lang` 包：

| 基本类型  | 包装类型    | 父类     |
| --------- | ----------- | -------- |
| `byte`    | `Byte`      | `Number` |
| `short`   | `Short`     | `Number` |
| `int`     | `Integer`   | `Number` |
| `long`    | `Long`      | `Number` |
| `float`   | `Float`     | `Number` |
| `double`  | `Double`    | `Number` |
| `char`    | `Character` | `Object` |
| `boolean` | `Boolean`   | `Object` |

包装类型的默认值为 `null`，这是它与基本类型最重要的区别之一。

### 不可变性

所有包装类型都是 `final` 类，一旦创建其内部值不可改变。每次修改实际是创建了新对象：

```java
Integer a = 100;
a++;  // 等价于 a = Integer.valueOf(a.intValue() + 1)，创建了新对象
```

不可变性的好处：

- **线程安全**：多线程共享无需同步
- **可安全缓存**：`IntegerCache` 等缓存机制依赖不可变性
- **避免引用逃逸**：不会出现值被意外修改的问题

## 自动装箱与拆箱

Java 5 引入了自动装箱 autoboxing 和自动拆箱 unboxing，编译器会自动在基本类型和包装类型之间转换。

```java
// 自动装箱：int → Integer
Integer a = 100;           // 等价于 Integer.valueOf(100)

// 自动拆箱：Integer → int
int b = a;                 // 等价于 a.intValue()

// 混合运算时自动拆箱
Integer x = 10;
Integer y = 20;
int z = x + y;             // x 和 y 自动拆箱为 int 后相加
```

::: warning 注意
频繁的装箱拆箱会产生大量临时对象，影响性能。在循环等热点代码中应优先使用基本类型。
:::

## 缓存机制

部分包装类型对常用值做了缓存，`valueOf()` 方法会优先从缓存中获取对象。

| 包装类型            | 缓存范围                       |
| ------------------- | ------------------------------ |
| `Byte`              | -128 ~ 127                     |
| `Short`             | -128 ~ 127                     |
| `Integer`           | -128 ~ 127                     |
| `Long`              | -128 ~ 127                     |
| `Character`         | 0 ~ 127                        |
| `Float` 和 `Double` | 无缓存                         |
| `Boolean`           | `TRUE` 和 `FALSE` 两个静态常量 |

`Integer` 的缓存上限可通过 JVM 参数 `-XX:AutoBoxCacheMax` 调整。注意这是 HotSpot 与 OpenJDK 特有功能，并非 Java 规范保证，其他 JVM 实现可能不支持。

### IntegerCache 内部实现

`Integer.valueOf()` 的大致逻辑：

```java
// Integer.valueOf 源码（简化）
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high) {
        return IntegerCache.cache[i + (-IntegerCache.low)];
    }
    return new Integer(i);  // JDK 9+ 中 new Integer(int) 已废弃，实际实现更复杂
}
```

`IntegerCache` 是 `Integer` 的私有静态内部类，在类加载时初始化缓存数组。`Byte`、`Short`、`Long`、`Character` 的实现类似。

::: warning 注意
`-XX:AutoBoxCacheMax=500` 虽可扩展缓存上限，但会按比例增加堆内存中的缓存数组大小，上限过大可能增加 GC 压力。
:::

```java
Integer a = 127;
Integer b = 127;
System.out.println(a == b);       // true，缓存范围内，同一对象

Integer c = 128;
Integer d = 128;
System.out.println(c == d);       // false，超出缓存范围，不同对象
```

::: danger 陷阱
对包装类型使用 `==` 比较的是对象引用，而不是值。超出缓存范围的数值即使相等，`==` 也会返回 `false`。**始终使用 `.equals()` 比较包装类型的值。**
:::

## `==` 与 `equals()`

```java
Integer a = new Integer(100);     // 显式 new，不会使用缓存
Integer b = new Integer(100);
System.out.println(a == b);       // false，不同对象
System.out.println(a.equals(b));  // true，值相等

Integer c = 100;                  // 自动装箱，使用缓存
Integer d = 100;
System.out.println(c == d);       // true，缓存范围内同一对象
```

基本类型与包装类型混用时，包装类型会自动拆箱变为基本类型比较：

```java
int x = 128;
Integer y = 128;
System.out.println(x == y);       // true，y 自动拆箱为 int

// 两侧都是包装类型 vs 一侧是基本类型
Integer p = 200;
Integer q = 200;
System.out.println(p == q);       // false，引用比较，超出缓存
System.out.println(p == 200);     // true！200 是 int 字面量，p 拆箱后数值比较
```

::: tip 关键规则
`==` 两端如果**至少有一侧是基本类型**，则另一侧的包装类型会拆箱做数值比较；如果**两侧都是包装类型**，则是对象引用的比较。
:::

## compareTo 与排序

包装类型都实现了 `Comparable` 接口，支持排序。但 `null` 元素会导致 `NullPointerException`：

```java
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(null);
list.add(3);

Collections.sort(list);  // NPE！null.compareTo() 抛出异常
```

安全写法：

```java
// null 排在末尾
list.sort(Comparator.nullsLast(Integer::compareTo));

// null 排在开头
list.sort(Comparator.nullsFirst(Integer::compareTo));

// 使用 Comparator.naturalOrder() 同理需要 nullsFirst/nullsLast
list.sort(Comparator.nullsLast(Comparator.naturalOrder()));
```

对于 `BigDecimal`，`compareTo` 只比较数值、忽略 `scale`，即精度，这与 `equals` 不同，详见后文。

## `Number` 抽象类

`Byte`、`Short`、`Integer`、`Long`、`Float`、`Double` 都继承自 `java.lang.Number`，提供以下类型转换方法：

```java
Number n = Integer.valueOf(100);

byte  b = n.byteValue();    // 可能丢失精度（截断低 8 位）
short s = n.shortValue();   // 可能丢失精度
int   i = n.intValue();     // 安全（Integer 本身）
long  l = n.longValue();    // 安全（向上转型）
float f = n.floatValue();   // 可能丢失精度

double d = n.doubleValue(); // 安全（向上转型）
```

::: warning 注意
窄化转换，例如 `longValue()` 转 `intValue()`，会截断高位，但**不会抛出异常**。
:::

## 字符串转换

```java
// 基本类型 → 字符串
String s1 = Integer.toString(100);
String s2 = String.valueOf(200);

// 字符串 → 基本类型 / 包装类型
int a = Integer.parseInt("100");
Integer b = Integer.valueOf("200");

// 进制转换
String hex = Integer.toHexString(255);    // "ff"
int dec = Integer.parseInt("ff", 16);     // 255
```

::: danger 注意
`parseInt` 和 `valueOf` 在遇到非数字字符串时会抛出 `NumberFormatException`。
:::

::: tip 选择 `parseInt` 还是 `valueOf`
`parseInt` 返回 `int`，无对象创建；`valueOf` 返回 `Integer`，会走缓存或创建新对象。如果只需要基本类型参与运算，优先用 `parseInt` 避免不必要的装箱开销；需要放进集合或处理可空值时再用 `valueOf`。
:::

## 三目运算符的坑

当三目运算符的两个分支类型不一致时，编译器会进行类型对齐，给包装类型分支植入拆箱指令。如果运行时走到该分支且值为 `null`，就会抛出 `NullPointerException`。

### 安全示例

```java
// 条件短路：score 为 null 时走 else 分支取 0，安全
Integer score = null;
int result = score != null ? score : 0;     // 安全，返回 0
```

### 会 NPE 的示例

```java
Integer a = null;

// 条件为 true，走 a 分支，a 是 null 被拆箱 → NPE
int r1 = true ? a : 0;                      // NPE！

// 条件为 true，a 为 null 被拆箱 → NPE（即使另一分支不是 null）
int r2 = (a == null) ? a : 100;              // NPE！
```

核心原因是 Java 语言规范 JLS 规定：三目运算符的**结果类型**由两个分支在**编译期**共同决定。当一边是基本类型、另一边是包装类型时，包装类型分支会被编译器植入拆箱指令，即调用 `intValue()` 方法，**即使运行时永远不会走到那个分支**。

```java
Integer a = null;
Integer b = 100;

// 危险：两边都是包装类型，但赋值目标是 int，两分支都被植入拆箱
int r3 = a != null ? a : b;
// 这里条件为 false，走 b 分支，b.intValue() = 100，恰好不 NPE
// 但如果 a 不是 null，走 a 分支也是安全的

// 反过来：条件为 true，走 a(null) 分支 → NPE
int r4 = a == null ? a : b;                 // NPE！a 被拆箱
```

### 安全写法

```java
Integer a = null;

// 方式一：确保赋值目标与分支类型一致
Integer r1 = a != null ? a : 0;         // 结果为 Integer，不拆箱
int r2 = a != null ? a.intValue() : 0;  // 手动拆箱，分支类型一致

// 方式二：使用 Optional
int r3 = Optional.ofNullable(a).orElse(0);

// 方式三：使用 Objects.equals
int r4 = Objects.equals(a, null) ? 0 : a;
```

## 为什么需要包装类型

1. **泛型不支持基本类型**：`List<int>` 非法，必须使用 `List<Integer>`
2. **需要表达无值**：基本类型无法表示 `null`，比如数据库字段可能为空
3. **集合框架**：`ArrayList`、`HashMap` 等只能存储对象
4. **反射**：`Integer.TYPE`，即 `int.class`，可在反射中表示 `int` 类型的元信息，用于判断方法参数、返回值是否为基本类型
5. **工具方法**：包装类提供了 `parseInt`、`toHexString`、`compare` 等实用方法

## OptionalInt / OptionalLong / OptionalDouble

JDK 8 为基本类型提供了专属的 `Optional` 变体，避免双重装箱，即基本类型先装箱为包装类型再包装为 `Optional`：

```java
// 不推荐：两层装箱 — int → Integer → Optional<Integer>
Optional<Integer> opt1 = Optional.ofNullable(someInt);

// 推荐：零装箱，直接操作基本类型
OptionalInt opt2 = OptionalInt.of(42);

// 从可能为 null 的 Integer 创建
Integer nullable = getValue();
OptionalInt opt3 = nullable != null
    ? OptionalInt.of(nullable)  // 自动拆箱，前面有空判断所以安全
    : OptionalInt.empty();

// 常用方法
int value = opt3.orElse(0);           // 取不到时返回默认值
opt3.ifPresent(v -> System.out.println(v));  // 存在时消费
```

对应的还有 `OptionalLong` 和 `OptionalDouble`。注意目前没有 `OptionalByte`、`OptionalShort`、`OptionalChar`、`OptionalBoolean`。

## IntStream / LongStream / DoubleStream

JDK 8 同样为 Stream API 提供了基本类型特化，避免装箱开销：

```java
// IntStream 直接操作 int，零装箱
int sum = IntStream.range(0, 100).sum();

// Stream<Integer> 会有装箱开销
Stream<Integer> boxed = IntStream.range(0, 100).boxed();

// 反向转换：Stream → IntStream
int[] arr = list.stream().mapToInt(Integer::intValue).toArray();

// LongStream / DoubleStream 同理，支持 sum、average、max 等聚合操作
```

在需要处理大量基本类型数值的流式操作中，优先使用基本类型 Stream 而非 `Stream<Integer>`。

## 性能对比

```java
// 基本类型：高效，栈上分配
long start = System.currentTimeMillis();
int sum = 0;
for (int i = 0; i < 100_000_000; i++) {
    sum += i;
}
long end = System.currentTimeMillis();
System.out.println("基本类型耗时: " + (end - start) + "ms");

// 包装类型：低效，大量装箱拆箱和对象创建
start = System.currentTimeMillis();
Integer sum2 = 0;
for (Integer i = 0; i < 100_000_000; i++) {
    sum2 += i;  // 每次循环都涉及装箱、拆箱
}
end = System.currentTimeMillis();
System.out.println("包装类型耗时: " + (end - start) + "ms");
```

在性能敏感的场景中，基本类型的速度可以是包装类型的数十倍。更严重的是，包装类型会产生海量临时对象，频繁触发 **GC**，在延迟敏感的场景下影响远不止吞吐量。

::: tip
以上为示意性对比，精确的性能测试请使用 **JMH**（Java Microbenchmark Harness），避免 JIT 优化、死代码消除等因素干扰。
:::

## BigDecimal 与精确计算

`float` 和 `double` 采用 IEEE 754 二进制浮点数，无法精确表示十进制小数：

```java
System.out.println(0.1 + 0.2);          // 0.30000000000000004
System.out.println(1.0 - 0.9);          // 0.09999999999999998
```

### IEEE 754 浮点机制简析

十进制小数转为二进制时，大部分会产生循环小数，例如十进制的 0.1 在二进制中为 `0.0001100110011...` 这样的无限循环，受限于存储位数被截断，导致精度丢失。

浮点类型的几个特殊值需要注意：

```java
// NaN 不等于任何值，包括自身，这个特性可用于判断
double nan = Double.NaN;
System.out.println(nan == nan);        // false
System.out.println(Double.isNaN(nan)); // true（正确做法）

// 除零不会抛异常，得到 Infinity（基本类型无异常机制）
System.out.println(1.0 / 0.0);         // Infinity
System.out.println(-1.0 / 0.0);        // -Infinity

// 0.0 / 0.0 得到 NaN
System.out.println(0.0 / 0.0);         // NaN
```

涉及金额、汇率等场景，必须使用 `java.math.BigDecimal`。

### 创建 BigDecimal

```java
// 推荐：使用字符串或 valueOf
BigDecimal a = new BigDecimal("0.1");
BigDecimal b = BigDecimal.valueOf(0.1);  // 底层也是转字符串

// 禁止：用 double 构造会导致精度丢失
BigDecimal c = new BigDecimal(0.1);
System.out.println(c);
// 0.1000000000000000055511151231257827021181583404541015625
```

### 四则运算

```java
BigDecimal x = new BigDecimal("10");
BigDecimal y = new BigDecimal("3");

BigDecimal sum  = x.add(y);             // 13
BigDecimal diff = x.subtract(y);        // 7
BigDecimal prod = x.multiply(y);        // 30

// 除法必须指定舍入模式，否则除不尽时抛 ArithmeticException
BigDecimal quot = x.divide(y, 2, RoundingMode.HALF_UP);  // 3.33
```

### 比较

```java
BigDecimal d1 = new BigDecimal("1.0");
BigDecimal d2 = new BigDecimal("1.00");

System.out.println(d1.equals(d2));      // false，scale 不同
System.out.println(d1.compareTo(d2));   // 0，值相等
```

::: danger 注意
`equals` 同时比较数值和精度即 scale，比较数值应使用 `compareTo`。
:::

### 格式化

```java
BigDecimal amount = new BigDecimal("1234.5");

// 设置小数位数
BigDecimal rounded = amount.setScale(2, RoundingMode.HALF_UP);  // 1234.50

// 使用 NumberFormat 显示货币格式
NumberFormat fmt = NumberFormat.getCurrencyInstance(Locale.CHINA);
System.out.println(fmt.format(amount));  // ¥1,234.50
```

## BigInteger

`java.math.BigInteger` 用于任意精度的整数运算，与 `BigDecimal` 类似但专注于整数：

```java
BigInteger bi1 = new BigInteger("99999999999999999999");
BigInteger bi2 = BigInteger.valueOf(2);

BigInteger sum  = bi1.add(bi2);
BigInteger diff = bi1.subtract(bi2);
BigInteger prod = bi1.multiply(bi2);
BigInteger quot = bi1.divide(bi2);       // 整数除法，自动截断

// 判断素数
boolean isPrime = bi1.isProbablePrime(10);  // certainty=10 表示 1 - 1/2¹⁰ 的概率

// 位运算
BigInteger shifted = bi1.shiftLeft(1);   // 左移一位，等价于 ×2
```

`BigInteger` 同样不可变，所有运算返回新对象。

## 最佳实践

1. **POJO 中的字段**：使用包装类型，以便区分未赋值即 `null` 和默认值即 `0`
2. **RPC 接口的返回值**：使用包装类型，让调用方能区分空值和零值
3. **局部变量和方法参数**：优先使用基本类型，避免不必要的装箱开销
4. **比较包装类型**：始终使用 `.equals()`，不要用 `==`；也可用 `Objects.equals(a, b)` 来避免 NPE
5. **排序含 null 的集合**：使用 `Comparator.nullsLast()` 或 `nullsFirst()` 而非裸 `sort()`
6. **金额计算**：`float` 和 `double` 存在精度问题，**金额必须使用 `BigDecimal`**
7. **大整数运算**：超出 `long` 范围时使用 `BigInteger`
8. **数据库实体**：与数据库字段可空性保持一致，可空字段用包装类型，非空字段用基本类型
9. **Optional 基本类型**：优先使用 `OptionalInt`、`OptionalLong`、`OptionalDouble` 避免双重装箱
10. **判断 NaN**：始终使用 `Double.isNaN()` 或 `Float.isNaN()`，不要用 `==` 比较
