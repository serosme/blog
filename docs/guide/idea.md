# IDEA

## Settings

显示缩进参考线

```text
Show indent guides
```

日期格式

```text
Date Format
```

受信任的位置

```text
Trusted Locations
```

默认项目目录

```text
Default project directory
```

动态添加明确的 import

```text
Add unambiguous imports on the fly
```

动态优化 import

```text
Optimize imports on the fly
```

将 import 与 '\*' 搭配使用的类计数

```text
Class count to use import with '*'
```

将静态 import 与 '\*' 搭配使用的名称计数

```text
Names count to use static import with '*'
```

在文件底部显示虚拟空白

```text
Show virtual space at the bottom of the file
```

移除保存文件末尾尾随的空行

```text
Remove trailing blank lines at the end of saved files
```

确保每个保存的文件均以换行结束

```text
Ensure every saved file ends with a line break
```

## Live Templates

```xml
<templateSet group="Default">
  <template name="logiv" value="log.info(&quot;$EXPR_COPY$ = {}&quot;, $EXPR$);" description=""
    toReformat="false" toShortenFQNames="true">
    <variable name="EXPR" expression="variableOfType(&quot;&quot;)" defaultValue="&quot;expr&quot;"
      alwaysStopAt="true" />
    <variable name="EXPR_COPY" expression="escapeString(EXPR)" defaultValue="" alwaysStopAt="false" />
    <context>
      <option name="JAVA_CODE" value="true" />
    </context>
  </template>
  <template name="logi" value="log.info($END$);" description="" toReformat="false"
    toShortenFQNames="true">
    <context>
      <option name="JAVA_CODE" value="true" />
    </context>
  </template>
  <template name="string"
    value="@NotBlank(message = &quot;$NAME$不能为空&quot;)&#10;@Pattern(regexp = &quot;^[\\u0000-\\u024f\\u4e00-\\u9fff\\u3000-\\u303f\\uff00-\\uffef]{$MIN$,$MAX$}$&quot;, message = &quot;$NAME$应在$MIN$到$MAX$之间 包含中英文字符和符号&quot;)"
    description="" toReformat="false" toShortenFQNames="true">
    <variable name="NAME" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="MIN" expression="" defaultValue="" alwaysStopAt="true" />
    <variable name="MAX" expression="" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="JAVA_CODE" value="true" />
    </context>
  </template>
  <template name="time"
    value="@NotNull(message = &quot;$NAME$不能为空&quot;)&#10;@JsonFormat(pattern = &quot;yyyy-MM-dd HH:mm:ss&quot;)"
    description="" toReformat="false" toShortenFQNames="true">
    <variable name="NAME" expression="" defaultValue="" alwaysStopAt="true" />
    <context>
      <option name="JAVA_CODE" value="true" />
    </context>
  </template>
</templateSet>
```
