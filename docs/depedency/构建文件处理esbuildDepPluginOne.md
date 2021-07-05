对于构建中的处理, Vite通过esbuildDepPlugin进行了一些自定义的处理,对于不支持构建的文件进行排除，找不到的入口文件进行提示，让整个构建过程能够顺利进行。


# onResolved 解析

> 过滤相对路径或者绝对路径外部资源和非js文件类型

```js
build.onResolve(
  {
    filter: new RegExp(`\\.(` + externalTypes.join('|') + `)(\\?.*)?$`)
  },
  async ({ path: id, importer, kind }) => {
    const resolved = await resolve(id, importer, kind)
    if (resolved) {
      return {
        path: resolved,
        external: true
      }
    }
  }
)


const externalTypes = [
  'css',
  // supported pre-processor types
  'less',
  'sass',
  'scss',
  'styl',
  'stylus',
  'pcss',
  'postcss',
  // known SFC types
  'vue',
  'svelte',
  'marko',
  // JSX/TSX may be configured to be compiled differently from how esbuild
  // handles it by default, so exclude them as well
  'jsx',
  'tsx',
  ...KNOWN_ASSET_TYPES
]


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

以上展示的文件后缀引入都会被进行过滤，不参与构建

构建前:

```js
import ('./hello.scss')
import Image from './image/hello.jpg'
import customVue from './hello.vue'
```

构建后输出：

```js
import Image from "/Users/admin/zzx/test/src/image/hello.jpg";
import customVue from "/Users/admin/zzx/test/src/hello.vue";
import("/Users/admin/zzx/test/src/hello.scss");
```

> node_modules 模块路径

```js
 build.onResolve( { filter: /^[\w@][^:]/ }, async ({ path: id, importer, kind, resolveDir }) => {}
```

在构建的入口文件npm包中,会存在以下几种情况:

1. 加载其它node模块
2. 加载外链地址
3. 加载相对路径的其它模块
4. 加载别名模块

## 入口模块

入口模块则是esbuild构建时传入的entryPoint模块名称,它需要进行被二次处理,通过设置namespace等等onload进行自定义处理返回。

```js
const isEntry = !importer
// ensure esbuild uses our resolved entries
let entry
// if this is an entry, return entry namespace resolve result
if ((entry = resolveEntry(id, isEntry, resolveDir))) return entry
```

> resolveEntry方法
```js
function resolveEntry(id: string, isEntry: boolean, resolveDir: string) {
  const flatId = flattenId(id)
  if (flatId in qualified) {
    return isEntry
      ? {
          path: flatId,
          namespace: 'dep'
        }
      : XXXXXX
  }
}

```
声明`isEntry`判断是否是入口文件，不存在`importer`则证明是构建的入口文件
声明`entry`变量找到已解析的入口文件， 如果是入口模块，对`id`进行展平处理，返回展平化`id`, 同时设置`namespace`交给`onload`进行处理，表示是需要处理的文件。
如果不是入口模块，对id进行展平处理, 但是在依赖中同时已经存在该模块的解析路径，则优先使用此解析路径。
这里`path`返回的是展平后的模块`id`, 并不解析后的绝对路径，保留条目的原始`id`而不是文件路径，以便`esbuild`输出所需的输出文件结构, 需要重新导出以分离虚拟代理。

##  入口模块中引用的的node_modules

在 a 模块中 引用 b 模块时, 首先会检测是不是已解析过的依赖模块

```js
function resolveEntry(id: string, isEntry: boolean, resolveDir: string) {
  const flatId = flattenId(id)
  if (flatId in qualified) {
    return isEntry
      ? XXXX
      : {
        path: require.resolve(qualified[flatId], {
          paths: [resolveDir]
        })
      }
  }
}
```

如果存依赖模块的解析内容，直接path返回已解析后的依赖路径,控权由`esbuild`进行处理。

如果收集的依赖中不存在此模块，则由`vite`解析的路径插件继续寻找

```js
// default resolver which prefers ESM
const _resolve = config.createResolver({ asSrc: false })

// cjs resolver that prefers Node
const _resolveRequire = config.createResolver({
  asSrc: false,
  isRequire: true
})

const resolve = (
  id: string,
  importer: string,
  kind: ImportKind,
  resolveDir?: string
): Promise<string | undefined> => {
  let _importer
  // explicit resolveDir - this is passed only during yarn pnp resolve for
  // entries
  if (resolveDir) {
    _importer = normalizePath(path.join(resolveDir, '*'))
  } else {
    // map importer ids to file paths for correct resolution
    _importer = importer in qualified ? qualified[importer] : importer
  }
  const resolver = kind.startsWith('require') ? _resolveRequire : _resolve
  return resolver(id, _importer, undefined, ssr)
}
const resolved = await resolve(id, importer, kind)
```

通过kind可以明确知道, 此模块的导入方式, 是`esm`的导入方式，还是`cjs`导入方式, 分别生成两个解析器。


## 别名引入

在深入分析模块引用模块链路时, 会存在别名引入, 对于别名引入而言, 如果是入口构建文件, 同样也会被入口逻辑给拦截, 非入口文件的情况下, 首次也会被入口逻辑拦截, 在收集的依赖中存在的情况下，直接使用收集的依赖解析后的路径。

```js
const resolved = await resolve(id, importer, kind)
```

以前情况都不在存, 通过`resolve`插件进行自行解析，得出最后解析后的地址, 最后通过`return path`控制权交给`esbuild`继续处理。

:::warning
```js
// check if this is aliased to an entry - also return entry namespace
const aliased = await _resolve(id, undefined, true)
if (aliased && (entry = resolveEntry(aliased, isEntry, resolveDir))) {
  return entry
}
```
以上这块逻辑如果解析的别名引入符合依赖的收集或者是入口文件也可以在此处理, 但是根据解析情况此代码无用
:::

## 外链地址

```js
if (isExternalUrl(resolved)) {
  return {
    path: resolved,
    external: true
  }
}
```

如果引入的是外链地址,通过`resolve`插件解析后会原封动返回原地址,符合了`isExternalUrl`的匹配结果。直接进行过滤。


## 无效的node_modules

在预构建扫描的时候如果没有找到对应的`node_modules`包, 则会收集到`missing`中，提示缺少此包, 在预构建其间，如果没有找到此模块，将会在寻找模块路径时返回`__vite-browser-external`前缀,

```js
export const browserExternalId = '__vite-browser-external'
if (resolved.startsWith(browserExternalId)) {
  return {
    path: id,
    namespace: 'browser-external'
  }
}
```

通过`namespace`分配一个虚拟空间, 转交给`onLoad`进行模块内容处理。


## 相对路径

入口文件中的所有的相对路径路径解析全由`esbuild`内部进行自行解析。