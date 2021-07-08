## esbuildScanPlugin方法分析

```js
function esbuildScanPlugin(
  config: ResolvedConfig,
  container: PluginContainer,
  depImports: Record<string, string>,
  missing: Record<string, string>,
  entries: string[]
)
```

1. **config** 用户配置并合后的参数
2. **container** 插件容器, 通过容器使用调用vite插件的机制
3. **depImports** 收集的依赖列表
4. **missing** 收集的依赖制失列表
5. **entries** 所有通过esbuild需要收集依赖的入口地址

## 代码块理解

```js
const seen = new Map<string, string | undefined>()
```

声明`seen`变量, 通过`Map`保存解析的模的绝对路径

```js
  const resolve = async (id: string, importer?: string) => {
    const key = id + (importer && path.dirname(importer))
    if (seen.has(key)) {
      return seen.get(key)
    }
    const resolved = await container.resolveId(
      id,
      importer && normalizePath(importer)
    )
    const res = resolved?.id
    seen.set(key, res)
    return res
  }
```

`reslove`方则是插件调用解析的路径方法

1. id 表示 import *** from 'XXX', 提取XXX内容, 在插件onResolve中执行函数args参数中 path 属性
2. importer 则是引入模块的文件绝对路径地址

声明变量`key`, 通过 `id + path.dirname(importer)`解析后的路径做为标识, 对于解析入口的`importer`是一个空字符串, 对于它来说不在任何一个文件的上下文环境中
如果在`seen` `Map`象中找到解析的路径, 则直接返回, 对于一个模块可能会在`n`个模中引入。减少不必要的解析，因此它们的绝对路径也是相同的。
如果不存在，此时将调用`vite`插件容器调用`resolveId`方法，实则调用插件`Api`中`resolveId API`
最后解析会返回一个对象，通过`seen` `Map`对象进行保存引入模块的绝对路径, 返回解析后的路径结果。


```js
  const externalUnlessEntry = ({ path }: { path: string }) => ({
    path,
    external: !entries.includes(path)
  })
```

过滤方法，需要过滤的时候, 需要排除入口文件的过滤


## 解析路径种类

> 1. http 或 https url解析

```js
export const externalRE = /^(https?:)?\/\//
import { http } from 'http://XXXXX.js'
```

解析方法:

```js
build.onResolve({ filter: externalRE })
```


> 2. data Url 的解析

```js
import { url } from 'data: XXXXXX'
```

解析方法: 

```js
export const dataUrlRE = /^\s*data:/i
build.onResolve({ filter: dataUrlRE })
```

> 3. .vue .html .svelte 文件后缀解析

```js
import XXX from 'XXX.vue'
import XXX from 'XXX.svelte'
```

或者入口文件 `index.html`

解析方法:

```js
const htmlTypesRE = /\.(html|vue|svelte)$/
build.onResolve({ filter: htmlTypesRE }
```

> 4. 解析node_modules中的NPM包

```js
import dayjs from 'dayjs'
import Antd from 'ant-design-vue'
import Antd from 'ant-design-vue/es/index.js';
import { useForm } from '@ant-design-vue/use';
```

解析方法:

```js
build.onResolve({filter: /^[\w@][^:]/})
```

> 5. 解析样式后缀和json后缀的文件

```js
import './index.less'
import './index.json'
```

解析方法:

```js
build.onResolve({filter: /\.(css|less|sass|scss|styl|stylus|pcss|postcss|json)$/}）
```

> 6. 解析静态资源结尾的文件

```js
build.onResolve({filter: new RegExp(`\\.(${KNOWN_ASSET_TYPES.join('|')})$`)})

export const KNOWN_ASSET_TYPES = [
  // images
  'png',
  'jpe?g',
  'gif',
  'svg',
  'ico',
  'webp',
  'avif',

  // media
  'mp4',
  'webm',
  'ogg',
  'mp3',
  'wav',
  'flac',
  'aac',

  // fonts
  'woff2?',
  'eot',
  'ttf',
  'otf',

  // other
  'wasm'
]
```

> 7. 解析Vite添加一些特殊的查询参数可以更改资源被引入的方式

```js
// 显式加载资源为一个 URL
import assetAsURL from './asset.js?url'
// 以字符串形式加载资源
import assetAsString from './shader.glsl?raw'
// 加载为 Web Worker
import Worker from './worker.js?worker'
// 在构建时 Web Worker 内联为 base64 字符串
import InlineWorker from './worker.js?worker&inline'
```

解析方法:

```js
build.onResolve({ filter: SPECIAL_QUERY_RE })

export const SPECIAL_QUERY_RE = /[\?&](?:worker|sharedworker|raw|url)\b/
```
> 8. 最后捕获所有未被解析的引入路径

绝对路径，相对路径等未被匹配到的路径

```js
./XXXX/index.js
/user/XXX/XXXX.index
```

解析方法: 

```js
build.onResolve({filter: /.*/}）
```

## 转换路径模块

> 1. 转换 .vue .html .svelte

```js
const htmlTypesRE = /\.(html|vue|svelte)$/
build.onLoad({ filter: htmlTypesRE, namespace: 'html' })
```

> 2. 转换 .js .tsx .jsx .mjs 结尾文件

```js
export const JS_TYPES_RE = /\.(?:j|t)sx?$|\.mjs$/
build.onLoad({ filter: JS_TYPES_RE })
```