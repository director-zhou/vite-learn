在整个构建过程中, 不是整体交给 `esbuild` 进行内部规律构建, 在构建 `entryPoint` 入口传入的是收集依赖的模块名称, 而不是收集依赖的入口文件路径, 可想而知 **Vite** 通过 `esbuildDepPlugin` 进行了一些自定义的处理, 对于不支持构建和不需要构建的文件进行排除，找不到的入口文件进行提示，让整个构建过程能够顺利进行, 符合 `ESM` 的最优的加载方案, 本质上就是对所有非 `ESM` 模块转化成 导入导出形式为 `ESM` 的语法。


## 非js文件后缀构建方式

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

以上展示的文件后缀引入都会被进行过滤`(图片, 视频, 字体, 样式)` 等等不参与构建。
同时 `JSX/TSX` 资源也不参与构建, 因为 `JSX/TSX` 的构建方式可能与esbuild不同, 在 **vite** 加载资源时利用插件自行处理。

### 过滤资源构建示例:
> 构建前:

```js
import ('./hello.scss')
import Image from './image/hello.jpg'
import customVue from './hello.vue'
```

> 构建后输出：

```js
import Image from "/Users/admin/zzx/test/src/image/hello.jpg";
import customVue from "/Users/admin/zzx/test/src/hello.vue";
import("/Users/admin/zzx/test/src/hello.scss");
```

## 其余模块构建方式

```js
 build.onResolve( { filter: /^[\w@][^:]/ }, async ({ path: id, importer, kind, resolveDir }) => {}
```

其余剩下的所有导入模块,会存被以上拦截，模块类型有以下几种情况:

1. 导入 `node_module` 模块。
2. 导入 `外链地址`。
3. 导入路径后缀为 `js` 的模块。
4. 导入以 `别名开头` 的模块。


### 路径解析方法

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

在 `onResolve` 拦截时，会返回一个 `kind` 参数, 通过 `kind` 可以明确知道, 此模块的导入方式, 是 `esm` 的导入方式，还是 `cjs` 导入方式, 分别生成两个解析器用来解析导入模块的最终返回构建文件的绝对路径。

### 导入模块是 `entryPoint` 入口模块

入口模块则是 **esbuild** 构建时传入 `entryPoint` 模块名称,它需要进行被二次处理,通过设置 `namespace` 分配虚拟空间名称, 等待 `onload` 进行自定义处理返回给 **esbuild** 进行构建。

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
声明 `isEntry` 判断是否是入口文件，不存在 `importer` 则说明是构建的入口文件。

声明 `entry` 通过 `resolveEntry` 方法从优化展平表映射对象中, 找到通过展平化的 `id` 进行寻找已经收集到的对应模块入口文件， 如果是入口模块，必然在 `qualified` 优化展平表映射对象中存在, 同时设置 `namespace: dep` 交给`onload` 进行处理。

这里设置 `path` 返回的是展平后的模块`id`, 并不是返回 `qualified` 优化展平表映射对象中解析模块的绝对路径，因为保留条目的原始`id`而不是文件路径，以便`esbuild`输出所需的输出文件结构, 需要重新导出以分离虚拟代理。

### 导入模块非 `entryPoint` 入口模块

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

如果不是入口模块, 解析到此模块时发现 `qualified` 优化展平表映射对象中存在, 则进行优先使用, 直接返回对应的解析后的绝对路径的入口文件路径。

如果 `qualified` 优化展平表映射对象中不存在此模块，则由 **vite** 解析的路径插件继续解析。


### 别名引入

在深入分析模块引用模块链路时, 会存在别名引入, 对于别名引入而言, 如果是 `entryPoint` 入口构建文件, 同样也会被[入口逻辑给拦截](/depedency/构建文件处理esbuildDepPluginOne.html#其余模块构建方式)。

非入口文件的情况下, 如果 `qualified` 优化展平表映射对象中不存在此模块，则由 **vite** 解析的路径插件继续解析。

:::warning 提示
```js
// check if this is aliased to an entry - also return entry namespace
const aliased = await _resolve(id, undefined, true)
if (aliased && (entry = resolveEntry(aliased, isEntry, resolveDir))) {
  return entry
}
```
如果别名模块是入口模块, 或者已经是被构建依赖收集的模块都会被入口第一个 `resolveEntry` 方法进行返回, 并不会走到此逻辑内。
:::


### 非收集依赖的模块且不需要过滤的模块


```js
const resolved = await resolve(id, importer, kind)
```

遇到导入的模块并不是依赖构建中收集的模块，同时也不需要被过行过滤, 此时会通过 `resolve` 插件进行自行解析出入口文件路径, 最后通过`return path`控制权交给`esbuild`继续处理。
## 外链地址

```js
if (isExternalUrl(resolved)) {
  return {
    path: resolved,
    external: true
  }
}
```

如果引入的是外链地址,通过 `resolve` 插件解析后会原封动返回原地址,符合了 `isExternalUrl` 的匹配结果。直接进行过滤。


## 无效的node_modules

在预构建扫描的时候如果没有找到对应的 `node_modules` 包, 则会收集到 `missing` 中，提示缺少此包, 但是在预构期间，如果没有找到此模块，将会在寻找模块路径时返回`__vite-browser-external`。

```js
export const browserExternalId = '__vite-browser-external'
if (resolved.startsWith(browserExternalId)) {
  return {
    path: id,
    namespace: 'browser-external'
  }
}
```

通过 `namespace` 分配一个虚拟空间, 转交给`onLoad`进行模块内容处理。
